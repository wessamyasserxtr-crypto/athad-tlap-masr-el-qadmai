export type StageId = "primary" | "prep" | "secondary";
export type RoleId =
  | "amin"
  | "deputy"
  | "culture"
  | "sports"
  | "social"
  | "art"
  | "science";

export type Member = {
  role: RoleId;
  name: string;
  votes: number | null;
  photo?: string;
};

export type Office = {
  id: StageId;
  label: string;
  note: string;
  members: Member[];
};

export type PlanItem = {
  id: string;
  month: string;
  text: string;
  done: boolean;
};

export type NewsItem = {
  id: string;
  title: string;
  body: string;
  date: string;
  category?: string;
  sourceTitle?: string;
  sourceUrl?: string;
  image?: string;
};

export type SchoolStory = {
  id: string;
  schoolName: string;
  stage: StageId;
  axisId: string;
  title: string;
  summary: string;
  impact: string;
  date: string;
};

export type Suggestion = {
  id: string;
  name: string;
  number: string;
  stage: string;
  message: string;
  reply: string;
  createdAt: string;
};

export type Album = "conference" | "primary" | "prep" | "secondary" | "theme";

export type Photo = {
  id: string;
  album: Album;
  src: string;
  caption: string;
};

export const roles: { id: RoleId; title: string }[] = [
  { id: "amin", title: "الأمين" },
  { id: "deputy", title: "الأمين المساعد" },
  { id: "culture", title: "اللجنة الثقافية" },
  { id: "sports", title: "اللجنة الرياضية" },
  { id: "social", title: "اللجنة الاجتماعية" },
  { id: "art", title: "اللجنة الفنية" },
  { id: "science", title: "اللجنة العلمية" },
];

export const roleTitle = (id: RoleId) =>
  roles.find((role) => role.id === id)?.title ?? id;

const line = (
  amin: [string, number],
  deputy: [string, number],
  culture: [string, number],
  sports: [string, number],
  social: [string, number | null],
  art: [string, number],
  science: [string, number],
): Member[] => [
  { role: "amin", name: amin[0], votes: amin[1] },
  { role: "deputy", name: deputy[0], votes: deputy[1] },
  { role: "culture", name: culture[0], votes: culture[1] },
  { role: "sports", name: sports[0], votes: sports[1] },
  { role: "social", name: social[0], votes: social[1] },
  { role: "art", name: art[0], votes: art[1] },
  { role: "science", name: science[0], votes: science[1] },
];

export const seedOffices: Office[] = [
  {
    id: "primary",
    label: "الابتدائي",
    note: "المكتب التنفيذي للمرحلة الابتدائية. يبدأ الترتيب من اليمين بالأمين ثم الأمين المساعد فاللجان.",
    members: line(
      ["سيد مصطفى", 13],
      ["فريدة ياسر", 17],
      ["حبيبة كريم جمال", 16],
      ["إلياس محمود", 19],
      ["ملك عمر الأمير", 17],
      ["حمزة شريف موسى", 23],
      ["إنجي محمد فوزي", 23],
    ),
  },
  {
    id: "prep",
    label: "الإعدادي",
    note: "المكتب التنفيذي للمرحلة الإعدادية. يبدأ الترتيب من اليمين بالأمين ثم الأمين المساعد فاللجان.",
    members: line(
      ["وسام ياسر عبد الحميد صديق", 11],
      ["ريهام رشدي محمد", 11],
      ["محمد محمود فكري", 16],
      ["مريم عمرو وطني", 13],
      ["مايا كريم", 12],
      ["ورد محمد", 16],
      ["جودي أحمد", 16],
    ),
  },
  {
    id: "secondary",
    label: "الثانوي",
    note: "المكتب التنفيذي لمرحلة الثانوي من غير صور. اللجنة الاجتماعية متروكة فارغة وقابلة للتعديل من الإدارة.",
    members: line(
      ["طه محمد السيد", 18],
      ["روميساء أبو العز", 10],
      ["عظماء خالد", 20],
      ["جرجس إيهاب", 10],
      ["", null],
      ["نورهان محمد", 10],
      ["حنين طارق", 20],
    ),
  },
];

export type CampaignAxis = {
  id: string;
  symbol: string;
  title: string;
  meaning: string;
  heritage: string;
  ideaTitle: string;
  idea: string;
  boardParts: string[];
  steps: string[];
  materials: string[];
  slogan: string;
};

export const campaignAxes: CampaignAxis[] = [
  {
    id: "identity",
    symbol: "𓆣",
    title: "تعزيز الهوية الوطنية",
    meaning: "يتعرف تاريخ مصر وحضارتها، ويعتز بهويته وقيمه وانتمائه لوطنه.",
    heritage: "استخدمي خريطة مصر أو شكل البردية كإطار، واختاري حكاية أو معلمًا من مصر القديمة ومصر الحديثة.",
    ideaTitle: "جذورنا تحكي",
    idea: "لوحة تفاعلية تعرض خريطة مصر، ويضيف الطلاب بطاقة قصيرة عن مكان أو حكاية مصرية وقيمة يتعلمونها منها.",
    boardParts: ["خريطة مصر", "حكاية مكان أو أثر", "قيمة نتعلمها", "بطاقات يضيفها الطلاب"],
    steps: ["اختاروا حكايات موثوقة عن أماكن مصرية.", "اربطوا كل حكاية بقيمة أو درس للحياة اليوم.", "اعرضوا الخريطة واتركوا مساحة لمشاركة الطلاب."],
    materials: ["ورق مقوى", "خريطة مطبوعة أو مرسومة", "ألوان وبطاقات"],
    slogan: "جذورنا في مصر، وخطوتنا تصنع المستقبل.",
  },
  {
    id: "global",
    symbol: "𓂀",
    title: "تنمية الوعي العالمي",
    meaning: "يتعرف ثقافات الشعوب، ويحترم التنوع، ويتواصل بإيجابية مع الآخرين.",
    heritage: "ضعي مصر في مركز التصميم، واجعلي حولها نوافذ على ثقافات العالم مع رمز فرعوني صغير كإطار بصري.",
    ideaTitle: "مصر تلتقي العالم",
    idea: "خريطة حائط يختار فيها كل فريق بلدًا، ويعرض معلومة موثوقة عن ثقافته ثم يذكر قيمة إنسانية مشتركة.",
    boardParts: ["خريطة العالم ومصر في مركزها", "بطاقات ثقافية قصيرة", "قيمة مشتركة", "سؤال للتعارف"],
    steps: ["قسّموا الطلاب إلى فرق صغيرة.", "يختار كل فريق بلدًا ويجمع ثلاث معلومات موثوقة.", "يعرض الفريق أوجه التشابه والاختلاف باحترام."],
    materials: ["خريطة", "بطاقات ملونة", "مصادر مناسبة لعمر الطلاب"],
    slogan: "نعتز بجذورنا، ونحترم تنوع العالم.",
  },
  {
    id: "leadership",
    symbol: "𓋹",
    title: "القيادة والمسؤولية",
    meaning: "يبادر، ويشارك في اتخاذ القرار، ويتحمل مسؤولية دوره في الفريق.",
    heritage: "استخدمي شكل الأعمدة أو الخرطوش كإطار للأدوار؛ الفكرة أن كل طالب يضيف دعامة للفريق.",
    ideaTitle: "من فكرة إلى قرار",
    idea: "مجلس طلابي مصغّر يختار مشكلة بسيطة في المدرسة، ويقارن حلولها، ثم يصوت على خطوة قابلة للتنفيذ.",
    boardParts: ["ما المشكلة؟", "أفكار الطلاب", "الحل الذي اختير", "من المسؤول؟ ومتى نتابع؟"],
    steps: ["اجمعوا اقتراحات الطلاب حول موضوع واحد.", "ناقشوا الحلول وحددوا مزايا كل حل.", "صوّتوا على خطوة صغيرة ووزعوا المسؤوليات."],
    materials: ["لوحة أو سبورة", "أوراق تصويت", "أقلام"],
    slogan: "القائد يسمع، يشارك، ويتحمل المسؤولية.",
  },
  {
    id: "citizenship",
    symbol: "𓊖",
    title: "قيم المواطنة",
    meaning: "يحترم الرأي الآخر، ويتحاور، ويتعاون، ويتقبل الاختلاف.",
    heritage: "يمكن زخرفة حواف اللوحة بنقوش هندسية مصرية، مع إبقاء الرسائل واضحة وسهلة القراءة.",
    ideaTitle: "ميزان الاحترام",
    idea: "لوحة تفاعلية يضيف عليها الطلاب مواقف قصيرة توضّح كيف نحول الاختلاف إلى حوار وتعاون.",
    boardParts: ["أسمعك", "أحترم اختلافك", "نبحث عن حل", "موقف إيجابي من المدرسة"],
    steps: ["اكتبوا مواقف يومية من المدرسة دون ذكر أسماء.", "اقترحوا ردًا يحترم الجميع لكل موقف.", "اختاروا تعهدًا جماعيًا وراجعوا تطبيقه أسبوعيًا."],
    materials: ["بطاقات", "ورق مقوى", "أقلام وألوان"],
    slogan: "اختلافنا مساحة للحوار، واحترامنا أساس قوتنا.",
  },
  {
    id: "digital",
    symbol: "𓏲",
    title: "الوعي الرقمي",
    meaning: "يستخدم الإنترنت والتكنولوجيا بأمان، ويتحقق من المعلومات ويحمي بياناته.",
    heritage: "امزجي إطارًا مستوحى من البردية مع رموز رقمية حديثة؛ التراث هنا خلفية بصرية لا بديل عن المعلومة الصحيحة.",
    ideaTitle: "قبل ما أشارك، أتحقق",
    idea: "ملصق يعلّم الطلاب أربع خطوات قبل تداول أي خبر: أتوقف، أراجع المصدر والتاريخ، أتحقق، ثم أقرر.",
    boardParts: ["من نشر المعلومة؟", "متى نُشرت؟", "هل تؤكدها مصادر موثوقة؟", "كيف أحمي بياناتي؟"],
    steps: ["ناقشوا مثالًا تدريبيًا غير شخصي.", "طبّقوا خطوات التحقق على المثال.", "اكتبوا قاعدة أمان واحدة يلتزم بها كل طالب."],
    materials: ["لوحة", "بطاقات أمثلة تعليمية", "أيقونات بسيطة"],
    slogan: "فكّر، تحقّق، ثم شارك بأمان.",
  },
  {
    id: "community",
    symbol: "𓇳",
    title: "المشاركة المجتمعية",
    meaning: "يشارك في مبادرات تخدم المدرسة والمجتمع وتحافظ على البيئة.",
    heritage: "استلهمي من النيل والطبيعة المصرية في الألوان والرسوم، واربطوا التصميم بفعل واقعي داخل المدرسة.",
    ideaTitle: "مدرستنا أجمل",
    idea: "مبادرة طلابية تختار مساحة واحدة في المدرسة لتحسينها، ثم توثّق أثر العمل قبل التنفيذ وبعده.",
    boardParts: ["المكان الذي نريد تحسينه", "فريق العمل", "خطواتنا", "الأثر بعد التنفيذ"],
    steps: ["حددوا احتياجًا واضحًا بموافقة المدرسة.", "وزعوا الأدوار والمواد المتاحة.", "نفذوا المبادرة وسجلوا ما تغير وما تعلمتموه."],
    materials: ["خامات متاحة وآمنة", "قائمة مهام", "لوحة متابعة"],
    slogan: "خطوة مننا… أثرها لمدرستنا ومجتمعنا.",
  },
  {
    id: "innovation",
    symbol: "𓁹",
    title: "الإبداع والابتكار",
    meaning: "يقدم أفكارًا جديدة ويجرب حلولًا عملية للمشكلات والتحديات.",
    heritage: "اجعلي التصميم يجمع بين ورق البردي في الإطار ورسومات نماذج الطلاب في الوسط؛ الفكرة الجديدة هي البطل.",
    ideaTitle: "فكرة صغيرة، تغيير كبير",
    idea: "تحدي تصميم نموذج أولي من خامات نظيفة معاد استخدامها لحل مشكلة مدرسية بسيطة.",
    boardParts: ["المشكلة", "الفكرة", "رسم النموذج", "كيف نعرف أن الحل نجح؟"],
    steps: ["يحدد كل فريق مشكلة صغيرة يلاحظها في المدرسة.", "يرسم حلًا بسيطًا ويبني نموذجًا آمنًا.", "يعرض الفريق فكرته ويتلقى ملاحظات لتحسينها."],
    materials: ["ورق وكرتون نظيف", "مقص آمن بإشراف", "ألوان وشريط لاصق"],
    slogan: "نلاحظ المشكلة، ونبتكر لها حلًا.",
  },
  {
    id: "exchange",
    symbol: "𓏞",
    title: "تبادل الخبرات",
    meaning: "يتعلم من تجارب الآخرين ويشارك خبراته وأفكاره ليستفيد الجميع.",
    heritage: "صممي بطاقات الخبرة كأنها لفائف بردي صغيرة، واجعلي لكل مدرسة أو فريق مساحة يروي فيها تجربته.",
    ideaTitle: "خبرة تنتقل",
    idea: "ركن تتبادل فيه الفصول بطاقة واحدة عن نشاط نجح معها: ماذا فعلوا؟ ما الذي تعلموه؟ وما النصيحة لفصل آخر؟",
    boardParts: ["النشاط", "ما الذي نجح؟", "ما الذي تعلمناه؟", "نصيحة لفصل آخر"],
    steps: ["يختار كل فصل تجربة حقيقية قصيرة.", "يكتب بطاقة واضحة مع نتيجة أو صورة للنشاط.", "تتبادل الفصول البطاقات وتختار فكرة قابلة للتطبيق."],
    materials: ["بطاقات ورقية", "لوحة عرض", "صور اختيارية بموافقة المدرسة"],
    slogan: "خبرة نتشاركها، وخطوة جديدة نبدأها.",
  },
];

export const goals = campaignAxes.map((axis) => `${axis.title}: ${axis.meaning}`);

export const seedPlan: PlanItem[] = [
  { id: "oct-1", month: "أكتوبر", text: "تشكيل مجلس الاتحاد على مستوى المدرسة", done: true },
  { id: "oct-2", month: "أكتوبر", text: "الاشتراك في مؤتمر الاتحادات على مستوى الإدارة", done: true },
  { id: "oct-3", month: "أكتوبر", text: "الاحتفال بأعياد حرب أكتوبر المجيدة", done: false },
  { id: "oct-4", month: "أكتوبر", text: "ندوة: الاتحادات الطلابية ودورها في بناء شخصية الطالب", done: false },
  { id: "oct-5", month: "أكتوبر", text: "تنفيذ مبادرة مصر في عيون طلابها", done: false },
  { id: "nov-1", month: "نوفمبر", text: "الاجتماعات الدورية ومتابعة أعمال اللجان", done: false },
  { id: "nov-2", month: "نوفمبر", text: "مسابقات شعارات ولوحات عن الوعي بالقضايا الوطنية", done: false },
  { id: "nov-3", month: "نوفمبر", text: "ورشة: كيف تكون قائدًا طلابيًا ناجحًا", done: false },
  { id: "nov-4", month: "نوفمبر", text: "مسابقة دوري المكاتب التنفيذية", done: false },
  { id: "nov-5", month: "نوفمبر", text: "مسابقة أجمل فصل", done: false },
  { id: "nov-6", month: "نوفمبر", text: "تنفيذ المسابقات الواردة: دوري المكاتب التنفيذية والطالب المثالي وغيرها", done: false },
  { id: "dec-1", month: "ديسمبر", text: "الاجتماعات الدورية ومتابعة أعمال اللجان", done: false },
  { id: "dec-2", month: "ديسمبر", text: "ندوة: معًا نبني الشخصية القوية", done: false },
  { id: "dec-3", month: "ديسمبر", text: "حملة نظافة وتجميل المدرسة", done: false },
  { id: "dec-4", month: "ديسمبر", text: "ورشة الاستخدام الآمن للتكنولوجيا ومواقع التواصل", done: false },
  { id: "dec-5", month: "ديسمبر", text: "ندوة الاستذكار الجيد", done: false },
  { id: "jan-1", month: "يناير", text: "الاجتماعات الدورية ومتابعة أعمال اللجان", done: false },
  { id: "jan-2", month: "يناير", text: "معسكر عمل خلال إجازة نصف العام", done: false },
  { id: "jan-3", month: "يناير", text: "تقييم إنجازات الاتحادات خلال الفصل الدراسي الأول", done: false },
  { id: "jan-4", month: "يناير", text: "مجلة حائطية عن مخاطر الشائعات الرقمية", done: false },
  { id: "feb-1", month: "فبراير", text: "الاجتماعات الدورية ومتابعة أعمال اللجان", done: false },
  { id: "feb-2", month: "فبراير", text: "تكريم الطلاب المتفوقين من نتيجة الفصل الأول", done: false },
  { id: "feb-3", month: "فبراير", text: "ندوة دور الأنشطة المدرسية في بناء وعي الطالب", done: false },
  { id: "feb-4", month: "فبراير", text: "مسابقات الرائد المثالي والرائد العام", done: false },
  { id: "feb-5", month: "فبراير", text: "ندوة الاحتفال بشهر رمضان", done: false },
  { id: "mar-1", month: "مارس", text: "الاجتماعات الدورية ومتابعة أعمال اللجان", done: false },
  { id: "mar-2", month: "مارس", text: "قافلة توعية صحية عن النظافة والتغذية السليمة", done: false },
  { id: "mar-3", month: "مارس", text: "الاحتفال بعيد الأم ويوم الشهيد", done: false },
  { id: "mar-4", month: "مارس", text: "ندوة: مصر وطن يسكن في قلوبنا", done: false },
  { id: "mar-5", month: "مارس", text: "تنفيذ المسابقات والنشرات الواردة", done: false },
  { id: "apr-1", month: "أبريل", text: "الاجتماعات الدورية ومتابعة أعمال اللجان", done: false },
  { id: "apr-2", month: "أبريل", text: "محاضرة عن الآثار الإيجابية للتقدم التكنولوجي", done: false },
  { id: "apr-3", month: "أبريل", text: "ندوة أهمية التفكير العلمي في مواجهة التحديات", done: false },
  { id: "apr-4", month: "أبريل", text: "الاشتراك في معرض ختام الأنشطة", done: false },
  { id: "apr-5", month: "أبريل", text: "تنفيذ المسابقات والنشرات الواردة", done: false },
  { id: "may-1", month: "مايو", text: "الاجتماع الختامي لمجلس الاتحاد لتقييم العام", done: false },
  { id: "may-2", month: "مايو", text: "حفل ختامي لتكريم المتميزين في الأنشطة", done: false },
  { id: "may-3", month: "مايو", text: "تقرير شامل عن إنجازات الاتحادات في بناء شخصية الطالب", done: false },
  { id: "sum-1", month: "يونيو — أغسطس", text: "برامج ومشروعات الأنشطة والنوادي الصيفية", done: false },
];

export const months = [
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو — أغسطس",
];

export const seedNews: NewsItem[] = [
  {
    id: "news-results",
    title: "اعتماد المكاتب التنفيذية للمراحل الثلاث",
    body: "خلصت نتيجة الفرز، والمكاتب التنفيذية للابتدائي والإعدادي والثانوي اتسجلت على المنصة. اللجنة الاجتماعية في الثانوي هتتضاف بعد الاعتماد.",
    date: "2026-10-22",
    category: "أخبار الاتحاد",
    sourceTitle: "صورة سجل التصويت المرفقة",
    sourceUrl: "/gallery/conference-board.jpeg",
    image: "/gallery/conference-ballot.jpeg",
  },
  {
    id: "news-conference",
    title: "مؤتمر الاتحادات الطلابية للمراحل الثلاث",
    body: "اتعقد المؤتمر تحت شعار طالب عالمي متجذر، وجمع ابتدائي وإعدادي وثانوي في يوم فرز واحد.",
    date: "2026-10-22",
    category: "فعاليات",
    sourceTitle: "لافتة مؤتمر الاتحادات الطلابية للمراحل الثلاث",
    sourceUrl: "/gallery/conference-banner.jpeg",
    image: "/gallery/conference-group.jpeg",
  },
  {
    id: "news-theme",
    title: "شعار العام: طالب عالمي متجذر",
    body: "الخطة بتاعة ٢٠٢٦/٢٠٢٧ بتركّز على الهوية المصرية والجذور الفرعونية، والقيادة، والتفكير العلمي، والاستخدام الواعي للتكنولوجيا — عشان الطالب يكون قوي من جذوره ومنفتح على العالم.",
    date: "2026-10-06",
    category: "الخطة السنوية",
    sourceTitle: "خطة الاتحادات الطلابية 2026 / 2027",
    sourceUrl: "/documents/unions-plan-2026-2027.pdf",
    image: "/gallery/theme-roots.jpeg",
  },
  {
    id: "news-roots",
    title: "من أرض الفراعنة… طالب متجذر",
    body: "الطالب المتجذر يعتز بهويته المصرية وتراثه، ويظل منفتحًا على علوم العالم وثقافاته. وتوضح المنصة محاور العام من الهوية والقيادة إلى الوعي الرقمي والمشاركة المجتمعية.",
    date: "2026-10-23",
    category: "الخطة السنوية",
    sourceTitle: "خطة الاتحادات الطلابية 2026 / 2027",
    sourceUrl: "/documents/unions-plan-2026-2027.pdf",
    image: "/gallery/theme-poster.jpeg",
  },
];

export const seedGalleryPhotos: Photo[] = [
  { id: "asset-conference-ballot", album: "prep", src: "/gallery/conference-ballot.jpeg", caption: "لقطة من فعالية المرحلة الإعدادية" },
  { id: "asset-conference-banner", album: "prep", src: "/gallery/conference-banner.jpeg", caption: "مشاركة طلاب الإعدادي في مؤتمر الاتحاد" },
  { id: "asset-conference-board", album: "primary", src: "/gallery/conference-board.jpeg", caption: "طالب من المرحلة الابتدائية يشارك في الفعاليات" },
  { id: "asset-conference-certs", album: "secondary", src: "/gallery/conference-certs.jpeg", caption: "مشاركة طلاب المرحلة الثانوية في التصويت" },
  { id: "asset-conference-group", album: "prep", src: "/gallery/conference-group.jpeg", caption: "طلاب المرحلة الإعدادية خلال الانتخابات" },
  { id: "asset-conference-line", album: "prep", src: "/gallery/conference-line.jpeg", caption: "متابعة التصويت في المرحلة الإعدادية" },
  { id: "asset-conference-pair", album: "prep", src: "/gallery/conference-pair.jpeg", caption: "مشاركة طلاب الإعدادي في الفعاليات" },
  { id: "asset-primary-circle", album: "primary", src: "/gallery/primary-circle.jpeg", caption: "طلاب المرحلة الابتدائية في نشاط الاتحاد" },
  { id: "asset-primary-reading", album: "primary", src: "/gallery/primary-reading.jpeg", caption: "مشاركة طلاب الابتدائي في الفعاليات" },
  { id: "asset-prep-banner", album: "secondary", src: "/gallery/prep-banner.jpeg", caption: "طالبة من المرحلة الثانوية تقدم كلمتها" },
  { id: "asset-prep-certs", album: "secondary", src: "/gallery/prep-certs.jpeg", caption: "طلاب المرحلة الثانوية في يوم الاتحاد" },
  { id: "asset-prep-class", album: "primary", src: "/gallery/prep-class.jpeg", caption: "طلاب الابتدائي خلال فعاليات الاتحاد" },
  { id: "asset-prep-four", album: "primary", src: "/gallery/prep-four.jpeg", caption: "طلاب الاتحاد بالمرحلة الابتدائية" },
  { id: "asset-prep-sashes", album: "primary", src: "/gallery/prep-sashes.jpeg", caption: "طلاب الاتحاد بالمرحلة الابتدائية" },
  { id: "asset-theme-poster", album: "theme", src: "/gallery/theme-poster.jpeg", caption: "محاور العام: طالب عالمي متجذر" },
  { id: "asset-theme-roots", album: "theme", src: "/gallery/theme-roots.jpeg", caption: "جذور مصرية راسخة وأفق عالمي" },
];

export const albumLabel: Record<Album, string> = {
  primary: "الابتدائي",
  prep: "الإعدادي",
  secondary: "الثانوي",
  conference: "المؤتمر",
  theme: "محاور الشعار",
};
