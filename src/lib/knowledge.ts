export type OfficialDocument = {
  id: string;
  title: string;
  category: string;
  sourceUrl: string;
  sourceDate?: string;
  pageCount: number;
  searchMode: "full-text" | "metadata-only" | "review";
  note?: string;
};

export type KnowledgeEntry = {
  source_type: string;
  source_title: string;
  source_url: string;
  source_date?: string;
  content: string;
  category: string;
  last_updated: string;
  page?: number;
};

export const facebookSourceUrl = "https://www.facebook.com/share/g/19inhzpktF/";

export const officialDocuments: OfficialDocument[] = [
  {
    id: "ministerial-62",
    title: "قرار وزاري رقم 62 بشأن الاتحادات الطلابية والريادة",
    category: "قرارات وزارية",
    sourceUrl: "/documents/ministerial-resolution-62-2013.pdf",
    sourceDate: "27 فبراير 2013",
    pageCount: 38,
    searchMode: "metadata-only",
    note: "نسخة مصورة؛ البحث داخل نص القرار غير متاح في هذه النسخة.",
  },
  {
    id: "discipline-150",
    title: "قرار 150 — لائحة الانضباط",
    category: "لائحة الانضباط",
    sourceUrl: "/documents/discipline-150.pdf",
    pageCount: 23,
    searchMode: "metadata-only",
    note: "نسخة مصورة؛ البحث داخل نص اللائحة غير متاح في هذه النسخة.",
  },
  {
    id: "unions-plan",
    title: "خطة الاتحادات الطلابية للعام الدراسي 2026 / 2027",
    category: "الخطة السنوية",
    sourceUrl: "/documents/unions-plan-2026-2027.pdf",
    sourceDate: "2026 / 2027",
    pageCount: 17,
    searchMode: "full-text",
  },
  {
    id: "executive-office-2027",
    title: "سجل المكتب التنفيذي للعام الدراسي 2026 / 2027",
    category: "نماذج وسجلات",
    sourceUrl: "/documents/executive-office-2027.pdf",
    sourceDate: "2026 / 2027",
    pageCount: 4,
    searchMode: "full-text",
    note: "يتضمن نماذج وسجلات للمكتب التنفيذي.",
  },
  {
    id: "school-union-council-2027",
    title: "سجل مجلس اتحاد الطلاب للعام الدراسي 2026 / 2027",
    category: "نماذج وسجلات",
    sourceUrl: "/documents/school-union-council-2027.pdf",
    sourceDate: "2026 / 2027",
    pageCount: 19,
    searchMode: "full-text",
    note: "يتضمن نماذج وسجلات لمجلس اتحاد الطلاب.",
  },
  {
    id: "initiative-khaly-balak",
    title: "مبادرة «خلي بالك من بلدك» — ملف أُدرج لإدارة مصر القديمة",
    category: "مبادرات إدارة مصر القديمة",
    sourceUrl: "/documents/initiative-khaly-balak.pdf",
    pageCount: 7,
    searchMode: "review",
    note: "أُدرج هذا الملف ضمن مواد إدارة مصر القديمة بناءً على تأكيد مقدم الملف. يذكر متن النسخة المرفقة إدارة الرحمانية التعليمية ومدرسة القهوقية الإعدادية؛ لذا يظهر مصدر الإسناد بوضوح ولا يُستخدم محتواه لإجابة المساعد حتى تتوفر نسخة متوافقة.",
  },
];

export const verifiedKnowledge: KnowledgeEntry[] = [
  {
    source_type: "PDF",
    source_title: "خطة الاتحادات الطلابية للعام الدراسي 2026 / 2027 — أهداف الخطة",
    source_url: "/documents/unions-plan-2026-2027.pdf",
    source_date: "2026 / 2027",
    category: "أهداف الخطة",
    page: 2,
    last_updated: "2026-10-23",
    content: [
      "تنمية وعي الطلاب بالتغيرات العلمية والاجتماعية والتكنولوجية التي يشهدها العالم.",
      "غرس قيم الانتماء والولاء للوطن، وتعزيز الهوية المصرية والعربية.",
      "تدريب الطلاب على ممارسة الديمقراطية المدرسية واتخاذ القرار الواعي والمسؤول.",
      "إكساب الطلاب مهارات التفكير النقدي والإبداعي في التعامل مع المعلومات والأحداث.",
      "توجيه الطلاب لاستخدام التكنولوجيا ووسائل الإعلام الحديثة بشكل إيجابي وواع.",
      "دعم قيم الحوار وقبول الآخر والعمل الجماعي بروح التعاون والمسؤولية.",
      "تعزيز الوعي الوطني، وربط الطلاب بقضايا وطنهم ومجتمعهم المحلي.",
      "إعداد جيل من القادة الطلابيين القادرين على التفاعل الواعي مع متغيرات العصر.",
    ].join("\n"),
  },
];
