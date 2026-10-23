import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowDownToLine,
  ArrowLeft,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  CircleHelp,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Lightbulb,
  MessageCircle,
  Newspaper,
  Plus,
  Pencil,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  X,
} from "lucide-react";
import { campaignAxes } from "@/lib/union-data";
import { facebookSourceUrl, officialDocuments, verifiedKnowledge } from "@/lib/knowledge";
import {
  useUnion,
  type ManagedContentItem,
  type ManagedContentType,
} from "@/lib/union-store";

export type PortalView =
  | "about"
  | "faq"
  | "hub"
  | "events"
  | "competitions"
  | "talents"
  | "initiatives"
  | "schools"
  | "achievements"
  | "laws"
  | "discipline"
  | "ask"
  | "desk";

const contentLabels: Record<ManagedContentType, string> = {
  news: "خبر",
  announcement: "إعلان",
  competition: "مسابقة",
  event: "فعالية",
  talent: "موهبة",
  initiative: "مبادرة",
  school: "مدرسة",
  achievement: "إنجاز",
};

const contentKinds: ManagedContentType[] = [
  "news",
  "announcement",
  "event",
  "competition",
  "talent",
  "initiative",
  "school",
  "achievement",
];

const quickItems: { id: PortalView | "news" | "gallery" | "offices" | "box" | "plan"; label: string; detail: string; icon: ReactNode; tone: string }[] = [
  { id: "news", label: "أخبار الاتحاد", detail: "آخر المستجدات", icon: <Newspaper />, tone: "blue" },
  { id: "competitions", label: "المسابقات", detail: "شروط ونتائج موثقة", icon: <Trophy />, tone: "gold" },
  { id: "events", label: "الفعاليات", detail: "مواعيد وتوثيق", icon: <CalendarDays />, tone: "teal" },
  { id: "talents", label: "مواهب الطلاب", detail: "مشاركة بمراجعة الإدارة", icon: <Sparkles />, tone: "violet" },
  { id: "initiatives", label: "المبادرات", detail: "أفكار وخدمة المجتمع", icon: <Lightbulb />, tone: "green" },
  { id: "schools", label: "مدارسنا", detail: "دليل المدارس المشاركة", icon: <Users />, tone: "blue" },
  { id: "achievements", label: "الإنجازات", detail: "توثيق مع مصدر", icon: <Trophy />, tone: "gold" },
  { id: "laws", label: "القوانين واللوائح", detail: "المستندات الرسمية", icon: <BookOpen />, tone: "navy" },
  { id: "discipline", label: "لائحة الانضباط", detail: "القرار المرفق كما هو", icon: <ShieldCheck />, tone: "red" },
  { id: "box", label: "صوت الطالب", detail: "اقتراحات وملاحظات", icon: <MessageCircle />, tone: "teal" },
  { id: "gallery", label: "معرض الصور", detail: "توثيق أنشطة الاتحاد", icon: <ImageIcon />, tone: "violet" },
  { id: "ask", label: "اسأل الاتحاد", detail: "إجابات من مصادر موثقة", icon: <Sparkles />, tone: "navy" },
  { id: "faq", label: "دليل الطالب", detail: "أسئلة وإجابات موثقة", icon: <CircleHelp />, tone: "teal" },
];

export function PortalSurface({
  view,
  onOpen,
}: {
  view: PortalView;
  onOpen: (view: string) => void;
}) {
  if (view === "about") return <AboutUnion />;
  if (view === "faq") return <StudentGuide onOpen={onOpen} />;
  if (view === "hub") return <UnionHub onOpen={onOpen} />;
  if (view === "events") return <EventsCenter />;
  if (view === "competitions") return <ContentDirectory type="competition" title="المسابقات" icon={<Trophy />} empty="ستظهر المسابقات بعد إضافة إعلان رسمي موثق." />;
  if (view === "talents") return <Talents />;
  if (view === "initiatives") return <Initiatives />;
  if (view === "schools") return <ContentDirectory type="school" title="مدارسنا" icon={<Users />} empty="سيُضاف دليل المدارس بعد اعتماد بيانات المشاركة." />;
  if (view === "achievements") return <ContentDirectory type="achievement" title="نجوم الاتحاد والإنجازات" icon={<Trophy />} empty="لا توجد إنجازات منشورة بمصدر معتمد حتى الآن." />;
  if (view === "laws") return <DocumentCenter />;
  if (view === "discipline") return <DisciplinePage />;
  if (view === "ask") return <AskUnion />;
  return <ContentDashboard onOpen={onOpen} />;
}

function AboutUnion() {
  const objectives = verifiedKnowledge[0];
  return <section>
    <PageIntro eyebrow="عن الاتحاد" title="اتحاد طلاب إدارة مصر القديمة التعليمية" detail="مساحة مدرسية لعرض أخبار الاتحاد وأنشطته ومصادره الرسمية، وإتاحة صوت الطلاب." icon={<Users />} />
    <div className="grid gap-4 md:grid-cols-2">
      <article className="portal-panel"><h2 className="font-extrabold">أهداف الخطة المرفقة</h2><p className="mt-2 text-xs text-muted">من خطة الاتحادات الطلابية للعام الدراسي 2026 / 2027 · الصفحة 2</p><ul className="mt-3 list-inside list-disc space-y-2 text-sm leading-7 text-ink-soft">{objectives.content.split("\n").map((goal) => <li key={goal}>{goal}</li>)}</ul><a href={objectives.source_url} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-10 items-center gap-2 text-sm font-extrabold text-teal underline">فتح الخطة الرسمية <ExternalLink className="h-4 w-4" /></a></article>
      <article className="portal-panel"><h2 className="font-extrabold">أقسام المنصة</h2><p className="mt-2 text-sm leading-7 text-ink-soft">تجد هنا المكاتب الطلابية، الخطة، الأخبار والفعاليات، المسابقات، المبادرات، إنجازات المدارس، معرض الصور، القوانين واللوائح، وقناة صوت الطالب.</p><p className="mt-4 rounded-xl bg-blue-soft p-3 text-xs leading-6 text-navy">تعرض المنصة المستندات المقدمة كما هي، وتوضح حالة المصدر عندما تحتاج الوثيقة إلى مراجعة أو نسخة قابلة للبحث.</p></article>
    </div>
  </section>;
}

function StudentGuide({ onOpen }: { onOpen: (view: string) => void }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("الكل");
  const plan = verifiedKnowledge[0];
  const discipline = officialDocuments.find((doc) => doc.id === "discipline-150");
  const faq = [
    { id: "plan", category: "الخطة والأنشطة", question: "ما الأهداف العامة لخطة الاتحادات الطلابية؟", answer: plan?.content ?? "افتح ملف خطة الاتحادات الطلابية للعام الدراسي 2026 / 2027.", source: plan?.source_title, sourceUrl: plan?.source_url, page: plan?.page, view: "plan" },
    { id: "activities", category: "الخطة والأنشطة", question: "أين أتابع الأنشطة والفعاليات؟", answer: "تعرض صفحة الفعاليات المواد التي أُضيفت إلى المنصة، مع رابط المصدر وتاريخه عند توفرهما. إذا لم يظهر إعلان، فلا توجد فعالية مسجلة هنا حتى الآن.", view: "events" },
    { id: "documents", category: "المستندات الرسمية", question: "أين أجد القرارات واللوائح؟", answer: `يضم مركز الوثائق ${officialDocuments.length} ملفات مرفقة. افتح النسخة الأصلية من البطاقة المناسبة للتحقق من نصها.`, view: "laws" },
    { id: "discipline", category: "المستندات الرسمية", question: "هل يفسر الموقع لائحة الانضباط؟", answer: discipline?.note ?? "يتيح الموقع الملف الأصلي فقط." , source: discipline?.title, sourceUrl: discipline?.sourceUrl, view: "discipline" },
    { id: "suggestion", category: "استخدام الموقع", question: "كيف أرسل فكرة أو ملاحظة؟", answer: "استخدم صفحة صوت الطالب لكتابة المشاركة. في هذه النسخة تُحفظ المشاركة على هذا الجهاز فقط، ولا تصل إلى إدارة المدرسة أو لوحة مشتركة.", view: "box" },
    { id: "talent", category: "استخدام الموقع", question: "كيف أشارك موهبتي؟", answer: "افتح صفحة مواهب الطلاب، واختر نوع المشاركة واكتب وصفًا مختصرًا بلا بيانات شخصية. الحفظ في النسخة الحالية محلي على الجهاز.", view: "talents" },
    { id: "content", category: "استخدام الموقع", question: "هل لوحة الإدارة تنشر المحتوى للمدارس؟", answer: "اللوحة الحالية معاينة محلية؛ ما يُضاف إليها يُحفظ في متصفح هذا الجهاز ولا يظهر لزوار الأجهزة الأخرى. النشر المشترك يتطلب ربط خادم وحسابات فعلية.", view: "desk" },
  ];
  const categories = ["الكل", ...new Set(faq.map((item) => item.category))];
  const filtered = faq.filter((item) => (category === "الكل" || item.category === category) && normalizeArabic(`${item.question} ${item.answer} ${item.category}`).includes(normalizeArabic(query.trim())));
  return <section>
    <PageIntro eyebrow="مرشد الاستخدام" title="دليل الطالب والأسئلة الشائعة" detail="إجابات قصيرة تساعدك على استخدام المنصة، مع روابط للمصادر الرسمية عند توفرها." icon={<CircleHelp />} />
    <label className="mb-3 flex min-h-11 max-w-xl items-center gap-2 rounded-xl border border-line bg-white px-3"><Search className="h-4 w-4 text-teal" /><span className="sr-only">ابحث في الأسئلة الشائعة</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث في الأسئلة والإجابات" className="min-w-0 flex-1 bg-transparent text-sm outline-none" /></label>
    <div className="mb-4 flex flex-wrap gap-2">{categories.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className={`min-h-10 rounded-full px-4 text-xs font-extrabold ${category === item ? "bg-navy text-white" : "bg-white text-ink-soft"}`}>{item}</button>)}</div>
    {filtered.length ? <div className="grid gap-3">{filtered.map((item) => <details key={item.id} className="portal-panel group"><summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-extrabold marker:hidden"><span><span className="mb-1 block text-[11px] font-bold text-teal">{item.category}</span>{item.question}</span><ArrowLeft className="h-4 w-4 shrink-0 -rotate-90 text-muted transition-transform group-open:rotate-90" /></summary><div className="mt-3 border-t border-line pt-3"><p className="whitespace-pre-line text-sm leading-7 text-ink-soft">{item.answer}</p>{item.source && item.sourceUrl ? <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex min-h-10 items-center gap-2 text-xs font-extrabold text-teal underline">{item.source}{item.page ? ` · صفحة ${item.page}` : ""}<ExternalLink className="h-3.5 w-3.5" /></a> : null}<button type="button" onClick={() => onOpen(item.view)} className="mt-2 block min-h-10 text-xs font-extrabold text-navy underline">فتح القسم المرتبط</button></div></details>)}</div> : <EmptyState text="لم نجد سؤالًا مطابقًا. جرّب عبارة أقصر أو اختر تصنيفًا آخر." />}
    <p className="mt-4 rounded-xl bg-blue-soft p-4 text-xs leading-6 text-navy">المعلومات التنظيمية والقانونية تُراجع من ملفاتها الأصلية. لا يضيف هذا الدليل مواعيد أو إجراءات غير واردة في مصدر موثق.</p>
  </section>;
}

function PageIntro({ eyebrow, title, detail, icon }: { eyebrow?: string; title: string; detail: string; icon?: ReactNode }) {
  return (
    <header className="mb-5 flex items-start gap-3">
      {icon ? <span className="portal-page-icon" aria-hidden="true">{icon}</span> : null}
      <div>
        {eyebrow ? <p className="text-xs font-extrabold text-teal">{eyebrow}</p> : null}
        <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">{title}</h1>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-muted">{detail}</p>
      </div>
    </header>
  );
}

function UnionHub({ onOpen }: { onOpen: (view: string) => void }) {
  const managed = useUnion((state) => state.managedContent);
  const published = managed.filter((item) => item.published);
  const counts = (type: ManagedContentType) => published.filter((item) => item.type === type).length;
  const areas = [
    ["news", "الأخبار", <Newspaper />, "مستجدات الاتحاد والإعلانات الرسمية", counts("news") + counts("announcement")],
    ["competitions", "المسابقات", <Trophy />, "فرص المشاركة وشروطها ونتائجها", counts("competition")],
    ["events", "الفعاليات", <CalendarDays />, "التقويم والتوثيق المصور", counts("event")],
    ["talents", "المواهب", <Sparkles />, "مشاركات طلابية تمر على المراجعة", counts("talent")],
    ["initiatives", "المبادرات", <Lightbulb />, "مبادرات الطلاب وخدمة المجتمع", counts("initiative")],
    ["schools", "المدارس", <Users />, "دليل المدارس بعد اعتماد بياناتها", counts("school")],
    ["achievements", "الإنجازات", <Trophy />, "أسماء ونتائج بمصدر رسمي", counts("achievement")],
  ] as const;

  return (
    <section>
      <PageIntro eyebrow="اتحاد الطلاب 360°" title="كل ما يخص الاتحاد في مكان واحد" detail="من الأخبار والفعاليات إلى اللوائح وصوت الطالب. تُعرض البيانات المضافة بعد إرفاق مصدرها ومراجعتها." icon={<Sparkles />} />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {areas.map(([id, title, icon, detail, count]) => (
          <button key={id} type="button" onClick={() => onOpen(id)} className="portal-feature-card text-right">
            <span className="portal-feature-icon">{icon}</span>
            <span className="flex-1">
              <span className="block text-base font-extrabold">{title}</span>
              <span className="mt-1 block text-sm leading-6 text-muted">{detail}</span>
            </span>
            <span className="portal-count">{count}</span>
            <ArrowLeft className="h-4 w-4 text-muted" aria-hidden="true" />
          </button>
        ))}
      </div>
      <div className="mt-5 rounded-2xl border border-line bg-white p-4 sm:p-5">
        <h2 className="font-extrabold">محاور الخطة الطلابية</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {campaignAxes.map((axis) => <span key={axis.id} className="rounded-full bg-paper px-3 py-2 text-xs font-bold text-ink-soft">{axis.title}</span>)}
        </div>
        <a href="/documents/unions-plan-2026-2027.pdf" target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-extrabold text-teal hover:underline">
          افتح ملف الخطة الرسمي <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

function ContentDirectory({ type, title, icon, empty }: { type: ManagedContentType; title: string; icon: ReactNode; empty: string }) {
  const items = useUnion((state) => state.managedContent).filter((item) => item.type === type && item.published);
  return (
    <section>
      <PageIntro eyebrow="منصة اتحاد الطلاب" title={title} detail="المحتوى المنشور يظهر بعد مراجعة الإدارة وإضافة مصدره." icon={icon} />
      {items.length ? <ContentCards items={items} /> : <EmptyState text={empty} />}
    </section>
  );
}

function ContentCards({ items }: { items: ManagedContentItem[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <article key={item.id} className="portal-content-card">
          {item.image ? <img src={item.image} alt={`صورة توضيحية: ${item.title}`} loading="lazy" decoding="async" className="h-48 w-full rounded-xl object-cover" /> : null}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-blue-soft px-3 py-1 text-[11px] font-extrabold text-navy">{contentLabels[item.type]}</span>
            {item.startDate ? <time className="text-xs text-muted" dateTime={item.startDate}>{item.startDate}{item.endDate ? ` – ${item.endDate}` : ""}</time> : null}
          </div>
          <h2 className="mt-2 text-lg font-extrabold">{item.title}</h2>
          {item.summary ? <p className="mt-2 text-sm leading-7 text-ink-soft">{item.summary}</p> : null}
          {item.content ? <p className="mt-2 whitespace-pre-line text-sm leading-7 text-ink-soft">{item.content}</p> : null}
          <SourceLine title={item.sourceTitle} url={item.sourceUrl} />
        </article>
      ))}
    </div>
  );
}

function SourceLine({ title, url }: { title: string; url: string }) {
  return (
    <div className="mt-4 border-t border-line pt-3 text-xs">
      <p className="font-bold text-muted">المصدر</p>
      <a href={url} target={url.startsWith("http") ? "_blank" : undefined} rel={url.startsWith("http") ? "noreferrer" : undefined} className="mt-1 inline-flex min-h-9 items-center gap-1 font-extrabold text-teal hover:underline">
        {title || url} <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
      </a>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return <div className="portal-empty"><span className="portal-empty-mark"><FileText /></span><p className="font-extrabold">لا توجد بيانات منشورة</p><p className="mt-1 text-sm text-muted">{text}</p></div>;
}

function EventsCenter() {
  const [month, setMonth] = useState("");
  const events = useUnion((state) => state.managedContent).filter((item) => item.type === "event" && item.published);
  const monthEvents = events.filter((item) => !month || !item.startDate || item.startDate.startsWith(month));
  return (
    <section>
      <PageIntro eyebrow="Event Center" title="الفعاليات والتقويم" detail="اختر شهرًا لعرض الفعاليات المعلنة. لن يظهر موعد أو مكان ما لم تضفه الإدارة مع مصدر موثق." icon={<CalendarDays />} />
      <label className="mb-4 inline-grid gap-1 text-xs font-bold text-muted">عرض شهر
        <input type="month" value={month} onChange={(event) => setMonth(event.target.value)} className="min-h-11 rounded-xl border border-line bg-white px-3 text-sm text-ink" />
      </label>
      {monthEvents.length ? <ContentCards items={monthEvents} /> : <EmptyState text="لا توجد فعاليات منشورة لهذا الشهر." />}
      <article className="mt-5 grid gap-4 rounded-2xl border border-line bg-white p-4 sm:grid-cols-[12rem_1fr] sm:p-5">
        <img src="/gallery/conference-banner.jpeg" alt="لافتة مؤتمر الاتحادات الطلابية للمراحل الثلاث" loading="lazy" decoding="async" className="h-40 w-full rounded-xl object-cover sm:h-full" />
        <div>
          <span className="rounded-full bg-teal-soft px-3 py-1 text-[11px] font-extrabold text-teal">توثيق مصور</span>
          <h2 className="mt-2 text-lg font-extrabold">مؤتمر الاتحادات الطلابية للمراحل الثلاث</h2>
          <p className="mt-1 text-sm leading-6 text-muted">التفاصيل التاريخية والمكانية غير مدونة في اللافتة المرفقة؛ يمكن مراجعة بقية الصور في المعرض.</p>
          <SourceLine title="لافتة المؤتمر ضمن الصور المرفقة" url="/gallery/conference-banner.jpeg" />
        </div>
      </article>
    </section>
  );
}

function Talents() {
  const addSuggestion = useUnion((state) => state.addSuggestion);
  const [kind, setKind] = useState("فن ورسم");
  const [text, setText] = useState("");
  const [status, setStatus] = useState("");
  const kinds = ["فن ورسم", "تصوير", "كتابة", "برمجة", "ابتكار", "مسرح وأداء", "موسيقى", "أخرى"];
  return (
    <section>
      <PageIntro eyebrow="مراجعة قبل النشر" title="مواهب الطلاب" detail="يمكنك إرسال وصف مختصر لموهبتك. تصل المشاركة للمراجعة ولا تُنشر تلقائيًا. لا تكتب اسمًا كاملًا أو رقمًا شخصيًا هنا." icon={<Sparkles />} />
      <div className="grid gap-5 lg:grid-cols-[1fr_22rem]">
        <div className="grid gap-3 sm:grid-cols-2">
          {kinds.map((label) => <div key={label} className="rounded-xl border border-line bg-white p-4"><p className="font-extrabold">{label}</p><p className="mt-1 text-xs text-muted">استقبال المشاركة للمراجعة</p></div>)}
        </div>
        <form className="portal-form" onSubmit={(event) => {
          event.preventDefault();
          const error = addSuggestion(text, `موهبة · ${kind}`);
          setStatus(error ?? "تم حفظ المشاركة للمراجعة على هذا الجهاز.");
          if (!error) setText("");
        }}>
          <h2 className="font-extrabold">شارك موهبتك</h2>
          <label className="grid gap-1 text-xs font-bold text-muted">نوع المشاركة
            <select value={kind} onChange={(event) => setKind(event.target.value)} className="min-h-11 rounded-xl border border-line bg-white px-3 text-sm text-ink">{kinds.map((item) => <option key={item}>{item}</option>)}</select>
          </label>
          <label className="grid gap-1 text-xs font-bold text-muted">وصف قصير
            <textarea value={text} onChange={(event) => setText(event.target.value)} rows={4} required minLength={4} maxLength={800} className="rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink" placeholder="اكتب نبذة عن موهبتك أو عملك، من غير بيانات شخصية." />
          </label>
          {status ? <p role="status" className="text-xs font-bold text-teal">{status}</p> : null}
          <button type="submit" className="portal-primary-button"><Send className="h-4 w-4" /> إرسال للمراجعة</button>
          <p className="text-[11px] leading-5 text-muted">المشاركة تحفظ محليًا في نسخة العرض الحالية. لا تُرسل إلى خادم مشترك.</p>
        </form>
      </div>
    </section>
  );
}

function Initiatives() {
  const items = useUnion((state) => state.managedContent).filter((item) => item.type === "initiative" && item.published);
  const reviewDoc = officialDocuments.find((doc) => doc.id === "initiative-khaly-balak");
  return (
    <section>
      <PageIntro eyebrow="مبادرات الطلاب" title="مبادرات لخدمة المجتمع" detail="تُنشر المبادرات بعد اعتماد بياناتها ومصدرها الرسمي." icon={<Lightbulb />} />
      {items.length ? <ContentCards items={items} /> : <EmptyState text="لا توجد مبادرات منشورة مرتبطة بمصدر معتمد حتى الآن." />}
      {reviewDoc ? <article className="mt-5 rounded-2xl border border-amber-300 bg-amber-50 p-4 sm:p-5">
        <p className="text-xs font-extrabold text-amber-800">ملف مرتبط بإدارة مصر القديمة وفق تأكيد مقدم الملف</p>
        <h2 className="mt-1 font-extrabold">{reviewDoc.title}</h2>
        <p className="mt-1 text-sm leading-6 text-amber-900">{reviewDoc.note}</p>
        <a href={reviewDoc.sourceUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex min-h-10 items-center gap-2 text-sm font-extrabold text-amber-900 underline">مراجعة المستند <ExternalLink className="h-4 w-4" /></a>
      </article> : null}
    </section>
  );
}

function DocumentCenter() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("الكل");
  const docs = officialDocuments.filter((doc) => doc.searchMode !== "review");
  const categories = ["الكل", ...new Set(docs.map((doc) => doc.category))];
  const filtered = docs.filter((doc) => (category === "الكل" || doc.category === category) && `${doc.title} ${doc.category} ${doc.sourceDate ?? ""}`.includes(query.trim()));
  const review = officialDocuments.filter((doc) => doc.searchMode === "review");
  return (
    <section>
      <PageIntro eyebrow="مركز المعرفة الرسمية" title="القوانين واللوائح والمستندات" detail="افتح المستند الأصلي كما ورد. البحث في هذه الصفحة يشمل العناوين والتصنيفات؛ الملفات المصورة تحتاج نسخة نصية أو OCR قبل إدخال محتواها للمساعد." icon={<BookOpen />} />
      <label className="flex min-h-11 max-w-xl items-center gap-2 rounded-xl border border-line bg-white px-3"><Search className="h-4 w-4 text-teal" /><span className="sr-only">البحث في الوثائق</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث باسم الوثيقة أو رقمها" className="min-w-0 flex-1 bg-transparent text-sm outline-none" /></label>
      <div className="my-3 flex flex-wrap gap-2">{categories.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className={`min-h-10 rounded-full px-4 text-xs font-extrabold ${category === item ? "bg-navy text-white" : "bg-white text-ink-soft"}`}>{item}</button>)}</div>
      {filtered.length ? <div className="grid gap-3 md:grid-cols-2">{filtered.map((doc) => <DocumentCard key={doc.id} doc={doc} />)}</div> : <EmptyState text="لا توجد وثائق تطابق البحث." />}
      {review.map((doc) => <article key={doc.id} className="mt-5 rounded-2xl border border-amber-300 bg-amber-50 p-4"><p className="text-xs font-extrabold text-amber-800">مرجع مرفق قيد المراجعة</p><h2 className="mt-1 font-extrabold">{doc.title}</h2><p className="mt-1 text-sm leading-6 text-amber-900">{doc.note}</p><a href={doc.sourceUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex min-h-10 items-center gap-2 text-sm font-extrabold text-amber-900 underline">عرض الملف <ExternalLink className="h-4 w-4" /></a></article>)}
      <p className="mt-5 text-xs leading-6 text-muted">لا يغيّر الموقع النصوص الرسمية. استخدم الملف الأصلي للتحقق من أي مادة أو إجراء.</p>
    </section>
  );
}

function DocumentCard({ doc }: { doc: (typeof officialDocuments)[number] }) {
  return (
    <article className="portal-document-card">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-soft text-navy"><FileText /></span>
      <div className="min-w-0 flex-1">
        <span className="text-[11px] font-extrabold text-teal">{doc.category}</span>
        <h2 className="mt-1 font-extrabold leading-6">{doc.title}</h2>
        {doc.sourceDate ? <p className="mt-1 text-xs text-muted">{doc.sourceDate}</p> : null}
        {doc.note ? <p className="mt-2 text-xs leading-5 text-muted">{doc.note}</p> : null}
        <p className="mt-2 text-[11px] font-bold text-muted">{doc.searchMode === "full-text" ? "النص قابل للتحديد والبحث داخل الملف" : "البيانات المفهرسة: عنوان الوثيقة فقط"} · {doc.pageCount} صفحة</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <a href={doc.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-full bg-navy px-4 text-xs font-extrabold text-white">عرض PDF <ExternalLink className="h-3.5 w-3.5" /></a>
          <a href={doc.sourceUrl} download className="inline-flex min-h-10 items-center gap-2 rounded-full bg-paper px-4 text-xs font-extrabold text-ink"><ArrowDownToLine className="h-3.5 w-3.5" /> تحميل</a>
        </div>
      </div>
    </article>
  );
}

function DisciplinePage() {
  const doc = officialDocuments.find((item) => item.id === "discipline-150");
  return (
    <section>
      <PageIntro eyebrow="المستند الأصلي" title="لائحة الانضباط" detail="يعرض هذا القسم ملف القرار المرفق دون إعادة صياغة نصه. لا يوجد هنا شرح قانوني أو تفسير للإجراءات." icon={<ShieldCheck />} />
      {doc ? <DocumentCard doc={doc} /> : null}
      <div className="mt-4 rounded-2xl border border-line bg-white p-4 text-sm leading-7 text-ink-soft">لأن النسخة الحالية مصوّرة ولا تحتوي على نص قابل للاستخراج، لم تُعرض مواد أو إجراءات من عندنا. افتح PDF الأصلي للاطلاع على النص.</div>
    </section>
  );
}

function normalizeArabic(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u064B-\u065F\u0670\u0640]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .toLocaleLowerCase("ar");
}

const stopWords = new Set(["ما", "ماذا", "كيف", "هل", "من", "في", "عن", "الى", "على", "هو", "هي", "و", "او", "مع", "الذي", "التي", "ده", "دي", "ايه", "لو", "ل", "لل"]);

function AskUnion() {
  const savedSources = useUnion((state) => state.knowledgeSources);
  const additions = useMemo(() => savedSources.filter((source) => source.published && source.content.trim()), [savedSources]);
  const corpus = useMemo(() => [
    ...verifiedKnowledge,
    ...additions.map((item) => ({ ...item, source_type: item.source_type, source_title: item.source_title, source_url: item.source_url, source_date: item.source_date, category: item.category, last_updated: item.last_updated, content: item.content })),
  ], [additions]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<{ text: string; sourceTitle?: string; sourceUrl?: string; page?: number; found: boolean } | null>(null);
  function respond(event: FormEvent) {
    event.preventDefault();
    const raw = normalizeArabic(question);
    const terms = raw.split(/[^\p{L}\p{N}]+/u).filter((word) => word.length > 1 && !stopWords.has(word));
    const ranked = corpus.map((source) => {
      const content = normalizeArabic(`${source.source_title} ${source.category} ${source.content}`);
      const score = terms.reduce((total, term) => total + (content.includes(term) ? 1 : 0), 0);
      return { source, score };
    }).sort((a, b) => b.score - a.score);
    const best = ranked[0];
    const minimum = terms.length < 2 ? 1 : Math.max(1, Math.ceil(terms.length * 0.28));
    if (best && best.score >= minimum) {
      setAnswer({ text: best.source.content, sourceTitle: best.source.source_title, sourceUrl: best.source.source_url, page: best.source.page, found: true });
    } else {
      setAnswer({ text: "لا أجد هذه المعلومة ضمن المصادر الرسمية المتاحة حاليًا.", found: false });
    }
  }
  return (
    <section className="mx-auto max-w-3xl">
      <PageIntro eyebrow="اسأل الاتحاد" title="مساعد بمصادر موثقة" detail="يبحث في مقتطفات مصادر الاتحاد المنشورة فقط. لا يستنتج مواد قانونية ولا يخمّن عند غياب مصدر." icon={<Sparkles />} />
      <form className="portal-form" onSubmit={respond}>
        <label htmlFor="union-question" className="font-extrabold">ما الذي تريد معرفته؟</label>
        <textarea id="union-question" value={question} onChange={(event) => setQuestion(event.target.value)} required minLength={2} maxLength={400} rows={3} className="rounded-xl border border-line bg-white px-3 py-2 text-sm" placeholder="مثال: ما أهداف خطة الاتحادات؟" />
        <div className="flex flex-wrap items-center justify-between gap-3"><p className="text-xs text-muted">المحتوى هنا استرجاع نصي موثق؛ لم يتم ربط خدمة توليد إجابات خارجية.</p><button type="submit" className="portal-primary-button"><Search className="h-4 w-4" /> ابحث في المصادر</button></div>
      </form>
      {answer ? <article aria-live="polite" className="mt-4 rounded-2xl border border-line bg-white p-5">
        <p className="text-xs font-extrabold text-teal">{answer.found ? "مقتطف من المصدر" : "لم يُعثر على إجابة"}</p>
        <p className="mt-2 whitespace-pre-line text-sm leading-8 text-ink-soft">{answer.text}</p>
        {answer.sourceTitle && answer.sourceUrl ? <div className="mt-4 border-t border-line pt-3"><p className="text-xs font-bold text-muted">المصدر{answer.page ? ` · الصفحة ${answer.page}` : ""}</p><a href={answer.sourceUrl} target="_blank" rel="noreferrer" className="mt-1 inline-flex min-h-10 items-center gap-2 text-sm font-extrabold text-teal underline">{answer.sourceTitle}<ExternalLink className="h-4 w-4" /></a></div> : <a href={facebookSourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex min-h-10 items-center gap-2 text-sm font-extrabold text-teal underline">تواصل مع المصدر الرسمي على Facebook<ExternalLink className="h-4 w-4" /></a>}
      </article> : null}
      <div className="mt-4 rounded-xl bg-blue-soft p-4 text-xs leading-6 text-navy">تُضاف المصادر إلى قاعدة المعرفة بعد مراجعتها. مستندات الانضباط المصوّرة متاحة للعرض، لكن نصها غير مفهرس للإجابة الآلية.</div>
    </section>
  );
}

function ContentDashboard({ onOpen }: { onOpen: (view: string) => void }) {
  const items = useUnion((state) => state.managedContent);
  const sources = useUnion((state) => state.knowledgeSources);
  const suggestions = useUnion((state) => state.suggestions);
  const addManagedContent = useUnion((state) => state.addManagedContent);
  const updateManagedContent = useUnion((state) => state.updateManagedContent);
  const removeManagedContent = useUnion((state) => state.removeManagedContent);
  const addKnowledgeSource = useUnion((state) => state.addKnowledgeSource);
  const updateKnowledgeSource = useUnion((state) => state.updateKnowledgeSource);
  const removeKnowledgeSource = useUnion((state) => state.removeKnowledgeSource);
  const session = useUnion((state) => state.session);
  const setLocalEditorMode = useUnion((state) => state.setLocalEditorMode);
  const answerSuggestion = useUnion((state) => state.answerSuggestion);
  const removeSuggestion = useUnion((state) => state.removeSuggestion);
  const [kind, setKind] = useState<ManagedContentType>("news");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [sourceTitle, setSourceTitle] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [image, setImage] = useState("");
  const [published, setPublished] = useState(false);
  const [error, setError] = useState("");
  const [editingContent, setEditingContent] = useState<ManagedContentItem | null>(null);
  const [knowledgeTitle, setKnowledgeTitle] = useState("");
  const [knowledgeUrl, setKnowledgeUrl] = useState("");
  const [knowledgeText, setKnowledgeText] = useState("");
  const [knowledgeCategory, setKnowledgeCategory] = useState("");
  const [knowledgeType, setKnowledgeType] = useState("مستند رسمي");
  const [knowledgeDate, setKnowledgeDate] = useState("");
  const [knowledgePublished, setKnowledgePublished] = useState(false);
  const [editingSource, setEditingSource] = useState<(typeof sources)[number] | null>(null);
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const pending = suggestions.filter((item) => !item.reply.trim());

  function saveContent(event: FormEvent) {
    event.preventDefault();
    if (!title.trim()) return setError("أضف عنوانًا قبل الحفظ.");
    if (published && (!sourceTitle.trim() || !sourceUrl.trim())) return setError("أضف اسم المصدر ورابطه قبل النشر.");
    const draft = { type: kind, title: title.trim(), summary: summary.trim(), content: content.trim(), sourceTitle: sourceTitle.trim(), sourceUrl: sourceUrl.trim(), startDate, endDate, image, published };
    if (editingContent) updateManagedContent(editingContent.id, draft);
    else addManagedContent(draft);
    setTitle(""); setSummary(""); setContent(""); setSourceTitle(""); setSourceUrl(""); setStartDate(""); setEndDate(""); setImage(""); setPublished(false); setError(""); setEditingContent(null);
  }

  function saveKnowledge(event: FormEvent) {
    event.preventDefault();
    if (!knowledgeTitle.trim() || !knowledgeText.trim()) return;
    if (knowledgePublished && !knowledgeUrl.trim()) return;
    const draft = { source_type: knowledgeType, source_title: knowledgeTitle.trim(), source_url: knowledgeUrl.trim(), source_date: knowledgeDate, content: knowledgeText.trim(), category: knowledgeCategory.trim() || "عام", published: knowledgePublished };
    if (editingSource) updateKnowledgeSource(editingSource.id, draft);
    else addKnowledgeSource(draft);
    setKnowledgeTitle(""); setKnowledgeUrl(""); setKnowledgeText(""); setKnowledgeCategory(""); setKnowledgeDate(""); setKnowledgePublished(false); setEditingSource(null);
  }

  function editContent(item: ManagedContentItem) {
    setEditingContent(item); setKind(item.type); setTitle(item.title); setSummary(item.summary); setContent(item.content); setSourceTitle(item.sourceTitle); setSourceUrl(item.sourceUrl); setStartDate(item.startDate); setEndDate(item.endDate); setImage(item.image); setPublished(item.published); setError("");
    document.getElementById("content-editor-title")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function editSource(item: (typeof sources)[number]) {
    setEditingSource(item); setKnowledgeTitle(item.source_title); setKnowledgeUrl(item.source_url); setKnowledgeText(item.content); setKnowledgeType(item.source_type); setKnowledgeCategory(item.category); setKnowledgeDate(item.source_date); setKnowledgePublished(item.published);
    document.getElementById("knowledge-editor-title")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function downloadBackup() {
    const state = useUnion.getState();
    const backup = {
      format: "old-cairo-student-union-local-backup",
      exportedAt: new Date().toISOString(),
      note: "نسخة محلية من البيانات المحفوظة في هذا المتصفح. لا تحتوي على جلسة تسجيل دخول.",
      data: {
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
      },
    };
    const file = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(file);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `نسخة-اتحاد-الطلاب-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <section>
      <PageIntro eyebrow="معاينة CMS" title="لوحة إدارة المحتوى" detail="إدارة الأخبار والمحتوى والمصادر ومراجعة مشاركات الطلاب من مساحة واحدة." icon={<ShieldCheck />} />
      <div className="mb-5 rounded-xl border border-amber-300 bg-amber-50 p-3 text-xs leading-6 text-amber-900"><strong>حالة النسخة الحالية:</strong> التعديلات تُحفظ داخل المتصفح فقط. المشروع المرفق لا يربط لوحة الإدارة بحسابات أو قاعدة بيانات مشتركة، لذلك لا تُعدّ هذه صلاحيات نشر فعلية.</div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-white p-3">
        <p className="text-sm leading-6 text-ink-soft">يمكن تشغيل أدوات التعديل المحلية لمراجعة تجربة الإدارة على هذا الجهاز فقط.</p>
        <button type="button" onClick={() => setLocalEditorMode(session?.role !== "admin")} className="min-h-11 rounded-full bg-navy px-4 text-xs font-extrabold text-white">{session?.role === "admin" ? "إيقاف وضع المعاينة" : "تشغيل وضع المعاينة المحلي"}</button>
      </div>
      <div className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardMetric label="المحتوى المنشور" value={items.filter((item) => item.published).length} />
        <DashboardMetric label="مسودات" value={items.filter((item) => !item.published).length} />
        <DashboardMetric label="مصادر معرفة" value={sources.length + verifiedKnowledge.length} />
        <DashboardMetric label="مشاركات للمراجعة" value={pending.length} />
      </div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-white p-3">
        <p className="text-xs leading-6 text-ink-soft">نزّل نسخة احتياطية من بيانات هذا المتصفح بصيغة JSON، بما فيها المحتوى والمصادر والمشاركات.</p>
        <button type="button" onClick={downloadBackup} className="min-h-11 rounded-full border border-navy px-4 text-xs font-extrabold text-navy"><ArrowDownToLine className="me-1 inline h-4 w-4" /> تنزيل نسخة احتياطية</button>
      </div>
      <div className="mb-5 flex flex-wrap gap-2">
        {([["offices", "المكاتب الطلابية"], ["plan", "الخطة"], ["gallery", "المعرض"], ["news", "الأخبار"]] as const).map(([target, label]) => <button key={target} type="button" onClick={() => onOpen(target)} className="min-h-10 rounded-full border border-line bg-white px-4 text-xs font-extrabold hover:border-teal">{label}</button>)}
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <form className="portal-form" onSubmit={saveContent}>
          <h2 id="content-editor-title" className="text-lg font-extrabold">{editingContent ? "تعديل المحتوى" : "إضافة محتوى"}</h2>
          <label className="grid gap-1 text-xs font-bold text-muted">نوع المحتوى<select value={kind} onChange={(event) => setKind(event.target.value as ManagedContentType)} className="min-h-11 rounded-xl border border-line bg-white px-3 text-sm text-ink">{contentKinds.map((item) => <option key={item} value={item}>{contentLabels[item]}</option>)}</select></label>
          <label className="grid gap-1 text-xs font-bold text-muted">العنوان<input value={title} onChange={(event) => setTitle(event.target.value)} required maxLength={140} className="min-h-11 rounded-xl border border-line bg-white px-3 text-sm text-ink" /></label>
          <label className="grid gap-1 text-xs font-bold text-muted">ملخص<textarea value={summary} onChange={(event) => setSummary(event.target.value)} rows={2} maxLength={400} className="rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink" /></label>
          <label className="grid gap-1 text-xs font-bold text-muted">التفاصيل<textarea value={content} onChange={(event) => setContent(event.target.value)} rows={3} maxLength={4000} className="rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink" /></label>
          <div className="grid gap-2 sm:grid-cols-2"><label className="grid gap-1 text-xs font-bold text-muted">المصدر<input value={sourceTitle} onChange={(event) => setSourceTitle(event.target.value)} className="min-h-11 rounded-xl border border-line bg-white px-3 text-sm text-ink" /></label><label className="grid gap-1 text-xs font-bold text-muted">رابط المصدر<input type="text" value={sourceUrl} onChange={(event) => setSourceUrl(event.target.value)} placeholder="رابط PDF أو إعلان رسمي" className="min-h-11 rounded-xl border border-line bg-white px-3 text-sm text-ink" /></label></div>
          <div className="grid gap-2 sm:grid-cols-2"><label className="grid gap-1 text-xs font-bold text-muted">تاريخ البداية<input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} className="min-h-11 rounded-xl border border-line bg-white px-3 text-sm text-ink" /></label><label className="grid gap-1 text-xs font-bold text-muted">تاريخ النهاية<input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} className="min-h-11 rounded-xl border border-line bg-white px-3 text-sm text-ink" /></label></div>
          <label className="grid gap-1 text-xs font-bold text-muted">رابط صورة (اختياري)<input value={image} onChange={(event) => setImage(event.target.value)} placeholder="مسار صورة موجودة أو رابطها" className="min-h-11 rounded-xl border border-line bg-white px-3 text-sm text-ink" /></label>
          <label className="flex items-center gap-2 text-sm font-bold"><input type="checkbox" checked={published} onChange={(event) => setPublished(event.target.checked)} /> نشر في الموقع بعد إرفاق المصدر</label>
          {error ? <p role="alert" className="text-xs font-bold text-red">{error}</p> : null}
          <div className="flex flex-wrap gap-2"><button type="submit" className="portal-primary-button"><Plus className="h-4 w-4" /> {editingContent ? "حفظ التعديل" : "حفظ المحتوى"}</button>{editingContent ? <button type="button" onClick={() => { setEditingContent(null); setTitle(""); setSummary(""); setContent(""); setSourceTitle(""); setSourceUrl(""); setStartDate(""); setEndDate(""); setImage(""); setPublished(false); setError(""); }} className="min-h-11 rounded-full border border-line px-4 text-xs font-extrabold">إلغاء</button> : null}</div>
        </form>

        <form className="portal-form" onSubmit={saveKnowledge}>
          <h2 id="knowledge-editor-title" className="text-lg font-extrabold">{editingSource ? "تعديل مصدر المعرفة" : "مصدر جديد لقاعدة المعرفة"}</h2>
          <label className="grid gap-1 text-xs font-bold text-muted">اسم المصدر<input value={knowledgeTitle} onChange={(event) => setKnowledgeTitle(event.target.value)} required className="min-h-11 rounded-xl border border-line bg-white px-3 text-sm text-ink" /></label>
          <div className="grid gap-2 sm:grid-cols-2"><label className="grid gap-1 text-xs font-bold text-muted">نوع المصدر<input value={knowledgeType} onChange={(event) => setKnowledgeType(event.target.value)} className="min-h-11 rounded-xl border border-line bg-white px-3 text-sm text-ink" /></label><label className="grid gap-1 text-xs font-bold text-muted">التصنيف<input value={knowledgeCategory} onChange={(event) => setKnowledgeCategory(event.target.value)} className="min-h-11 rounded-xl border border-line bg-white px-3 text-sm text-ink" /></label></div>
          <div className="grid gap-2 sm:grid-cols-2"><label className="grid gap-1 text-xs font-bold text-muted">رابط المصدر<input value={knowledgeUrl} onChange={(event) => setKnowledgeUrl(event.target.value)} className="min-h-11 rounded-xl border border-line bg-white px-3 text-sm text-ink" /></label><label className="grid gap-1 text-xs font-bold text-muted">تاريخ المصدر<input value={knowledgeDate} onChange={(event) => setKnowledgeDate(event.target.value)} placeholder="إن وجد" className="min-h-11 rounded-xl border border-line bg-white px-3 text-sm text-ink" /></label></div>
          <label className="grid gap-1 text-xs font-bold text-muted">النص المفهرس<textarea value={knowledgeText} onChange={(event) => setKnowledgeText(event.target.value)} required rows={5} className="rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink" /></label>
          <label className="flex items-center gap-2 text-sm font-bold"><input type="checkbox" checked={knowledgePublished} onChange={(event) => setKnowledgePublished(event.target.checked)} /> إتاحة النص للمساعد بعد المراجعة</label>
          <div className="flex flex-wrap gap-2"><button type="submit" className="portal-primary-button"><Plus className="h-4 w-4" /> {editingSource ? "حفظ التعديل" : "حفظ المصدر"}</button>{editingSource ? <button type="button" onClick={() => { setEditingSource(null); setKnowledgeTitle(""); setKnowledgeUrl(""); setKnowledgeText(""); setKnowledgeCategory(""); setKnowledgeDate(""); setKnowledgePublished(false); }} className="min-h-11 rounded-full border border-line px-4 text-xs font-extrabold">إلغاء</button> : null}</div>
        </form>
      </div>

      <section className="mt-6 grid gap-5 xl:grid-cols-2">
        <div className="portal-panel">
          <div className="flex items-center justify-between gap-3"><h2 className="font-extrabold">المحتوى المسجل</h2><span className="text-xs text-muted">{items.length} عنصر</span></div>
          {items.length ? <div className="mt-3 grid gap-2">{items.map((item) => <article key={item.id} className="flex items-start gap-3 rounded-xl bg-paper p-3"><div className="min-w-0 flex-1"><p className="text-xs font-bold text-teal">{contentLabels[item.type]} · {item.published ? "منشور" : "مسودة"}</p><p className="mt-1 font-extrabold">{item.title}</p><p className="mt-1 text-xs text-muted">{item.sourceTitle || "من دون مصدر"}</p></div><button type="button" onClick={() => editContent(item)} className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-navy hover:bg-white" aria-label={`تعديل ${item.title}`}><Pencil className="h-4 w-4" /></button><button type="button" onClick={() => removeManagedContent(item.id)} className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-red hover:bg-white" aria-label={`حذف ${item.title}`}><X className="h-4 w-4" /></button></article>)}</div> : <p className="mt-3 rounded-xl bg-paper p-4 text-sm text-muted">لا توجد عناصر مضافة بعد.</p>}
        </div>
        <div className="portal-panel">
          <div className="flex items-center justify-between gap-3"><h2 className="font-extrabold">مصادر أضيفت للمساعد</h2><span className="text-xs text-muted">{sources.length} مصدر</span></div>
          {sources.length ? <div className="mt-3 grid gap-2">{sources.map((source) => <article key={source.id} className="flex items-start gap-3 rounded-xl bg-paper p-3"><div className="min-w-0 flex-1"><p className="text-xs font-bold text-teal">{source.category} · {source.published ? "مفهرس" : "قيد المراجعة"}</p><p className="mt-1 font-extrabold">{source.source_title}</p><p className="mt-1 line-clamp-2 text-xs text-muted">{source.content}</p></div><button type="button" onClick={() => editSource(source)} className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-navy hover:bg-white" aria-label={`تعديل المصدر ${source.source_title}`}><Pencil className="h-4 w-4" /></button><button type="button" onClick={() => removeKnowledgeSource(source.id)} className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-red hover:bg-white" aria-label={`حذف المصدر ${source.source_title}`}><X className="h-4 w-4" /></button></article>)}</div> : <p className="mt-3 rounded-xl bg-paper p-4 text-sm text-muted">لا توجد مصادر أضيفت من اللوحة.</p>}
        </div>
      </section>

      <section className="portal-panel mt-5">
        <div className="flex flex-wrap items-center justify-between gap-2"><h2 className="font-extrabold">صوت الطالب — مراجعة المشاركات</h2><span className="text-xs text-muted">{pending.length} تنتظر المراجعة</span></div>
        {suggestions.length ? <div className="mt-3 grid gap-3">{suggestions.map((item) => <SuggestionReview key={item.id} item={item} reply={replyDrafts[item.id] ?? item.reply} onChange={(value) => setReplyDrafts((drafts) => ({ ...drafts, [item.id]: value }))} onSave={() => answerSuggestion(item.id, replyDrafts[item.id] ?? item.reply)} onRemove={() => removeSuggestion(item.id)} />)}</div> : <p className="mt-3 rounded-xl bg-paper p-4 text-sm text-muted">لا توجد مشاركات محفوظة.</p>}
      </section>
      <div className="mt-5 flex flex-wrap items-center gap-3 rounded-xl bg-blue-soft p-4 text-xs leading-6 text-navy"><CheckCircle2 className="h-5 w-5 shrink-0" /><span>المحتوى المنشور والمصادر هنا محلية في المتصفح. قبل الاستخدام الرسمي يلزم ربطها بنظام صلاحيات وخادم نشر مشترك.</span><a href={facebookSourceUrl} target="_blank" rel="noreferrer" className="font-extrabold underline">مصدر Facebook الرسمي</a></div>
    </section>
  );
}

function SuggestionReview({ item, reply, onChange, onSave, onRemove }: { item: { id: string; stage: string; message: string; reply: string; createdAt: string }; reply: string; onChange: (value: string) => void; onSave: () => void; onRemove: () => void }) {
  return <article className="rounded-xl border border-line p-3"><p className="text-xs font-extrabold text-teal">{item.stage} · مشاركة مجهولة</p><p className="mt-2 whitespace-pre-line text-sm leading-6">{item.message}</p><label className="mt-3 grid gap-1 text-xs font-bold text-muted">رد الإدارة (لا يُنشر تلقائيًا)<textarea value={reply} onChange={(event) => onChange(event.target.value)} rows={2} className="rounded-lg border border-line bg-white p-2 text-sm text-ink" /></label><div className="mt-2 flex gap-2"><button type="button" onClick={onSave} className="min-h-10 rounded-full bg-navy px-4 text-xs font-extrabold text-white">حفظ الرد</button><button type="button" onClick={onRemove} className="min-h-10 rounded-full bg-red-soft px-4 text-xs font-extrabold text-red">حذف</button></div></article>;
}

function DashboardMetric({ label, value }: { label: string; value: number }) {
  return <article className="portal-metric"><span className="text-2xl font-black text-navy">{value}</span><span className="text-xs font-bold text-muted">{label}</span></article>;
}

export function QuickAccess({ onOpen }: { onOpen: (view: string) => void }) {
  return <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4">
    {quickItems.map((item) => <button key={item.id} type="button" onClick={() => onOpen(item.id)} className={`quick-access-card ${item.tone}`}><span className="quick-access-icon" aria-hidden="true">{item.icon}</span><span className="min-w-0 text-right"><span className="block truncate text-sm font-extrabold">{item.label}</span><span className="mt-0.5 block truncate text-[10px] text-muted">{item.detail}</span></span><ArrowLeft className="ms-auto h-4 w-4 shrink-0 text-muted" aria-hidden="true" /></button>)}
  </div>;
}

export function OfficialDocumentStrip({ onOpen }: { onOpen: (view: string) => void }) {
  return <button type="button" onClick={() => onOpen("laws")} className="flex min-h-12 w-full items-center justify-between gap-3 rounded-xl border border-line bg-white px-4 text-right"><span className="flex items-center gap-2 text-sm font-extrabold"><BookOpen className="h-4 w-4 text-teal" /> مركز اللوائح والقوانين</span><span className="text-xs font-bold text-muted">{officialDocuments.length} ملفات مرفقة <ArrowLeft className="ms-1 inline h-3.5 w-3.5" /></span></button>;
}
