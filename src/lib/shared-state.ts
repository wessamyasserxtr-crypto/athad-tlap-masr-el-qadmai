import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { NewsItem, Office, Photo, PlanItem, SchoolStory, Suggestion } from "./union-data";
import type { KnowledgeSourceRecord, ManagedContentItem } from "./union-store";

export type SharedSiteState = {
  offices: Office[];
  plan: PlanItem[];
  planPublished: boolean;
  news: NewsItem[];
  suggestions: Suggestion[];
  schoolStories: SchoolStory[];
  galleryPhotos: Photo[];
  galleryPhotoEdits: Record<string, Partial<Pick<Photo, "album" | "src" | "caption">>>;
  managedContent: ManagedContentItem[];
  knowledgeSources: KnowledgeSourceRecord[];
};

const passwordSchema = z.object({ password: z.string().min(1).max(256) });
const sharedStateSchema = z.object({
  offices: z.array(z.unknown()),
  plan: z.array(z.unknown()),
  planPublished: z.boolean(),
  news: z.array(z.unknown()),
  suggestions: z.array(z.unknown()),
  schoolStories: z.array(z.unknown()),
  galleryPhotos: z.array(z.unknown()),
  galleryPhotoEdits: z.record(z.string(), z.unknown()),
  managedContent: z.array(z.unknown()),
  knowledgeSources: z.array(z.unknown()),
}) as unknown as z.ZodType<SharedSiteState>;
const suggestionSchema = z.object({
  message: z.string().min(4).max(1000),
  stage: z.string().max(40),
});
const updateSuggestionSchema = z.object({ id: z.string().min(1).max(100), reply: z.string().max(2000) });
const removeSuggestionSchema = z.object({ id: z.string().min(1).max(100) });

export const getSharedSiteState = createServerFn({ method: "GET" }).handler(async () => {
  const server = await import("./shared-state.server");
  return server.readSharedState();
});

export const loginSharedAdmin = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => passwordSchema.parse(data))
  .handler(async ({ data }) => {
    const server = await import("./shared-state.server");
    if (!server.isAdminPasswordConfigured()) return { ok: false, reason: "not-configured" as const };
    const result = await server.signInAdmin(data.password);
    return result.ok ? { ok: true as const } : { ok: false as const, reason: "invalid" as const };
  });

export const logoutSharedAdmin = createServerFn({ method: "POST" }).handler(async () => {
  const server = await import("./shared-state.server");
  server.signOutAdmin();
  return { ok: true };
});

export const saveSharedSiteState = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => sharedStateSchema.parse(data))
  .handler(async ({ data }) => {
    const server = await import("./shared-state.server");
    await server.writeSharedState(data);
    return { ok: true, savedAt: new Date().toISOString() };
  });

export const submitSharedSiteSuggestion = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => suggestionSchema.parse(data))
  .handler(async ({ data }) => {
    const server = await import("./shared-state.server");
    await server.submitSharedSuggestion(data.message, data.stage);
    return { ok: true };
  });

export const updateSharedSiteSuggestion = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => updateSuggestionSchema.parse(data))
  .handler(async ({ data }) => {
    const server = await import("./shared-state.server");
    await server.updateSharedSuggestion(data.id, data.reply);
    return { ok: true };
  });

export const removeSharedSiteSuggestion = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => removeSuggestionSchema.parse(data))
  .handler(async ({ data }) => {
    const server = await import("./shared-state.server");
    await server.removeSharedSuggestion(data.id);
    return { ok: true };
  });
