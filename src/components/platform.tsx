import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowUp,
  ArrowLeft,
  Camera,
  CalendarDays,
  Check,
  Copy,
  Building2,
  Images,
  Lightbulb,
  MessageCircle,
  LogOut,
  Menu,
  Newspaper,
  Pencil,
  Sparkles,
  Shield,
  Search,
  Save,
  Trash2,
  Trophy,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import {
  albumLabel,
  campaignAxes,
  goals,
  months,
  roleTitle,
  roles,
  seedGalleryPhotos,
  type Album,
  type CampaignAxis,
  type Member,
  type RoleId,
  type SchoolStory,
  type StageId,
} from "@/lib/union-data";
import { useUnion } from "@/lib/union-store";
import { PortalSurface, QuickAccess, OfficialDocumentStrip, type PortalView } from "@/components/portal-sections";
import { officialDocuments } from "@/lib/knowledge";

type View = "home" | "offices" | "plan" | "ideas" | "impact" | "gallery" | "news" | "box" | PortalView;

const nav: { id: View; label: string }[] = [
  { id: "home", label: "الرئيسية" },
  { id: "about", label: "عن الاتحاد" },
  { id: "faq", label: "دليل الطالب" },
  { id: "hub", label: "اتحاد 360°" },
  { id: "offices", label: "المكاتب" },
  { id: "news", label: "الأخبار" },
  { id: "events", label: "الفعاليات" },
  { id: "competitions", label: "المسابقات" },
  { id: "plan", label: "الخطة" },
  { id: "laws", label: "اللوائح" },
  { id: "gallery", label: "المعرض" },
  { id: "box", label: "صوت الطالب" },
];

export function Platform() {
  const [view, setView] = useState<View>("home");
  const [stage, setStage] = useState<StageId>("primary");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const showPlan = true;
  const labels: Partial<Record<View, string>> = { about: "عن الاتحاد", faq: "دليل الطالب", hub: "اتحاد الطلاب 360°", events: "الفعاليات", competitions: "المسابقات", talents: "مواهب الطلاب", initiatives: "المبادرات", schools: "مدارسنا", achievements: "الإنجازات", laws: "القوانين واللوائح", discipline: "لائحة الانضباط", ask: "اسأل الاتحاد", desk: "إدارة المحتوى", ideas: "مساعد الأفكار", impact: "أثر المدارس", box: "صوت الطالب" };
  const currentView = nav.find((item) => item.id === view)?.label ?? labels[view] ?? "الاتحاد";

  function navigate(nextView: View) {
    setView(nextView);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    let active = true;
    void Promise.resolve(useUnion.persist.rehydrate()).finally(() => {
      if (active) setHydrated(true);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === "Escape") {
        setSearchOpen(false);
        setMobileMenuOpen(false);
      }
    }
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  if (!hydrated) return <main className="grid min-h-screen place-items-center bg-paper text-sm font-bold text-muted">جارٍ تجهيز المنصة…</main>;

  return (
    <div className="min-h-screen">
      <div className="pharaoh-stripe h-1.5" aria-hidden />
      <header className="sticky top-0 z-20 border-b border-line bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <button
            type="button"
            onClick={() => navigate("home")}
            className="flex min-h-11 min-w-0 flex-1 items-center gap-2 text-right sm:gap-3 md:flex-none"
            aria-label="العودة إلى الرئيسية"
          >
            <img
              src="/gallery/union-logo.jpeg"
              alt="شعار اتحاد طلاب مدارس مصر"
              className="h-10 w-10 shrink-0 rounded-full border border-gold bg-white object-contain p-0.5 sm:h-11 sm:w-11"
            />
            <span className="min-w-0">
              <span className="block truncate text-xs font-extrabold leading-tight sm:text-base">
                اتحاد طلاب إدارة مصر القديمة التعليمية
              </span>
              <span className="hidden text-xs font-semibold text-gold sm:block">
                صوتنا · إبداعنا · إنجازنا
              </span>
            </span>
          </button>
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-3 text-sm font-bold text-ink-soft transition hover:border-gold"
            aria-label="البحث في الموقع"
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">بحث</span>
            <kbd className="hidden rounded border border-line px-1 text-[10px] text-muted lg:inline">Ctrl K</kbd>
          </button>
          <div className="ms-auto flex items-center gap-2">
            <button type="button" onClick={() => navigate("desk")} className="hidden min-h-11 items-center gap-2 rounded-full bg-navy px-4 text-xs font-extrabold text-white sm:inline-flex"><Shield className="h-4 w-4" /> إدارة المحتوى</button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line md:hidden"
              aria-label={mobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <nav aria-label="القائمة الرئيسية" className="mx-auto hidden max-w-6xl gap-2 overflow-x-auto px-4 pb-3 md:flex">
          {nav.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => navigate(item.id)}
              className={`min-h-11 shrink-0 rounded-full px-4 text-sm font-bold ${
                view === item.id
                  ? "bg-green text-paper"
                  : "bg-paper text-ink-soft"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        {mobileMenuOpen ? (
          <nav id="mobile-navigation" aria-label="القائمة الرئيسية للهاتف" className="grid gap-1 border-t border-line bg-card px-4 py-3 md:hidden">
            {nav.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(item.id)}
                  className={`min-h-12 rounded-xl px-4 text-right text-sm font-bold ${view === item.id ? "bg-green text-paper" : "text-ink hover:bg-paper"}`}
                >
                  {item.label}
                </button>
              ))}
            <button type="button" onClick={() => navigate("desk")} className="min-h-12 rounded-xl bg-navy px-4 text-right text-sm font-bold text-white">معاينة إدارة المحتوى</button>
          </nav>
        ) : null}
      </header>
      <main key={view} className="page-transition mx-auto max-w-6xl px-4 py-6">
        {view !== "home" ? (
          <nav aria-label="مسار الصفحة" className="mb-4 flex items-center gap-2 text-xs font-bold text-muted">
            <button type="button" onClick={() => navigate("home")} className="rounded px-1 py-1 hover:text-green">الرئيسية</button>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-ink">{currentView}</span>
          </nav>
        ) : null}
        {view === "home" ? (
        <Home
            onOpen={navigate}
            onOpenStage={(id) => {
              setStage(id);
              navigate("offices");
            }}
          />
        ) : null}
        {view === "offices" ? <Offices stage={stage} onStage={setStage} /> : null}
        {view === "plan" ? <Plan /> : null}
        {view === "ideas" ? <Ideas /> : null}
        {view === "impact" ? <SchoolImpact /> : null}
        {view === "gallery" ? <Gallery /> : null}
        {view === "news" ? <News /> : null}
        {view === "box" ? <Box /> : null}
        {view === "about" || view === "faq" || view === "hub" || view === "events" || view === "competitions" || view === "talents" || view === "initiatives" || view === "schools" || view === "achievements" || view === "laws" || view === "discipline" || view === "ask" || view === "desk" ? <PortalSurface view={view} onOpen={(target) => navigate(target as View)} /> : null}
      </main>
      <SiteFooter onOpen={navigate} />
      <ScrollChrome />
      {searchOpen ? (
        <SearchOverlay
          onClose={() => setSearchOpen(false)}
          showPlan={showPlan}
          onSelect={(hit) => {
            if (hit.stage) setStage(hit.stage);
            navigate(hit.view);
            setSearchOpen(false);
          }}
        />
      ) : null}
    </div>
  );
}

type SearchHit = { id: string; title: string; detail: string; category: string; view: View; stage?: StageId };

function SearchOverlay({
  onClose,
  onSelect,
  showPlan,
}: {
  onClose: () => void;
  onSelect: (hit: SearchHit) => void;
  showPlan: boolean;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const offices = useUnion((state) => state.offices);
  const plan = useUnion((state) => state.plan);
  const news = useUnion((state) => state.news);
  const schoolStories = useUnion((state) => state.schoolStories);
  const managedContent = useUnion((state) => state.managedContent);
  const savedPhotos = useUnion((state) => state.galleryPhotos);
  const photos = [...seedGalleryPhotos, ...savedPhotos];
  const needle = query.trim().toLocaleLowerCase("ar");
  const hits: SearchHit[] = [
    ...offices.flatMap((office) => office.members
      .filter((member) => member.name && `${member.name} ${roleTitle(member.role)} ${office.label}`.toLocaleLowerCase("ar").includes(needle))
      .map((member) => ({ id: `office-${office.id}-${member.role}`, title: member.name, detail: `${roleTitle(member.role)} · ${office.label}`, category: "المكاتب", view: "offices" as View, stage: office.id }))),
    ...news.filter((item) => `${item.title} ${item.body} ${item.date}`.toLocaleLowerCase("ar").includes(needle))
      .map((item) => ({ id: `news-${item.id}`, title: item.title, detail: item.date, category: "الأخبار", view: "news" as View })),
    ...schoolStories.filter((item) => `${item.schoolName} ${item.title} ${item.summary} ${item.impact}`.toLocaleLowerCase("ar").includes(needle))
      .map((item) => ({ id: `story-${item.id}`, title: item.title, detail: `${item.schoolName} · ${item.stage === "primary" ? "ابتدائي" : item.stage === "prep" ? "إعدادي" : "ثانوي"}`, category: "أثر المدارس", view: "impact" as View })),
    ...(showPlan ? plan.filter((item) => `${item.text} ${item.month}`.toLocaleLowerCase("ar").includes(needle))
      .map((item) => ({ id: `plan-${item.id}`, title: item.text, detail: item.month, category: "الخطة", view: "plan" as View })) : []),
    ...campaignAxes.filter((axis) => `${axis.title} ${axis.meaning} ${axis.ideaTitle}`.toLocaleLowerCase("ar").includes(needle))
      .map((axis) => ({ id: `axis-${axis.id}`, title: axis.title, detail: axis.meaning, category: "محاور العام", view: "home" as View })),
    ...photos.filter((photo) => `${photo.caption} ${albumLabel[photo.album]}`.toLocaleLowerCase("ar").includes(needle))
      .map((photo) => ({ id: `photo-${photo.id}`, title: photo.caption, detail: albumLabel[photo.album], category: "المعرض", view: "gallery" as View })),
    ...managedContent.filter((item) => item.published && `${item.title} ${item.summary} ${item.content} ${item.sourceTitle}`.toLocaleLowerCase("ar").includes(needle))
      .map((item) => ({ id: `managed-${item.id}`, title: item.title, detail: item.sourceTitle || item.startDate || "محتوى منشور", category: "محتوى الاتحاد", view: item.type === "event" ? "events" as View : item.type === "competition" ? "competitions" as View : item.type === "school" ? "schools" as View : item.type === "initiative" ? "initiatives" as View : item.type === "talent" ? "talents" as View : item.type === "achievement" ? "achievements" as View : "news" as View })),
    ...officialDocuments.filter((doc) => `${doc.title} ${doc.category} ${doc.sourceDate ?? ""}`.toLocaleLowerCase("ar").includes(needle))
      .map((doc) => ({ id: `document-${doc.id}`, title: doc.title, detail: `${doc.category} · ${doc.sourceDate ?? ""}`, category: "مستند رسمي", view: doc.id === "discipline-150" ? "discipline" as View : "laws" as View })),
  ].slice(0, 24);

  useEffect(() => {
    inputRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 grid items-start justify-items-center bg-ink/60 p-3 pt-[8vh] backdrop-blur-sm sm:p-6 sm:pt-[12vh]" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section role="dialog" aria-modal="true" aria-labelledby="site-search-title" className="max-h-[78vh] w-full max-w-2xl overflow-hidden rounded-2xl border border-gold/50 bg-card shadow-xl">
        <div className="flex items-center gap-3 border-b border-line p-4">
          <Search aria-hidden="true" className="h-5 w-5 shrink-0 text-green" />
          <label id="site-search-title" className="sr-only">البحث في محتوى الموقع</label>
          <input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث عن خبر أو فعالية أو مدرسة أو لائحة…" className="min-h-11 min-w-0 flex-1 bg-transparent text-sm outline-none" />
          <button type="button" onClick={onClose} className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-paper" aria-label="إغلاق البحث"><X className="h-4 w-4" /></button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-3" aria-live="polite">
          {!needle ? (
            <p className="p-4 text-sm text-muted">اكتب كلمة للبحث في الأخبار والفعاليات والمكاتب واللوائح والخطة والمعرض.</p>
          ) : hits.length ? (
            <div className="grid gap-2">
              {hits.map((hit) => (
                <button key={hit.id} type="button" onClick={() => onSelect(hit)} className="rounded-xl border border-transparent bg-paper p-3 text-right transition hover:border-gold focus-visible:border-green">
                  <span className="flex items-center justify-between gap-2"><span className="font-extrabold">{hit.title}</span><span className="rounded-full bg-card px-2 py-1 text-[10px] font-bold text-green">{hit.category}</span></span>
                  <span className="mt-1 block text-xs text-muted">{hit.detail}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center"><p className="font-extrabold">ملقيناش نتائج مطابقة</p><p className="mt-1 text-sm text-muted">جرّب كلمة أقصر أو مختلفة.</p></div>
          )}
        </div>
        <p className="border-t border-line px-4 py-2 text-[10px] text-muted">النتائج من المحتوى المسجل على هذه المنصة فقط.</p>
      </section>
    </div>
  );
}

function SiteFooter({ onOpen }: { onOpen: (view: View) => void }) {
  const serviceLinks: { view: View; label: string }[] = [
    { view: "about", label: "عن الاتحاد" },
    { view: "faq", label: "دليل الطالب والأسئلة الشائعة" },
    { view: "hub", label: "اتحاد الطلاب 360°" },
    { view: "offices", label: "المكاتب الطلابية" },
    { view: "events", label: "الفعاليات" },
    { view: "competitions", label: "المسابقات" },
    { view: "talents", label: "مواهب الطلاب" },
    { view: "schools", label: "مدارسنا" },
    { view: "ideas", label: "مساعد الأفكار" },
    { view: "impact", label: "أثر المدارس" },
    { view: "gallery", label: "معرض الأنشطة" },
    { view: "news", label: "أخبار الاتحاد" },
    { view: "box", label: "صندوق الاتحاد" },
    { view: "laws", label: "القوانين واللوائح" },
    { view: "discipline", label: "لائحة الانضباط" },
    { view: "ask", label: "اسأل الاتحاد" },
  ];
  return (
    <footer className="site-footer border-t border-line px-4 py-8 sm:py-10">
      <div className="mx-auto grid max-w-6xl gap-7 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="lotus-divider mb-3"><span>𓂀</span></div>
          <p className="text-sm font-extrabold">اتحاد طلاب إدارة مصر القديمة التعليمية</p>
          <p className="mt-2 max-w-md text-xs leading-6 text-muted">منصة اتحاد الطلاب للعام الدراسي ٢٠٢٦ / ٢٠٢٧، تجمع بين الاعتزاز بالهوية المصرية والانفتاح الواعي على العالم.</p>
        </div>
        <div>
          <h2 className="text-sm font-extrabold">روابط سريعة</h2>
          <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1">
            {serviceLinks.map((link) => <button key={link.view} type="button" onClick={() => onOpen(link.view)} className="min-h-9 text-right text-xs font-semibold text-muted hover:text-green">{link.label}</button>)}
          </div>
        </div>
        <div>
          <h2 className="text-sm font-extrabold">محاور العام</h2>
          <p className="mt-2 text-xs leading-6 text-muted">الهوية الوطنية، القيادة، الوعي الرقمي، الوعي العالمي، قيم المواطنة، المشاركة المجتمعية، الإبداع والابتكار، وتبادل الخبرات.</p>
          <p className="mt-3 text-[10px] text-muted">واجهة الطلاب تعرض البيانات المتاحة على المنصة. لا تتضمن إحصاءات مدارس أو طلاب غير مسجلة.</p>
        </div>
        <div>
          <h2 className="text-sm font-extrabold">مصدر رسمي</h2>
          <a href="https://www.facebook.com/share/g/19inhzpktF/" target="_blank" rel="noreferrer" className="mt-2 inline-flex min-h-10 items-center gap-2 text-xs font-bold text-teal hover:underline">مجموعة الإدارة على Facebook <ArrowLeft className="h-3.5 w-3.5" /></a>
        </div>
      </div>
      <div className="mx-auto mt-7 max-w-6xl border-t border-line pt-4 text-center text-[10px] text-muted">طالب عالمي متجذر — جذور في أرض الفراعنة، وأفق مفتوح على العالم · ٢٠٢٦ / ٢٠٢٧</div>
    </footer>
  );
}

function ScrollChrome() {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0);
      setShowTop(window.scrollY > 420);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  return <><div className="scroll-progress" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>{showTop ? <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-4 left-4 z-30 grid h-12 w-12 place-items-center rounded-full border border-gold bg-ink text-paper shadow-md" aria-label="العودة إلى أعلى الصفحة"><ArrowUp className="h-5 w-5" /></button> : null}</>;
}

function EntrySplash() {
  return (
    <main className="entry-screen" aria-label="مقدمة الموقع">
      <div className="entry-ornament entry-ornament-one" aria-hidden="true">𓂀</div>
      <div className="entry-ornament entry-ornament-two" aria-hidden="true">𓋹</div>
      <div className="entry-frame">
        <div className="entry-emblem" aria-hidden="true">
          <span className="entry-ankh">𓋹</span>
          <img src="/gallery/union-logo.jpeg" alt="" />
        </div>
        <div className="entry-copy">
          <p className="entry-kicker">إدارة مصر القديمة التعليمية</p>
          <h1>اتحادات طلاب المدارس</h1>
          <p>طالب عالمي متجذر · خطة ٢٠٢٦ / ٢٠٢٧</p>
        </div>
        <div className="entry-progress" aria-hidden="true"><span /></div>
        <p className="entry-wait">جذور في أرض الفراعنة، وأفق مفتوح على العالم</p>
      </div>
    </main>
  );
}

function EntryLogin({ onSuccess }: { onSuccess: () => void }) {
  const login = useUnion((state) => state.login);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");

  return (
    <main className="entry-screen entry-login-screen">
      <div className="entry-ornament entry-ornament-one" aria-hidden="true">𓂀</div>
      <div className="entry-ornament entry-ornament-two" aria-hidden="true">𓋹</div>
      <section className="entry-login-card">
        <div className="entry-login-brand">
          <img src="/gallery/union-logo.jpeg" alt="شعار اتحاد طلاب مدارس مصر" />
          <div>
            <p className="entry-kicker">إدارة مصر القديمة التعليمية</p>
            <h1>أهلًا بيك في اتحاد الطلاب</h1>
            <p>سجّل دخولك عشان تتابع أنشطة اتحاد مدرستك.</p>
          </div>
        </div>
        <form
          className="entry-form"
          onSubmit={(event) => {
            event.preventDefault();
            const result = login(name, number);
            setError(result ?? "");
            if (!result) onSuccess();
          }}
        >
          <label className="grid gap-1 text-sm font-bold">
            الاسم
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              autoFocus
              placeholder="اكتب اسمك"
              className="min-h-12 rounded-xl border border-line bg-paper px-3"
            />
          </label>
          <label className="grid gap-1 text-sm font-bold">
            الرقم
            <input
              value={number}
              onChange={(event) => setNumber(event.target.value)}
              inputMode="numeric"
              placeholder="اكتب رقمك"
              className="min-h-12 rounded-xl border border-line bg-paper px-3"
            />
          </label>
          {error ? <p className="text-sm font-bold text-red">{error}</p> : null}
          <button type="submit" className="entry-submit">
            دخول الموقع <span aria-hidden="true">←</span>
          </button>
          <p className="text-center text-xs text-muted">دخول الإدارة متاح بكتابة admin في خانة الاسم.</p>
        </form>
      </section>
    </main>
  );
}

function Home({ onOpen, onOpenStage }: { onOpen: (view: View) => void; onOpenStage: (stage: StageId) => void }) {
  const offices = useUnion((state) => state.offices);
  const news = useUnion((state) => state.news);
  const managed = useUnion((state) => state.managedContent);
  const memberCount = offices.reduce((count, office) => count + office.members.filter((member) => member.name.trim()).length, 0);
  const published = managed.filter((item) => item.published);
  const activeNews = [
    ...news.map((item) => ({ id: item.id, title: item.title, summary: item.body, date: item.date, image: item.image })),
    ...published.filter((item) => item.type === "news" || item.type === "announcement").map((item) => ({ id: item.id, title: item.title, summary: item.summary || item.content, date: item.startDate || item.createdAt.slice(0, 10), image: item.image })),
  ].sort((a, b) => b.date.localeCompare(a.date));
  const nextEvent = published.filter((item) => item.type === "event" && item.startDate).sort((a, b) => a.startDate.localeCompare(b.startDate))[0];
  const nextCompetition = published.filter((item) => item.type === "competition").sort((a, b) => (a.startDate || "").localeCompare(b.startDate || ""))[0];

  return (
    <div className="grid gap-7">
      <section className="portal-hero">
        <div className="portal-hero-copy">
          <p className="portal-kicker">منصة اتحاد الطلاب 360° · إدارة مصر القديمة التعليمية</p>
          <h1>اتحاد طلاب إدارة مصر القديمة التعليمية</h1>
          <p className="portal-tagline">صوتنا <span>•</span> إبداعنا <span>•</span> إنجازنا</p>
          <p className="mt-3 max-w-xl text-sm leading-7 text-white/80 sm:text-base">مساحة طلابية رسمية تجمع أخبار الاتحاد وأنشطته ومواهبه ولوائحه، وتتيح للطلاب المشاركة بأفكارهم.</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <button type="button" onClick={() => onOpen("hub")} className="portal-hero-primary">اكتشف أنشطة الاتحاد <ArrowUp className="h-4 w-4 rotate-45" /></button>
            <button type="button" onClick={() => onOpen("box")} className="portal-hero-secondary">شارك في صوت الطالب <MessageCircle className="h-4 w-4" /></button>
          </div>
        </div>
        <figure className="portal-hero-image"><img src="/gallery/conference-group.jpeg" alt="طلاب يشاركون في فعالية للاتحاد الطلابي" fetchPriority="high" decoding="async" /><figcaption>من أنشطة الاتحاد الموثقة بالصور</figcaption></figure>
        <span className="portal-hero-seal" aria-hidden="true"><img src="/gallery/union-logo.jpeg" alt="" /></span>
      </section>

      <section aria-labelledby="quick-access-title">
        <div className="section-heading"><div><p className="text-xs font-extrabold text-teal">ابدأ من هنا</p><h2 id="quick-access-title" className="mt-1 text-xl font-black">وصول سريع</h2></div><span className="text-xs text-muted">خدمات الاتحاد ومصادره</span></div>
        <div className="mt-3"><QuickAccess onOpen={(target) => onOpen(target as View)} /></div>
      </section>

      <section aria-labelledby="union-now-title">
        <div className="section-heading"><div><p className="text-xs font-extrabold text-teal">تحديثات من محتوى المنصة</p><h2 id="union-now-title" className="mt-1 text-xl font-black">الاتحاد الآن</h2></div><button type="button" onClick={() => onOpen("news")} className="min-h-10 rounded-full px-3 text-xs font-extrabold text-teal hover:bg-white">كل الأخبار <ArrowLeft className="ms-1 inline h-3.5 w-3.5" /></button></div>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <article className="portal-now-card md:col-span-1">
            <span className="portal-now-icon"><Newspaper /></span><p className="portal-label">آخر خبر</p>
            {activeNews[0] ? <><h3 className="mt-2 font-extrabold">{activeNews[0].title}</h3><p className="mt-2 line-clamp-3 text-sm leading-6 text-muted">{activeNews[0].summary}</p><time className="mt-3 block text-[11px] text-muted" dateTime={activeNews[0].date}>{activeNews[0].date}</time></> : <p className="mt-2 text-sm text-muted">لا توجد أخبار منشورة.</p>}
          </article>
          <article className="portal-now-card">
            <span className="portal-now-icon teal"><CalendarDays /></span><p className="portal-label">أقرب فعالية</p>
            {nextEvent ? <><h3 className="mt-2 font-extrabold">{nextEvent.title}</h3><p className="mt-2 text-sm text-muted">{nextEvent.startDate}</p></> : <p className="mt-2 text-sm leading-6 text-muted">لا يوجد موعد فعالية معلن وموثق حاليًا.</p>}
          </article>
          <article className="portal-now-card">
            <span className="portal-now-icon gold"><Trophy /></span><p className="portal-label">آخر مسابقة</p>
            {nextCompetition ? <><h3 className="mt-2 font-extrabold">{nextCompetition.title}</h3><p className="mt-2 text-sm text-muted">{nextCompetition.summary}</p></> : <p className="mt-2 text-sm leading-6 text-muted">المسابقات ستظهر بعد إضافة إعلان رسمي.</p>}
          </article>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <article className="portal-panel">
          <p className="text-xs font-extrabold text-teal">محتوى قائم على بيانات مرفقة</p>
          <h2 className="mt-1 text-xl font-black">الاتحاد الطلابي في المدرسة</h2>
          <p className="mt-2 text-sm leading-7 text-muted">استكشف المكاتب التنفيذية للمراحل الثلاث، والخطة الطلابية، والمواد الرسمية المتاحة.</p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {offices.map((office) => <button key={office.id} type="button" onClick={() => onOpenStage(office.id)} className="rounded-xl border border-line bg-paper p-3 text-right"><span className="block text-[10px] font-bold text-teal">مكتب تنفيذي</span><span className="mt-1 block text-sm font-extrabold">{office.label}</span></button>)}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <StatCard value={offices.length} label="مراحل مسجلة" />
            <StatCard value={memberCount} label="أسماء في تشكيلات الموقع" />
            <StatCard value={campaignAxes.length} label="محاور الخطة" />
          </div>
          <p className="mt-3 text-[10px] leading-5 text-muted">الأرقام تصف البيانات الموجودة على المنصة فقط، ولا تمثل إحصاءات عامة للإدارة.</p>
        </article>
        <article className="portal-panel">
          <div className="section-heading"><div><p className="text-xs font-extrabold text-teal">العام الدراسي 2026 / 2027</p><h2 className="mt-1 text-xl font-black">طالب عالمي متجذر</h2></div><a href="/documents/unions-plan-2026-2027.pdf" target="_blank" rel="noreferrer" className="min-h-10 rounded-full bg-blue-soft px-3 text-xs font-extrabold text-navy">ملف الخطة <ArrowLeft className="ms-1 inline h-3.5 w-3.5" /></a></div>
          <p className="mt-2 text-sm leading-6 text-muted">محاور الخطة توازن بين الاعتزاز بالهوية المصرية وتنمية مهارات الطالب وانفتاحه على العالم.</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {campaignAxes.map((axis) => <div key={axis.id} className="flex items-start gap-2 rounded-xl bg-paper p-3"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-sm text-teal" aria-hidden="true">{axis.symbol}</span><div><h3 className="text-xs font-extrabold">{axis.title}</h3><p className="mt-1 text-[11px] leading-5 text-muted">{axis.meaning}</p></div></div>)}
          </div>
        </article>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        <OfficialDocumentStrip onOpen={(target) => onOpen(target as View)} />
        <a href="https://www.facebook.com/share/g/19inhzpktF/" target="_blank" rel="noreferrer" className="flex min-h-12 items-center justify-between gap-3 rounded-xl border border-line bg-white px-4"><span className="text-sm font-extrabold">المصدر الرسمي على Facebook</span><ExternalLinkIcon /></a>
      </section>
    </div>
  );
}

function ExternalLinkIcon() { return <ArrowLeft className="h-4 w-4 text-teal" aria-hidden="true" />; }

function StatCard({ value, label }: { value: number; label: string }) {
  return <article className="metric-card rounded-xl border border-line bg-paper p-3 sm:p-4"><strong className="block text-2xl font-black text-green sm:text-3xl">{value.toLocaleString("ar-EG")}</strong><span className="mt-1 block text-[11px] font-bold leading-5 text-ink-soft">{label}</span></article>;
}


function Offices({
  stage,
  onStage,
}: {
  stage: StageId;
  onStage: (stage: StageId) => void;
}) {
  const offices = useUnion((state) => state.offices);
  const session = useUnion((state) => state.session);
  const office = offices.find((item) => item.id === stage) ?? offices[0];
  const isAdmin = session?.role === "admin";
  const [speaking, setSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const top = Math.max(...office.members.map((member) => member.votes ?? 0), 1);

  useEffect(() => {
    setSpeechSupported("speechSynthesis" in window);
    return () => {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, [stage]);

  function toggleSpeech() {
    if (!speechSupported) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const roster = office.members
      .map((member) => {
        const result = `${roleTitle(member.role)}: ${member.name || "لم يُسجّل بعد"}`;
        return member.votes == null ? result : `${result}، ${member.votes} صوت`;
      })
      .join(". ");
    const utterance = new SpeechSynthesisUtterance(`مكتب ${office.label}. ${roster}`);
    utterance.lang = "ar-EG";
    utterance.rate = 0.9;
    const voices = window.speechSynthesis.getVoices();
    const arabicVoice =
      voices.find((voice) => voice.lang.toLowerCase().startsWith("ar-eg")) ??
      voices.find((voice) => voice.lang.toLowerCase().startsWith("ar"));
    if (arabicVoice) utterance.voice = arabicVoice;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  }

  function selectStage(nextStage: StageId) {
    if (speechSupported) window.speechSynthesis.cancel();
    setSpeaking(false);
    onStage(nextStage);
  }

  return (
    <section className="grid gap-4">
      <div>
        <h1 className="text-2xl font-extrabold">المكاتب التنفيذية</h1>
        <p className="mt-1 text-sm text-muted">
          الترتيب من اليمين للشمال: الأمين، الأمين المساعد، ثم اللجان الثقافية
          والرياضية والاجتماعية والفنية والعلمية.
        </p>
        {stage !== "secondary" ? (
          <p className="mt-1 text-xs text-muted">يمكن للإدارة إضافة صورة مستقلة لكل عضو.</p>
        ) : null}
        <button
          type="button"
          onClick={toggleSpeech}
          disabled={!speechSupported}
          aria-pressed={speaking}
          className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full bg-green px-4 text-sm font-bold text-paper disabled:cursor-not-allowed disabled:opacity-50"
        >
          {speaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          {speaking ? "إيقاف القراءة الصوتية" : "استمع لترتيب الأسماء"}
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {offices.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => selectStage(item.id)}
            className={`min-h-11 rounded-full px-4 text-sm font-bold ${
              stage === item.id ? "bg-ink text-paper" : "bg-card text-ink"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <p className="rounded-2xl border border-line bg-card px-4 py-3 text-sm">{office.note}</p>
      <div dir="rtl" className="flex gap-2 overflow-x-auto pb-1">
        {roles.map((role, index) => (
          <span
            key={role.id}
            className="shrink-0 rounded-full bg-paper px-3 py-1 text-xs font-bold text-ink-soft"
          >
            {index + 1}. {role.title.replace("اللجنة ", "")}
          </span>
        ))}
      </div>
      <div dir="rtl" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {office.members.map((member) => (
          <MemberCard
            key={member.role}
            stage={office.id}
            member={member}
            top={top}
            isAdmin={isAdmin}
          />
        ))}
      </div>
    </section>
  );
}

function MemberCard({
  stage,
  member,
  top,
  isAdmin,
}: {
  stage: StageId;
  member: Member;
  top: number;
  isAdmin: boolean;
}) {
  const updateMember = useUnion((state) => state.updateMember);
  const updateMemberPhoto = useUnion((state) => state.updateMemberPhoto);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(member.name);
  const [votes, setVotes] = useState(member.votes == null ? "" : String(member.votes));
  const [error, setError] = useState("");
  const [photoError, setPhotoError] = useState("");

  useEffect(() => {
    setName(member.name);
    setVotes(member.votes == null ? "" : String(member.votes));
  }, [member.name, member.votes]);

  const width = member.votes == null ? 0 : Math.round((member.votes / top) * 100);

  function save() {
    const trimmed = votes.trim();
    if (trimmed !== "" && !/^\d+$/.test(trimmed)) {
      setError("عدد الأصوات يبقى رقم.");
      return;
    }
    updateMember(stage, member.role as RoleId, name, trimmed === "" ? null : Number(trimmed));
    setError("");
    setEditing(false);
  }

  return (
    <article className="flex flex-col rounded-2xl border border-line bg-card p-4">
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-sm font-extrabold text-green">{roleTitle(member.role)}</h2>
        {isAdmin ? (
          <button
            type="button"
            onClick={() => setEditing((value) => !value)}
            className="grid h-11 w-11 place-items-center rounded-full bg-paper"
            aria-label="تعديل"
          >
            <Pencil className="h-4 w-4" />
          </button>
        ) : null}
      </div>
      {stage !== "secondary" ? (
        <div className="mt-3 flex items-center gap-3 rounded-xl bg-paper p-2">
          {member.photo ? (
            <img
              src={member.photo}
              alt={`صورة ${member.name || roleTitle(member.role)}`}
              className="h-20 w-20 shrink-0 rounded-xl object-cover"
            />
          ) : (
            <div className="grid h-20 w-20 shrink-0 place-items-center rounded-xl border border-dashed border-line bg-card text-muted">
              <Camera className="h-7 w-7" aria-hidden="true" />
            </div>
          )}
          <div className="grid gap-2">
            {!member.photo ? (
              <span className="text-xs font-semibold text-muted">الصورة غير مضافة</span>
            ) : null}
            {isAdmin ? (
              <>
                <label className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-full bg-green px-3 text-xs font-bold text-paper">
                  {member.photo ? "تغيير الصورة" : "إضافة صورة العضو"}
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={async (event) => {
                      const file = event.target.files?.[0];
                      event.target.value = "";
                      if (!file) return;
                      if (!file.type.startsWith("image/") || file.size > 12 * 1024 * 1024) {
                        setPhotoError("اختاري صورة صالحة أقل من ١٢ ميجابايت.");
                        return;
                      }
                      try {
                        const photo = await compressMemberPhoto(file);
                        updateMemberPhoto(stage, member.role as RoleId, photo);
                        setPhotoError("");
                      } catch {
                        setPhotoError("تعذر تحميل الصورة. جرّبي صورة بصيغة أخرى.");
                      }
                    }}
                  />
                </label>
                {member.photo ? (
                  <button
                    type="button"
                    onClick={() => updateMemberPhoto(stage, member.role as RoleId, null)}
                    className="min-h-11 rounded-full border border-line px-3 text-xs font-bold text-ink-soft"
                  >
                    حذف الصورة
                  </button>
                ) : null}
              </>
            ) : null}
            {photoError ? (
              <p className="max-w-48 text-xs font-bold text-red">{photoError}</p>
            ) : null}
          </div>
        </div>
      ) : null}
      {editing ? (
        <div className="mt-3 grid gap-2">
          <label className="grid gap-1 text-xs font-bold text-muted">
            الاسم
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="min-h-11 rounded-xl border border-line bg-paper px-3 text-sm font-semibold text-ink"
            />
          </label>
          <label className="grid gap-1 text-xs font-bold text-muted">
            الأصوات
            <input
              inputMode="numeric"
              value={votes}
              onChange={(event) => setVotes(event.target.value)}
              className="min-h-11 rounded-xl border border-line bg-paper px-3 text-sm font-semibold text-ink"
            />
          </label>
          {error ? <p className="text-xs font-bold text-red">{error}</p> : null}
          <button
            type="button"
            onClick={save}
            className="min-h-11 rounded-full bg-green text-sm font-bold text-paper"
          >
            حفظ
          </button>
        </div>
      ) : (
        <>
          <p className="mt-3 text-lg font-extrabold leading-snug">
            {member.name || "لم يُسجّل بعد"}
          </p>
          <p className="mt-2 text-sm font-bold text-gold">
            {member.votes == null ? "من غير أصوات" : `${member.votes} صوت`}
          </p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-paper">
            <div className="h-full bg-green" style={{ width: `${width}%` }} />
          </div>
        </>
      )}
    </article>
  );
}

function compressMemberPhoto(file: File, maxDimension = 720, quality = 0.8) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("تعذر قراءة الصورة"));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("الصورة غير صالحة"));
      image.onload = () => {
        const scale = Math.min(1, maxDimension / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const context = canvas.getContext("2d");
        if (!context) {
          reject(new Error("تعذر معالجة الصورة"));
          return;
        }
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      image.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

function Plan() {
  const plan = useUnion((state) => state.plan);
  const planPublished = useUnion((state) => state.planPublished);
  const session = useUnion((state) => state.session);
  const togglePlan = useUnion((state) => state.togglePlan);
  const setPlanPublished = useUnion((state) => state.setPlanPublished);
  const updatePlanText = useUnion((state) => state.updatePlanText);
  const addPlanItem = useUnion((state) => state.addPlanItem);
  const removePlanItem = useUnion((state) => state.removePlanItem);
  const isAdmin = session?.role === "admin";
  const [month, setMonth] = useState(months[0]);
  const [text, setText] = useState("");
  const done = plan.filter((item) => item.done).length;

  if (!isAdmin && !planPublished) return null;

  return (
    <section className="grid gap-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-extrabold">
            <CalendarDays className="h-6 w-6 text-green" />
            خطة العام
          </h1>
          <p className="mt-1 text-sm text-muted">
            من أكتوبر لحد أنشطة الصيف. اتنفّذ {done} من {plan.length}.
          </p>
        </div>
        {isAdmin ? (
          <button
            type="button"
            onClick={() => setPlanPublished(!planPublished)}
            className={`min-h-11 rounded-full px-4 text-sm font-bold ${
              planPublished ? "bg-green text-paper" : "bg-ink text-paper"
            }`}
          >
            {planPublished ? "الخطة ظاهرة للطلاب — إخفاء" : "الخطة مخفية — عرضها للطلاب"}
          </button>
        ) : null}
      </div>
      {isAdmin ? (
        <form
          className="grid gap-2 rounded-2xl border border-line bg-card p-4 sm:grid-cols-[10rem_1fr_auto]"
          onSubmit={(event) => {
            event.preventDefault();
            addPlanItem(month, text);
            setText("");
          }}
        >
          <select
            value={month}
            onChange={(event) => setMonth(event.target.value)}
            className="min-h-11 rounded-xl border border-line bg-paper px-3 text-sm font-bold"
          >
            {months.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <input
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="نشاط جديد"
            className="min-h-11 rounded-xl border border-line bg-paper px-3 text-sm"
          />
          <button type="submit" className="min-h-11 rounded-full bg-green px-4 text-sm font-bold text-paper">
            إضافة
          </button>
        </form>
      ) : null}
      <article className="rounded-2xl border border-line bg-card p-4">
        <h2 className="text-lg font-extrabold">أهداف الخطة</h2>
        <ol className="mt-3 grid gap-2">
          {goals.map((goal, index) => (
            <li key={goal} className="flex gap-3 text-sm">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-paper text-xs font-extrabold text-green">
                {index + 1}
              </span>
              <span>{goal}</span>
            </li>
          ))}
        </ol>
      </article>
      {months.map((monthName) => {
        const items = plan.filter((item) => item.month === monthName);
        if (!items.length) return null;
        return (
          <article key={monthName} className="rounded-2xl border border-line bg-card p-4">
            <h2 className="text-lg font-extrabold text-red">{monthName}</h2>
            <ul className="mt-2 grid gap-2">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-3">
                  {isAdmin ? (
                    <button
                      type="button"
                      onClick={() => togglePlan(item.id)}
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border ${
                        item.done
                          ? "border-green bg-green text-paper"
                          : "border-line bg-paper text-muted"
                      }`}
                      aria-label={item.done ? "اتنفذ" : "لسه"}
                    >
                      <Check className="h-4 w-4" />
                    </button>
                  ) : (
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-extrabold ${
                        item.done ? "bg-green text-paper" : "bg-paper text-muted"
                      }`}
                    >
                      {item.done ? <Check className="h-4 w-4" /> : "·"}
                    </span>
                  )}
                  {isAdmin ? (
                    <input
                      value={item.text}
                      onChange={(event) => updatePlanText(item.id, event.target.value)}
                      className="min-h-11 min-w-0 flex-1 rounded-xl border border-line bg-paper px-3 text-sm"
                    />
                  ) : (
                    <span className={item.done ? "text-sm text-muted line-through" : "text-sm"}>
                      {item.text}
                    </span>
                  )}
                  {isAdmin ? (
                    <button
                      type="button"
                      onClick={() => removePlanItem(item.id)}
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-paper text-red"
                      aria-label="حذف"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  ) : null}
                </li>
              ))}
            </ul>
          </article>
        );
      })}
    </section>
  );
}

function SchoolImpact() {
  const stories = useUnion((state) => state.schoolStories);
  const addStory = useUnion((state) => state.addSchoolStory);
  const updateStory = useUnion((state) => state.updateSchoolStory);
  const removeStory = useUnion((state) => state.removeSchoolStory);
  const session = useUnion((state) => state.session);
  const isAdmin = session?.role === "admin";
  const [editingId, setEditingId] = useState<string | null>(null);
  const [schoolName, setSchoolName] = useState("");
  const [stage, setStage] = useState<StageId>("primary");
  const [axisId, setAxisId] = useState(campaignAxes[0].id);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [impact, setImpact] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  function clearForm() {
    setEditingId(null);
    setSchoolName("");
    setStage("primary");
    setAxisId(campaignAxes[0].id);
    setTitle("");
    setSummary("");
    setImpact("");
    setDate("");
    setError("");
  }

  function editStory(story: SchoolStory) {
    setEditingId(story.id);
    setSchoolName(story.schoolName);
    setStage(story.stage);
    setAxisId(story.axisId);
    setTitle(story.title);
    setSummary(story.summary);
    setImpact(story.impact);
    setDate(story.date);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function saveStory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const clean = {
      schoolName: schoolName.trim(),
      stage,
      axisId,
      title: title.trim(),
      summary: summary.trim(),
      impact: impact.trim(),
      date,
    };
    if (!clean.schoolName || !clean.title || !clean.summary || !clean.impact) {
      setError("اكتبي اسم المدرسة والعنوان ووصف التنفيذ والأثر قبل الحفظ.");
      return;
    }
    if (editingId) updateStory(editingId, clean);
    else addStory(clean);
    clearForm();
  }

  function stageName(value: StageId) {
    return value === "primary" ? "ابتدائي" : value === "prep" ? "إعدادي" : "ثانوي";
  }

  function dateLabel(value: string) {
    return value ? new Intl.DateTimeFormat("ar-EG", { year: "numeric", month: "long", day: "numeric" }).format(new Date(`${value}T12:00:00`)) : "";
  }

  return (
    <section className="grid gap-4">
      <header className="hero-pharaoh overflow-hidden rounded-2xl p-5 text-paper sm:p-7">
        <div className="flex items-start gap-3">
          <span className="ankh-mark shrink-0 text-xl" aria-hidden>𓇳</span>
          <div>
            <p className="text-sm font-bold text-gold">من مدارس إدارة مصر القديمة</p>
            <h1 className="mt-1 text-2xl font-extrabold sm:text-3xl">أثر المدارس ومبادراتها</h1>
            <p className="mt-2 max-w-3xl text-sm text-paper/90">
              مساحة لتوثيق الأنشطة التي نُفذت فعلًا: المدرسة، ومحور الخطة، وما تم عمله، والأثر الذي لاحظه الطلاب.
            </p>
          </div>
        </div>
      </header>

      {isAdmin ? (
        <form onSubmit={saveStory} className="pharaoh-card grid gap-3 p-4 sm:grid-cols-2" aria-label="إضافة أو تعديل مبادرة مدرسية">
          <div className="sm:col-span-2">
            <h2 className="text-lg font-extrabold">{editingId ? "تعديل مبادرة موثقة" : "إضافة مبادرة منفذة"}</h2>
            <p className="mt-1 text-xs text-muted">تظهر المبادرات المسجلة للزوار، ويمكنك تعديلها أو حذفها من هنا.</p>
          </div>
          <label className="grid gap-1 text-sm font-bold">
            اسم المدرسة
            <input required value={schoolName} onChange={(event) => setSchoolName(event.target.value)} maxLength={100} className="min-h-11 rounded-xl border border-line bg-paper px-3" placeholder="اكتبي اسم المدرسة" />
          </label>
          <label className="grid gap-1 text-sm font-bold">
            المرحلة
            <select value={stage} onChange={(event) => setStage(event.target.value as StageId)} className="min-h-11 rounded-xl border border-line bg-paper px-3">
              <option value="primary">ابتدائي</option><option value="prep">إعدادي</option><option value="secondary">ثانوي</option>
            </select>
          </label>
          <label className="grid gap-1 text-sm font-bold">
            محور الخطة
            <select value={axisId} onChange={(event) => setAxisId(event.target.value)} className="min-h-11 rounded-xl border border-line bg-paper px-3">
              {campaignAxes.map((axis) => <option key={axis.id} value={axis.id}>{axis.title}</option>)}
            </select>
          </label>
          <label className="grid gap-1 text-sm font-bold">
            عنوان النشاط
            <input required value={title} onChange={(event) => setTitle(event.target.value)} maxLength={120} className="min-h-11 rounded-xl border border-line bg-paper px-3" placeholder="عنوان مختصر" />
          </label>
          <label className="grid gap-1 text-sm font-bold sm:col-span-2">
            ماذا نفذت المدرسة؟
            <textarea required value={summary} onChange={(event) => setSummary(event.target.value)} maxLength={700} rows={3} className="rounded-xl border border-line bg-paper px-3 py-2" placeholder="اكتبي وصفًا موجزًا لما حدث بالفعل" />
          </label>
          <label className="grid gap-1 text-sm font-bold sm:col-span-2">
            الأثر أو ما تعلمه الطلاب
            <textarea required value={impact} onChange={(event) => setImpact(event.target.value)} maxLength={500} rows={2} className="rounded-xl border border-line bg-paper px-3 py-2" placeholder="اذكري نتيجة موثقة أو ملاحظة واقعية" />
          </label>
          <label className="grid gap-1 text-sm font-bold">
            تاريخ التنفيذ (اختياري)
            <input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="min-h-11 rounded-xl border border-line bg-paper px-3" />
          </label>
          <div className="flex flex-wrap items-end gap-2">
            <button type="submit" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-green px-4 text-sm font-extrabold text-paper"><Save className="h-4 w-4" />{editingId ? "حفظ التعديل" : "إضافة المبادرة"}</button>
            {editingId ? <button type="button" onClick={clearForm} className="min-h-11 rounded-full border border-line px-4 text-sm font-bold">إلغاء</button> : null}
          </div>
          {error ? <p className="text-sm font-bold text-red sm:col-span-2" role="alert">{error}</p> : null}
          <p className="text-xs text-muted sm:col-span-2">اكتبي معلومات النشاط العامة فقط، وتجنبي نشر بيانات شخصية للطلاب.</p>
        </form>
      ) : null}

      {stories.length ? (
        <div className="grid gap-3 md:grid-cols-2">
          {stories.map((story) => {
            const axis = campaignAxes.find((item) => item.id === story.axisId);
            return (
              <article key={story.id} className="pharaoh-card grid gap-3 p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-extrabold text-gold-deep">{story.schoolName} · {stageName(story.stage)}{story.date ? ` · ${dateLabel(story.date)}` : ""}</p>
                    <h2 className="mt-1 text-lg font-extrabold text-green">{story.title}</h2>
                  </div>
                  <span className="rounded-full bg-sand px-3 py-1 text-xs font-bold">{axis?.title ?? "محور غير محدد"}</span>
                </div>
                <div className="rounded-xl bg-paper p-3">
                  <h3 className="text-sm font-extrabold">ما تم تنفيذه</h3>
                  <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-ink-soft">{story.summary}</p>
                </div>
                <div className="rounded-xl border border-gold/30 bg-card p-3">
                  <h3 className="text-sm font-extrabold">الأثر</h3>
                  <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-ink-soft">{story.impact}</p>
                </div>
                {isAdmin ? (
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => editStory(story)} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line px-3 text-xs font-bold"><Pencil className="h-3.5 w-3.5" />تعديل</button>
                    <button type="button" onClick={() => { if (window.confirm("تحذفي المبادرة دي من الموقع؟")) removeStory(story.id); }} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line px-3 text-xs font-bold text-red"><Trash2 className="h-3.5 w-3.5" />حذف</button>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      ) : (
        <div className="pharaoh-card p-6 text-center">
          <Building2 className="mx-auto h-8 w-8 text-gold-deep" aria-hidden="true" />
          <h2 className="mt-2 font-extrabold">لسه مفيش مبادرات موثقة</h2>
          <p className="mt-1 text-sm text-muted">أول ما الإدارة تضيف نشاطًا منفذًا، هيظهر هنا مع محوره وأثره.</p>
        </div>
      )}
    </section>
  );
}

type IdeaFormat = "board" | "radio" | "workshop" | "initiative";
type PreparedIdea = {
  axis: CampaignAxis;
  format: IdeaFormat;
  stage: StageId;
  schoolNeed: string;
};

const ideaFormatLabels: Record<IdeaFormat, string> = {
  board: "لوحة مدرسية",
  radio: "فقرة إذاعية",
  workshop: "ورشة تطبيقية",
  initiative: "مبادرة مدرسية",
};

const stageIdeaTips: Record<StageId, string> = {
  primary: "خلي الرسائل قصيرة وبالصور، وقسّمي العمل لمهام بسيطة يشرف عليها المعلم.",
  prep: "خلي الفرق تجمع معلومة موثوقة، وتقارن بين فكرتين، وتعرض سبب اختيارها.",
  secondary: "ضيفي بحثًا بمصادر موثوقة، وخطة تنفيذ، وطريقة واضحة لقياس الأثر.",
};

function ideaContent({ axis, format, schoolNeed }: PreparedIdea) {
  const focus = schoolNeed
    ? ` وخلي التطبيق مرتبطًا باحتياج المدرسة: «${schoolNeed}».`
    : "";
  if (format === "board") {
    return `${axis.idea} رتّبيها في أقسام: ${axis.boardParts.join(" · ")}.${focus}`;
  }
  if (format === "radio") {
    return `فقرة من دقيقتين تبدأ بسؤال عن «${axis.title}»، تشرح الفكرة ببساطة: ${axis.meaning}، ثم تختم برسالة: «${axis.slogan}» وتدعو الطلاب لتطبيقها.${focus}`;
  }
  if (format === "workshop") {
    return `ورشة قصيرة بعنوان «${axis.ideaTitle}». يشتغل الطلاب في فرق على معنى المحور: ${axis.meaning}، ثم يجهزون ناتجًا بسيطًا يعرضونه على زملائهم.${focus}`;
  }
  return `مبادرة لمدة أسبوع بعنوان «${axis.ideaTitle}»: حوّلوا المحور إلى خطوة عملية في المدرسة، وزعوا الأدوار، ثم اعرضوا ما تحقق وما يمكن تحسينه.${focus}`;
}

function ideaSuccessMeasure(format: IdeaFormat) {
  if (format === "board") return "عدد المشاركات أو البطاقات المضافة، واكتمال أقسام اللوحة.";
  if (format === "radio") return "تفاعل الطلاب مع السؤال الختامي، وتطبيق الرسالة خلال الأسبوع.";
  if (format === "workshop") return "خروج كل فريق بناتج واضح، ثم سؤال قصير عمّا تعلمه المشاركون.";
  return "قائمة متابعة قبل التنفيذ وبعده، مع توثيق ما تحقق فعلًا.";
}

function Ideas() {
  const [axisId, setAxisId] = useState(campaignAxes[0].id);
  const [format, setFormat] = useState<IdeaFormat>("board");
  const [stage, setStage] = useState<StageId>("primary");
  const [schoolNeed, setSchoolNeed] = useState("");
  const [prepared, setPrepared] = useState<PreparedIdea | null>(null);
  const [copied, setCopied] = useState(false);
  const axis = campaignAxes.find((item) => item.id === axisId) ?? campaignAxes[0];

  function prepareIdea() {
    setPrepared({ axis, format, stage, schoolNeed: schoolNeed.trim() });
    setCopied(false);
  }

  async function copyIdea() {
    if (!prepared) return;
    const text = [
      `${prepared.axis.ideaTitle} — ${ideaFormatLabels[prepared.format]}`,
      `المحور: ${prepared.axis.title}`,
      ideaContent(prepared),
      `خطوات التنفيذ: ${prepared.axis.steps.join(" | ")}`,
      `لمسة من تراث مصر القديمة: ${prepared.axis.heritage}`,
      `مستلزمات: ${prepared.axis.materials.join("، ")}`,
      `الشعار: ${prepared.axis.slogan}`,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="grid gap-4">
      <header className="hero-pharaoh overflow-hidden rounded-2xl p-5 text-paper sm:p-7">
        <div className="flex items-start gap-3">
          <span className="ankh-mark shrink-0 text-xl" aria-hidden>𓋹</span>
          <div>
            <p className="text-sm font-bold text-gold">إدارة مصر القديمة التعليمية</p>
            <h1 className="mt-1 flex items-center gap-2 text-2xl font-extrabold sm:text-3xl">
              <Sparkles className="h-6 w-6 text-gold" />
              مساعد الأفكار للمدارس
            </h1>
            <p className="mt-2 max-w-3xl text-sm text-paper/90">
              اختاري محورًا من خطة «طالب عالمي متجذر»، وحددي المرحلة وشكل النشاط واحتياج المدرسة؛
              هتلاقي مسودة فكرة وخطوات تنفيذ ولمسة من تراث مصر القديمة ومؤشرًا لقياس الأثر.
            </p>
            <p className="mt-2 text-xs text-paper/75">مساعد تفاعلي يعتمد على محاور الخطة ومحتوى المنصة، ولا يرسل المدخلات لخدمة خارجية.</p>
          </div>
        </div>
      </header>

      <div className="pharaoh-card grid gap-3 p-4 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-bold">
          محور السنة
          <select
            value={axisId}
            onChange={(event) => setAxisId(event.target.value)}
            className="min-h-11 rounded-xl border border-line bg-paper px-3 text-sm font-semibold"
          >
            {campaignAxes.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
          </select>
        </label>
        <label className="grid gap-1 text-sm font-bold">
          المرحلة الدراسية
          <select
            value={stage}
            onChange={(event) => setStage(event.target.value as StageId)}
            className="min-h-11 rounded-xl border border-line bg-paper px-3 text-sm font-semibold"
          >
            <option value="primary">ابتدائي</option>
            <option value="prep">إعدادي</option>
            <option value="secondary">ثانوي</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm font-bold">
          شكل الفكرة
          <select
            value={format}
            onChange={(event) => setFormat(event.target.value as IdeaFormat)}
            className="min-h-11 rounded-xl border border-line bg-paper px-3 text-sm font-semibold"
          >
            {(Object.entries(ideaFormatLabels) as [IdeaFormat, string][]).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-sm font-bold">
          احتياج أو موضوع في المدرسة (اختياري)
          <input
            value={schoolNeed}
            onChange={(event) => setSchoolNeed(event.target.value)}
            maxLength={120}
            placeholder="مثال: تشجيع القراءة أو ترشيد المياه"
            className="min-h-11 rounded-xl border border-line bg-paper px-3 text-sm font-semibold"
          />
        </label>
        <button
          type="button"
          onClick={prepareIdea}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-green px-5 text-sm font-extrabold text-paper sm:col-span-2 sm:justify-self-start"
        >
          <Lightbulb className="h-4 w-4" />
          اقترحي فكرة مناسبة
        </button>
      </div>

      {prepared ? (
        <article className="pharaoh-card grid gap-4 p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <span className="text-xs font-extrabold text-gold-deep">{ideaFormatLabels[prepared.format]} · {prepared.stage === "primary" ? "ابتدائي" : prepared.stage === "prep" ? "إعدادي" : "ثانوي"}</span>
              <h2 className="mt-1 text-xl font-extrabold text-green">{prepared.axis.ideaTitle}</h2>
              <p className="mt-1 text-sm font-bold">محور الخطة: {prepared.axis.title}</p>
            </div>
            <button
              type="button"
              onClick={() => void copyIdea()}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-paper px-4 text-sm font-bold"
            >
              <Copy className="h-4 w-4" />
              {copied ? "اتنسخت الفكرة" : "انسخي الفكرة"}
            </button>
          </div>
          <div className="rounded-xl bg-paper p-4">
            <h3 className="text-sm font-extrabold">الفكرة</h3>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">{ideaContent(prepared)}</p>
            {prepared.schoolNeed ? (
              <p className="mt-2 rounded-lg border border-line bg-card p-3 text-sm">
                تركيز المدرسة: <strong>{prepared.schoolNeed}</strong>
              </p>
            ) : null}
          </div>
          {prepared.format === "board" ? (
            <div>
              <h3 className="font-extrabold">تقسيمات مقترحة للوحة</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {prepared.axis.boardParts.map((part) => (
                  <span key={part} className="rounded-full border border-line bg-card px-3 py-2 text-xs font-bold">{part}</span>
                ))}
              </div>
            </div>
          ) : null}
          <div>
            <h3 className="font-extrabold">خطوات التنفيذ</h3>
            <ol className="mt-2 grid gap-2 sm:grid-cols-3">
              {prepared.axis.steps.map((step, index) => (
                <li key={step} className="flex gap-2 rounded-xl border border-line bg-card p-3 text-sm">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-green text-xs font-extrabold text-paper">{index + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-xl border border-green/20 bg-paper p-4">
            <h3 className="text-sm font-extrabold">مؤشر نجاح مقترح</h3>
            <p className="mt-1 text-sm text-ink-soft">{ideaSuccessMeasure(prepared.format)}</p>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-xl bg-sand p-3">
              <h3 className="flex items-center gap-2 text-sm font-extrabold"><span className="text-gold">𓂀</span> لمسة من التراث</h3>
              <p className="mt-1 text-sm text-ink-soft">{prepared.axis.heritage}</p>
            </div>
            <div className="rounded-xl bg-sand p-3">
              <h3 className="text-sm font-extrabold">مستلزمات بسيطة</h3>
              <p className="mt-1 text-sm text-ink-soft">{prepared.axis.materials.join("، ")}</p>
            </div>
            <div className="rounded-xl bg-sand p-3">
              <h3 className="text-sm font-extrabold">مراعاة المرحلة</h3>
              <p className="mt-1 text-sm text-ink-soft">{stageIdeaTips[prepared.stage]}</p>
            </div>
          </div>
          <p className="rounded-xl border border-gold/40 bg-card p-3 text-sm font-extrabold text-gold-deep">{prepared.axis.slogan}</p>
        </article>
      ) : (
        <div className="rounded-2xl border border-line bg-card p-5 text-sm text-muted">
          ابدئي باختيار محور، زي الهوية الوطنية أو الوعي الرقمي، وبعدها اختاري لوحة أو إذاعة أو ورشة أو مبادرة.
        </div>
      )}
    </section>
  );
}

function Gallery() {
  const savedPhotos = useUnion((state) => state.galleryPhotos);
  const galleryPhotoEdits = useUnion((state) => state.galleryPhotoEdits);
  const photos = [...seedGalleryPhotos, ...savedPhotos].map((photo) => ({
    ...photo,
    ...galleryPhotoEdits[photo.id],
  }));
  const addGalleryPhoto = useUnion((state) => state.addGalleryPhoto);
  const updateGalleryPhoto = useUnion((state) => state.updateGalleryPhoto);
  const removeGalleryPhoto = useUnion((state) => state.removeGalleryPhoto);
  const session = useUnion((state) => state.session);
  const [album, setAlbum] = useState<Album | "all">("all");
  const [galleryQuery, setGalleryQuery] = useState("");
  const [uploadAlbum, setUploadAlbum] = useState<Album>("primary");
  const [active, setActive] = useState<string | null>(null);
  const [editingPhotoId, setEditingPhotoId] = useState<string | null>(null);
  const [editAlbum, setEditAlbum] = useState<Album>("conference");
  const [editCaption, setEditCaption] = useState("");
  const [editFile, setEditFile] = useState<File | null>(null);
  const [editError, setEditError] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);
  const [caption, setCaption] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const isAdmin = session?.role === "admin";
  const albumsWithPhotos = [...new Set(photos.map((photo) => photo.album))];
  const visible = photos.filter((photo) => (album === "all" || photo.album === album)
    && `${photo.caption} ${albumLabel[photo.album]}`.toLocaleLowerCase("ar").includes(galleryQuery.trim().toLocaleLowerCase("ar")));

  const current = photos.find((photo) => photo.id === active);
  const editingPhoto = photos.find((photo) => photo.id === editingPhotoId);
  const visibleIds = visible.map((photo) => photo.id).join("|");

  useEffect(() => {
    if (!active) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeys = (event: KeyboardEvent) => {
      const index = visible.findIndex((photo) => photo.id === active);
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight" && visible.length > 1) setActive(visible[(index + 1) % visible.length].id);
      if (event.key === "ArrowLeft" && visible.length > 1) setActive(visible[(index - 1 + visible.length) % visible.length].id);
    };
    window.addEventListener("keydown", handleKeys);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeys);
    };
  }, [active, visibleIds]);

  return (
    <section className="grid gap-4">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-extrabold">
          <Images className="h-6 w-6 text-green" />
          معرض أنشطة الاتحاد
        </h1>
        <p className="mt-1 text-sm text-muted">
          صور أنشطة الاتحاد مصنفة حسب المرحلة ومحاور العام. ويمكن للأدمن إضافة الصور أو تعديل تصنيفها ووصفها واستبدال ملفها.
        </p>
      </div>
      {isAdmin ? (
        <form
          className="grid gap-3 rounded-2xl border border-line bg-card p-4 sm:grid-cols-2"
          onSubmit={async (event) => {
            event.preventDefault();
            const form = event.currentTarget;
            if (!selectedFile) {
              setError("اختاري صورة لإضافتها للمعرض.");
              return;
            }
            if (!selectedFile.type.startsWith("image/") || selectedFile.size > 8 * 1024 * 1024) {
              setError("اختاري صورة صالحة لا يزيد حجمها عن ٨ ميجابايت.");
              return;
            }
            if (!caption.trim()) {
              setError("اكتبي وصفًا قصيرًا للصورة.");
              return;
            }
            setSaving(true);
            setError("");
            try {
              const src = await compressMemberPhoto(selectedFile, 1200, 0.72);
              addGalleryPhoto(uploadAlbum, src, caption);
              setCaption("");
              setSelectedFile(null);
              form.reset();
            } catch {
              setError("تعذر حفظ الصورة. جرّبي صورة أصغر أو احذفي صورة قديمة من المعرض.");
            } finally {
              setSaving(false);
            }
          }}
        >
          <div className="sm:col-span-2">
            <h2 className="font-extrabold">إضافة صورة للمعرض</h2>
          <p className="mt-1 text-xs text-muted">اختاري المرحلة، وأضيفي وصفًا واضحًا. الصور والتعديلات تُحفظ على هذا المتصفح.</p>
          </div>
          <label className="grid gap-1 text-xs font-bold text-muted">
            التصنيف
            <select
              value={uploadAlbum}
              onChange={(event) => setUploadAlbum(event.target.value as Album)}
              className="min-h-11 rounded-xl border border-line bg-paper px-3 text-sm font-semibold text-ink"
            >
              {(Object.keys(albumLabel) as Album[]).map((key) => (
                <option key={key} value={key}>{albumLabel[key]}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-1 text-xs font-bold text-muted">
            وصف الصورة
            <input
              value={caption}
              onChange={(event) => setCaption(event.target.value)}
              placeholder="مثال: انتخابات اتحاد المرحلة الابتدائية"
              className="min-h-11 rounded-xl border border-line bg-paper px-3 text-sm font-semibold text-ink"
            />
          </label>
          <label className="grid gap-1 text-xs font-bold text-muted sm:col-span-2">
            ملف الصورة
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
              className="min-h-11 rounded-xl border border-line bg-paper p-2 text-sm"
            />
          </label>
          {error ? <p className="text-sm font-bold text-red sm:col-span-2">{error}</p> : null}
          <button
            type="submit"
            disabled={saving}
            className="min-h-11 rounded-full bg-green px-5 text-sm font-bold text-paper disabled:opacity-60 sm:col-span-2 sm:justify-self-start"
          >
            {saving ? "بيتم حفظ الصورة…" : "إضافة إلى المعرض"}
          </button>
        </form>
      ) : null}
      <div className="flex flex-wrap gap-2">
        <FilterChip active={album === "all"} onClick={() => setAlbum("all")} label="الكل" />
        {albumsWithPhotos.map((key) => (
          <FilterChip
            key={key}
            active={album === key}
            onClick={() => setAlbum(key)}
            label={albumLabel[key]}
          />
        ))}
      </div>
      <label className="flex min-h-11 items-center gap-2 rounded-xl border border-line bg-card px-3 sm:max-w-md">
        <Search aria-hidden="true" className="h-4 w-4 text-muted" />
        <span className="sr-only">البحث في أوصاف الصور</span>
        <input value={galleryQuery} onChange={(event) => setGalleryQuery(event.target.value)} placeholder="ابحث في أوصاف الصور" className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
      </label>
      {visible.length === 0 ? (
        <div className="rounded-2xl border border-line bg-card p-6">
          <p className="font-extrabold">{galleryQuery ? "ملقيناش صور مطابقة" : "المعرض لسه مفيهوش صور"}</p>
          <p className="mt-1 text-sm text-muted">
            {isAdmin
              ? "أضيفي صور الأنشطة المعتمدة من النموذج أعلاه، وستظهر هنا على هذا المتصفح."
              : "مفيش صور مضافة للمعرض على هذا المتصفح لسه."}
          </p>
        </div>
      ) : (
        <div className="gallery-masonry">
          {visible.map((photo) => (
            <figure key={photo.id} className="gallery-item overflow-hidden rounded-2xl border border-line bg-card">
              <button type="button" onClick={() => setActive(photo.id)} className="gallery-image-button block w-full" aria-label={`عرض صورة: ${photo.caption}`}>
                <img src={photo.src} alt={photo.caption} loading="lazy" decoding="async" className="w-full object-cover" />
              </button>
              <figcaption className="flex items-start justify-between gap-2 p-3">
                <span>
                  <span className="block text-[11px] font-bold text-gold-deep">{albumLabel[photo.album]}</span>
                  <span className="block text-sm font-bold">{photo.caption}</span>
                </span>
                {isAdmin ? (
                  <span className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingPhotoId(photo.id);
                        setEditAlbum(photo.album);
                        setEditCaption(photo.caption);
                        setEditFile(null);
                        setEditError("");
                      }}
                      className="grid h-11 w-11 place-items-center rounded-full bg-paper text-ink"
                      aria-label={`تعديل صورة: ${photo.caption}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    {!photo.id.startsWith("asset-") ? (
                      <button
                        type="button"
                        onClick={() => removeGalleryPhoto(photo.id)}
                        className="min-h-11 rounded-full bg-paper px-3 text-xs font-bold text-red"
                      >
                        حذف
                      </button>
                    ) : null}
                  </span>
                ) : null}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
      {current ? (
        <div className="fixed inset-0 z-40 grid place-items-center bg-ink/85 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) setActive(null); }}>
          <figure
            className="max-h-full w-full max-w-3xl overflow-hidden rounded-2xl bg-card"
            role="dialog"
            aria-modal="true"
            aria-label={`صورة: ${current.caption}`}
          >
            <img src={current.src} alt={current.caption} decoding="async" className="max-h-[70vh] w-full object-contain bg-ink" />
            <figcaption className="flex items-center justify-between gap-3 p-4">
              <span className="font-bold">{current.caption}</span>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="grid h-11 w-11 place-items-center rounded-full bg-paper"
                aria-label="إغلاق"
              >
                <X className="h-4 w-4" />
              </button>
            </figcaption>
          </figure>
        </div>
      ) : null}
      {editingPhoto ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/85 p-4 backdrop-blur-sm">
          <form
            className="grid max-h-[90vh] w-full max-w-lg gap-3 overflow-y-auto rounded-2xl bg-card p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-gallery-photo-title"
            onSubmit={async (event) => {
              event.preventDefault();
              if (!editCaption.trim()) {
                setEditError("اكتبي وصفًا قصيرًا للصورة.");
                return;
              }
              if (editFile && (!editFile.type.startsWith("image/") || editFile.size > 8 * 1024 * 1024)) {
                setEditError("اختاري صورة صالحة لا يزيد حجمها عن ٨ ميجابايت.");
                return;
              }
              setSavingEdit(true);
              setEditError("");
              try {
                const src = editFile
                  ? await compressMemberPhoto(editFile, 1200, 0.72)
                  : editingPhoto.src;
                updateGalleryPhoto(editingPhoto.id, editAlbum, src, editCaption);
                setEditingPhotoId(null);
                setEditFile(null);
              } catch {
                setEditError("تعذر حفظ التعديلات. جرّبي صورة أصغر أو بصيغة أخرى.");
              } finally {
                setSavingEdit(false);
              }
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 id="edit-gallery-photo-title" className="font-extrabold">تعديل صورة المعرض</h2>
                <p className="mt-1 text-xs text-muted">غيّري المرحلة أو الوصف، واختاري ملفًا جديدًا إذا أردتِ استبدال الصورة.</p>
              </div>
              <button
                type="button"
                onClick={() => setEditingPhotoId(null)}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-paper"
                aria-label="إغلاق تعديل الصورة"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <img src={editingPhoto.src} alt={editingPhoto.caption} className="max-h-48 w-full rounded-xl bg-paper object-contain" />
            <label className="grid gap-1 text-xs font-bold text-muted">
              التصنيف
              <select
                value={editAlbum}
                onChange={(event) => setEditAlbum(event.target.value as Album)}
                className="min-h-11 rounded-xl border border-line bg-paper px-3 text-sm font-semibold text-ink"
              >
                {(Object.keys(albumLabel) as Album[]).map((key) => (
                  <option key={key} value={key}>{albumLabel[key]}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-1 text-xs font-bold text-muted">
              وصف الصورة
              <input
                value={editCaption}
                onChange={(event) => setEditCaption(event.target.value)}
                className="min-h-11 rounded-xl border border-line bg-paper px-3 text-sm font-semibold text-ink"
              />
            </label>
            <label className="grid gap-1 text-xs font-bold text-muted">
              استبدال ملف الصورة (اختياري)
              <input
                type="file"
                accept="image/*"
                onChange={(event) => setEditFile(event.target.files?.[0] ?? null)}
                className="min-h-11 rounded-xl border border-line bg-paper p-2 text-sm"
              />
            </label>
            {editError ? <p className="text-sm font-bold text-red">{editError}</p> : null}
            <div className="flex flex-wrap gap-2">
              <button type="submit" disabled={savingEdit} className="min-h-11 rounded-full bg-green px-5 text-sm font-bold text-paper disabled:opacity-60">
                {savingEdit ? "بيتم حفظ التعديل…" : "حفظ التعديلات"}
              </button>
              <button type="button" onClick={() => setEditingPhotoId(null)} className="min-h-11 rounded-full bg-paper px-5 text-sm font-bold">
                إلغاء
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </section>
  );
}

function FilterChip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-11 rounded-full px-4 text-sm font-bold ${
        active ? "bg-green text-paper" : "bg-card text-ink"
      }`}
    >
      {label}
    </button>
  );
}

function News() {
  const news = useUnion((state) => state.news);
  const session = useUnion((state) => state.session);
  const managedContent = useUnion((state) => state.managedContent);
  const addNews = useUnion((state) => state.addNews);
  const removeNews = useUnion((state) => state.removeNews);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [query, setQuery] = useState("");
  const isAdmin = session?.role === "admin";
  const feed = [
    ...news,
    ...managedContent.filter((item) => item.published && (item.type === "news" || item.type === "announcement")).map((item) => ({ id: item.id, title: item.title, body: item.summary || item.content, date: item.startDate || item.createdAt.slice(0, 10), image: item.image, category: item.type === "announcement" ? "إعلانات رسمية" : "أخبار الاتحاد", sourceTitle: item.sourceTitle, sourceUrl: item.sourceUrl })),
  ];
  const orderedNews = [...feed].sort((a, b) => b.date.localeCompare(a.date));
  const filteredNews = orderedNews.filter((item) => `${item.title} ${item.body} ${item.date} ${item.category ?? ""} ${item.sourceTitle ?? ""}`.toLocaleLowerCase("ar").includes(query.trim().toLocaleLowerCase("ar")));

  return (
    <section className="grid gap-4">
      <div>
        <p className="text-xs font-extrabold text-gold-deep">اتحادات طلاب إدارة مصر القديمة التعليمية</p>
        <h1 className="mt-1 text-2xl font-extrabold">الأخبار</h1>
        <p className="mt-1 text-sm text-muted">آخر ما نُشر على المنصة، مرتبًا حسب تاريخ النشر.</p>
      </div>
      {isAdmin ? (
        <form
          className="grid gap-2 rounded-2xl border border-line bg-card p-4"
          onSubmit={(event) => {
            event.preventDefault();
            if (!title.trim() || !body.trim()) return;
            addNews(title, body);
            setTitle("");
            setBody("");
          }}
        >
          <h2 className="text-sm font-extrabold">خبر جديد</h2>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="العنوان"
            className="min-h-11 rounded-xl border border-line bg-paper px-3 text-sm"
          />
          <textarea
            value={body}
            onChange={(event) => setBody(event.target.value)}
            placeholder="التفاصيل"
            rows={3}
            className="rounded-xl border border-line bg-paper px-3 py-2 text-sm"
          />
          <button type="submit" className="min-h-11 rounded-full bg-green text-sm font-bold text-paper">
            نشر
          </button>
        </form>
      ) : null}
      <label className="flex min-h-11 items-center gap-2 rounded-xl border border-line bg-card px-3 sm:max-w-lg">
        <Search aria-hidden="true" className="h-4 w-4 text-muted" />
        <span className="sr-only">البحث في الأخبار</span>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث في عناوين الأخبار وتفاصيلها" className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
      </label>
      {filteredNews.length ? (
        <div className="grid gap-3 lg:grid-cols-5">
          {filteredNews[0] ? <article className={`news-feature grid gap-4 rounded-2xl p-4 sm:p-5 lg:col-span-3 ${filteredNews[0].image ? "sm:grid-cols-2" : ""}`}>
            {filteredNews[0].image ? <img src={filteredNews[0].image} alt="" aria-hidden="true" decoding="async" className="h-48 w-full rounded-xl object-cover sm:h-full sm:min-h-56" /> : null}
            <div className="self-center">
              <span className="inline-flex rounded-full bg-green px-3 py-1 text-[10px] font-extrabold text-paper">أحدث خبر</span>
              <time className="ms-2 text-xs font-bold text-muted" dateTime={filteredNews[0].date}>{filteredNews[0].date}</time>
              <h2 className="mt-3 text-xl font-extrabold">{filteredNews[0].title}</h2>
              <p className="mt-2 leading-7 text-ink-soft">{filteredNews[0].body}</p>
              {filteredNews[0].sourceUrl ? <p className="mt-3 text-xs font-bold text-teal">المصدر: <a href={filteredNews[0].sourceUrl} target="_blank" rel="noreferrer" className="underline">{filteredNews[0].sourceTitle || "المستند المرفق"}</a></p> : null}
              {isAdmin ? <button type="button" onClick={() => removeNews(filteredNews[0].id)} className="mt-3 min-h-11 rounded-full bg-paper px-4 text-sm font-bold text-red">حذف الخبر</button> : null}
            </div>
          </article> : null}
          <div className="grid content-start gap-3 lg:col-span-2">
            {filteredNews.slice(1).map((item) => (
              <article key={item.id} className="pharaoh-card p-4">
                {item.image ? <img src={item.image} alt="" aria-hidden="true" loading="lazy" decoding="async" className="mb-3 h-36 w-full rounded-lg object-cover" /> : null}
                <time className="text-[11px] font-bold text-muted" dateTime={item.date}>{item.date}</time>
                <h2 className="mt-1 text-base font-extrabold">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{item.body}</p>
                {item.sourceUrl ? <p className="mt-2 text-xs font-bold text-teal">المصدر: <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="underline">{item.sourceTitle || "المستند المرفق"}</a></p> : null}
                {isAdmin ? <button type="button" onClick={() => removeNews(item.id)} className="mt-2 min-h-11 rounded-full px-4 text-sm font-bold text-red hover:bg-paper">حذف الخبر</button> : null}
              </article>
            ))}
          </div>
        </div>
      ) : <div className="rounded-2xl border border-line bg-card p-6 text-center"><p className="font-extrabold">{query ? "ملقيناش أخبار مطابقة" : "لا توجد أخبار منشورة"}</p><p className="mt-1 text-sm text-muted">{query ? "جرّب كلمة مختلفة." : "ستظهر الأخبار هنا بعد إضافتها من لوحة الإدارة."}</p></div>}
    </section>
  );
}

function Box() {
  const addSuggestion = useUnion((state) => state.addSuggestion);
  const [message, setMessage] = useState("");
  const [stage, setStage] = useState("عام");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <div>
        <p className="text-xs font-extrabold text-teal">مشاركة الطلاب</p>
        <h1 className="mt-1 text-2xl font-extrabold">صوت الطالب</h1>
        <p className="mt-1 text-sm leading-7 text-muted">أرسل اقتراحًا أو فكرة أو ملاحظة للاتحاد. الرسائل تمر على مراجعة الإدارة ولا تُنشر تلقائيًا.</p>
          <form
            className="portal-form mt-4"
            onSubmit={(event) => {
              event.preventDefault();
              const result = addSuggestion(message, stage);
              setError(result ?? "");
              if (!result) {
                setMessage("");
                setSent(true);
              }
            }}
          >
            <label className="grid gap-1 text-xs font-bold text-muted">نوع المشاركة
            <select
              value={stage}
              onChange={(event) => setStage(event.target.value)}
              className="min-h-11 rounded-xl border border-line bg-white px-3 text-sm font-bold text-ink"
            >
              <option>عام</option>
              <option>الابتدائي</option>
              <option>الإعدادي</option>
              <option>الثانوي</option>
            </select>
            </label>
            <label className="grid gap-1 text-xs font-bold text-muted">اقتراحك أو ملاحظتك
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={4}
              required
              minLength={4}
              maxLength={1000}
              placeholder="اكتب فكرتك باختصار، من غير اسم أو رقم أو بيانات شخصية."
              className="rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink"
            />
            </label>
            {error ? <p className="text-sm font-bold text-red">{error}</p> : null}
            {sent ? <p role="status" className="text-sm font-bold text-teal">تم حفظ المشاركة للمراجعة في نسخة العرض الحالية.</p> : null}
            <button type="submit" className="portal-primary-button"><SendIcon /> إرسال للمراجعة</button>
            <p className="text-[11px] leading-5 text-muted">في النسخة الحالية تُحفظ الرسالة محليًا في هذا المتصفح فقط؛ لا تُرسل إلى جهة خارجية.</p>
          </form>
      </div>
      <aside className="portal-panel h-fit">
        <h2 className="text-lg font-extrabold">طريقة التعامل مع المشاركة</h2>
        <ol className="mt-3 grid gap-3 text-sm leading-6 text-ink-soft">
          <li><span className="portal-step">١</span> استقبل الفكرة أو الملاحظة من الطالب.</li>
          <li><span className="portal-step">٢</span> يراجعها المسؤول المختص قبل الرد أو النشر.</li>
          <li><span className="portal-step">٣</span> لا تُعرض الرسالة أو بيانات صاحبها علنًا.</li>
        </ol>
      </aside>
    </section>
  );
}

function SendIcon() { return <ArrowLeft className="h-4 w-4 rotate-180" aria-hidden="true" />; }

function Desk({ onOpen }: { onOpen: (view: View) => void }) {
  const session = useUnion((state) => state.session);
  const suggestions = useUnion((state) => state.suggestions);
  const answerSuggestion = useUnion((state) => state.answerSuggestion);
  const addNews = useUnion((state) => state.addNews);
  const offices = useUnion((state) => state.offices);
  const plan = useUnion((state) => state.plan);
  const planPublished = useUnion((state) => state.planPublished);
  const galleryPhotos = useUnion((state) => state.galleryPhotos);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [newsTitle, setNewsTitle] = useState("");
  const [newsBody, setNewsBody] = useState("");
  const waiting = suggestions.filter((item) => !item.reply.trim()).length;
  const memberCount = offices.reduce((count, office) => count + office.members.length, 0);

  if (session?.role !== "admin") {
    return (
      <p className="rounded-2xl border border-line bg-card p-6 text-sm">
        اللوحة دي للأدمن. ادخل بالاسم admin وأي رقم.
      </p>
    );
  }

  return (
    <section className="grid gap-4">
      <div>
        <h1 className="text-2xl font-extrabold">لوحة الإدارة</h1>
        <p className="mt-1 text-sm text-muted">
          تابعي المحتوى من مكان واحد، وافتحي أي قسم للتعديل والنشر.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStat icon={<Shield className="h-5 w-5" />} label="أعضاء المكاتب" value={memberCount} />
        <AdminStat icon={<CalendarDays className="h-5 w-5" />} label="أنشطة الخطة" value={plan.length} detail={planPublished ? "الخطة منشورة" : "الخطة مخفية عن الطلاب"} />
        <AdminStat icon={<Images className="h-5 w-5" />} label="صور المعرض" value={galleryPhotos.length} />
        <AdminStat icon={<Lightbulb className="h-5 w-5" />} label="مقترحات تنتظر الرد" value={waiting} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {([
          ["offices", "إدارة أسماء المكاتب والصور", "عدّلي الفائزين والأصوات وصور الابتدائي والإعدادي."],
          ["plan", "إدارة الخطة", "أضيفي الأنشطة، عدّليها، وحددي ما نُفذ وانشري الخطة."],
          ["ideas", "أفكار المدارس", "استخرجي أفكار لوحات وأنشطة مرتبطة بمحاور العام."],
          ["gallery", "إدارة المعرض", "ارفعي صورًا واختاري ألبومها واكتبي وصفها."],
          ["news", "إدارة الأخبار", "انشري الأخبار واحذفي ما لم يعد مناسبًا."],
        ] as [View, string, string][]).map(([target, title, description]) => (
          <button
            key={target}
            type="button"
            onClick={() => onOpen(target)}
            className="admin-action-card"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-paper text-red" aria-hidden="true">
              {target === "offices" ? <Shield className="h-5 w-5" /> : target === "plan" ? <CalendarDays className="h-5 w-5" /> : target === "ideas" ? <Lightbulb className="h-5 w-5" /> : target === "gallery" ? <Images className="h-5 w-5" /> : <Newspaper className="h-5 w-5" />}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-extrabold">{title}</span>
              <span className="mt-1 block text-xs leading-relaxed text-muted">{description}</span>
            </span>
            <span className="text-lg font-black text-gold" aria-hidden="true">←</span>
          </button>
        ))}
      </div>
      <form
        className="grid gap-2 rounded-2xl border border-line bg-card p-4"
        onSubmit={(event) => {
          event.preventDefault();
          if (!newsTitle.trim() || !newsBody.trim()) return;
          addNews(newsTitle, newsBody);
          setNewsTitle("");
          setNewsBody("");
        }}
      >
        <h2 className="flex items-center gap-2 text-lg font-extrabold"><Newspaper className="h-5 w-5 text-red" /> نشر خبر سريع</h2>
        <input
          value={newsTitle}
          onChange={(event) => setNewsTitle(event.target.value)}
          placeholder="عنوان الخبر"
          className="min-h-11 rounded-xl border border-line bg-paper px-3 text-sm"
        />
        <textarea
          value={newsBody}
          onChange={(event) => setNewsBody(event.target.value)}
          placeholder="تفاصيل الخبر"
          rows={3}
          className="rounded-xl border border-line bg-paper px-3 py-2 text-sm"
        />
        <button type="submit" className="min-h-11 justify-self-start rounded-full bg-green px-5 text-sm font-bold text-paper">
          نشر الخبر
        </button>
      </form>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-extrabold">صندوق المقترحات</h2>
        <span className="rounded-full bg-paper px-3 py-1 text-xs font-bold text-ink-soft">{waiting} بانتظار الرد · {suggestions.length} إجمالي</span>
      </div>
      <div className="grid gap-3">
        {suggestions.length === 0 ? (
          <p className="rounded-2xl border border-line bg-card p-4 text-sm text-muted">
            مفيش مقترحات لسه.
          </p>
        ) : (
          suggestions.map((item) => (
            <article key={item.id} className="rounded-2xl border border-line bg-card p-4">
              <p className="text-sm font-extrabold">
                {item.name} · {item.number} · {item.stage}
              </p>
              <p className="mt-1 text-xs font-bold text-muted">{item.reply.trim() ? "تم الرد" : "بانتظار الرد"}</p>
              <p className="mt-1 text-sm">{item.message}</p>
              <label className="mt-3 grid gap-1 text-xs font-bold text-muted">
                الرد
                <input
                  value={drafts[item.id] ?? item.reply}
                  onChange={(event) =>
                    setDrafts((current) => ({ ...current, [item.id]: event.target.value }))
                  }
                  className="min-h-11 rounded-xl border border-line bg-paper px-3 text-sm text-ink"
                />
              </label>
              <button
                type="button"
                onClick={() => answerSuggestion(item.id, drafts[item.id] ?? item.reply)}
                className="mt-2 min-h-11 rounded-full bg-ink px-4 text-sm font-bold text-paper"
              >
                حفظ الرد
              </button>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

function AdminStat({
  icon,
  label,
  value,
  detail,
}: {
  icon: ReactNode;
  label: string;
  value: number;
  detail?: string;
}) {
  return (
    <article className="admin-stat-card">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-gold">{icon}</span>
      <div>
        <p className="text-xs font-bold text-muted">{label}</p>
        <p className="text-2xl font-extrabold">{value}</p>
        {detail ? <p className="text-xs font-semibold text-muted">{detail}</p> : null}
      </div>
    </article>
  );
}

function LoginSheet({ onClose }: { onClose: () => void }) {
  const login = useUnion((state) => state.login);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="fixed inset-0 z-30 grid items-end bg-ink/50 p-4 sm:items-center" onClick={onClose}>
      <form
        className="mx-auto grid w-full max-w-md gap-3 rounded-2xl bg-card p-5"
        onClick={(event) => event.stopPropagation()}
        onSubmit={(event) => {
          event.preventDefault();
          const result = login(name, number);
          if (result) setError(result);
          else onClose();
        }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-extrabold">دخول</h2>
            <p className="text-sm text-muted">الاسم والرقم بس. لو الاسم admin هتدخل كأدمن.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-11 w-11 place-items-center rounded-full bg-paper"
            aria-label="إغلاق"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <label className="grid gap-1 text-sm font-bold">
          الاسم
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            className="min-h-11 rounded-xl border border-line bg-paper px-3"
          />
        </label>
        <label className="grid gap-1 text-sm font-bold">
          الرقم
          <input
            value={number}
            onChange={(event) => setNumber(event.target.value)}
            inputMode="numeric"
            className="min-h-11 rounded-xl border border-line bg-paper px-3"
          />
        </label>
        {error ? <p className="text-sm font-bold text-red">{error}</p> : null}
        <button type="submit" className="min-h-11 rounded-full bg-green font-bold text-paper">
          دخول
        </button>
      </form>
    </div>
  );
}
