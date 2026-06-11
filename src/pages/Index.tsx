import { useState, useEffect, useRef, useCallback } from "react";
import Icon from "@/components/ui/icon";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import FloatingContact from "@/components/FloatingContact";
import UrgencyBar from "@/components/UrgencyBar";
import IncomeCalculator from "@/components/IncomeCalculator";
import LocationsBlock from "@/components/LocationsBlock";
import ScrollProgress from "@/components/ScrollProgress";
import ExitPopup from "@/components/ExitPopup";
import Comparison from "@/components/Comparison";
import AccessibilityBar from "@/components/AccessibilityBar";
import CyberBackground from "@/components/CyberBackground";
import HeroBackground from "@/components/HeroBackground";
import Ticker from "@/components/Ticker";
import LiveViewers from "@/components/LiveViewers";
import Timeline from "@/components/Timeline";
import Objections from "@/components/Objections";
import Blog from "@/components/Blog";
import CallbackModal from "@/components/CallbackModal";
import StatusCheck from "@/components/StatusCheck";
import AnimatedCounter from "@/components/AnimatedCounter";
import { trackClick } from "@/lib/api";

/* ── SOUND ENGINE ────────────────────────────────────────── */
function useSound() {
  const ctx = useRef<AudioContext | null>(null);
  const getCtx = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!ctx.current) ctx.current = new (window.AudioContext || (window as unknown as any).webkitAudioContext)();
    return ctx.current;
  };
  const playTone = useCallback((freq: number, dur: number, type: OscillatorType = "sine", vol = 0.12) => {
    try {
      const ac = getCtx();
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.connect(gain); gain.connect(ac.destination);
      osc.type = type; osc.frequency.value = freq;
      gain.gain.setValueAtTime(vol, ac.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + dur);
      osc.start(ac.currentTime); osc.stop(ac.currentTime + dur);
    } catch (_e) { /* audio unavailable */ }
  }, []);

  const click  = useCallback(() => { playTone(800, 0.08, "square", 0.08); }, [playTone]);
  const hover  = useCallback(() => { playTone(600, 0.05, "sine",   0.04); }, [playTone]);
  const submit = useCallback(() => {
    playTone(440, 0.1, "sine", 0.1);
    setTimeout(() => playTone(550, 0.1, "sine", 0.1), 100);
    setTimeout(() => playTone(660, 0.15, "sine", 0.1), 200);
  }, [playTone]);
  const open   = useCallback(() => { playTone(320, 0.12, "triangle", 0.07); playTone(480, 0.08, "sine", 0.05); }, [playTone]);

  return { click, hover, submit, open };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyIcon = any;

const HERO_IMG =
  "https://cdn.poehali.dev/projects/31cf2f8d-8f85-4cf9-801d-b8ed9fa0968a/files/e0ef8a96-7033-4373-a04a-4bfced936bd2.jpg";
const OSINT_IMG =
  "https://cdn.poehali.dev/projects/31cf2f8d-8f85-4cf9-801d-b8ed9fa0968a/files/093562c1-622b-46fe-83dc-220fd7099893.jpg";
const OSINT_VIZ_IMG =
  "https://cdn.poehali.dev/projects/31cf2f8d-8f85-4cf9-801d-b8ed9fa0968a/files/c56f25cc-b52f-43f4-a2cc-ea35eb332099.jpg";
const BPLA_IMG =
  "https://cdn.poehali.dev/projects/31cf2f8d-8f85-4cf9-801d-b8ed9fa0968a/files/8e748e04-f308-4462-a51e-341ca5da8cec.jpg";
const RER_IMG =
  "https://cdn.poehali.dev/projects/31cf2f8d-8f85-4cf9-801d-b8ed9fa0968a/files/31f5937d-f408-41ec-961e-c5b319d3ac3a.jpg";
const VAC_IMG =
  "https://cdn.poehali.dev/projects/31cf2f8d-8f85-4cf9-801d-b8ed9fa0968a/files/5e1392cc-774a-4b35-b131-8b80343f912a.jpg";
const BEN_IMG =
  "https://cdn.poehali.dev/projects/31cf2f8d-8f85-4cf9-801d-b8ed9fa0968a/files/18442483-2c7f-4b7c-9a66-e594809f4de4.jpg";
const STEPS_IMG =
  "https://cdn.poehali.dev/projects/31cf2f8d-8f85-4cf9-801d-b8ed9fa0968a/files/f0e34af6-750b-4435-a611-6beb231b73f9.jpg";
const FAQ_IMG =
  "https://cdn.poehali.dev/projects/31cf2f8d-8f85-4cf9-801d-b8ed9fa0968a/files/02080dfa-f5d0-43f6-9b10-801e6e33fd2c.jpg";
const CONTACTS_IMG =
  "https://cdn.poehali.dev/projects/31cf2f8d-8f85-4cf9-801d-b8ed9fa0968a/files/61ad5beb-bfc8-4fca-8b38-3d50a3196b4e.jpg";

/* ── LOGO (серебряная буква S) ──────────────────────────── */
const LogoS = ({ size = 36, animated = false }: { size?: number; animated?: boolean }) => (
  <div className={animated ? "logo-s-silver" : ""} style={{
    width: size, height: size,
    display: "flex", alignItems: "center", justifyContent: "center",
    background: "linear-gradient(140deg, #f4f6fa 0%, #c2c8d2 40%, #8b919c 100%)",
    borderRadius: size * 0.28,
    boxShadow: "0 0 20px rgba(210,216,224,0.4), 0 2px 0 rgba(255,255,255,0.25), inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -2px 3px rgba(0,0,0,0.3)",
    cursor: "default",
    perspective: "200px",
  }}>
    <span className="font-orb" style={{
      fontSize: size * 0.6,
      fontWeight: 900,
      lineHeight: 1,
      background: "linear-gradient(160deg, #3a3f47 0%, #6b7280 50%, #2c3036 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textShadow: "0 1px 0 rgba(255,255,255,0.3)",
    }}>S</span>
  </div>
);

/* ── VOLUMETRIC ICON BOX ────────────────────────────────── */
function IBox({ icon, size = 22, boxSize = 48, radius = 10, glow = false }: {
  icon: string; size?: number; boxSize?: number; radius?: number; glow?: boolean;
}) {
  return (
    <div className={`ibox shrink-0 ${glow ? "animate-icon-glow" : ""}`} style={{
      width: boxSize, height: boxSize,
      background: "linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 60%, rgba(0,0,0,0.1) 100%)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: radius,
      borderTop: "1px solid rgba(255,255,255,0.16)",
      borderLeft: "1px solid rgba(255,255,255,0.1)",
      borderBottom: "1px solid rgba(0,0,0,0.4)",
      borderRight: "1px solid rgba(0,0,0,0.2)",
    }}>
      <Icon name={icon as AnyIcon} size={size} style={{ color: "rgba(220,230,245,0.85)" }} />
    </div>
  );
}

/* ── SECTION REVEAL ─────────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ── DATA ───────────────────────────────────────────────── */
const NAV = [
  { label: "Вакансии",       href: "#vacancies" },
  { label: "Доход",          href: "#calculator" },
  { label: "Льготы",         href: "#benefits" },
  { label: "Отзывы",         href: "#reviews" },
  { label: "FAQ",            href: "#faq" },
  { label: "Контакты",       href: "#contacts" },
];

const RER_TASKS = [
  { icon: "Radio",     title: "Обнаружение сигналов",   desc: "Поиск и фиксация работающих радиостанций, радаров и других источников излучения противника." },
  { icon: "Ear",       title: "Радиоперехват",           desc: "Перехват переговоров и данных, передаваемых по открытым и частично защищённым каналам связи." },
  { icon: "BarChart2", title: "Анализ излучений",        desc: "Изучение характеристик сигналов: частота, мощность, режим работы — для идентификации источника." },
  { icon: "Search",    title: "OSINT-разведка",          desc: "Сбор и анализ данных из открытых источников: СМИ, социальные сети, цифровые следы объектов." },
  { icon: "Map",       title: "Определение позиций",     desc: "Вычисление координат источников излучения и нанесение их на разведывательные карты." },
  { icon: "Database",  title: "Аналитика и доклады",     desc: "Структурирование полученных данных и подготовка разведывательных докладов для командования." },
];

const VACANCIES_FALLBACK = [
  { id:1, specialty:"osint",     level:"опыт",      icon:"Search",  title:"OSINT-аналитик",
    desc:"Разведка по открытым источникам. Формирование досье объектов, мониторинг цифровых следов, подготовка аналитических докладов.", tags:["Аналитика","OSINT","Отчётность"] },
  { id:2, specialty:"it",        level:"опыт",      icon:"Monitor", title:"IT-специалист",
    desc:"Поддержка защищённой инфраструктуры. Настройка VPN-туннелей, шифрование каналов, администрирование серверов.", tags:["Безопасность","Сети","Linux"] },
  { id:3, specialty:"bpla",      level:"без опыта", icon:"Plane",   title:"Оператор БпЛА",
    desc:"Управление беспилотниками для воздушной разведки. Аэрофотосъёмка объектов, корректировка данных. Обучение с нуля.", tags:["БпЛА","Разведка","Навигация"] },
  { id:4, specialty:"logistics", level:"без опыта", icon:"Truck",   title:"Водитель-логист",
    desc:"Тыловое обеспечение подразделения. Перевозка личного состава и грузов, техническое обслуживание автопарка.", tags:["Логистика","Кат. C","Тыл"] },
  { id:5, specialty:"osint",     level:"без опыта", icon:"Rss",     title:"Мониторинг СМИ",
    desc:"Непрерывный мониторинг открытых СМИ, Telegram-каналов и соцсетей. Формирование ежедневных информационных дайджестов.", tags:["Медиа","Мониторинг","OSINT"] },
  { id:6, specialty:"it",        level:"опыт",      icon:"Server",  title:"Системный администратор",
    desc:"Поддержка серверного оборудования. Управление защищёнными каналами связи, резервное копирование, контроль доступа.", tags:["Серверы","Сети","Защита"] },
];

const SPEC_FILTERS  = [{v:"all",l:"Все"},{v:"osint",l:"OSINT"},{v:"it",l:"IT"},{v:"bpla",l:"БпЛА"},{v:"logistics",l:"Логистика"}];
const LEVEL_FILTERS = [{v:"all",l:"Любой опыт"},{v:"без опыта",l:"Без опыта"},{v:"опыт",l:"С опытом"}];

const BENEFITS = [
  {
    icon:"HeartPulse", title:"Медицинское обеспечение",
    sum:"Бесплатно",
    desc:"Полное медицинское и стоматологическое обслуживание за счёт государства. Лечение, реабилитация, санаторно-курортное лечение. Страхование жизни и здоровья на весь период службы.",
  },
  {
    icon:"Home", title:"Военная ипотека",
    sum:"до 3 900 000 ₽",
    desc:"Участие в накопительно-ипотечной системе (НИС). Государство ежегодно перечисляет средства на счёт военнослужащего. Первоначальный взнос и ежемесячные платежи — за счёт государства.",
  },
  {
    icon:"Zap", title:"Льготы по ЖКХ",
    sum:"до 50% скидка",
    desc:"Компенсация расходов на коммунальные услуги до 50%. Льготы распространяются на членов семьи. Действует на весь период службы и после её окончания.",
  },
  {
    icon:"CreditCard", title:"Кредитные каникулы",
    sum:"на весь срок службы",
    desc:"Полная приостановка выплат по кредитам и займам на период службы. Штрафы и пени не начисляются. Распространяется на ипотеку, потребительские кредиты и автокредиты.",
  },
  {
    icon:"GraduationCap", title:"Образование",
    sum:"Бесплатно",
    desc:"Право на поступление в военные вузы и гражданские университеты без экзаменов по квоте. Бесплатное обучение детей в подшефных учебных заведениях. Дополнительные профессиональные курсы.",
  },
  {
    icon:"ShieldCheck", title:"Списание задолженностей",
    sum:"до 10 000 000 ₽",
    desc:"Полное списание долгов по кредитам, микрозаймам и штрафам при выполнении условий контракта. Не требует судебных разбирательств. Применяется автоматически по решению командования.",
  },
  {
    icon:"Award", title:"Статус ветерана",
    sum:"Пожизненно",
    desc:"Удостоверение ветерана боевых действий. Надбавка к пенсии, скидки на транспорт, приоритет в очередях госуслуг. Льготы на протезирование, лекарства и санаторное лечение пожизненно.",
  },
  {
    icon:"Baby", title:"Льготы для семьи",
    sum:"Семья защищена",
    desc:"Бесплатное питание детей в школах и детских садах. Приоритетное зачисление в детские сады без очереди. Единовременные выплаты при рождении ребёнка. Социальная и юридическая поддержка семьи.",
  },
];

const STEPS = [
  { n:"01", t:"Заявка",       d:"Оставляете имя и телефон в форме на сайте", icon:"Send" },
  { n:"02", t:"Консультация", d:"Связываемся с вами в течение 24 часов",     icon:"Phone" },
  { n:"03", t:"Оформление",   d:"Документы и медицинское освидетельствование",icon:"FileCheck" },
  { n:"04", t:"Прибытие",     d:"Проезд до места формирования за наш счёт",  icon:"MapPin" },
  { n:"05", t:"Служба",       d:"Зачисление в подразделение и начало работы", icon:"ShieldCheck" },
];

const FAQ_FALLBACK = [
  { q:"Кто может подать заявку?",        a:"Граждане РФ от 18 до 49 лет. Для IT-специальностей — до 55 лет. Воинский опыт необязателен." },
  { q:"Какие требования к кандидатам?",  a:"Гражданство РФ, отсутствие серьёзных судимостей, прохождение медкомиссии. Специфика зависит от должности." },
  { q:"Где проходит формирование?",      a:"Формирование и подготовка проходят в г. Чита — столице Забайкальского края." },
  { q:"Где проходит служба?",            a:"Служба проходит в Донецке и Мариуполе." },
  { q:"Нужно ли покупать экипировку?",   a:"Нет. Вся необходимая экипировка и техника предоставляются подразделением." },
  { q:"Как подать заявку?",              a:"Оставьте имя и телефон в форме на сайте — специалист свяжется в течение 24 часов." },
  { q:"Как осуществляется отбор?",       a:"Телефонное интервью → встреча с представителем → медкомиссия → оформление документов." },
  { q:"Когда начинаются выплаты?",       a:"Единовременная — в течение первого месяца. Ежемесячное довольствие — с первого дня службы." },
];

/* ── COMPONENT ──────────────────────────────────────────── */
export default function Index() {
  const [spec,    setSpec]    = useState("all");
  const [level,   setLevel]   = useState("all");
  const [openFaq, setOpenFaq] = useState<number|null>(null);
  const [menu,    setMenu]    = useState(false);

  // Вакансии и FAQ — подгружаются с бэкенда, fallback при ошибке
  const [vacancies, setVacancies] = useState(VACANCIES_FALLBACK);
  const [faqList,   setFaqList]   = useState(FAQ_FALLBACK);
  const [faqSearch, setFaqSearch] = useState("");

  // Form state
  const [form, setForm] = useState({ name: "", phone: "", specialty: "", email: "" });
  const [formState, setFormState] = useState<"idle"|"loading"|"success"|"error">("idle");

  // Подсветка формы при переходе с карты
  const [formFlash, setFormFlash] = useState(false);

  // Автосохранение черновика заявки
  useEffect(() => {
    try {
      const draft = localStorage.getItem("app_draft");
      if (draft) {
        const d = JSON.parse(draft);
        setForm(p => ({ ...p, ...d }));
      }
    } catch { /* ignore */ }
  }, []);
  useEffect(() => {
    if (form.name || form.phone || form.email) {
      try { localStorage.setItem("app_draft", JSON.stringify(form)); } catch { /* ignore */ }
    }
  }, [form]);

  // Запуск вспышки формы
  const triggerFlash = useCallback(() => {
    setFormFlash(false);
    setTimeout(() => setFormFlash(true), 600);
    setTimeout(() => setFormFlash(false), 2400);
  }, []);

  // Подстановка специальности из кибер-карты
  useEffect(() => {
    const onSelect = (e: Event) => {
      const spec = (e as CustomEvent).detail;
      if (typeof spec === "string") setForm(p => ({ ...p, specialty: spec }));
      triggerFlash();
    };
    window.addEventListener("select-specialty", onSelect);
    return () => window.removeEventListener("select-specialty", onSelect);
  }, [triggerFlash]);

  // Вспышка при клике на любую кнопку «Оставить заявку» (ссылка на #contacts)
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a[href="#contacts"]');
      if (target) {
        triggerFlash();
        const section = target.closest("section")?.id || target.closest("[id]")?.id || "nav";
        trackClick(section);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [triggerFlash]);

  // Денежные суммы из настроек
  const [pay, setPay] = useState({ once: 2600000, monthly: 210000, federal: 400000, year: 5120000 });
  useEffect(() => {
    fetch("https://functions.poehali.dev/089447e4-e2ac-479d-b710-5eb8cb862516")
      .then(r => r.json())
      .then(d => {
        const s = d.settings || {};
        setPay({
          once: Number(s.pay_once) || 2600000,
          monthly: Number(s.pay_monthly) || 210000,
          federal: Number(s.pay_federal) || 400000,
          year: Number(s.pay_year_total) || 5120000,
        });
      })
      .catch(() => { /* defaults */ });
  }, []);

  // Загрузка вакансий и FAQ с бэкенда (с fallback на статичные данные)
  useEffect(() => {
    const ADMIN_URL = "https://functions.poehali.dev/88252a0d-1b4c-4850-a460-7bcb94f113d5";

    fetch(`${ADMIN_URL}?resource=vacancies`)
      .then(r => r.json())
      .then(d => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const list = (d.vacancies || []).map((v: any) => ({
          id: v.id,
          specialty: v.specialty,
          level: v.level,
          icon: v.icon,
          title: v.title,
          desc: v.descr,
          tags: Array.isArray(v.tags) ? v.tags : [],
        }));
        if (list.length) setVacancies(list);
      })
      .catch(() => { /* fallback */ });

    fetch(`${ADMIN_URL}?resource=faq`)
      .then(r => r.json())
      .then(d => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const list = (d.faq || []).map((f: any) => ({ q: f.question, a: f.answer }));
        if (list.length) setFaqList(list);
      })
      .catch(() => { /* fallback */ });
  }, []);

  const rub = (n: number) => n.toLocaleString("ru-RU") + " ₽";

  const filtered = vacancies.filter(v =>
    (spec  === "all" || v.specialty === spec) &&
    (level === "all" || v.level     === level)
  );

  const snd = useSound();

  const formatPhone = (raw: string) => {
    let d = raw.replace(/\D/g, "");
    if (d.startsWith("8")) d = "7" + d.slice(1);
    if (!d.startsWith("7")) d = "7" + d;
    d = d.slice(0, 11);
    const p = d.slice(1);
    let out = "+7";
    if (p.length > 0) out += " (" + p.slice(0, 3);
    if (p.length >= 3) out += ") " + p.slice(3, 6);
    if (p.length >= 6) out += "-" + p.slice(6, 8);
    if (p.length >= 8) out += "-" + p.slice(8, 10);
    return out;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    const digits = form.phone.replace(/\D/g, "");
    if (digits.length !== 11) {
      setFormState("error");
      setTimeout(() => setFormState("idle"), 4000);
      return;
    }
    snd.submit();
    setFormState("loading");
    try {
      const res = await fetch("https://functions.poehali.dev/3081148f-f070-40ab-b559-f959613dae1d", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setFormState("success");
        setForm({ name: "", phone: "", specialty: "", email: "" });
        try { localStorage.removeItem("app_draft"); } catch { /* ignore */ }
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
    setTimeout(() => setFormState("idle"), 5000);
  };
  const osintRef    = useReveal();
  const rerRef      = useReveal();
  const aboutRef    = useReveal();
  const vacRef      = useReveal();
  const benRef      = useReveal();
  const stepsRef    = useReveal();
  const faqRef      = useReveal();
  const contactsRef = useReveal();

  return (
    <div className="min-h-screen font-exo relative" style={{ background: "var(--bg)" }}>
      <CyberBackground />
      <div className="relative" style={{ zIndex: 1 }}>
      <ScrollProgress />
      <ExitPopup />
      <AccessibilityBar />
      <LiveViewers />
      <CallbackModal />
      <FloatingContact />

      {/* ══ NAV ═════════════════════════════════════════ */}
      <nav className="fixed top-0 inset-x-0 z-50 h-14 flex items-center"
        style={{ background: "rgba(28,32,38,0.72)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        {/* top green line */}
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), rgba(204,34,0,0.4), transparent)" }} />

        <div className="max-w-[1440px] w-full mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 shrink-0">
            <LogoS size={34} animated />
            <div>
              <div className="font-orb text-[12px] tracking-[0.18em] text-white leading-none">OSINT-РЭР</div>
              <div className="font-stm text-[8px] tracking-[0.2em] text-green-400/40 uppercase leading-none mt-0.5">Радиоэлектронная разведка</div>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-5">
            {NAV.map(n => <a key={n.href} href={n.href} className="nav-link" onClick={snd.click} onMouseEnter={snd.hover}>{n.label}</a>)}
          </div>

          <div className="flex items-center gap-3">
            <a href="#contacts" className="btn-red hidden sm:flex px-5 py-2.5 text-xs animate-pulse-red" style={{ borderRadius: "2px" }}>
              <Icon name="Send" size={13} />
              Оставить заявку
            </a>
            <button className="lg:hidden" style={{ color: "rgba(255,255,255,0.5)" }} onClick={() => setMenu(!menu)}>
              <Icon name={menu ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {menu && (
          <div className="absolute top-14 inset-x-0 px-6 py-5 flex flex-col gap-4 z-50"
            style={{ background: "rgba(18,20,23,0.99)", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            {NAV.map(n => <a key={n.href} href={n.href} className="nav-link py-1" onClick={() => setMenu(false)}>{n.label}</a>)}
            <a href="#contacts" className="btn-red py-3 text-xs" style={{ borderRadius: "2px" }}>Оставить заявку</a>
          </div>
        )}
      </nav>

      {/* ══ HERO ════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-14">
        {/* анимированный фон */}
        <HeroBackground />
        {/* фото-вставка с мягким наложением */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img src={HERO_IMG} alt="OSINT-РЭР" className="hero-photo-alive w-full h-full object-cover"
            style={{ filter: "brightness(0.85) saturate(1) contrast(1.05)", opacity: 0.7 }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(110deg, rgba(28,32,38,0.6) 12%, rgba(28,32,38,0.25) 55%, rgba(28,32,38,0.58) 100%)" }} />
          {/* Corner accents */}
          <div className="absolute top-20 left-0 w-px h-48" style={{ background: "linear-gradient(180deg, transparent, rgba(200,205,212,0.6), transparent)" }} />
          <div className="absolute top-20 right-0 w-px h-48" style={{ background: "linear-gradient(180deg, transparent, rgba(245,147,50,0.6), transparent)" }} />
        </div>

        <div className="relative max-w-[1440px] w-full mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-10 xl:gap-14 items-start">

            {/* LEFT */}
            <div>
              <div className="animate-fade-up d0 inline-flex items-center gap-3 mb-8 px-5 py-3 cyber-frame"
                style={{ border: "1px solid rgba(255,255,255,0.25)", borderRadius: "3px", background: "rgba(255,255,255,0.05)" }}>
                <div className="w-2.5 h-2.5 rounded-full animate-blink" style={{ background: "#ffffff", boxShadow: "0 0 10px #ffffff" }} />
                <span className="font-stm tracking-[0.3em]" style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.82rem" }}>НАБОР ОТКРЫТ · 2026</span>
                <div className="w-2.5 h-2.5 rounded-full animate-blink" style={{ background: "#ffffff", boxShadow: "0 0 10px #ffffff", animationDelay: "0.5s" }} />
              </div>

              <h1 className="animate-fade-up d1 font-orb text-white leading-[0.88] mb-6"
                style={{ fontSize: "clamp(2.8rem, 7vw, 5.8rem)", textTransform: "uppercase", letterSpacing: "-0.02em" }}>
                OSINT<br />
                <span className="hero-title-accent" style={{ color: "#f59332", textShadow: "0 0 36px rgba(245,147,50,0.55)" }}>подразделение</span><br />
                <span style={{ fontSize: "40%", color: "rgba(200,205,212,0.55)", fontFamily: "'Exo 2', sans-serif", fontWeight: 300, letterSpacing: "0.06em" }}>Радиоэлектронная разведка · РЭР</span>
              </h1>

              <p className="animate-fade-up d2 text-white/48 text-base leading-relaxed max-w-[480px] mb-2">
                Анализ открытых источников, IT, операторы БпЛА, логистика.
              </p>
              <div className="animate-fade-up d3 mb-10 flex flex-col gap-2">
                <p className="font-stm tracking-widest" style={{ fontSize: "clamp(0.85rem, 2vw, 1.1rem)", color: "rgba(255,255,255,0.75)", textShadow: "0 0 16px rgba(255,255,255,0.35)" }}>
                  &gt; БЕЗ УЧАСТИЯ В БОЕВЫХ ДЕЙСТВИЯХ_<span className="cursor" />
                </p>
                <p className="font-stm tracking-widest text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
                  &gt; СЛУЖБА: <span style={{ color: "rgba(255,255,255,0.6)" }}>ДОНЕЦК · МАРИУПОЛЬ</span>
                </p>
              </div>

              <div className="animate-fade-up d4 flex flex-wrap gap-4">
                <a href="#contacts" className="btn-red px-10 py-4 text-xs animate-pulse-red" style={{ borderRadius: "2px" }} onClick={snd.submit} onMouseEnter={snd.hover}>
                  <Icon name="Send" size={15} />
                  Оставить заявку
                </a>
                <a href="#rer" className="btn-ghost px-10 py-4 text-xs" style={{ borderRadius: "2px" }} onClick={snd.click} onMouseEnter={snd.hover}>
                  <Icon name="ChevronDown" size={15} />
                  Что такое РЭР
                </a>
              </div>

              <div className="animate-fade-up d5 mt-14 flex flex-wrap gap-8">
                {[
                  { val:rub(pay.year), sub:"Доход за 1-й год", color:"#f59332" },
                  { val:rub(pay.monthly), sub:"В месяц",        color:"#ffffff" },
                  { val:"1000+",       sub:"Задач выполнено",   color:"#ffffff" },
                ].map((s, i) => (
                  <div key={i} className="animate-fade-up" style={{ animationDelay: `${0.5 + i * 0.1}s`, opacity: 0 }}>
                    <div className="font-orb leading-none mb-1.5 whitespace-nowrap" style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)", color: s.color, textShadow: `0 0 20px ${s.color}60` }}>{s.val}</div>
                    <div className="font-stm text-[10px] tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>{s.sub}</div>
                  </div>
                ))}
              </div>

              {/* Ключевые условия */}
              <div className="animate-fade-up d5 mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3" style={{ animationDelay: "0.8s", opacity: 0 }}>
                {[
                  { icon:"UserCheck", t:"18–49 лет",     s:"Возраст" },
                  { icon:"GraduationCap", t:"Обучение",  s:"С нуля, бесплатно" },
                  { icon:"FileSignature", t:"Контракт",  s:"Официально" },
                  { icon:"ShieldOff", t:"Без боёв",      s:"Тыловые районы" },
                ].map((c, i) => (
                  <div key={i} className="vol-card shimmer-hover hover-lift flex flex-col gap-2 p-4 animate-fade-blur"
                    style={{ animationDelay: `${0.9 + i * 0.1}s`, opacity: 0, borderColor: "rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.03)", boxShadow: "0 0 22px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.06)" }}>
                    <IBox icon={c.icon} size={16} boxSize={34} radius={7} />
                    <div className="font-orb text-white text-sm leading-tight">{c.t}</div>
                    <div className="font-stm text-[9px] tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>{c.s}</div>
                  </div>
                ))}
              </div>

              {/* Кому подходит */}
              <div className="animate-fade-blur mt-6 vol-card p-6" style={{ animationDelay: "1.2s", opacity: 0, borderColor: "rgba(220,38,38,0.3)", background: "rgba(220,38,38,0.05)", boxShadow: "0 0 24px rgba(220,38,38,0.08)" }}>
                <div className="font-stm text-[10px] tracking-widest mb-4" style={{ color: "rgba(239,68,68,0.85)" }}>НАПРАВЛЕНИЯ НАБОРА</div>
                <div className="flex flex-wrap gap-2.5">
                  {["OSINT-аналитик","IT-специалист","Оператор БпЛА","Мониторинг СМИ","Логистика","Сисадмин"].map((tag, i) => (
                    <span key={i} className="font-stm text-[11px] tracking-wide px-3.5 py-2 transition-all hover:scale-105"
                      style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.18)", borderRadius:6, color:"rgba(255,255,255,0.8)" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: Payment card */}
            <div className="animate-fade-right d3 animate-float">
              <div className="cyber-frame" style={{ filter: "drop-shadow(0 0 30px rgba(204,34,0,0.18)) drop-shadow(0 40px 80px rgba(0,0,0,0.8))" }}>
                <div className="red-card" style={{ borderRadius: "3px" }}>
                  <div className="p-5 sm:p-8">

                    <div className="flex items-center justify-between mb-7">
                      <div className="flex items-center gap-2.5">
                        <LogoS size={22} animated />
                        <span className="font-stm text-[9px] tracking-[0.25em]" style={{ color: "rgba(255,255,255,0.4)" }}>ВЫПЛАТЫ / ДОХОДЫ</span>
                      </div>
                      <div className="flex gap-1.5">
                        {["#f0f0f0","#003791","#cc2200"].map((c,i) => (
                          <div key={i} className="w-2 h-2 rounded-full" style={{ background: c, boxShadow: `0 0 6px ${c}88` }} />
                        ))}
                      </div>
                    </div>

                    {[
                      { label: "Единовременно", value: rub(pay.once), icon: "Banknote" },
                      { label: "Ежемесячно от", value: rub(pay.monthly), icon: "CalendarDays" },
                      { label: "Фед. выплата",  value: rub(pay.federal), icon: "Landmark" },
                    ].map((p, i) => (
                      <div key={i} className={`flex justify-between items-center animate-fade-up ${i === 0 ? "py-5" : "py-3"}`}
                        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", animationDelay: `${0.3 + i*0.1}s`, opacity: 0 }}>
                        <div className="flex items-center gap-2.5">
                          <IBox icon={p.icon} size={i === 0 ? 18 : 14} boxSize={i === 0 ? 38 : 30} radius={6} glow={i === 0} />
                          <span className={`font-exo ${i === 0 ? "text-base font-semibold text-white/70" : "text-sm text-white/42"}`}>{p.label}</span>
                        </div>
                        {i === 0
                          ? <span className="font-orb font-black leading-none" style={{ fontSize: "clamp(1.6rem, 4vw, 2.1rem)", color: "#ff2200", textShadow: "0 0 24px rgba(255,34,0,0.7), 0 0 8px rgba(255,34,0,0.4)" }}>{p.value}</span>
                          : <span className="money text-lg">{p.value}</span>
                        }
                      </div>
                    ))}

                    <div className="p-5 mt-5 mb-5" style={{ background: "rgba(204,34,0,0.08)", border: "1px solid rgba(204,34,0,0.2)", borderRadius: "2px" }}>
                      <div className="font-stm text-[9px] tracking-widest mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>ОБЩИЙ ДОХОД · ГОД 1</div>
                      <div className="money-red leading-none" style={{ fontSize: "2.2rem" }}>от <AnimatedCounter to={pay.year} suffix=" ₽" /></div>
                    </div>

                    <div className="flex items-center gap-3 p-3 mb-4" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "2px" }}>
                      <Icon name="Shield" size={12} style={{ color: "rgba(255,255,255,0.5)" }} />
                      <span className="font-stm text-[9px] tracking-wider" style={{ color: "rgba(255,255,255,0.28)" }}>Гарантии государства РФ</span>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5">
                      {[{ icon:"HeartPulse", label:"Медицина" },{ icon:"Home", label:"Ипотека" },{ icon:"GraduationCap", label:"Льготы" }].map((q, i) => (
                        <div key={i} className="flex flex-col items-center gap-1.5 p-2.5 cursor-pointer transition-all hover:scale-105"
                          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "2px" }}>
                          <IBox icon={q.icon} size={13} boxSize={28} radius={5} />
                          <span className="font-stm text-[8px]" style={{ color: "rgba(255,255,255,0.28)" }}>{q.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ БЕГУЩАЯ СТРОКА ══════════════════════════════ */}
      <Ticker />

      {/* ══ STATS BAR ═══════════════════════════════════ */}
      <div style={{ background: "rgba(255,255,255,0.03)", borderTop: "1px solid rgba(255,255,255,0.15)", borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
        <div className="max-w-[1440px] mx-auto px-6 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0">
            {[
              { icon: "Banknote",    val: rub(pay.once),    sub: "Единовременная выплата" },
              { icon: "Clock",       val: "24 / 7",          sub: "Аналитическая работа" },
              { icon: "BarChart3",   val: "1000+",           sub: "Выполненных задач" },
              { icon: "ShieldCheck", val: "100%",            sub: "Конфиденциальность" },
              { icon: "MapPin",      val: "Тыловые районы",  sub: "Без боевых действий" },
            ].map((s, i) => (
              <div key={i} className={`stat-card flex items-center gap-4 px-6 animate-fade-up ${i === 0 ? "py-6 sm:col-span-2 lg:col-span-1" : "py-5"}`}
                style={{
                  animationDelay: `${i * 0.08}s`, opacity: 0,
                  borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.1)" : "none",
                  ...(i === 0 ? { background: "rgba(204,34,0,0.06)", borderLeft: "3px solid rgba(204,34,0,0.6)" } : {}),
                }}>
                <div className="shrink-0" style={{
                  width: i === 0 ? 64 : 58, height: i === 0 ? 64 : 58,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: i === 0
                    ? "linear-gradient(145deg, rgba(204,34,0,0.22) 0%, rgba(204,34,0,0.06) 60%, rgba(0,0,0,0.15) 100%)"
                    : "linear-gradient(145deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 60%, rgba(0,0,0,0.15) 100%)",
                  border: i === 0 ? "1px solid rgba(204,34,0,0.35)" : "1px solid rgba(255,255,255,0.22)",
                  borderTop: i === 0 ? "1px solid rgba(204,34,0,0.5)" : "1px solid rgba(255,255,255,0.35)",
                  borderRadius: 14,
                  boxShadow: i === 0
                    ? "0 0 28px rgba(204,34,0,0.3), 0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)"
                    : "0 0 28px rgba(255,255,255,0.2), 0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)",
                  position: "relative",
                }}>
                  <Icon name={s.icon as AnyIcon} size={i === 0 ? 30 : 26} style={{ color: i === 0 ? "rgba(255,100,80,0.95)" : "rgba(220,240,255,0.9)" }} />
                </div>
                <div className="min-w-0">
                  <div className="font-orb font-black leading-tight"
                    style={{
                      fontSize: i === 0 ? "clamp(1.2rem, 4.5vw, 1.9rem)" : "clamp(1rem, 1.8vw, 1.35rem)",
                      color: i === 0 ? "#ff2200" : "#fff",
                      textShadow: i === 0 ? "0 0 20px rgba(255,34,0,0.6)" : "none",
                      wordBreak: "break-all",
                    }}>{s.val}</div>
                  <div className="font-exo text-sm mt-0.5" style={{ color: i === 0 ? "rgba(255,150,130,0.7)" : "rgba(255,255,255,0.4)" }}>{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ СРОЧНОСТЬ ═══════════════════════════════════ */}
      <UrgencyBar />

      {/* ══ ОТЗЫВЫ ══════════════════════════════════════ */}
      <div id="reviews"><ReviewsCarousel /></div>

      {/* ══ БЛОГ ════════════════════════════════════════ */}
      <Blog />

      {/* ══ ЧТО ТАКОЕ OSINT ════════════════════════════ */}
      <section id="osint" className="py-28 relative overflow-hidden sect-texture" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="absolute inset-0 grid-cyber opacity-40 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-px" style={{ background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.4), transparent)" }} />

        <div className="max-w-[1440px] mx-auto px-6">
          <div ref={osintRef} className="section-entry">
            <div className="label-mono mb-3">// Что такое OSINT</div>
            <div className="accent-line" />
            <h2 className="font-orb text-white uppercase leading-tight mb-10" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              Open Source<br /><span style={{ color: "#ffffff" }}>Intelligence</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-12">
              {/* Текст */}
              <div>
                <div className="vol-card p-7 mb-6" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
                  <p className="font-exo text-white/72 text-base leading-[1.95] mb-4">
                    <span className="font-orb text-white text-sm tracking-wide">OSINT</span>{" "}
                    (Open Source Intelligence) — это разведка на основе открытых источников. Специалисты собирают, проверяют и анализируют информацию из СМИ, социальных сетей, публичных баз данных, спутниковых снимков, форумов, видео и фото. Всё это — легальные, общедоступные материалы.
                  </p>
                  <p className="font-exo text-white/55 text-sm leading-[1.85] mb-5">
                    В армии OSINT помогает понимать обстановку без прямого контакта с противником, отслеживать перемещения, выявлять угрозы, готовить аналитику для командования и поддерживать работу операторов БпЛА, РЭР и штаба.
                  </p>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-orb text-xs text-white/60">Польза OSINT в армии:</span>
                    <div className="flex gap-1">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="h-2.5 rounded-sm" style={{
                          width: 20,
                          background: i < 9 ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.1)",
                          boxShadow: i < 9 ? "0 0 6px rgba(255,255,255,0.5)" : "none",
                          transition: `opacity 0.3s ${i * 0.05}s`,
                        }} />
                      ))}
                    </div>
                    <span className="font-orb text-sm" style={{ color: "#ffffff" }}>9 / 10</span>
                  </div>
                </div>

                {/* Источники OSINT */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon:"Newspaper",    label:"СМИ и новости",        col:"rgba(255,255,255," },
                    { icon:"MessageCircle",label:"Социальные сети",      col:"rgba(255,255,255," },
                    { icon:"Map",          label:"Карты и геоданные",    col:"rgba(255,255,255," },
                    { icon:"Camera",       label:"Фото и видео",         col:"rgba(255,255,255," },
                    { icon:"Database",     label:"Публичные базы данных",col:"rgba(255,255,255," },
                    { icon:"Globe",        label:"Открытые реестры",     col:"rgba(255,255,255," },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 animate-fade-left"
                      style={{ animationDelay: `${i * 0.08}s`, opacity: 0, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 4 }}>
                      <IBox icon={s.icon} size={16} boxSize={34} radius={8} glow />
                      <span className="font-exo text-white/60 text-sm">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Картинка */}
              <div className="relative animate-fade-right" style={{ opacity: 0, animationDelay: "0.2s" }}>
                <div className="cyber-frame overflow-hidden rounded" style={{ borderRadius: 4 }}>
                  <img src={OSINT_VIZ_IMG} alt="OSINT визуализация"
                    className="w-full object-cover"
                    style={{ height: 340, filter: "brightness(1) saturate(1.05) contrast(1.05)" }} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(28,32,38,0.7) 100%)" }} />
                  <div className="absolute bottom-5 left-5">
                    <div className="font-stm text-[10px] tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.6)" }}>// OSINT VISUALIZATION</div>
                    <div className="font-orb text-white text-base">Разведка открытых источников</div>
                  </div>
                </div>
                {/* floating badge */}
                <div className="absolute -top-4 -right-4 px-4 py-2 animate-float"
                  style={{ background: "rgba(28,32,38,0.7)", border: "1px solid rgba(255,255,255,0.35)", borderRadius: 3, boxShadow: "0 0 20px rgba(255,255,255,0.15)" }}>
                  <div className="font-orb text-xs" style={{ color: "#ffffff" }}>OSINT · 24/7</div>
                </div>
              </div>
            </div>

            {/* Вторая картинка — аналитики */}
            <div className="relative overflow-hidden cyber-frame animate-fade-up" style={{ opacity: 0, animationDelay: "0.3s", borderRadius: 4 }}>
              <img src={OSINT_IMG} alt="OSINT команда"
                className="w-full object-cover"
                style={{ height: 280, objectPosition: "center 30%", filter: "brightness(0.98) saturate(1.05) contrast(1.05)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(28,32,38,0.65) 0%, transparent 40%, rgba(28,32,38,0.52) 100%)" }} />
              <div className="absolute inset-0 grid-cyber opacity-30" />
              <div className="absolute left-8 top-1/2 -translate-y-1/2">
                <div className="font-stm text-[10px] tracking-[0.3em] mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>// LIVE MONITORING</div>
                <div className="font-orb text-white text-xl uppercase mb-2">Аналитики за работой</div>
                <div className="font-exo text-white/50 text-sm max-w-xs">Круглосуточный мониторинг открытых источников в защищённом контуре</div>
              </div>
              <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                {["СМИ активны", "Telegram · 847 каналов", "Соцсети · мониторинг"].map((t, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-1.5"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 2 }}>
                    <div className="w-1.5 h-1.5 rounded-full animate-blink" style={{ background: "#ffffff", animationDelay: `${i * 0.4}s` }} />
                    <span className="font-stm text-[10px] tracking-wider" style={{ color: "rgba(255,255,255,0.7)" }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ЧТО ТАКОЕ РЭР ══════════════════════════════ */}
      <section id="rer" className="py-28 relative overflow-hidden sect-texture t-dots">
        {/* cyber bg accent */}
        <div className="absolute inset-0 grid-cyber opacity-50 pointer-events-none" />
        <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.3), transparent)" }} />

        <div className="max-w-[1440px] mx-auto px-6">
          <div ref={rerRef} className="section-entry">
            <div className="label-mono mb-3">// Что такое РЭР</div>
            <div className="accent-line" />
            <h2 className="font-orb text-white uppercase leading-tight mb-6" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              <span className="animate-fade-left d0">Радиоэлектронная разведка</span>
            </h2>
            {/* Главное описание */}
            <div className="max-w-2xl mb-8 p-6 vol-card" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
              {/* Animated header row */}
              <div className="flex items-center gap-3 mb-4 pb-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                <div className="w-2 h-2 rounded-full animate-blink" style={{ background: "#ffffff", boxShadow: "0 0 8px #ffffff" }} />
                <span className="font-stm text-xs tracking-widest text-scan-green">СИСТЕМА РАДИОЭЛЕКТРОННОЙ РАЗВЕДКИ</span>
                <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.3), transparent)" }} />
              </div>
              <p className="font-exo text-white/70 text-base leading-[1.95] mb-4 animate-text-reveal">
                <span className="font-orb text-white text-sm tracking-wide">РЭР — радиоэлектронная разведка.</span>{" "}
                Это направление разведки, которое занимается обнаружением, перехватом и анализом радиоэлектронных сигналов: связи, радиостанций, радаров и других источников излучения. РЭР помогает понимать активность противника, выявлять источники сигналов и получать важную информацию без прямого контакта.
              </p>
              <p className="font-exo text-white/55 text-sm leading-[1.85] mb-5 animate-text-reveal" style={{ animationDelay: "0.15s" }}>
                <span className="font-orb text-scan-green text-xs tracking-wide">Польза РЭР — очень высокая: 9/10.</span>{" "}
                Она помогает быстрее получать данные, повышает осведомлённость об обстановке, поддерживает работу аналитиков, операторов БпЛА и командования.
              </p>
              {/* Рейтинг 9/10 */}
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="h-2 rounded-sm transition-all" style={{
                      width: 18,
                      background: i < 9 ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.1)",
                      boxShadow: i < 9 ? "0 0 6px rgba(255,255,255,0.5)" : "none",
                    }} />
                  ))}
                </div>
                <span className="font-orb text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>9 / 10</span>
              </div>
            </div>

            {/* Картинка РЭР */}
            <div className="relative overflow-hidden cyber-frame mb-8 animate-fade-up" style={{ opacity: 0, animationDelay: "0.25s", borderRadius: 4 }}>
              <img src={RER_IMG} alt="Радиоэлектронная разведка"
                className="w-full object-cover"
                style={{ height: 300, objectPosition: "center 30%", filter: "brightness(0.98) saturate(1.05) contrast(1.05)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(28,32,38,0.7) 0%, transparent 40%, rgba(28,32,38,0.6) 100%)" }} />
              <div className="absolute inset-0 grid-cyber opacity-30" />
              <div className="absolute left-8 top-1/2 -translate-y-1/2 max-w-xs">
                <div className="font-stm text-[10px] tracking-[0.3em] mb-2 text-scan-green">// РЭР · ОПЕРАТОР · LIVE</div>
                <div className="font-orb text-white text-xl uppercase mb-2 leading-tight">Радиоэлектронная<br />разведка</div>
                <div className="font-exo text-white/50 text-sm">Перехват и анализ сигналов противника в реальном времени</div>
              </div>
              <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                {["Диапазон · активен", "Перехват · идёт", "Анализ · выполняется"].map((t, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-1.5"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.22)", borderRadius: 2 }}>
                    <div className="w-1.5 h-1.5 rounded-full animate-blink" style={{ background: "#ffffff", animationDelay: `${i * 0.35}s` }} />
                    <span className="font-stm text-[10px] tracking-wider text-scan-green">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {RER_TASKS.map((t, i) => (
                <div key={i} className="vol-card p-6 cyber-frame animate-scale-in group" style={{ animationDelay: `${i * 0.09}s`, opacity: 0 }} onMouseEnter={snd.hover}>
                  <div className="mb-5 transition-transform group-hover:scale-110 group-hover:rotate-3">
                    <IBox icon={t.icon} size={26} boxSize={58} radius={14} glow />
                  </div>
                  <div className="font-orb text-white text-sm uppercase mb-3 tracking-wide group-hover:text-scan-green transition-all">{t.title}</div>
                  <div className="h-px mb-3" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.25), transparent)", width: 28 }} />
                  <div className="font-exo text-white/50 text-sm leading-[1.75]">{t.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ ABOUT ═══════════════════════════════════════ */}
      <section id="about" className="py-28 relative sect-texture t-red" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="absolute right-0 top-0 bottom-0 w-px" style={{ background: "linear-gradient(180deg, transparent, rgba(204,34,0,0.3), transparent)" }} />
        <div className="max-w-[1440px] mx-auto px-6">
          <div ref={aboutRef} className="section-entry">

            {/* ── OSINT описание ── */}
            <div className="label-mono mb-3">// Команда OSINT</div>
            <div className="accent-line" />
            <h2 className="font-orb text-white uppercase leading-tight mb-6" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              <span className="animate-fade-left d0">Команда</span>{" "}
              <span className="text-scan-green animate-fade-left d1" style={{ WebkitTextFillColor: undefined }}>OSINT</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* OSINT блок */}
              <div className="vol-card p-7" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="animate-icon-float">
                    <IBox icon="Search" size={24} boxSize={52} radius={12} glow />
                  </div>
                  <div>
                    <span className="font-orb text-white text-sm uppercase tracking-wide">OSINT-подразделение</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full animate-blink" style={{ background: "#ffffff" }} />
                      <span className="font-stm text-[9px] tracking-widest" style={{ color: "rgba(255,255,255,0.5)" }}>АКТИВНО · 24/7</span>
                    </div>
                  </div>
                </div>
                <div className="h-px mb-4" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.3), transparent)" }} />
                <p className="font-exo text-white/65 text-sm leading-[1.95] mb-4 animate-text-reveal">
                  <span className="font-orb text-white/90 text-xs tracking-wide">OSINT-подразделение</span> — это команда специалистов, которая занимается сбором, проверкой и анализом информации из открытых источников: СМИ, социальных сетей, карт, публичных баз данных, фото, видео и других доступных материалов. Такая работа помогает быстрее понимать обстановку, выявлять важные события, отслеживать изменения и готовить аналитические материалы для командования.
                </p>
                <p className="font-exo text-white/50 text-sm leading-[1.85] mb-5 animate-text-reveal" style={{ animationDelay: "0.2s" }}>
                  <span className="font-orb text-xs" style={{ color: "#ffffff" }}>Польза OSINT в армии — очень высокая: 9/10.</span>{" "}
                  OSINT помогает принимать более точные решения, дополняет данные разведки, снижает неопределённость, ускоряет анализ ситуации и поддерживает работу других направлений: РЭР, БпЛА, связи, IT и штабной аналитики.
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div key={i} className="h-2 rounded-sm" style={{
                        width: 16,
                        background: i < 9 ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.1)",
                        boxShadow: i < 9 ? "0 0 6px rgba(255,255,255,0.5)" : "none",
                      }} />
                    ))}
                  </div>
                  <span className="font-orb text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>9 / 10</span>
                </div>
              </div>

              {/* Задачи команды */}
              <div className="flex flex-col gap-3">
                {[
                  "Обнаружение и перехват радиоэлектронных сигналов",
                  "Анализ активности противника по данным РЭР",
                  "Сбор данных из открытых источников (OSINT)",
                  "Мониторинг СМИ, Telegram и социальных сетей",
                  "Подготовка аналитических докладов для командования",
                  "Поддержка операторов БпЛА актуальными данными",
                ].map((t, i) => (
                  <div key={i} className="flex items-start gap-3 animate-fade-right" style={{ animationDelay: `${0.1 + i * 0.07}s`, opacity: 0 }}>
                    <div className="ibox mt-0.5 shrink-0" style={{ width: 20, height: 20, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 5 }}>
                      <Icon name="ChevronRight" size={11} style={{ color: "rgba(255,255,255,0.7)" }} />
                    </div>
                    <span className="font-exo text-white/55 text-sm leading-relaxed">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Картинка команды ── */}
            <div className="relative overflow-hidden cyber-frame mb-8 animate-fade-up" style={{ opacity: 0, animationDelay: "0.2s", borderRadius: 4 }}>
              <img src={BPLA_IMG} alt="Операторы БпЛА"
                className="w-full object-cover"
                style={{ height: 260, objectPosition: "center 40%", filter: "brightness(0.98) saturate(1.05) contrast(1.05)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(28,32,38,0.68) 0%, transparent 45%, rgba(28,32,38,0.55) 100%)" }} />
              <div className="absolute inset-0 grid-cyber opacity-25" />
              <div className="absolute left-8 top-1/2 -translate-y-1/2">
                <div className="font-stm text-[10px] tracking-[0.3em] mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>// ОПЕРАТОРЫ БпЛА</div>
                <div className="font-orb text-white text-xl uppercase mb-2">Воздушная разведка</div>
                <div className="font-exo text-white/50 text-sm max-w-xs">Управление беспилотниками, аэрофотосъёмка и корректировка данных в реальном времени</div>
              </div>
              <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                {["БпЛА · в воздухе", "Съёмка · активна", "Связь · защищена"].map((t, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-1.5"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 2 }}>
                    <div className="w-1.5 h-1.5 rounded-full animate-blink" style={{ background: "#ffffff", animationDelay: `${i * 0.3}s` }} />
                    <span className="font-stm text-[10px] tracking-wider" style={{ color: "rgba(255,255,255,0.7)" }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── О командирах ── */}
            <div className="vol-card p-8 cyber-frame mb-6" style={{ borderColor: "rgba(204,34,0,0.25)", background: "rgba(204,34,0,0.04)" }}>
              <div className="flex items-center gap-4 mb-8">
                <div className="animate-icon-float"><IBox icon="ShieldCheck" size={26} boxSize={60} radius={14} glow /></div>
                <div>
                  <div className="font-orb text-white text-base uppercase tracking-wide mb-0.5">О командирах</div>
                  <div className="font-stm text-[9px] tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>ПРОФЕССИОНАЛЬНЫЙ СОСТАВ</div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon:"Star",          title:"Боевой опыт",              desc:"Каждый командир прошёл реальные операции и знает, как действовать в условиях неопределённости и стресса." },
                  { icon:"GraduationCap", title:"Военное образование",      desc:"Специализированные курсы разведки, технических дисциплин и управления личным составом." },
                  { icon:"Users",         title:"Наставничество",           desc:"Каждый новобранец закрепляется за опытным офицером, который сопровождает его на всех этапах службы." },
                  { icon:"Target",        title:"Результат — главное",      desc:"Чёткие задачи, полное обеспечение ресурсами и личная ответственность за итог операции." },
                ].map((c, i) => (
                  <div key={i} className="flex flex-col gap-3 p-5 animate-scale-in group cursor-default"
                    style={{ animationDelay: `${i * 0.1}s`, opacity: 0, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "3px", transition: "all 0.3s" }}
                    onMouseEnter={snd.hover}>
                    <div className="transition-transform group-hover:scale-110 group-hover:-rotate-3">
                      <IBox icon={c.icon} size={22} boxSize={50} radius={12} glow />
                    </div>
                    <div className="font-orb text-white text-xs uppercase tracking-wide leading-snug">{c.title}</div>
                    <div className="font-exo text-white/50 text-xs leading-[1.75]">{c.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── О солдатах ── */}
            <div className="vol-card p-8 cyber-frame" style={{ borderColor: "rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.02)" }}>
              <div className="flex items-center gap-4 mb-8">
                <div className="animate-icon-float"><IBox icon="Users" size={26} boxSize={60} radius={14} glow /></div>
                <div>
                  <div className="font-orb text-white text-base uppercase tracking-wide mb-0.5">О солдатах</div>
                  <div className="font-stm text-[9px] tracking-widest text-scan-green">ПРОФЕССИОНАЛЬНЫЙ СОСТАВ</div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon:"Cpu",          title:"Технически подготовлены",  desc:"Каждый боец владеет современной техникой: компьютерами, антеннами, системами перехвата и анализа сигналов." },
                  { icon:"Brain",        title:"Аналитический склад ума",  desc:"Наши специалисты умеют читать данные, выявлять закономерности и делать точные выводы под давлением." },
                  { icon:"ShieldCheck",  title:"Физически и морально готовы", desc:"Регулярные тренировки, психологическая устойчивость и готовность действовать в сложных условиях." },
                  { icon:"Handshake",    title:"Командная работа",         desc:"Слаженность — наш главный инструмент. Каждый знает свою роль и доверяет товарищу рядом." },
                ].map((c, i) => (
                  <div key={i} className="flex flex-col gap-3 p-5 animate-scale-in group cursor-default"
                    style={{ animationDelay: `${0.1 + i * 0.1}s`, opacity: 0, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "3px", transition: "all 0.3s" }}
                    onMouseEnter={snd.hover}>
                    <div className="transition-transform group-hover:scale-110 group-hover:rotate-3">
                      <IBox icon={c.icon} size={22} boxSize={50} radius={12} glow />
                    </div>
                    <div className="font-orb text-white text-xs uppercase tracking-wide leading-snug">{c.title}</div>
                    <div className="font-exo text-white/50 text-xs leading-[1.75]">{c.desc}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ VACANCIES ═══════════════════════════════════ */}
      <section id="vacancies" className="py-28 relative sect-texture" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="absolute inset-0 grid-cyber opacity-30 pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-6">
          <div ref={vacRef} className="section-entry">
            <div className="label-mono mb-3">// Открытые позиции</div>
            <div className="accent-line" />
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
              <div className="flex flex-col gap-4">
                <h2 className="font-orb text-white uppercase leading-tight" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
                  Требуемые<br /><span style={{ color: "#cc2200" }}>специалисты</span>
                </h2>
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="flex flex-wrap gap-2">{SPEC_FILTERS.map(f => <button key={f.v} className={`tag-filter ${spec===f.v?"active":""}`} onClick={() => { setSpec(f.v); snd.click(); }} onMouseEnter={snd.hover}>{f.l}</button>)}</div>
                <div className="flex flex-wrap gap-2">{LEVEL_FILTERS.map(f => <button key={f.v} className={`tag-filter ${level===f.v?"active":""}`} onClick={() => { setLevel(f.v); snd.click(); }} onMouseEnter={snd.hover}>{f.l}</button>)}</div>
              </div>
            </div>

            <div className="relative w-full h-52 mb-10 overflow-hidden" style={{ borderRadius: "3px" }}>
              <img src={VAC_IMG} alt="Специалисты" className="w-full h-full object-cover" style={{ filter: "brightness(0.98) saturate(1.05)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(28,32,38,0.7) 0%, transparent 50%, rgba(28,32,38,0.7) 100%)" }} />
              <div className="absolute inset-0 flex items-center px-10 gap-8">
                <div>
                  <div className="font-stm text-xs tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>&gt; НАБОР ОТКРЫТ · 2026</div>
                  <div className="font-orb text-white uppercase leading-tight" style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)" }}>Профессиональный<br />коллектив ждёт тебя</div>
                </div>
                <div className="hidden md:flex gap-6 ml-auto">
                  {[{n:"6", l:"Вакансий"},{n:"24ч", l:"Ответ"},{n:"100%", l:"Поддержка"}].map((s,i)=>(
                    <div key={i} className="text-center">
                      <div className="font-orb text-white font-black" style={{ fontSize:"1.6rem", color: i===0?"#ff2200":"#fff" }}>{s.n}</div>
                      <div className="font-stm text-[9px] tracking-widest" style={{ color:"rgba(255,255,255,0.45)" }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {filtered.length === 0
              ? <div className="text-center py-24 font-stm text-white/22 tracking-widest">Позиций по фильтрам не найдено</div>
              : <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filtered.map((v, vi) => (
                    <div key={v.id} className="vol-card p-7 group cyber-frame animate-fade-up" style={{ animationDelay: `${vi * 0.08}s`, opacity: 0 }}>
                      {/* Иконка + уровень */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="vacancy-icon-wrap">
                          <div className="relative">
                            {/* outer ring */}
                            <div className="absolute inset-0 rounded-xl animate-icon-glow" style={{ borderRadius: 14, opacity: 0.6 }} />
                            <IBox icon={v.icon} size={28} boxSize={62} radius={14} glow />
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="font-stm text-[8px] tracking-widest px-2 py-0.5"
                            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 2, color: "rgba(255,255,255,0.6)" }}>
                            {v.level}
                          </span>
                          {/* animated dot */}
                          <div className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full animate-blink" style={{ background: "#ffffff" }} />
                            <span className="font-stm text-[8px]" style={{ color: "rgba(255,255,255,0.35)" }}>активна</span>
                          </div>
                        </div>
                      </div>

                      <h3 className="font-orb text-white text-base uppercase mb-2 tracking-wide transition-all group-hover:text-scan-green"
                        style={{ lineHeight: 1.2 }}>{v.title}</h3>

                      {/* thin colored accent under title */}
                      <div className="h-px mb-3 transition-all duration-500 group-hover:w-full" style={{ width: 32, background: "linear-gradient(90deg, #ffffff, rgba(255,255,255,0.1))" }} />

                      <p className="font-exo text-white/45 text-sm leading-[1.8] mb-5">{v.desc}</p>

                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {v.tags.map(tag => (
                          <span key={tag} className="font-stm text-[8px] px-2.5 py-1 transition-all hover:border-green-400/30 hover:text-white/50"
                            style={{ background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.28)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "2px" }}>
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                        <div>
                          <div className="money text-lg">от 210 000 ₽</div>
                          <div className="font-stm text-[8px] mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>в месяц</div>
                        </div>
                        <a href="#contacts" className="btn-red-animated px-5 py-2.5" style={{ borderRadius: "2px" }} onClick={snd.submit} onMouseEnter={snd.hover}>
                          <Icon name="Send" size={12} />
                          Подать заявку
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
            }
          </div>
        </div>
      </section>

      {/* ══ BENEFITS ════════════════════════════════════ */}
      <section id="benefits" className="py-28 relative sect-texture t-dots" style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
        <div className="absolute inset-0 grid-cyber opacity-40 pointer-events-none" />
        <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.4), transparent)" }} />
        <div className="max-w-[1440px] mx-auto px-6">
          <div ref={benRef} className="section-entry">
            <div className="label-mono mb-3">// Социальный пакет</div>
            <div className="accent-line" />
            <h2 className="font-orb text-white uppercase leading-tight mb-3" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
              Льготы и <span style={{ color: "#cc2200" }}>гарантии</span>
            </h2>
            <p className="font-exo text-white/45 text-base mb-8 max-w-xl leading-relaxed">
              Государство гарантирует полный социальный пакет с первого дня службы — для вас и вашей семьи.
            </p>

            <div className="relative w-full h-52 mb-10 overflow-hidden" style={{ borderRadius: "3px" }}>
              <img src={BEN_IMG} alt="Льготы и гарантии" className="w-full h-full object-cover" style={{ filter: "brightness(0.98) saturate(1.05)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(28,32,38,0.72) 0%, transparent 55%, rgba(28,32,38,0.65) 100%)" }} />
              <div className="absolute inset-0 flex items-center px-10 gap-6">
                <div>
                  <div className="font-stm text-xs tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>&gt; ГАРАНТИИ ГОСУДАРСТВА РФ</div>
                  <div className="font-orb text-white uppercase leading-tight" style={{ fontSize: "clamp(1.1rem, 2.3vw, 1.7rem)" }}>8 видов льгот<br />с первого дня службы</div>
                </div>
                <div className="hidden md:flex gap-5 ml-auto">
                  {[{n:"до 10 млн", l:"Списание долгов"},{n:"до 3.9 млн", l:"Военная ипотека"},{n:"50%", l:"Скидка ЖКХ"}].map((s,i)=>(
                    <div key={i} className="text-center">
                      <div className="font-orb font-black whitespace-nowrap" style={{ fontSize:"1.2rem", color: i===0?"#ff2200":"#ffffff" }}>{s.n}</div>
                      <div className="font-stm text-[9px] tracking-widest whitespace-nowrap" style={{ color:"rgba(255,255,255,0.4)" }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {BENEFITS.map((b, i) => (
                <div key={i} className="vol-card group animate-fade-up" style={{ animationDelay: `${i * 0.07}s`, opacity: 0 }}>
                  <div className="p-6 flex items-start gap-5">
                    {/* Icon */}
                    <div className="transition-transform group-hover:scale-110 shrink-0 mt-1">
                      <IBox icon={b.icon} size={26} boxSize={60} radius={14} glow />
                    </div>
                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      {/* Title + sum in one row */}
                      <div className="flex items-baseline justify-between gap-3 mb-2 flex-wrap">
                        <div className="font-orb text-white text-sm uppercase tracking-wide leading-tight whitespace-nowrap">{b.title}</div>
                        <div className="font-orb text-sm whitespace-nowrap shrink-0" style={{ color: "#ffffff", textShadow: "0 0 12px rgba(255,255,255,0.5)" }}>{b.sum}</div>
                      </div>
                      <div className="font-exo text-white/50 text-sm leading-[1.75]">{b.desc}</div>
                    </div>
                  </div>
                  {/* bottom accent line */}
                  <div className="h-px mx-6" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.2), transparent)" }} />
                </div>
              ))}
            </div>

            {/* Big callout */}
            <div className="vol-card p-8 cyber-frame flex flex-col sm:flex-row items-center gap-8"
              style={{ borderColor: "rgba(204,34,0,0.3)", background: "linear-gradient(135deg, rgba(204,34,0,0.08), rgba(204,34,0,0.02))" }}>
              <div className="shrink-0">
                <IBox icon="ShieldCheck" size={36} boxSize={80} radius={20} glow />
              </div>
              <div className="flex-1">
                <div className="font-stm text-[10px] tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>СПЕЦИАЛЬНАЯ ГАРАНТИЯ ГОСУДАРСТВА</div>
                <div className="font-orb text-white uppercase mb-2 flex flex-wrap items-baseline gap-3" style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)" }}>
                  Списание задолженностей до
                  <span className="money-red whitespace-nowrap" style={{ fontSize: "clamp(1.3rem, 3vw, 2rem)" }}>10 000 000 ₽</span>
                </div>
                <div className="font-exo text-white/50 text-base leading-relaxed">
                  Полное списание кредитов, микрозаймов, штрафов и задолженностей при выполнении условий контракта. Не требует судебных разбирательств — применяется автоматически.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ STEPS ═══════════════════════════════════════ */}
      <section id="steps" className="py-28 relative sect-texture t-red" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="absolute inset-0 grid-cyber opacity-25 pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-6">
          <div ref={stepsRef} className="section-entry">
            <div className="label-mono mb-3">// Алгоритм вступления</div>
            <div className="accent-line" />
            <h2 className="font-orb text-white uppercase leading-tight mb-8" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>Этапы поступления</h2>

            <div className="relative w-full h-48 mb-12 overflow-hidden" style={{ borderRadius: "3px" }}>
              <img src={STEPS_IMG} alt="Этапы поступления" className="w-full h-full object-cover" style={{ filter: "brightness(0.98) saturate(1.05)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(28,32,38,0.72) 0%, transparent 60%, rgba(28,32,38,0.65) 100%)" }} />
              <div className="absolute inset-0 flex items-center px-10">
                <div>
                  <div className="font-stm text-xs tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>&gt; ОТ ЗАЯВКИ ДО ЗАЧИСЛЕНИЯ</div>
                  <div className="font-orb text-white uppercase leading-tight" style={{ fontSize: "clamp(1.1rem, 2.3vw, 1.7rem)" }}>5 простых шагов —<br />и вы в команде</div>
                </div>
                <div className="hidden sm:flex items-center gap-2 ml-auto">
                  {["01","02","03","04","05"].map((n,i)=>(
                    <div key={i} className="w-10 h-10 flex items-center justify-center font-orb text-xs font-black" style={{ background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:"50%", color:"rgba(255,255,255,0.7)" }}>{n}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5">
              {STEPS.map((s, i) => (
                <div key={i} className="flex flex-col items-center text-center group animate-fade-up" style={{ animationDelay: `${i * 0.12}s`, opacity: 0 }} onMouseEnter={snd.hover}>
                  <div className="relative mb-5">
                    <div className="absolute inset-0 rounded-full opacity-20 animate-pulse-red" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)", transform: "scale(1.5)" }} />
                    <div className="relative w-24 h-24 flex flex-col items-center justify-center gap-1.5 transition-all group-hover:scale-105 cyber-frame"
                      style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "50%", boxShadow: "0 0 30px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.08)" }}>
                      <Icon name={s.icon as AnyIcon} size={22} style={{ color: "rgba(220,230,245,0.7)" }} />
                      <span className="step-num">{s.n}</span>
                    </div>
                  </div>
                  <div className="font-orb text-white uppercase text-xs mb-2 tracking-wide">{s.t}</div>
                  <div className="font-exo text-white/35 text-xs leading-[1.75]">{s.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ═════════════════════════════════════════ */}
      <section id="faq" className="py-28 relative sect-texture" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-[1440px] mx-auto px-6">
          <div ref={faqRef} className="section-entry">
            <div className="label-mono mb-3">// База знаний</div>
            <div className="accent-line" />
            <h2 className="font-orb text-white uppercase leading-tight mb-8" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>Вопросы и ответы</h2>

            <div className="relative mb-8 max-w-xl">
              <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.35)" }} />
              <input className="form-input" style={{ paddingLeft: "2.9rem" }} placeholder="Поиск по вопросам..."
                value={faqSearch} onChange={e => setFaqSearch(e.target.value)} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
              <div className="space-y-1.5">
              {faqList.filter(item =>
                !faqSearch.trim() ||
                item.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
                item.a.toLowerCase().includes(faqSearch.toLowerCase())
              ).map((item, i) => (
                <div key={i} className={`vol-card overflow-hidden faq-item ${openFaq===i?"open":""} animate-fade-up`} style={{ animationDelay: `${i * 0.07}s`, opacity: 0 }}>
                  <button className="w-full flex items-center justify-between p-5 text-left gap-4"
                    style={{ background: openFaq===i ? "rgba(255,255,255,0.03)" : "transparent" }}
                    onClick={() => { setOpenFaq(openFaq===i ? null : i); snd.open(); }}
                    onMouseEnter={snd.hover}>
                    <span className="font-exo text-white font-semibold text-sm leading-relaxed">{item.q}</span>
                    <div className="ibox shrink-0" style={{ width: 32, height: 32,
                      background: openFaq===i ? "rgba(204,34,0,0.15)" : "rgba(255,255,255,0.04)",
                      border: openFaq===i ? "1px solid rgba(204,34,0,0.4)" : "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "6px",
                      boxShadow: openFaq===i ? "0 0 12px rgba(204,34,0,0.25)" : "none"
                    }}>
                      <Icon name={openFaq===i ? "Minus" : "Plus"} size={14} style={{ color: openFaq===i ? "#cc2200" : "rgba(255,255,255,0.38)" }} />
                    </div>
                  </button>
                  {openFaq===i && (
                    <div className="px-5 pb-5 animate-fade-in" style={{ opacity: 0 }}>
                      <div className="pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                        <p className="font-exo text-white/48 text-sm leading-[1.9]">{item.a}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              </div>

              {/* FAQ sidebar image */}
              <div className="hidden lg:block sticky top-20">
                <div className="relative overflow-hidden" style={{ borderRadius: "3px", border: "1px solid rgba(255,255,255,0.15)" }}>
                  <img src={FAQ_IMG} alt="FAQ" className="w-full h-72 object-cover" style={{ filter: "brightness(0.98) saturate(1.05)" }} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(28,32,38,0.72) 100%)" }} />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="font-stm text-[9px] tracking-widest mb-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>&gt; ОСТАЛИСЬ ВОПРОСЫ?</div>
                    <div className="font-orb text-white text-sm uppercase mb-3">Свяжитесь с нами напрямую</div>
                    <a href="#contacts" className="btn-red py-2.5 px-4 text-xs w-full justify-center" style={{ borderRadius: "2px" }}>
                      <Icon name="Phone" size={12} />
                      Связаться
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ КАЛЬКУЛЯТОР ДОХОДА ══════════════════════════ */}
      <div id="calculator"><IncomeCalculator /></div>

      {/* ══ СРАВНЕНИЕ ═══════════════════════════════════ */}
      <Comparison />

      {/* ══ ГЕОГРАФИЯ ═══════════════════════════════════ */}
      <LocationsBlock />

      {/* ══ ОДИН ДЕНЬ ═══════════════════════════════════ */}
      <Timeline />

      {/* ══ ВОЗРАЖЕНИЯ ══════════════════════════════════ */}
      <Objections />

      {/* ══ CONTACTS ════════════════════════════════════ */}
      <section id="contacts" className="py-28 relative sect-texture t-dots" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="absolute inset-0 grid-cyber opacity-40 pointer-events-none" />
        <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.5), transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-px" style={{ background: "linear-gradient(180deg, transparent, rgba(204,34,0,0.4), transparent)" }} />

        <div className="max-w-[1440px] mx-auto px-6">
          <div ref={contactsRef} className="section-entry">
            <div className="label-mono mb-3">// Инициировать контакт</div>
            <div className="accent-line" />
            <h2 className="font-orb text-white uppercase leading-tight mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              Готов стать<br /><span style={{ color: "#cc2200" }}>частью команды?</span>
            </h2>
            <p className="font-exo text-white/42 text-base leading-relaxed mb-8 max-w-xl">
              Оставьте заявку — свяжемся в течение 24 часов. Всё конфиденциально.
            </p>

            <div className="relative w-full h-44 mb-10 overflow-hidden" style={{ borderRadius: "3px" }}>
              <img src={CONTACTS_IMG} alt="Связаться с нами" className="w-full h-full object-cover" style={{ filter: "brightness(0.98) saturate(1.05)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(28,32,38,0.72) 0%, transparent 55%, rgba(28,32,38,0.7) 100%)" }} />
              <div className="absolute inset-0 flex items-center px-10 gap-8">
                <div>
                  <div className="font-stm text-xs tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>&gt; СВЯЗЬ 24/7</div>
                  <div className="font-orb text-white uppercase leading-tight" style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)" }}>Ответим в течение<br />24 часов</div>
                </div>
                <div className="hidden sm:flex gap-6 ml-auto">
                  {[{icon:"Phone",l:"Телефон"},{icon:"Send",l:"Telegram"},{icon:"Mail",l:"Email"}].map((c,i)=>(
                    <div key={i} className="flex flex-col items-center gap-2">
                      <IBox icon={c.icon} size={16} boxSize={38} radius={8} />
                      <span className="font-stm text-[9px] tracking-wider" style={{ color:"rgba(255,255,255,0.35)" }}>{c.l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Проверка статуса заявки */}
            <div className="mb-10">
              <StatusCheck />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

              {/* ── Контакты ── */}
              <div>
                <div className="font-stm text-xs tracking-widest mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>// ПРЯМЫЕ КОНТАКТЫ</div>

                <div className="space-y-4 mb-10">
                  {[
                    {
                      icon:"Phone", label:"+7 (949) 091-44-68",
                      sub:"Звонки принимаются каждый день",
                      href:"tel:+79490914468",
                      badge:"ЗВОНИТЬ",
                      color:"rgba(34,197,94,",
                    },
                    {
                      icon:"Mail",  label:"titanzver200@gmail.com",
                      sub:"Email — ответ в течение 24 часов",
                      href:"mailto:titanzver200@gmail.com",
                      badge:"НАПИСАТЬ",
                      color:"rgba(37,99,235,",
                    },
                    {
                      icon:"Send",  label:"@Ares_deavel7",
                      sub:"Telegram — онлайн 24/7",
                      href:"https://t.me/Ares_deavel7",
                      badge:"TELEGRAM",
                      color:"rgba(255,255,255,",
                    },
                  ].map((c, i) => (
                    <a key={i} href={c.href} target="_blank" rel="noreferrer"
                      className="vol-card shimmer-hover hover-lift flex items-center gap-5 p-5 group cursor-pointer animate-fade-left"
                      style={{ animationDelay: `${0.1 + i * 0.15}s`, opacity: 0, textDecoration: "none", borderColor: `${c.color}0.15)` }}
                      onClick={snd.click} onMouseEnter={snd.hover}>

                      {/* Icon */}
                      <div className="shrink-0 transition-all group-hover:scale-115 group-hover:-rotate-6"
                        style={{
                          width: 64, height: 64,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          background: `linear-gradient(135deg, ${c.color}0.18) 0%, ${c.color}0.05) 100%)`,
                          border: `1px solid ${c.color}0.3)`,
                          borderRadius: 14,
                          boxShadow: `0 0 24px ${c.color}0.2), inset 0 1px 0 rgba(255,255,255,0.1)`,
                          position: "relative",
                        }}>
                        <div className="ibox" style={{ width: 64, height: 64, background: "transparent", border: "none", boxShadow: "none" }}>
                          <Icon name={c.icon as AnyIcon} size={26} style={{ color: "rgba(220,235,255,0.9)" }} />
                        </div>
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <div className="font-orb text-white text-base mb-0.5 group-hover:text-scan-green transition-all truncate">{c.label}</div>
                        <div className="font-exo text-white/45 text-sm">{c.sub}</div>
                      </div>

                      {/* Badge */}
                      <div className="shrink-0 flex items-center gap-2">
                        <span className="font-stm text-[9px] tracking-widest px-2.5 py-1 opacity-0 group-hover:opacity-100 transition-all"
                          style={{ background: `${c.color}0.12)`, border: `1px solid ${c.color}0.3)`, borderRadius: 2, color: "rgba(255,255,255,0.7)" }}>
                          {c.badge}
                        </span>
                        <Icon name="ChevronRight" size={16} style={{ color: "rgba(255,255,255,0.4)" }} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </a>
                  ))}
                </div>

                {/* Info card */}
                <div className="p-5 vol-card animate-fade-up" style={{ opacity: 0, animationDelay: "0.5s", borderColor: "rgba(204,34,0,0.2)" }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 rounded-full animate-blink" style={{ background: "#cc2200" }} />
                    <span className="font-stm text-[10px] tracking-widest" style={{ color: "rgba(204,34,0,0.7)" }}>РЕЖИМ РАБОТЫ</span>
                  </div>
                  <div className="font-orb text-white text-sm mb-1">Пн — Вс · Без выходных</div>
                  <div className="font-exo text-white/40 text-xs">Заявки принимаются круглосуточно. Ответ в течение 24 часов.</div>
                </div>
              </div>

              {/* ── Форма ── */}
              <div className={`vol-card cyber-frame animate-fade-right relative overflow-hidden ${formFlash ? "form-flash" : ""}`} style={{ opacity: 0, animationDelay: "0.2s", borderRadius: 16 }}>
                {/* верхняя подсветка */}
                <div className="absolute top-0 inset-x-0 h-32 pointer-events-none" style={{ background: "radial-gradient(ellipse at top, rgba(255,255,255,0.07), transparent 70%)" }} />

                {/* Шапка */}
                <div className="relative px-8 pt-8 pb-6">
                  <div className="flex items-center gap-3.5">
                    <LogoS size={30} animated />
                    <div>
                      <div className="font-orb text-white" style={{ fontSize: "1.15rem" }}>Форма заявки</div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <div className="w-1.5 h-1.5 rounded-full animate-blink" style={{ background: "#ffffff" }} />
                        <span className="font-stm text-[10px] tracking-widest" style={{ color: "rgba(255,255,255,0.45)" }}>ЗАЩИЩЁННЫЙ КАНАЛ · SSL</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-px mx-8" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.25), rgba(220,38,38,0.25), transparent)" }} />

                <div className="px-8 pt-7 pb-8">
                {formState === "success" ? (
                  <div className="flex flex-col items-center justify-center py-14 gap-5 animate-scale-reveal">
                    <div className="relative flex items-center justify-center" style={{ width: 88, height: 88 }}>
                      <div className="absolute inset-0 rounded-full animate-breathe" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.2)" }} />
                      <div className="w-20 h-20 flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.04))", border: "2px solid rgba(255,255,255,0.4)", borderRadius: "50%", boxShadow: "0 0 50px rgba(255,255,255,0.15)" }}>
                        <Icon name="Check" size={40} style={{ color: "#ffffff" }} />
                      </div>
                    </div>
                    <div className="font-orb text-white text-center" style={{ fontSize: "1.4rem" }}>Заявка отправлена!</div>
                    <div className="font-exo text-white/55 text-center leading-relaxed max-w-[260px]">Спасибо! Свяжемся с вами в течение 24 часов</div>
                    <div className="flex items-center gap-2 mt-1 px-4 py-2" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }}>
                      <div className="w-2 h-2 rounded-full animate-blink" style={{ background: "#ffffff" }} />
                      <span className="font-stm text-[10px] tracking-widest" style={{ color: "rgba(255,255,255,0.6)" }}>ПОЛУЧЕНО · ОБРАБАТЫВАЕТСЯ</span>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="animate-fade-blur" style={{ animationDelay: "0.3s", opacity: 0 }}>
                      <label className="font-stm text-[10px] block mb-2.5 tracking-widest" style={{ color: "rgba(255,255,255,0.55)" }}>ВАШ ПОЗЫВНОЙ / ИМЯ *</label>
                      <div className="relative group">
                        <Icon name="User" size={17} className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors" style={{ color: "rgba(255,255,255,0.35)" }} />
                        <input
                          type="text"
                          placeholder="Иванов Иван Иванович"
                          className="form-input"
                          style={{ paddingLeft: "2.9rem" }}
                          required
                          value={form.name}
                          onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="animate-fade-blur" style={{ animationDelay: "0.4s", opacity: 0 }}>
                      <label className="font-stm text-[10px] block mb-2.5 tracking-widest" style={{ color: "rgba(255,255,255,0.55)" }}>ТЕЛЕФОН ДЛЯ СВЯЗИ *</label>
                      <div className="relative group">
                        <Icon name="Phone" size={17} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: formState === "error" && form.phone.replace(/\D/g, "").length !== 11 ? "rgba(239,68,68,0.7)" : "rgba(255,255,255,0.35)" }} />
                        <input
                          type="tel"
                          placeholder="+7 (___) ___-__-__"
                          className="form-input"
                          style={{
                            paddingLeft: "2.9rem",
                            ...(formState === "error" && form.phone.replace(/\D/g, "").length !== 11
                              ? { borderColor: "rgba(239,68,68,0.6)", boxShadow: "0 0 0 3px rgba(239,68,68,0.1), inset 0 2px 4px rgba(0,0,0,0.3)" }
                              : {}),
                          }}
                          required
                          value={form.phone}
                          onChange={e => setForm(p => ({ ...p, phone: formatPhone(e.target.value) }))}
                          onFocus={e => { if (!e.target.value) setForm(p => ({ ...p, phone: "+7 (" })); }}
                        />
                      </div>
                    </div>
                    <div className="animate-fade-blur" style={{ animationDelay: "0.5s", opacity: 0 }}>
                      <label className="font-stm text-[10px] block mb-2.5 tracking-widest" style={{ color: "rgba(255,255,255,0.55)" }}>EMAIL (для подтверждения)</label>
                      <div className="relative group">
                        <Icon name="Mail" size={17} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.35)" }} />
                        <input
                          type="email"
                          placeholder="you@example.com"
                          className="form-input"
                          style={{ paddingLeft: "2.9rem" }}
                          value={form.email}
                          onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="animate-fade-blur" style={{ animationDelay: "0.6s", opacity: 0 }}>
                      <label className="font-stm text-[10px] block mb-2.5 tracking-widest" style={{ color: "rgba(255,255,255,0.55)" }}>НАПРАВЛЕНИЕ СЛУЖБЫ</label>
                      <div className="relative group">
                        <Icon name="Crosshair" size={17} className="absolute left-4 top-1/2 -translate-y-1/2 z-10" style={{ color: "rgba(255,255,255,0.35)" }} />
                        <Icon name="ChevronDown" size={16} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "rgba(255,255,255,0.35)" }} />
                        <select
                          className="form-input"
                          style={{ appearance: "none", paddingLeft: "2.9rem" }}
                          value={form.specialty}
                          onChange={e => setForm(p => ({ ...p, specialty: e.target.value }))}
                        >
                          <option value="" style={{ background:"#0e0e10" }}>Выберите специальность</option>
                          <option value="OSINT-аналитик" style={{ background:"#0e0e10" }}>OSINT-аналитик</option>
                          <option value="IT-специалист" style={{ background:"#0e0e10" }}>IT-специалист</option>
                          <option value="Оператор БпЛА" style={{ background:"#0e0e10" }}>Оператор БпЛА</option>
                          <option value="Водитель / Логистика" style={{ background:"#0e0e10" }}>Водитель / Логистика</option>
                          <option value="Мониторинг СМИ" style={{ background:"#0e0e10" }}>Мониторинг СМИ</option>
                        </select>
                      </div>
                    </div>

                    {formState === "error" && (
                      <div className="flex items-center gap-2.5 p-3.5 animate-scale-reveal" style={{ background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.3)", borderRadius: 8 }}>
                        <Icon name="TriangleAlert" size={15} style={{ color: "#ef4444" }} />
                        <span className="font-exo text-sm" style={{ color: "rgba(255,120,100,0.95)" }}>
                          {form.phone.replace(/\D/g, "").length !== 11
                            ? "Введите полный номер телефона (11 цифр)."
                            : "Ошибка отправки. Напишите напрямую в Telegram."}
                        </span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={formState === "loading" || !form.name.trim() || form.phone.replace(/\D/g, "").length !== 11}
                      className="btn-red-animated w-full py-4 mt-2 animate-fade-blur"
                      style={{
                        borderRadius: "10px",
                        animationDelay: "0.6s",
                        ...((!form.name.trim() || form.phone.replace(/\D/g, "").length !== 11) && formState !== "loading"
                          ? { opacity: 0.45, cursor: "not-allowed", filter: "grayscale(0.6)" }
                          : { opacity: formState === "loading" ? 0.7 : 1 }),
                      }}
                      onMouseEnter={snd.hover}
                    >
                      {formState === "loading" ? (
                        <>
                          <Icon name="Loader" size={16} className="animate-spin" />
                          Отправляем...
                        </>
                      ) : (
                        <>
                          <Icon name="Send" size={16} />
                          Отправить заявку
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-2 pt-2">
                      <Icon name="Lock" size={12} style={{ color: "rgba(255,255,255,0.35)" }} />
                      <span className="font-stm text-[9px] tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>
                        Данные передаются по защищённому каналу
                      </span>
                    </div>
                  </form>
                )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════ */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), rgba(204,34,0,0.3), transparent)" }} />
        <div className="max-w-[1440px] mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <LogoS size={28} animated />
            <div>
              <div className="font-orb text-white text-xs tracking-widest">OSINT-РЭР</div>
              <div className="font-stm text-[8px] tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.3)" }}>РАДИОЭЛЕКТРОННАЯ РАЗВЕДКА</div>
            </div>
          </div>
          <div className="font-stm text-[9px] text-center tracking-wider" style={{ color: "rgba(255,255,255,0.18)" }}>© 2026 OSINT-РЭР — Все права защищены</div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full animate-blink" style={{ background: "#ffffff" }} />
            <span className="font-stm text-[9px] tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>НАБОР ОТКРЫТ</span>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}