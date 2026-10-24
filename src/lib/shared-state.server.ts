import { createHmac, timingSafeEqual } from "node:crypto";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import { getSql, type Sql } from "./db";
import { assertSameSiteRequest } from "./auth/isolation.server";
import type { SharedSiteState } from "./shared-state";

const COOKIE_NAME = "__Host-union-admin";
const SESSION_SECONDS = 60 * 60 * 12;
const SHARED_STATE_CACHE_MS = 1_000;

type SharedStateRow = { data: SharedSiteState; updated_at: string | Date };
type SharedStateSnapshot = { state: SharedSiteState; updatedAt: string };

// Vercel can serve several requests from the same warm function instance. Share
// an in-flight read, and briefly reuse its result, to avoid sending every
// simultaneous visitor to Neon for the same JSON document.
let sharedStateCache: { snapshot: SharedStateSnapshot; expiresAt: number } | null = null;
let sharedStateRead: Promise<SharedStateSnapshot> | null = null;

function invalidateSharedStateCache(): void {
  sharedStateCache = null;
}

function adminPassword(): string | null {
  const value = process.env.ADMIN_PASSWORD?.trim();
  return value && value.length >= 1 && value.length <= 20 ? value : null;
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function signatureMatches(actual: string, expected: string): boolean {
  const actualBytes = Buffer.from(actual);
  const expectedBytes = Buffer.from(expected);
  return actualBytes.length === expectedBytes.length && timingSafeEqual(actualBytes, expectedBytes);
}

export function isAdminPasswordConfigured(): boolean {
  return adminPassword() !== null;
}

export function hasAdminSession(): boolean {
  const password = adminPassword();
  const token = getCookie(COOKIE_NAME);
  if (!password || !token) return false;
  const [expires, suppliedSignature, ...extra] = token.split(".");
  if (extra.length || !/^\d+$/.test(expires ?? "") || !suppliedSignature) return false;
  if (Number(expires) <= Math.floor(Date.now() / 1000)) return false;
  return signatureMatches(suppliedSignature, sign(expires, password));
}

export async function signInAdmin(password: string): Promise<{ ok: boolean }> {
  assertSameSiteRequest();
  const expected = adminPassword();
  if (!expected) return { ok: false };
  const suppliedHash = createHmac("sha256", "union-admin-check").update(password).digest();
  const expectedHash = createHmac("sha256", "union-admin-check").update(expected).digest();
  if (!timingSafeEqual(suppliedHash, expectedHash)) return { ok: false };

  const expires = String(Math.floor(Date.now() / 1000) + SESSION_SECONDS);
  setCookie(COOKIE_NAME, `${expires}.${sign(expires, expected)}`, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: SESSION_SECONDS,
  });
  return { ok: true };
}

export function signOutAdmin(): void {
  assertSameSiteRequest();
  setCookie(COOKIE_NAME, "", {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 0,
  });
}

async function ensureStateRow(sql: Sql): Promise<SharedStateRow> {
  // The table is created by migrations/0001_union_state.sql. Do not run DDL
  // for every visitor; it adds lock/catalog work to the busiest endpoint.
  const found = await sql.query<SharedStateRow>(
    "SELECT data, updated_at FROM union_site_state WHERE id = 1",
  );
  if (found[0]?.data) return found[0];

  const { seedOffices, seedPlan, seedNews } = await import("./union-data");
  const initial: SharedSiteState = {
    offices: seedOffices,
    plan: seedPlan,
    planPublished: false,
    news: seedNews,
    suggestions: [],
    schoolStories: [],
    galleryPhotos: [],
    galleryPhotoEdits: {},
    managedContent: [],
    knowledgeSources: [],
  };
  await sql.query(
    "INSERT INTO union_site_state (id, data) VALUES (1, $1::jsonb) ON CONFLICT (id) DO NOTHING",
    [JSON.stringify(initial)],
  );
  const saved = await sql.query<SharedStateRow>(
    "SELECT data, updated_at FROM union_site_state WHERE id = 1",
  );
  if (!saved[0]?.data) throw new Error("Shared site state could not be initialized.");
  return saved[0];
}

async function readSharedStateSnapshot(): Promise<SharedStateSnapshot> {
  const now = Date.now();
  if (sharedStateCache && sharedStateCache.expiresAt > now) {
    return sharedStateCache.snapshot;
  }
  if (sharedStateRead) return sharedStateRead;

  const pending = (async () => {
    const sql = await getSql();
    const row = await ensureStateRow(sql);
    return {
      state: row.data,
      updatedAt: (row.updated_at instanceof Date
        ? row.updated_at
        : new Date(row.updated_at)
      ).toISOString(),
    };
  })();
  sharedStateRead = pending;
  try {
    const snapshot = await pending;
    sharedStateCache = { snapshot, expiresAt: Date.now() + SHARED_STATE_CACHE_MS };
    return snapshot;
  } finally {
    if (sharedStateRead === pending) sharedStateRead = null;
  }
}

export async function readSharedState(): Promise<{
  state: SharedSiteState;
  isAdmin: boolean;
  adminConfigured: boolean;
  updatedAt: string;
}> {
  assertSameSiteRequest();
  const { state, updatedAt } = await readSharedStateSnapshot();
  const isAdmin = hasAdminSession();
  return {
    state: { ...state, suggestions: isAdmin ? state.suggestions : [] },
    isAdmin,
    adminConfigured: isAdminPasswordConfigured(),
    updatedAt,
  };
}

export async function writeSharedState(state: SharedSiteState): Promise<void> {
  assertSameSiteRequest();
  if (!hasAdminSession()) throw new Error("يلزم تسجيل دخول الإدارة لحفظ التغييرات.");
  const sql = await getSql();
  await ensureStateRow(sql);
  const { suggestions: _suggestions, ...publicState } = state;
  const json = JSON.stringify(publicState);
  if (json.length > 2_000_000) throw new Error("حجم البيانات أكبر من الحد المسموح.");
  await sql.query(
    `UPDATE union_site_state SET data = data || $1::jsonb, updated_at = now() WHERE id = 1`,
    [json],
  );
  invalidateSharedStateCache();
}

export async function updateSharedSuggestion(id: string, reply: string): Promise<void> {
  assertSameSiteRequest();
  if (!hasAdminSession()) throw new Error("يلزم تسجيل دخول الإدارة لحفظ التغييرات.");
  const sql = await getSql();
  await sql.query(
    `UPDATE union_site_state
     SET data = jsonb_set(
       data,
       '{suggestions}',
       COALESCE((
         SELECT jsonb_agg(
           CASE WHEN item->>'id' = $1
             THEN jsonb_set(item, '{reply}', to_jsonb($2::text), true)
             ELSE item
           END
         )
         FROM jsonb_array_elements(COALESCE(data->'suggestions', '[]'::jsonb)) AS rows(item)
       ), '[]'::jsonb),
       true
     ), updated_at = now()
     WHERE id = 1`,
    [id, reply.trim().slice(0, 2000)],
  );
  invalidateSharedStateCache();
}

export async function removeSharedSuggestion(id: string): Promise<void> {
  assertSameSiteRequest();
  if (!hasAdminSession()) throw new Error("يلزم تسجيل دخول الإدارة لحفظ التغييرات.");
  const sql = await getSql();
  await sql.query(
    `UPDATE union_site_state
     SET data = jsonb_set(
       data,
       '{suggestions}',
       COALESCE((
         SELECT jsonb_agg(item)
         FROM jsonb_array_elements(COALESCE(data->'suggestions', '[]'::jsonb)) AS rows(item)
         WHERE item->>'id' <> $1
       ), '[]'::jsonb),
       true
     ), updated_at = now()
     WHERE id = 1`,
    [id],
  );
  invalidateSharedStateCache();
}

export async function submitSharedSuggestion(
  message: string,
  stage: string,
): Promise<void> {
  assertSameSiteRequest();
  const cleanMessage = message.trim();
  const cleanStage = stage.trim().slice(0, 40);
  if (cleanMessage.length < 4 || cleanMessage.length > 1000) {
    throw new Error("اكتب المشاركة في حدود ٤ إلى ١٠٠٠ حرف.");
  }
  const sql = await getSql();
  await ensureStateRow(sql);
  const suggestion = {
    id: crypto.randomUUID(),
    name: "مشاركة مجهولة",
    number: "",
    stage: cleanStage || "عام",
    message: cleanMessage,
    reply: "",
    createdAt: new Date().toISOString(),
  };
  await sql.query(
    `UPDATE union_site_state
     SET data = jsonb_set(
       data,
       '{suggestions}',
       jsonb_build_array($1::jsonb) || COALESCE(data->'suggestions', '[]'::jsonb),
       true
     ), updated_at = now()
     WHERE id = 1`,
    [JSON.stringify(suggestion)],
  );
  invalidateSharedStateCache();
}
