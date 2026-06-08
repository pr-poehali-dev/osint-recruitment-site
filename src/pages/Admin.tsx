import { useState, useCallback } from "react";
import Icon from "@/components/ui/icon";

const REVIEWS_URL = "https://functions.poehali.dev/089447e4-e2ac-479d-b710-5eb8cb862516";
const ADMIN_URL = "https://functions.poehali.dev/88252a0d-1b4c-4850-a460-7bcb94f113d5";

interface Application {
  id: number;
  name: string;
  phone: string;
  specialty: string;
  status: string;
  note: string;
  created_at: string | null;
}

interface Review {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
  status: string;
  created_at: string | null;
}

interface Vacancy {
  id: number;
  specialty: string;
  level: string;
  icon: string;
  title: string;
  descr: string;
  tags: string;
  salary: string;
  sort_order: number;
  active: boolean;
}

interface Faq {
  id: number;
  question: string;
  answer: string;
  sort_order: number;
  active: boolean;
}

interface GalleryItem {
  id: number;
  url: string;
  caption: string;
  sort_order: number;
  active: boolean;
}

interface DayStat {
  date: string;
  count: number;
}

interface SourceStat {
  source: string;
  count: number;
}

interface Stats {
  total: number;
  by_status: Record<string, number>;
  by_day: DayStat[];
  clicks_by_source: SourceStat[];
}

interface Callback {
  id: number;
  name: string;
  phone: string;
  preferred_time: string;
  status: string;
  created_at: string | null;
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  body: string;
  image_url: string;
  sort_order: number;
  active: boolean;
}

interface DocItem {
  id: number;
  title: string;
  description: string;
  image_url: string;
  sort_order: number;
  active: boolean;
}

type TabKey =
  | "applications"
  | "reviews"
  | "settings"
  | "vacancies"
  | "faq"
  | "gallery"
  | "stats"
  | "callbacks"
  | "blog"
  | "documents";

const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: "applications", label: "Заявки", icon: "Inbox" },
  { key: "callbacks", label: "Звонки", icon: "PhoneCall" },
  { key: "reviews", label: "Отзывы", icon: "MessageSquare" },
  { key: "settings", label: "Настройки", icon: "SlidersHorizontal" },
  { key: "vacancies", label: "Вакансии", icon: "Briefcase" },
  { key: "blog", label: "Блог", icon: "Newspaper" },
  { key: "documents", label: "Документы", icon: "FileText" },
  { key: "faq", label: "FAQ", icon: "HelpCircle" },
  { key: "gallery", label: "Галерея", icon: "Image" },
  { key: "stats", label: "Статистика", icon: "BarChart3" },
];

const CALLBACK_STATUSES: { key: string; label: string }[] = [
  { key: "new", label: "Новый" },
  { key: "done", label: "Обработан" },
];

const cbStatusStyle = (status: string): { bg: string; color: string } =>
  status === "done"
    ? { bg: "rgba(255,255,255,0.16)", color: "#ffffff" }
    : { bg: "rgba(220,38,38,0.14)", color: "#ef4444" };

const cbStatusLabel = (status: string): string =>
  CALLBACK_STATUSES.find((s) => s.key === status)?.label || status;

const APP_STATUSES: { key: string; label: string }[] = [
  { key: "new", label: "Новая" },
  { key: "in_work", label: "В работе" },
  { key: "done", label: "Принят" },
  { key: "reject", label: "Отказ" },
];

const appStatusStyle = (status: string): { bg: string; color: string } => {
  switch (status) {
    case "new":
      return { bg: "rgba(220,38,38,0.14)", color: "#ef4444" };
    case "in_work":
      return { bg: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.85)" };
    case "done":
      return { bg: "rgba(255,255,255,0.16)", color: "#ffffff" };
    case "reject":
      return { bg: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)" };
    default:
      return { bg: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" };
  }
};

const appStatusLabel = (status: string): string =>
  APP_STATUSES.find((s) => s.key === status)?.label || status;

const fmtDate = (d: string | null): string => {
  if (!d) return "—";
  try {
    return new Date(d).toLocaleString("ru-RU");
  } catch {
    return d;
  }
};

const emptyVacancy = (): Vacancy => ({
  id: 0,
  specialty: "osint",
  level: "без опыта",
  icon: "Briefcase",
  title: "",
  descr: "",
  tags: "",
  salary: "",
  sort_order: 0,
  active: true,
});

const emptyFaq = (): Faq => ({
  id: 0,
  question: "",
  answer: "",
  sort_order: 0,
  active: true,
});

const emptyGallery = (): GalleryItem => ({
  id: 0,
  url: "",
  caption: "",
  sort_order: 0,
  active: true,
});

const emptyBlog = (): BlogPost => ({
  id: 0,
  title: "",
  excerpt: "",
  body: "",
  image_url: "",
  sort_order: 0,
  active: true,
});

const emptyDoc = (): DocItem => ({
  id: 0,
  title: "",
  description: "",
  image_url: "",
  sort_order: 0,
  active: true,
});

export default function Admin() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<TabKey>("applications");

  // data
  const [applications, setApplications] = useState<Application[]>([]);
  const [appFilter, setAppFilter] = useState<string>("all");
  const [noteDraft, setNoteDraft] = useState<Record<number, string>>({});
  const [reviews, setReviews] = useState<Review[]>([]);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [faq, setFaq] = useState<Faq[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [callbacks, setCallbacks] = useState<Callback[]>([]);
  const [blog, setBlog] = useState<BlogPost[]>([]);
  const [documents, setDocuments] = useState<DocItem[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, by_status: {}, by_day: [], clicks_by_source: [] });

  // editing forms
  const [vacForm, setVacForm] = useState<Vacancy | null>(null);
  const [faqForm, setFaqForm] = useState<Faq | null>(null);
  const [galForm, setGalForm] = useState<GalleryItem | null>(null);
  const [blogForm, setBlogForm] = useState<BlogPost | null>(null);
  const [docForm, setDocForm] = useState<DocItem | null>(null);

  const [cfg, setCfg] = useState({
    applications_count: "",
    deadline_date: "",
    pay_once: "",
    pay_monthly: "",
    pay_federal: "",
    pay_year_total: "",
  });
  const [cfgSaved, setCfgSaved] = useState(false);

  // ===== loaders =====
  const adminGet = useCallback(
    async (resource: string, pwd: string) => {
      const res = await fetch(`${ADMIN_URL}?resource=${resource}`, {
        headers: { "X-Admin-Password": pwd },
      });
      return res.json();
    },
    []
  );

  const adminPost = useCallback(
    async (body: Record<string, unknown>) => {
      await fetch(ADMIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Admin-Password": password },
        body: JSON.stringify(body),
      });
    },
    [password]
  );

  const loadReviewsAndSettings = useCallback(async (pwd: string) => {
    try {
      const res = await fetch(`${REVIEWS_URL}?all=1`, {
        headers: { "X-Admin-Password": pwd },
      });
      const data = await res.json();
      setReviews(data.reviews || []);
      const s = data.settings || {};
      setCfg({
        applications_count: String(data.applications_count ?? s.applications_count ?? ""),
        deadline_date: s.deadline_date || "",
        pay_once: s.pay_once || "2600000",
        pay_monthly: s.pay_monthly || "210000",
        pay_federal: s.pay_federal || "400000",
        pay_year_total: s.pay_year_total || "5120000",
      });
    } catch {
      /* ignore */
    }
  }, []);

  const loadApplications = useCallback(
    async (pwd: string) => {
      try {
        const data = await adminGet("applications", pwd);
        setApplications(data.applications || []);
        const drafts: Record<number, string> = {};
        (data.applications || []).forEach((a: Application) => {
          drafts[a.id] = a.note || "";
        });
        setNoteDraft(drafts);
      } catch {
        /* ignore */
      }
    },
    [adminGet]
  );

  const loadVacancies = useCallback(
    async (pwd: string) => {
      try {
        const data = await adminGet("vacancies", pwd);
        setVacancies(data.vacancies || []);
      } catch {
        /* ignore */
      }
    },
    [adminGet]
  );

  const loadFaq = useCallback(
    async (pwd: string) => {
      try {
        const data = await adminGet("faq", pwd);
        setFaq(data.faq || []);
      } catch {
        /* ignore */
      }
    },
    [adminGet]
  );

  const loadGallery = useCallback(
    async (pwd: string) => {
      try {
        const data = await adminGet("gallery", pwd);
        setGallery(data.gallery || []);
      } catch {
        /* ignore */
      }
    },
    [adminGet]
  );

  const loadStats = useCallback(
    async (pwd: string) => {
      try {
        const data = await adminGet("stats", pwd);
        setStats({
          total: data.total || 0,
          by_status: data.by_status || {},
          by_day: data.by_day || [],
          clicks_by_source: data.clicks_by_source || [],
        });
      } catch {
        /* ignore */
      }
    },
    [adminGet]
  );

  const loadCallbacks = useCallback(
    async (pwd: string) => {
      try {
        const data = await adminGet("callbacks", pwd);
        setCallbacks(data.callbacks || []);
      } catch {
        /* ignore */
      }
    },
    [adminGet]
  );

  const loadBlog = useCallback(
    async (pwd: string) => {
      try {
        const data = await adminGet("blog", pwd);
        setBlog(data.blog || []);
      } catch {
        /* ignore */
      }
    },
    [adminGet]
  );

  const loadDocuments = useCallback(
    async (pwd: string) => {
      try {
        const data = await adminGet("documents", pwd);
        setDocuments(data.documents || []);
      } catch {
        /* ignore */
      }
    },
    [adminGet]
  );

  const loadAll = useCallback(
    async (pwd: string) => {
      setLoading(true);
      setError("");
      try {
        await Promise.all([
          loadApplications(pwd),
          loadReviewsAndSettings(pwd),
          loadVacancies(pwd),
          loadFaq(pwd),
          loadGallery(pwd),
          loadStats(pwd),
          loadCallbacks(pwd),
          loadBlog(pwd),
          loadDocuments(pwd),
        ]);
        setAuthed(true);
      } catch {
        setError("Ошибка загрузки");
      }
      setLoading(false);
    },
    [
      loadApplications,
      loadReviewsAndSettings,
      loadVacancies,
      loadFaq,
      loadGallery,
      loadStats,
      loadCallbacks,
      loadBlog,
      loadDocuments,
    ]
  );

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim()) loadAll(password);
  };

  const refreshCurrent = () => {
    switch (tab) {
      case "applications":
        loadApplications(password);
        break;
      case "reviews":
        loadReviewsAndSettings(password);
        break;
      case "settings":
        loadReviewsAndSettings(password);
        break;
      case "vacancies":
        loadVacancies(password);
        break;
      case "faq":
        loadFaq(password);
        break;
      case "gallery":
        loadGallery(password);
        break;
      case "stats":
        loadStats(password);
        break;
      case "callbacks":
        loadCallbacks(password);
        break;
      case "blog":
        loadBlog(password);
        break;
      case "documents":
        loadDocuments(password);
        break;
    }
  };

  // ===== actions: settings =====
  const saveCfg = async () => {
    try {
      await fetch(REVIEWS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Admin-Password": password },
        body: JSON.stringify({ action: "set_settings", settings: cfg }),
      });
      setCfgSaved(true);
      setTimeout(() => setCfgSaved(false), 2500);
    } catch {
      /* ignore */
    }
  };

  // ===== actions: reviews =====
  const moderate = async (id: number, action: "approve" | "reject" | "delete") => {
    try {
      await fetch(REVIEWS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Admin-Password": password },
        body: JSON.stringify({ action, id }),
      });
      loadReviewsAndSettings(password);
    } catch {
      /* ignore */
    }
  };

  // ===== actions: applications =====
  const setAppStatus = async (id: number, status: string) => {
    try {
      await adminPost({ action: "app_status", id, status });
      loadApplications(password);
    } catch {
      /* ignore */
    }
  };

  const saveAppNote = async (id: number) => {
    try {
      await adminPost({ action: "app_note", id, note: noteDraft[id] || "" });
      loadApplications(password);
    } catch {
      /* ignore */
    }
  };

  const deleteApp = async (id: number) => {
    try {
      await adminPost({ action: "app_delete", id });
      loadApplications(password);
    } catch {
      /* ignore */
    }
  };

  const exportCsv = () => {
    const header = ["Имя", "Телефон", "Специальность", "Статус", "Заметка", "Дата"];
    const rows = applications.map((a) => [
      a.name,
      a.phone,
      a.specialty,
      appStatusLabel(a.status),
      a.note || "",
      fmtDate(a.created_at),
    ]);
    const escape = (v: string) => `"${String(v).replace(/"/g, '""')}"`;
    const csv =
      "\uFEFF" +
      [header, ...rows].map((r) => r.map(escape).join(";")).join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `applications_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  // ===== actions: vacancies =====
  const saveVacancy = async () => {
    if (!vacForm) return;
    try {
      await adminPost({
        action: "vacancy_save",
        id: vacForm.id,
        specialty: vacForm.specialty,
        level: vacForm.level,
        icon: vacForm.icon || "Briefcase",
        title: vacForm.title,
        descr: vacForm.descr,
        tags: vacForm.tags,
        salary: vacForm.salary,
        sort_order: vacForm.sort_order,
        active: vacForm.active,
      });
      setVacForm(null);
      loadVacancies(password);
    } catch {
      /* ignore */
    }
  };

  const deleteVacancy = async (id: number) => {
    try {
      await adminPost({ action: "vacancy_delete", id });
      loadVacancies(password);
    } catch {
      /* ignore */
    }
  };

  // ===== actions: faq =====
  const saveFaq = async () => {
    if (!faqForm) return;
    try {
      await adminPost({
        action: "faq_save",
        id: faqForm.id,
        question: faqForm.question,
        answer: faqForm.answer,
        sort_order: faqForm.sort_order,
        active: faqForm.active,
      });
      setFaqForm(null);
      loadFaq(password);
    } catch {
      /* ignore */
    }
  };

  const deleteFaq = async (id: number) => {
    try {
      await adminPost({ action: "faq_delete", id });
      loadFaq(password);
    } catch {
      /* ignore */
    }
  };

  // ===== actions: gallery =====
  const saveGallery = async () => {
    if (!galForm) return;
    try {
      await adminPost({
        action: "gallery_save",
        id: galForm.id,
        url: galForm.url,
        caption: galForm.caption,
        sort_order: galForm.sort_order,
        active: galForm.active,
      });
      setGalForm(null);
      loadGallery(password);
    } catch {
      /* ignore */
    }
  };

  const deleteGallery = async (id: number) => {
    try {
      await adminPost({ action: "gallery_delete", id });
      loadGallery(password);
    } catch {
      /* ignore */
    }
  };

  // ===== actions: callbacks =====
  const setCallbackStatus = async (id: number, status: string) => {
    try {
      await adminPost({ action: "callback_status", id, status });
      loadCallbacks(password);
    } catch {
      /* ignore */
    }
  };

  const deleteCallback = async (id: number) => {
    try {
      await adminPost({ action: "callback_delete", id });
      loadCallbacks(password);
    } catch {
      /* ignore */
    }
  };

  // ===== actions: blog =====
  const saveBlog = async () => {
    if (!blogForm) return;
    try {
      await adminPost({
        action: "blog_save",
        id: blogForm.id,
        title: blogForm.title,
        excerpt: blogForm.excerpt,
        body: blogForm.body,
        image_url: blogForm.image_url,
        sort_order: blogForm.sort_order,
        active: blogForm.active,
      });
      setBlogForm(null);
      loadBlog(password);
    } catch {
      /* ignore */
    }
  };

  const deleteBlog = async (id: number) => {
    try {
      await adminPost({ action: "blog_delete", id });
      loadBlog(password);
    } catch {
      /* ignore */
    }
  };

  // ===== actions: documents =====
  const saveDoc = async () => {
    if (!docForm) return;
    try {
      await adminPost({
        action: "document_save",
        id: docForm.id,
        title: docForm.title,
        description: docForm.description,
        image_url: docForm.image_url,
        sort_order: docForm.sort_order,
        active: docForm.active,
      });
      setDocForm(null);
      loadDocuments(password);
    } catch {
      /* ignore */
    }
  };

  const deleteDoc = async (id: number) => {
    try {
      await adminPost({ action: "document_delete", id });
      loadDocuments(password);
    } catch {
      /* ignore */
    }
  };

  // ===== login screen =====
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--bg)" }}>
        <form
          onSubmit={login}
          className="vol-card p-9 w-full max-w-sm animate-fade-blur"
          style={{ borderRadius: 14, borderColor: "rgba(255,255,255,0.15)" }}
        >
          <div className="flex items-center gap-3 mb-7">
            <div
              className="flex items-center justify-center"
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            >
              <Icon name="LayoutDashboard" size={22} style={{ color: "#ffffff" }} />
            </div>
            <div>
              <div className="font-orb text-white text-lg">OSINT-РЭР</div>
              <div className="font-stm text-[10px] tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>
                Панель администратора
              </div>
            </div>
          </div>
          <input
            type="password"
            className="form-input mb-4"
            placeholder="Пароль администратора"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          {error && (
            <div className="font-exo text-sm mb-4" style={{ color: "#ef4444" }}>
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="btn-red-animated w-full py-3.5"
            style={{ borderRadius: 8, opacity: loading ? 0.7 : 1 }}
          >
            {loading ? (
              <>
                <Icon name="RefreshCw" size={16} className="animate-spin" />
                Вход...
              </>
            ) : (
              <>
                <Icon name="LogIn" size={16} />
                Войти
              </>
            )}
          </button>
        </form>
      </div>
    );
  }

  // ===== shared field styles =====
  const labelCls = "font-stm text-[10px] block mb-2 tracking-widest";
  const labelStyle = { color: "rgba(255,255,255,0.55)" } as React.CSSProperties;

  // ===== reviews card =====
  const reviewCard = (r: Review) => (
    <div
      key={r.id}
      className="vol-card hover-lift p-6 flex flex-col gap-4 animate-fade-blur"
      style={{ borderRadius: 12, borderColor: "rgba(255,255,255,0.1)" }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, s) => (
            <Icon
              key={s}
              name="Star"
              size={13}
              style={{
                color: s < r.rating ? "#ffffff" : "rgba(255,255,255,0.15)",
                fill: s < r.rating ? "#ffffff" : "transparent",
              }}
            />
          ))}
        </div>
        <span
          className="font-stm text-[9px] tracking-widest px-2.5 py-1"
          style={{
            borderRadius: 4,
            background:
              r.status === "approved"
                ? "rgba(255,255,255,0.1)"
                : r.status === "rejected"
                ? "rgba(220,38,38,0.14)"
                : "rgba(255,255,255,0.06)",
            color:
              r.status === "approved"
                ? "rgba(255,255,255,0.85)"
                : r.status === "rejected"
                ? "#ef4444"
                : "rgba(255,255,255,0.5)",
          }}
        >
          {r.status === "approved" ? "ОПУБЛИКОВАН" : r.status === "rejected" ? "ОТКЛОНЁН" : "НА ПРОВЕРКЕ"}
        </span>
      </div>
      <p className="font-exo text-white/75 text-sm leading-relaxed">{r.text}</p>
      <div className="font-orb text-white text-sm">{r.name}</div>
      <div className="font-stm text-[10px] tracking-wide" style={{ color: "rgba(255,255,255,0.4)" }}>
        {r.role}
      </div>
      <div className="flex gap-2 pt-2">
        {r.status !== "approved" && (
          <button onClick={() => moderate(r.id, "approve")} className="btn-ghost flex-1 py-2.5 text-[10px]" style={{ borderRadius: 8 }}>
            <Icon name="Check" size={13} />
            Одобрить
          </button>
        )}
        {r.status !== "rejected" && (
          <button onClick={() => moderate(r.id, "reject")} className="btn-ghost flex-1 py-2.5 text-[10px]" style={{ borderRadius: 8 }}>
            <Icon name="X" size={13} />
            Скрыть
          </button>
        )}
        <button
          onClick={() => moderate(r.id, "delete")}
          className="flex items-center justify-center px-3 py-2.5 transition-all hover:scale-105"
          style={{ borderRadius: 8, background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.3)" }}
        >
          <Icon name="Trash2" size={13} style={{ color: "#ef4444" }} />
        </button>
      </div>
    </div>
  );

  // ===== tab content renderers =====
  const renderApplications = () => {
    const filtered =
      appFilter === "all" ? applications : applications.filter((a) => a.status === appFilter);
    return (
      <div className="animate-fade-blur">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            {[{ key: "all", label: "Все" }, ...APP_STATUSES].map((f) => (
              <button
                key={f.key}
                onClick={() => setAppFilter(f.key)}
                className="font-stm text-[10px] tracking-widest px-4 py-2.5 transition-all"
                style={{
                  borderRadius: 8,
                  background: appFilter === f.key ? "rgba(220,38,38,0.18)" : "rgba(255,255,255,0.04)",
                  border: appFilter === f.key ? "1px solid rgba(220,38,38,0.5)" : "1px solid rgba(255,255,255,0.1)",
                  color: appFilter === f.key ? "#ef4444" : "rgba(255,255,255,0.6)",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
          <button onClick={exportCsv} className="btn-ghost px-5 py-2.5 text-[11px] hover-lift" style={{ borderRadius: 8 }}>
            <Icon name="Download" size={15} />
            Экспорт в CSV
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((a) => {
            const st = appStatusStyle(a.status);
            return (
              <div
                key={a.id}
                className="vol-card hover-lift p-6 flex flex-col gap-4 animate-fade-blur"
                style={{ borderRadius: 12, borderColor: "rgba(255,255,255,0.1)" }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-orb text-white text-lg">{a.name}</div>
                    <a
                      href={`tel:${a.phone}`}
                      className="font-stm text-xs tracking-wide flex items-center gap-1.5 mt-1.5 transition-colors hover:text-white"
                      style={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      <Icon name="Phone" size={12} />
                      {a.phone}
                    </a>
                  </div>
                  <span
                    className="font-stm text-[9px] tracking-widest px-2.5 py-1 whitespace-nowrap"
                    style={{ borderRadius: 4, background: st.bg, color: st.color }}
                  >
                    {appStatusLabel(a.status).toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center justify-between font-stm text-[10px] tracking-wide" style={{ color: "rgba(255,255,255,0.4)" }}>
                  <span>{a.specialty || "—"}</span>
                  <span>{fmtDate(a.created_at)}</span>
                </div>

                <div className="accent-line" />

                <div>
                  <label className={labelCls} style={labelStyle}>
                    Статус
                  </label>
                  <select
                    className="form-input"
                    value={a.status}
                    onChange={(e) => setAppStatus(a.id, e.target.value)}
                  >
                    {APP_STATUSES.map((s) => (
                      <option key={s.key} value={s.key}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelCls} style={labelStyle}>
                    Заметка
                  </label>
                  <div className="flex gap-2">
                    <input
                      className="form-input flex-1"
                      value={noteDraft[a.id] ?? ""}
                      onChange={(e) => setNoteDraft((p) => ({ ...p, [a.id]: e.target.value }))}
                      placeholder="Комментарий..."
                    />
                    <button onClick={() => saveAppNote(a.id)} className="btn-ghost px-3.5" style={{ borderRadius: 8 }}>
                      <Icon name="Save" size={14} />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => deleteApp(a.id)}
                  className="flex items-center justify-center gap-2 py-2.5 transition-all hover:scale-[1.02] font-stm text-[10px] tracking-widest"
                  style={{ borderRadius: 8, background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.3)", color: "#ef4444" }}
                >
                  <Icon name="Trash2" size={13} />
                  Удалить заявку
                </button>
              </div>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <div className="font-exo text-white/40 text-center py-20">Заявок нет</div>
        )}
      </div>
    );
  };

  const renderReviews = () => {
    const pending = reviews.filter((r) => r.status === "pending");
    const others = reviews.filter((r) => r.status !== "pending");
    return (
      <div className="animate-fade-blur">
        {pending.length > 0 && (
          <>
            <div className="label-mono mb-4">Ожидают модерации · {pending.length}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
              {pending.map(reviewCard)}
            </div>
          </>
        )}
        <div className="label-mono mb-4">Все отзывы</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">{others.map(reviewCard)}</div>
        {reviews.length === 0 && <div className="font-exo text-white/40 text-center py-20">Отзывов пока нет</div>}
      </div>
    );
  };

  const renderSettings = () => (
    <div className="vol-card p-7 animate-fade-blur" style={{ borderRadius: 14, borderColor: "rgba(255,255,255,0.12)" }}>
      <div className="flex items-center gap-3 mb-6">
        <Icon name="SlidersHorizontal" size={22} style={{ color: "#fff" }} />
        <div>
          <div className="font-orb text-white text-base">Настройки сайта</div>
          <div className="font-stm text-[10px] tracking-wide mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
            Числа отображаются на главной странице
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[
          { k: "deadline_date", l: "Дата окончания набора", hint: "Когда таймер дойдёт до нуля", type: "date" },
          { k: "applications_count", l: "Счётчик «Уже подали»", hint: "Число заявок", type: "number" },
          { k: "pay_once", l: "Единовременная выплата ₽", hint: "При заключении контракта", type: "number" },
          { k: "pay_monthly", l: "Ежемесячная выплата ₽", hint: "Базовая зарплата в месяц", type: "number" },
          { k: "pay_federal", l: "Федеральная выплата ₽", hint: "Доп. выплата от государства", type: "number" },
          { k: "pay_year_total", l: "Доход за 1-й год ₽", hint: "Итоговая цифра в баннере", type: "number" },
        ].map((f) => (
          <div key={f.k}>
            <label className={labelCls} style={labelStyle}>
              {f.l}
            </label>
            <input
              type={f.type}
              min={0}
              className="form-input"
              value={cfg[f.k as keyof typeof cfg]}
              onChange={(e) => setCfg((p) => ({ ...p, [f.k]: e.target.value }))}
            />
            <div className="font-stm text-[9px] mt-1.5" style={{ color: "rgba(255,255,255,0.3)" }}>
              {f.hint}
            </div>
          </div>
        ))}
      </div>

      <button onClick={saveCfg} className="btn-red-animated px-7 py-3.5 text-xs mt-6" style={{ borderRadius: 8 }}>
        {cfgSaved ? (
          <>
            <Icon name="Check" size={15} />
            Сохранено
          </>
        ) : (
          <>
            <Icon name="Save" size={15} />
            Сохранить настройки
          </>
        )}
      </button>
    </div>
  );

  const renderVacancies = () => (
    <div className="animate-fade-blur">
      <div className="flex justify-end mb-6">
        <button onClick={() => setVacForm(emptyVacancy())} className="btn-red-animated px-5 py-3 text-xs" style={{ borderRadius: 8 }}>
          <Icon name="Plus" size={15} />
          Добавить вакансию
        </button>
      </div>

      {vacForm && (
        <div className="vol-card p-7 mb-8 animate-fade-blur" style={{ borderRadius: 14, borderColor: "rgba(220,38,38,0.3)" }}>
          <div className="font-orb text-white text-base mb-5">{vacForm.id ? "Редактирование вакансии" : "Новая вакансия"}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className={labelCls} style={labelStyle}>Заголовок</label>
              <input className="form-input" value={vacForm.title} onChange={(e) => setVacForm({ ...vacForm, title: e.target.value })} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls} style={labelStyle}>Описание</label>
              <textarea className="form-input" rows={3} value={vacForm.descr} onChange={(e) => setVacForm({ ...vacForm, descr: e.target.value })} />
            </div>
            <div>
              <label className={labelCls} style={labelStyle}>Специальность</label>
              <select className="form-input" value={vacForm.specialty} onChange={(e) => setVacForm({ ...vacForm, specialty: e.target.value })}>
                <option value="osint">osint</option>
                <option value="it">it</option>
                <option value="bpla">bpla</option>
                <option value="logistics">logistics</option>
              </select>
            </div>
            <div>
              <label className={labelCls} style={labelStyle}>Уровень</label>
              <select className="form-input" value={vacForm.level} onChange={(e) => setVacForm({ ...vacForm, level: e.target.value })}>
                <option value="без опыта">без опыта</option>
                <option value="опыт">опыт</option>
              </select>
            </div>
            <div>
              <label className={labelCls} style={labelStyle}>Иконка (lucide)</label>
              <input className="form-input" value={vacForm.icon} onChange={(e) => setVacForm({ ...vacForm, icon: e.target.value })} placeholder="Briefcase" />
            </div>
            <div>
              <label className={labelCls} style={labelStyle}>Зарплата</label>
              <input className="form-input" value={vacForm.salary} onChange={(e) => setVacForm({ ...vacForm, salary: e.target.value })} placeholder="от 210 000 ₽" />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls} style={labelStyle}>Теги (через запятую)</label>
              <input className="form-input" value={vacForm.tags} onChange={(e) => setVacForm({ ...vacForm, tags: e.target.value })} />
            </div>
            <div>
              <label className={labelCls} style={labelStyle}>Порядок</label>
              <input type="number" className="form-input" value={vacForm.sort_order} onChange={(e) => setVacForm({ ...vacForm, sort_order: Number(e.target.value) })} />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 font-stm text-[11px] tracking-wide cursor-pointer" style={{ color: "rgba(255,255,255,0.7)" }}>
                <input type="checkbox" checked={vacForm.active} onChange={(e) => setVacForm({ ...vacForm, active: e.target.checked })} />
                Активна
              </label>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={saveVacancy} className="btn-red-animated px-6 py-3 text-xs" style={{ borderRadius: 8 }}>
              <Icon name="Save" size={15} />
              Сохранить
            </button>
            <button onClick={() => setVacForm(null)} className="btn-ghost px-6 py-3 text-xs" style={{ borderRadius: 8 }}>
              <Icon name="X" size={15} />
              Отмена
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {vacancies.map((v) => (
          <div key={v.id} className="vol-card p-6 flex flex-col gap-3 animate-fade-blur" style={{ borderRadius: 12, borderColor: "rgba(255,255,255,0.1)" }}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <Icon name={v.icon || "Briefcase"} size={20} style={{ color: "#fff" }} />
                <div className="font-orb text-white text-base">{v.title}</div>
              </div>
              {!v.active && (
                <span className="font-stm text-[9px] tracking-widest px-2 py-1" style={{ borderRadius: 4, background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)" }}>
                  СКРЫТА
                </span>
              )}
            </div>
            <p className="font-exo text-white/65 text-sm leading-relaxed">{v.descr}</p>
            <div className="font-stm text-[10px] tracking-wide" style={{ color: "rgba(255,255,255,0.45)" }}>
              {v.specialty} · {v.level} · {v.salary}
            </div>
            {v.tags && (
              <div className="flex flex-wrap gap-1.5">
                {v.tags.split(",").map((t, i) =>
                  t.trim() ? (
                    <span key={i} className="font-stm text-[9px] px-2 py-1" style={{ borderRadius: 4, background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)" }}>
                      {t.trim()}
                    </span>
                  ) : null
                )}
              </div>
            )}
            <div className="flex gap-2 pt-2">
              <button onClick={() => setVacForm({ ...v })} className="btn-ghost flex-1 py-2.5 text-[10px]" style={{ borderRadius: 8 }}>
                <Icon name="Pencil" size={13} />
                Редактировать
              </button>
              <button
                onClick={() => deleteVacancy(v.id)}
                className="flex items-center justify-center px-3 py-2.5 transition-all hover:scale-105"
                style={{ borderRadius: 8, background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.3)" }}
              >
                <Icon name="Trash2" size={13} style={{ color: "#ef4444" }} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {vacancies.length === 0 && <div className="font-exo text-white/40 text-center py-20">Вакансий нет</div>}
    </div>
  );

  const renderFaq = () => (
    <div className="animate-fade-blur">
      <div className="flex justify-end mb-6">
        <button onClick={() => setFaqForm(emptyFaq())} className="btn-red-animated px-5 py-3 text-xs" style={{ borderRadius: 8 }}>
          <Icon name="Plus" size={15} />
          Добавить вопрос
        </button>
      </div>

      {faqForm && (
        <div className="vol-card p-7 mb-8 animate-fade-blur" style={{ borderRadius: 14, borderColor: "rgba(220,38,38,0.3)" }}>
          <div className="font-orb text-white text-base mb-5">{faqForm.id ? "Редактирование вопроса" : "Новый вопрос"}</div>
          <div className="grid grid-cols-1 gap-5">
            <div>
              <label className={labelCls} style={labelStyle}>Вопрос</label>
              <input className="form-input" value={faqForm.question} onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })} />
            </div>
            <div>
              <label className={labelCls} style={labelStyle}>Ответ</label>
              <textarea className="form-input" rows={4} value={faqForm.answer} onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className={labelCls} style={labelStyle}>Порядок</label>
                <input type="number" className="form-input" value={faqForm.sort_order} onChange={(e) => setFaqForm({ ...faqForm, sort_order: Number(e.target.value) })} />
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2 font-stm text-[11px] tracking-wide cursor-pointer" style={{ color: "rgba(255,255,255,0.7)" }}>
                  <input type="checkbox" checked={faqForm.active} onChange={(e) => setFaqForm({ ...faqForm, active: e.target.checked })} />
                  Активен
                </label>
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={saveFaq} className="btn-red-animated px-6 py-3 text-xs" style={{ borderRadius: 8 }}>
              <Icon name="Save" size={15} />
              Сохранить
            </button>
            <button onClick={() => setFaqForm(null)} className="btn-ghost px-6 py-3 text-xs" style={{ borderRadius: 8 }}>
              <Icon name="X" size={15} />
              Отмена
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {faq.map((f) => (
          <div key={f.id} className="vol-card p-6 animate-fade-blur" style={{ borderRadius: 12, borderColor: "rgba(255,255,255,0.1)" }}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="font-orb text-white text-sm mb-2 flex items-center gap-2">
                  <Icon name="HelpCircle" size={16} style={{ color: "#ef4444" }} />
                  {f.question}
                  {!f.active && (
                    <span className="font-stm text-[9px] tracking-widest px-2 py-0.5" style={{ borderRadius: 4, background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)" }}>
                      СКРЫТ
                    </span>
                  )}
                </div>
                <p className="font-exo text-white/65 text-sm leading-relaxed">{f.answer}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setFaqForm({ ...f })} className="btn-ghost px-3 py-2.5 text-[10px]" style={{ borderRadius: 8 }}>
                  <Icon name="Pencil" size={13} />
                </button>
                <button
                  onClick={() => deleteFaq(f.id)}
                  className="flex items-center justify-center px-3 py-2.5 transition-all hover:scale-105"
                  style={{ borderRadius: 8, background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.3)" }}
                >
                  <Icon name="Trash2" size={13} style={{ color: "#ef4444" }} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {faq.length === 0 && <div className="font-exo text-white/40 text-center py-20">Вопросов нет</div>}
    </div>
  );

  const renderGallery = () => (
    <div className="animate-fade-blur">
      <div className="flex justify-end mb-6">
        <button onClick={() => setGalForm(emptyGallery())} className="btn-red-animated px-5 py-3 text-xs" style={{ borderRadius: 8 }}>
          <Icon name="Plus" size={15} />
          Добавить изображение
        </button>
      </div>

      {galForm && (
        <div className="vol-card p-7 mb-8 animate-fade-blur" style={{ borderRadius: 14, borderColor: "rgba(220,38,38,0.3)" }}>
          <div className="font-orb text-white text-base mb-5">{galForm.id ? "Редактирование" : "Новое изображение"}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className={labelCls} style={labelStyle}>Ссылка на картинку (URL)</label>
              <input className="form-input" value={galForm.url} onChange={(e) => setGalForm({ ...galForm, url: e.target.value })} placeholder="https://..." />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls} style={labelStyle}>Подпись</label>
              <input className="form-input" value={galForm.caption} onChange={(e) => setGalForm({ ...galForm, caption: e.target.value })} />
            </div>
            <div>
              <label className={labelCls} style={labelStyle}>Порядок</label>
              <input type="number" className="form-input" value={galForm.sort_order} onChange={(e) => setGalForm({ ...galForm, sort_order: Number(e.target.value) })} />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 font-stm text-[11px] tracking-wide cursor-pointer" style={{ color: "rgba(255,255,255,0.7)" }}>
                <input type="checkbox" checked={galForm.active} onChange={(e) => setGalForm({ ...galForm, active: e.target.checked })} />
                Активно
              </label>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={saveGallery} className="btn-red-animated px-6 py-3 text-xs" style={{ borderRadius: 8 }}>
              <Icon name="Save" size={15} />
              Сохранить
            </button>
            <button onClick={() => setGalForm(null)} className="btn-ghost px-6 py-3 text-xs" style={{ borderRadius: 8 }}>
              <Icon name="X" size={15} />
              Отмена
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {gallery.map((g) => (
          <div key={g.id} className="vol-card overflow-hidden animate-fade-blur" style={{ borderRadius: 12, borderColor: "rgba(255,255,255,0.1)" }}>
            <div style={{ aspectRatio: "1 / 1", overflow: "hidden", background: "rgba(255,255,255,0.04)" }}>
              <img src={g.url} alt={g.caption} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: g.active ? 1 : 0.4 }} />
            </div>
            <div className="p-4 flex flex-col gap-3">
              <div className="font-exo text-white/75 text-xs leading-snug">{g.caption || "Без подписи"}</div>
              <div className="flex gap-2">
                <button onClick={() => setGalForm({ ...g })} className="btn-ghost flex-1 py-2 text-[10px]" style={{ borderRadius: 8 }}>
                  <Icon name="Pencil" size={12} />
                </button>
                <button
                  onClick={() => deleteGallery(g.id)}
                  className="flex items-center justify-center px-3 py-2 transition-all hover:scale-105"
                  style={{ borderRadius: 8, background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.3)" }}
                >
                  <Icon name="Trash2" size={12} style={{ color: "#ef4444" }} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {gallery.length === 0 && <div className="font-exo text-white/40 text-center py-20">Галерея пуста</div>}
    </div>
  );

  const renderCallbacks = () => (
    <div className="animate-fade-blur">
      <div className="label-mono mb-4">Заявки на обратный звонок · {callbacks.length}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {callbacks.map((c) => {
          const st = cbStatusStyle(c.status);
          return (
            <div
              key={c.id}
              className="vol-card hover-lift p-6 flex flex-col gap-4 animate-fade-blur"
              style={{ borderRadius: 12, borderColor: "rgba(255,255,255,0.1)" }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Icon name="PhoneCall" size={18} style={{ color: "#ef4444" }} />
                  <div className="font-orb text-white text-base">{c.name || "—"}</div>
                </div>
                <span
                  className="font-stm text-[9px] tracking-widest px-2.5 py-1 whitespace-nowrap"
                  style={{ borderRadius: 4, background: st.bg, color: st.color }}
                >
                  {cbStatusLabel(c.status).toUpperCase()}
                </span>
              </div>

              <a
                href={`tel:${c.phone}`}
                className="font-orb text-white text-lg hover:text-[#ef4444] transition-colors"
              >
                {c.phone || "—"}
              </a>

              <div className="flex items-center justify-between font-stm text-[10px] tracking-wide" style={{ color: "rgba(255,255,255,0.4)" }}>
                <span className="flex items-center gap-1.5">
                  <Icon name="Clock" size={12} style={{ color: "rgba(255,255,255,0.4)" }} />
                  {c.preferred_time || "любое"}
                </span>
                <span>{fmtDate(c.created_at)}</span>
              </div>

              <div className="accent-line" />

              <div>
                <label className={labelCls} style={labelStyle}>
                  Статус
                </label>
                <select
                  className="form-input"
                  value={c.status}
                  onChange={(e) => setCallbackStatus(c.id, e.target.value)}
                >
                  {CALLBACK_STATUSES.map((s) => (
                    <option key={s.key} value={s.key}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => deleteCallback(c.id)}
                className="flex items-center justify-center gap-2 py-2.5 transition-all hover:scale-[1.02] font-stm text-[10px] tracking-widest"
                style={{ borderRadius: 8, background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.3)", color: "#ef4444" }}
              >
                <Icon name="Trash2" size={13} />
                Удалить
              </button>
            </div>
          );
        })}
      </div>
      {callbacks.length === 0 && <div className="font-exo text-white/40 text-center py-20">Запросов на звонок нет</div>}
    </div>
  );

  const renderBlog = () => (
    <div className="animate-fade-blur">
      <div className="flex justify-end mb-6">
        <button onClick={() => setBlogForm(emptyBlog())} className="btn-red-animated px-5 py-3 text-xs" style={{ borderRadius: 8 }}>
          <Icon name="Plus" size={15} />
          Добавить статью
        </button>
      </div>

      {blogForm && (
        <div className="vol-card p-7 mb-8 animate-fade-blur" style={{ borderRadius: 14, borderColor: "rgba(220,38,38,0.3)" }}>
          <div className="font-orb text-white text-base mb-5">{blogForm.id ? "Редактирование статьи" : "Новая статья"}</div>
          <div className="grid grid-cols-1 gap-5">
            <div>
              <label className={labelCls} style={labelStyle}>Заголовок</label>
              <input className="form-input" value={blogForm.title} onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })} />
            </div>
            <div>
              <label className={labelCls} style={labelStyle}>Краткое описание</label>
              <textarea className="form-input" rows={2} value={blogForm.excerpt} onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })} />
            </div>
            <div>
              <label className={labelCls} style={labelStyle}>Полный текст</label>
              <textarea className="form-input" rows={6} value={blogForm.body} onChange={(e) => setBlogForm({ ...blogForm, body: e.target.value })} />
            </div>
            <div>
              <label className={labelCls} style={labelStyle}>Ссылка на картинку (URL)</label>
              <input className="form-input" value={blogForm.image_url} onChange={(e) => setBlogForm({ ...blogForm, image_url: e.target.value })} placeholder="https://..." />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className={labelCls} style={labelStyle}>Порядок</label>
                <input type="number" className="form-input" value={blogForm.sort_order} onChange={(e) => setBlogForm({ ...blogForm, sort_order: Number(e.target.value) })} />
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2 font-stm text-[11px] tracking-wide cursor-pointer" style={{ color: "rgba(255,255,255,0.7)" }}>
                  <input type="checkbox" checked={blogForm.active} onChange={(e) => setBlogForm({ ...blogForm, active: e.target.checked })} />
                  Активна
                </label>
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={saveBlog} className="btn-red-animated px-6 py-3 text-xs" style={{ borderRadius: 8 }}>
              <Icon name="Save" size={15} />
              Сохранить
            </button>
            <button onClick={() => setBlogForm(null)} className="btn-ghost px-6 py-3 text-xs" style={{ borderRadius: 8 }}>
              <Icon name="X" size={15} />
              Отмена
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {blog.map((b) => (
          <div key={b.id} className="vol-card p-6 flex flex-col gap-3 animate-fade-blur" style={{ borderRadius: 12, borderColor: "rgba(255,255,255,0.1)" }}>
            {b.image_url && (
              <img
                src={b.image_url}
                alt={b.title}
                style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)" }}
              />
            )}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <Icon name="Newspaper" size={18} style={{ color: "#ef4444" }} />
                <div className="font-orb text-white text-base">{b.title}</div>
              </div>
              {!b.active && (
                <span className="font-stm text-[9px] tracking-widest px-2 py-1" style={{ borderRadius: 4, background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)" }}>
                  СКРЫТА
                </span>
              )}
            </div>
            <p className="font-exo text-white/65 text-sm leading-relaxed">{b.excerpt}</p>
            <div className="flex gap-2 pt-2">
              <button onClick={() => setBlogForm({ ...b })} className="btn-ghost flex-1 py-2.5 text-[10px]" style={{ borderRadius: 8 }}>
                <Icon name="Pencil" size={13} />
                Редактировать
              </button>
              <button
                onClick={() => deleteBlog(b.id)}
                className="flex items-center justify-center px-3 py-2.5 transition-all hover:scale-105"
                style={{ borderRadius: 8, background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.3)" }}
              >
                <Icon name="Trash2" size={13} style={{ color: "#ef4444" }} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {blog.length === 0 && <div className="font-exo text-white/40 text-center py-20">Статей нет</div>}
    </div>
  );

  const renderDocuments = () => (
    <div className="animate-fade-blur">
      <div className="flex justify-end mb-6">
        <button onClick={() => setDocForm(emptyDoc())} className="btn-red-animated px-5 py-3 text-xs" style={{ borderRadius: 8 }}>
          <Icon name="Plus" size={15} />
          Добавить документ
        </button>
      </div>

      {docForm && (
        <div className="vol-card p-7 mb-8 animate-fade-blur" style={{ borderRadius: 14, borderColor: "rgba(220,38,38,0.3)" }}>
          <div className="font-orb text-white text-base mb-5">{docForm.id ? "Редактирование документа" : "Новый документ"}</div>
          <div className="grid grid-cols-1 gap-5">
            <div>
              <label className={labelCls} style={labelStyle}>Название</label>
              <input className="form-input" value={docForm.title} onChange={(e) => setDocForm({ ...docForm, title: e.target.value })} />
            </div>
            <div>
              <label className={labelCls} style={labelStyle}>Описание</label>
              <textarea className="form-input" rows={3} value={docForm.description} onChange={(e) => setDocForm({ ...docForm, description: e.target.value })} />
            </div>
            <div>
              <label className={labelCls} style={labelStyle}>Ссылка на картинку (URL)</label>
              <input className="form-input" value={docForm.image_url} onChange={(e) => setDocForm({ ...docForm, image_url: e.target.value })} placeholder="https://..." />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className={labelCls} style={labelStyle}>Порядок</label>
                <input type="number" className="form-input" value={docForm.sort_order} onChange={(e) => setDocForm({ ...docForm, sort_order: Number(e.target.value) })} />
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2 font-stm text-[11px] tracking-wide cursor-pointer" style={{ color: "rgba(255,255,255,0.7)" }}>
                  <input type="checkbox" checked={docForm.active} onChange={(e) => setDocForm({ ...docForm, active: e.target.checked })} />
                  Активен
                </label>
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={saveDoc} className="btn-red-animated px-6 py-3 text-xs" style={{ borderRadius: 8 }}>
              <Icon name="Save" size={15} />
              Сохранить
            </button>
            <button onClick={() => setDocForm(null)} className="btn-ghost px-6 py-3 text-xs" style={{ borderRadius: 8 }}>
              <Icon name="X" size={15} />
              Отмена
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {documents.map((d) => (
          <div key={d.id} className="vol-card p-4 flex flex-col gap-3 animate-fade-blur" style={{ borderRadius: 12, borderColor: "rgba(255,255,255,0.1)" }}>
            <div
              style={{
                width: "100%",
                aspectRatio: "3 / 4",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.03)",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {d.image_url ? (
                <img src={d.image_url} alt={d.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <Icon name="FileText" size={32} style={{ color: "rgba(255,255,255,0.25)" }} />
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="font-orb text-white text-sm flex-1">{d.title}</div>
              {!d.active && (
                <span className="font-stm text-[8px] tracking-widest px-1.5 py-0.5" style={{ borderRadius: 4, background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)" }}>
                  СКРЫТ
                </span>
              )}
            </div>
            <div className="font-exo text-white/65 text-xs leading-snug">{d.description || "Без описания"}</div>
            <div className="flex gap-2">
              <button onClick={() => setDocForm({ ...d })} className="btn-ghost flex-1 py-2 text-[10px]" style={{ borderRadius: 8 }}>
                <Icon name="Pencil" size={12} />
              </button>
              <button
                onClick={() => deleteDoc(d.id)}
                className="flex items-center justify-center px-3 py-2 transition-all hover:scale-105"
                style={{ borderRadius: 8, background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.3)" }}
              >
                <Icon name="Trash2" size={12} style={{ color: "#ef4444" }} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {documents.length === 0 && <div className="font-exo text-white/40 text-center py-20">Документов нет</div>}
    </div>
  );

  const renderStats = () => {
    const maxCount = Math.max(1, ...stats.by_day.map((d) => d.count));
    const maxClicks = Math.max(1, ...stats.clicks_by_source.map((c) => c.count));
    const statCards = [
      { label: "Всего заявок", value: stats.total },
      { label: "Новых", value: stats.by_status.new || 0 },
      { label: "В работе", value: stats.by_status.in_work || 0 },
      { label: "Принято", value: stats.by_status.done || 0 },
    ];
    return (
      <div className="animate-fade-blur">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {statCards.map((s) => (
            <div key={s.label} className="vol-card p-6" style={{ borderRadius: 12, borderColor: "rgba(255,255,255,0.1)" }}>
              <div className="font-orb text-white" style={{ fontSize: "2rem" }}>
                {s.value}
              </div>
              <div className="font-stm text-[10px] tracking-widest mt-2" style={{ color: "rgba(255,255,255,0.45)" }}>
                {s.label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>

        <div className="vol-card p-7" style={{ borderRadius: 14, borderColor: "rgba(255,255,255,0.12)" }}>
          <div className="flex items-center gap-3 mb-7">
            <Icon name="BarChart3" size={20} style={{ color: "#fff" }} />
            <div className="font-orb text-white text-base">Заявки по дням</div>
          </div>
          {stats.by_day.length === 0 ? (
            <div className="font-exo text-white/40 text-center py-12">Нет данных</div>
          ) : (
            <div className="flex items-end gap-3 overflow-x-auto pb-2" style={{ minHeight: 200 }}>
              {stats.by_day.map((d) => {
                const h = Math.round((d.count / maxCount) * 160);
                const dd = d.date.length >= 10 ? `${d.date.slice(8, 10)}.${d.date.slice(5, 7)}` : d.date;
                return (
                  <div key={d.date} className="flex flex-col items-center gap-2 shrink-0" style={{ minWidth: 36 }}>
                    <div className="font-stm text-[10px]" style={{ color: "rgba(255,255,255,0.6)" }}>
                      {d.count}
                    </div>
                    <div
                      style={{
                        width: 24,
                        height: Math.max(4, h),
                        borderRadius: 4,
                        background: "linear-gradient(180deg, #ffffff, rgba(255,255,255,0.4))",
                      }}
                    />
                    <div className="font-stm text-[9px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                      {dd}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="vol-card p-7 mt-10" style={{ borderRadius: 14, borderColor: "rgba(255,255,255,0.12)" }}>
          <div className="flex items-center gap-3 mb-2">
            <Icon name="MousePointerClick" size={20} style={{ color: "#fff" }} />
            <div className="font-orb text-white text-base">Клики по кнопкам</div>
          </div>
          <div className="label-mono mb-7">Источники кликов</div>
          {stats.clicks_by_source.length === 0 ? (
            <div className="font-exo text-white/40 text-center py-12">Нет данных</div>
          ) : (
            <div className="flex flex-col gap-4">
              {stats.clicks_by_source.map((c) => {
                const w = Math.round((c.count / maxClicks) * 100);
                return (
                  <div key={c.source} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between font-stm text-[11px] tracking-wide">
                      <span style={{ color: "rgba(255,255,255,0.75)" }}>{c.source}</span>
                      <span style={{ color: "#ef4444" }}>{c.count}</span>
                    </div>
                    <div style={{ width: "100%", height: 10, borderRadius: 5, background: "rgba(255,255,255,0.05)", overflow: "hidden" }}>
                      <div
                        style={{
                          width: `${Math.max(2, w)}%`,
                          height: "100%",
                          borderRadius: 5,
                          background: "linear-gradient(90deg, #dc2626, #ef4444)",
                          transition: "width 0.4s ease",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderTab = () => {
    switch (tab) {
      case "applications":
        return renderApplications();
      case "reviews":
        return renderReviews();
      case "settings":
        return renderSettings();
      case "vacancies":
        return renderVacancies();
      case "faq":
        return renderFaq();
      case "gallery":
        return renderGallery();
      case "stats":
        return renderStats();
      case "callbacks":
        return renderCallbacks();
      case "blog":
        return renderBlog();
      case "documents":
        return renderDocuments();
    }
  };

  // ===== main layout =====
  return (
    <div className="min-h-screen px-4 sm:px-6 py-8" style={{ background: "var(--bg)" }}>
      <div className="max-w-[1280px] mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center"
              style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)" }}
            >
              <Icon name="LayoutDashboard" size={22} style={{ color: "#ffffff" }} />
            </div>
            <div>
              <h1 className="font-orb text-white" style={{ fontSize: "1.5rem" }}>
                OSINT-РЭР · Админ
              </h1>
              <div className="font-stm text-[11px] tracking-wider mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                Заявок: {applications.length} · Отзывов: {reviews.length}
              </div>
            </div>
          </div>
          <button onClick={refreshCurrent} className="btn-ghost px-5 py-3 text-xs hover-lift" style={{ borderRadius: 8 }}>
            <Icon name="RefreshCw" size={15} />
            Обновить
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-7">
          {/* side nav */}
          <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:w-56 shrink-0">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className="flex items-center gap-3 px-4 py-3.5 transition-all font-stm text-[11px] tracking-widest whitespace-nowrap"
                style={{
                  borderRadius: 8,
                  background: tab === t.key ? "rgba(220,38,38,0.16)" : "rgba(255,255,255,0.03)",
                  border: tab === t.key ? "1px solid rgba(220,38,38,0.5)" : "1px solid rgba(255,255,255,0.08)",
                  color: tab === t.key ? "#ffffff" : "rgba(255,255,255,0.55)",
                }}
              >
                <Icon name={t.icon} size={16} style={{ color: tab === t.key ? "#ef4444" : "rgba(255,255,255,0.5)" }} />
                {t.label.toUpperCase()}
              </button>
            ))}
          </nav>

          {/* content */}
          <div className="flex-1 min-w-0">{renderTab()}</div>
        </div>
      </div>
    </div>
  );
}