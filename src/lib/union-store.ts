import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  seedNews,
  seedOffices,
  seedPlan,
  type NewsItem,
  type Office,
  type Photo,
  type PlanItem,
  type RoleId,
  type SchoolStory,
  type StageId,
  type Suggestion,
} from "./union-data";

export type ManagedContentType =
  | "news"
  | "announcement"
  | "competition"
  | "event"
  | "talent"
  | "initiative"
  | "school"
  | "achievement";

export type ManagedContentItem = {
  id: string;
  type: ManagedContentType;
  title: string;
  summary: string;
  content: string;
  sourceTitle: string;
  sourceUrl: string;
  startDate: string;
  endDate: string;
  image: string;
  published: boolean;
  createdAt: string;
};

export type KnowledgeSourceRecord = {
  id: string;
  source_type: string;
  source_title: string;
  source_url: string;
  source_date: string;
  content: string;
  category: string;
  last_updated: string;
  published: boolean;
};

export type Session = {
  name: string;
  number: string;
  role: "student" | "admin";
};

type UnionState = {
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
  session: Session | null;
  login: (name: string, number: string) => string | null;
  logout: () => void;
  setLocalEditorMode: (enabled: boolean) => void;
  updateMember: (
    stage: StageId,
    role: RoleId,
    name: string,
    votes: number | null,
  ) => void;
  updateMemberPhoto: (stage: StageId, role: RoleId, photo: string | null) => void;
  togglePlan: (id: string) => void;
  setPlanPublished: (published: boolean) => void;
  updatePlanText: (id: string, text: string) => void;
  addPlanItem: (month: string, text: string) => void;
  removePlanItem: (id: string) => void;
  addNews: (title: string, body: string) => void;
  removeNews: (id: string) => void;
  addSchoolStory: (story: Omit<SchoolStory, "id">) => void;
  updateSchoolStory: (id: string, story: Omit<SchoolStory, "id">) => void;
  removeSchoolStory: (id: string) => void;
  addSuggestion: (message: string, stage: string) => string | null;
  answerSuggestion: (id: string, reply: string) => void;
  removeSuggestion: (id: string) => void;
  addGalleryPhoto: (album: Photo["album"], src: string, caption: string) => void;
  updateGalleryPhoto: (id: string, album: Photo["album"], src: string, caption: string) => void;
  removeGalleryPhoto: (id: string) => void;
  addManagedContent: (item: Omit<ManagedContentItem, "id" | "createdAt">) => void;
  updateManagedContent: (id: string, item: Omit<ManagedContentItem, "id" | "createdAt">) => void;
  removeManagedContent: (id: string) => void;
  addKnowledgeSource: (item: Omit<KnowledgeSourceRecord, "id" | "last_updated">) => void;
  updateKnowledgeSource: (id: string, item: Omit<KnowledgeSourceRecord, "id" | "last_updated">) => void;
  removeKnowledgeSource: (id: string) => void;
};

export const useUnion = create<UnionState>()(
  persist(
    (set, get) => ({
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
      session: null,
      login: (name, number) => {
        const cleanName = name.trim().replace(/\s+/g, " ");
        const cleanNumber = number.trim();
        if (!cleanName || !cleanNumber) return "اكتب الاسم والرقم.";
        const isAdmin = cleanName.toLowerCase() === "admin";
        set({
          session: {
            name: isAdmin ? "admin" : cleanName,
            number: cleanNumber,
            role: isAdmin ? "admin" : "student",
          },
        });
        return null;
      },
      logout: () => set({ session: null }),
      setLocalEditorMode: (enabled) =>
        set({
          session: enabled ? { name: "معاينة محلية", number: "", role: "admin" } : null,
        }),
      updateMember: (stage, role, name, votes) =>
        set({
          offices: get().offices.map((office) =>
            office.id !== stage
              ? office
              : {
                  ...office,
                  members: office.members.map((member) =>
                    member.role !== role
                      ? member
                      : { ...member, name: name.trim(), votes },
                  ),
                },
          ),
        }),
      updateMemberPhoto: (stage, role, photo) =>
        set({
          offices: get().offices.map((office) =>
            office.id !== stage
              ? office
              : {
                  ...office,
                  members: office.members.map((member) =>
                    member.role !== role
                      ? member
                      : { ...member, photo: photo ?? undefined },
                  ),
                },
          ),
        }),
      togglePlan: (id) =>
        set({
          plan: get().plan.map((item) =>
            item.id === id ? { ...item, done: !item.done } : item,
          ),
        }),
      setPlanPublished: (published) => set({ planPublished: published }),
      updatePlanText: (id, text) =>
        set({
          plan: get().plan.map((item) => (item.id === id ? { ...item, text } : item)),
        }),
      addPlanItem: (month, text) => {
        const clean = text.trim();
        if (!clean) return;
        set({
          plan: [...get().plan, { id: crypto.randomUUID(), month, text: clean, done: false }],
        });
      },
      removePlanItem: (id) => set({ plan: get().plan.filter((item) => item.id !== id) }),
      addNews: (title, body) =>
        set({
          news: [
            {
              id: crypto.randomUUID(),
              title: title.trim(),
              body: body.trim(),
              date: new Date().toISOString().slice(0, 10),
            },
            ...get().news,
          ],
        }),
      removeNews: (id) => set({ news: get().news.filter((item) => item.id !== id) }),
      addSchoolStory: (story) =>
        set({ schoolStories: [{ ...story, id: crypto.randomUUID() }, ...get().schoolStories] }),
      updateSchoolStory: (id, story) =>
        set({ schoolStories: get().schoolStories.map((item) => item.id === id ? { ...story, id } : item) }),
      removeSchoolStory: (id) =>
        set({ schoolStories: get().schoolStories.filter((item) => item.id !== id) }),
      addSuggestion: (message, stage) => {
        const text = message.trim();
        if (text.length < 4) return "اكتب المقترح بوضوح.";
        set({
          suggestions: [
            {
              id: crypto.randomUUID(),
              name: "مشاركة مجهولة",
              number: "",
              stage,
              message: text,
              reply: "",
              createdAt: new Date().toISOString(),
            },
            ...get().suggestions,
          ],
        });
        return null;
      },
      answerSuggestion: (id, reply) =>
        set({
          suggestions: get().suggestions.map((item) =>
            item.id === id ? { ...item, reply: reply.trim() } : item,
          ),
        }),
      removeSuggestion: (id) =>
        set({ suggestions: get().suggestions.filter((item) => item.id !== id) }),
      addGalleryPhoto: (album, src, caption) =>
        set({
          galleryPhotos: [
            { id: crypto.randomUUID(), album, src, caption: caption.trim() },
            ...get().galleryPhotos,
          ],
        }),
      updateGalleryPhoto: (id, album, src, caption) =>
        set({
          galleryPhotoEdits: {
            ...get().galleryPhotoEdits,
            [id]: { album, src, caption: caption.trim() },
          },
        }),
      removeGalleryPhoto: (id) =>
        set({
          galleryPhotos: get().galleryPhotos.filter((photo) => photo.id !== id),
          galleryPhotoEdits: Object.fromEntries(
            Object.entries(get().galleryPhotoEdits).filter(([photoId]) => photoId !== id),
          ),
        }),
      addManagedContent: (item) =>
        set({
          managedContent: [
            { ...item, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
            ...get().managedContent,
          ],
        }),
      updateManagedContent: (id, item) =>
        set({
          managedContent: get().managedContent.map((current) =>
            current.id === id ? { ...item, id, createdAt: current.createdAt } : current,
          ),
        }),
      removeManagedContent: (id) =>
        set({ managedContent: get().managedContent.filter((item) => item.id !== id) }),
      addKnowledgeSource: (item) =>
        set({
          knowledgeSources: [
            { ...item, id: crypto.randomUUID(), last_updated: new Date().toISOString().slice(0, 10) },
            ...get().knowledgeSources,
          ],
        }),
      updateKnowledgeSource: (id, item) =>
        set({
          knowledgeSources: get().knowledgeSources.map((current) =>
            current.id === id
              ? { ...item, id, last_updated: new Date().toISOString().slice(0, 10) }
              : current,
          ),
        }),
      removeKnowledgeSource: (id) =>
        set({ knowledgeSources: get().knowledgeSources.filter((item) => item.id !== id) }),
    }),
    {
      name: "student-union-2027",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => ({
        offices: state.offices,
        plan: state.plan,
        planPublished: state.planPublished,
        news: state.news,
        suggestions: state.suggestions,
        schoolStories: state.schoolStories,
        galleryPhotos: state.galleryPhotos,
        galleryPhotoEdits: state.galleryPhotoEdits,
        managedContent: state.managedContent,
        knowledgeSources: state.knowledgeSources,
      }),
    },
  ),
);
