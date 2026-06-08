import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyIcon = any;

const HERO_IMG =
  "https://cdn.poehali.dev/projects/31cf2f8d-8f85-4cf9-801d-b8ed9fa0968a/files/a267d7bd-fe76-4959-acd1-d2ff2683158f.jpg";

/* ── ГЕРБ РФ (SVG inline) ─────────────────────────────── */
const GerbRF = ({ size = 48, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 100 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Корона центральная */}
    <ellipse cx="50" cy="10" rx="8" ry="5" fill="#FFD700" />
    <polygon points="50,3 53,9 57,5 55,11 60,9 56,13 58,18 53,15 50,20 47,15 42,18 44,13 40,9 45,11 43,5 47,9" fill="#FFD700" />
    {/* Короны левая и правая */}
    <ellipse cx="22" cy="18" rx="6" ry="4" fill="#FFD700" />
    <polygon points="22,12 25,17 28,14 26,19 30,17 27,21 29,25 25,22 22,27 19,22 15,25 17,21 14,17 18,19 16,14 19,17" fill="#FFD700" />
    <ellipse cx="78" cy="18" rx="6" ry="4" fill="#FFD700" />
    <polygon points="78,12 81,17 84,14 82,19 86,17 83,21 85,25 81,22 78,27 75,22 71,25 73,21 70,17 74,19 72,14 75,17" fill="#FFD700" />
    {/* Тело орла */}
    <ellipse cx="50" cy="60" rx="20" ry="28" fill="#FFD700" />
    {/* Голова */}
    <ellipse cx="50" cy="28" rx="11" ry="10" fill="#FFD700" />
    {/* Левая голова */}
    <ellipse cx="36" cy="30" rx="9" ry="8" fill="#FFD700" />
    {/* Правая голова */}
    <ellipse cx="64" cy="30" rx="9" ry="8" fill="#FFD700" />
    {/* Клювы */}
    <polygon points="26,30 30,33 26,36" fill="#CC8800" />
    <polygon points="74,30 70,33 74,36" fill="#CC8800" />
    {/* Глаза */}
    <circle cx="32" cy="28" r="2" fill="#1a0a00" />
    <circle cx="68" cy="28" r="2" fill="#1a0a00" />
    {/* Левое крыло */}
    <path d="M30,50 C10,40 2,55 5,70 C8,80 20,75 30,65 Z" fill="#FFD700" />
    <path d="M30,50 C12,48 6,60 10,72" stroke="#CC8800" strokeWidth="0.8" fill="none" />
    <path d="M30,55 C14,53 8,64 12,75" stroke="#CC8800" strokeWidth="0.8" fill="none" />
    {/* Правое крыло */}
    <path d="M70,50 C90,40 98,55 95,70 C92,80 80,75 70,65 Z" fill="#FFD700" />
    <path d="M70,50 C88,48 94,60 90,72" stroke="#CC8800" strokeWidth="0.8" fill="none" />
    <path d="M70,55 C86,53 92,64 88,75" stroke="#CC8800" strokeWidth="0.8" fill="none" />
    {/* Щит на груди */}
    <path d="M42,48 L58,48 L60,72 L50,80 L40,72 Z" fill="#CC0000" />
    <path d="M46,52 L54,52 L56,70 L50,76 L44,70 Z" fill="#CC0000" stroke="#FFD700" strokeWidth="0.5" />
    {/* Всадник на щите */}
    <ellipse cx="50" cy="58" rx="3" ry="4" fill="#FFD700" />
    <line x1="50" y1="62" x2="50" y2="70" stroke="#FFD700" strokeWidth="1.5" />
    <line x1="45" y1="65" x2="55" y2="65" stroke="#FFD700" strokeWidth="1.5" />
    <line x1="53" y1="57" x2="57" y2="54" stroke="#FFD700" strokeWidth="1.2" />
    {/* Лапы */}
    <path d="M40,78 C35,80 32,88 38,90 L44,86 Z" fill="#FFD700" />
    <path d="M60,78 C65,80 68,88 62,90 L56,86 Z" fill="#FFD700" />
    {/* Когти */}
    <path d="M35,90 L32,95 M38,91 L36,96 M41,91 L40,96" stroke="#FFD700" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M65,90 L68,95 M62,91 L64,96 M59,91 L60,96" stroke="#FFD700" strokeWidth="1.2" strokeLinecap="round" />
    {/* Скипетр */}
    <line x1="38" y1="62" x2="20" y2="78" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
    <circle cx="19" cy="79" r="3" fill="#FFD700" />
    {/* Держава */}
    <circle cx="62" cy="72" r="7" fill="#FFD700" stroke="#CC8800" strokeWidth="0.5" />
    <line x1="62" y1="65" x2="62" y2="72" stroke="#CC8800" strokeWidth="0.5" />
    <line x1="56" y1="72" x2="68" y2="72" stroke="#CC8800" strokeWidth="0.5" />
  </svg>
);

/* ── DATA ─────────────────────────────────────────────── */

const NAV = [
  { label: "О подразделении", href: "#about" },
  { label: "Вакансии", href: "#vacancies" },
  { label: "Требования", href: "#requirements" },
  { label: "Льготы", href: "#benefits" },
  { label: "Этапы", href: "#steps" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакты", href: "#contacts" },
];

const PAYMENTS = [
  { label: "Единовременно", value: "2 600 000 ₽", icon: "Banknote", color: "#FF4444" },
  { label: "Ежемесячно от",  value: "210 000 ₽",  icon: "CalendarDays", color: "#FF8800" },
  { label: "Фед. выплата",   value: "400 000 ₽",  icon: "Landmark", color: "#FFD700" },
];

const STATS = [
  { icon: "Banknote",  color: "#FF4444",  glow: "rgba(204,0,0,",     val: "> 2,6 млн ₽", sub: "Единовременная выплата" },
  { icon: "Clock",     color: "#3B9FFF",  glow: "rgba(0,55,145,",    val: "24/7",         sub: "Аналитическая поддержка" },
  { icon: "BarChart3", color: "#FFD700",  glow: "rgba(212,160,23,",  val: "1000+",        sub: "Выполненных задач" },
  { icon: "ShieldCheck",color:"#22C55E",  glow: "rgba(34,197,94,",   val: "Конфиденциально", sub: "Защита личности" },
  { icon: "MapPin",    color: "#CC0000",  glow: "rgba(204,0,0,",     val: "Тыл",          sub: "Без боевых действий" },
];

const VACANCIES = [
  { id:1, specialty:"osint",    region:"забайкальский", level:"опыт",      icon:"Search",     iconColor:"#3B9FFF",  glow:"rgba(0,55,145,", title:"OSINT-аналитик",   desc:"Сбор и анализ открытых источников, аналитические справки, поддержка принятия решений.", tags:["Аналитика","OSINT","Отчётность"] },
  { id:2, specialty:"it",       region:"забайкальский", level:"опыт",      icon:"Monitor",    iconColor:"#22C55E",  glow:"rgba(34,197,94,", title:"IT-специалист",    desc:"Администрирование систем, защищённые решения, анализ информационных потоков.", tags:["Сети","Безопасность","Системы"] },
  { id:3, specialty:"bpla",     region:"забайкальский", level:"без опыта", icon:"Plane",      iconColor:"#A855F7",  glow:"rgba(168,85,247,",title:"Оператор БпЛА",    desc:"Управление беспилотниками, аэрофотосъёмка, контроль воздушной обстановки.", tags:["БпЛА","Разведка","Навигация"] },
  { id:4, specialty:"logistics",region:"забайкальский", level:"без опыта", icon:"Truck",      iconColor:"#F97316",  glow:"rgba(249,115,22,",title:"Водитель",          desc:"Перевозка личного состава и грузов, логистика, техническое обслуживание.", tags:["Логистика","Кат. C","Тыл"] },
  { id:5, specialty:"osint",    region:"читинский",     level:"без опыта", icon:"Rss",        iconColor:"#06B6D4",  glow:"rgba(6,182,212,", title:"Мониторинг СМИ",   desc:"Мониторинг соцсетей, медиа и цифровых ресурсов, информационные сводки.", tags:["Медиа","Мониторинг","OSINT"] },
  { id:6, specialty:"it",       region:"читинский",     level:"опыт",      icon:"Server",     iconColor:"#EAB308",  glow:"rgba(234,179,8,", title:"Сисадмин",         desc:"Серверная инфраструктура, управление сетями, защита данных.", tags:["Linux","Сети","Защита"] },
];

const SPEC_FILTERS   = [{v:"all",l:"Все"},{v:"osint",l:"OSINT"},{v:"it",l:"IT"},{v:"bpla",l:"БпЛА"},{v:"logistics",l:"Логистика"}];
const REGION_FILTERS = [{v:"all",l:"Все регионы"},{v:"забайкальский",l:"Забайкалье"},{v:"читинский",l:"Чита"}];
const LEVEL_FILTERS  = [{v:"all",l:"Любой опыт"},{v:"без опыта",l:"Без опыта"},{v:"опыт",l:"С опытом"}];

const BENEFITS = [
  { icon:"HeartPulse",  color:"#FF4444",  glow:"rgba(204,0,0,",    title:"Медицинское обеспечение",  desc:"Полная страховка и лечение за счёт государства" },
  { icon:"Home",        color:"#3B9FFF",  glow:"rgba(0,55,145,",   title:"Ипотека",                  desc:"Льготная ипотека и жилищные субсидии" },
  { icon:"Zap",         color:"#FFD700",  glow:"rgba(212,160,23,", title:"Льготы по ЖКХ",            desc:"Скидки на коммунальные услуги и жильё" },
  { icon:"CreditCard",  color:"#22C55E",  glow:"rgba(34,197,94,",  title:"Кредитные каникулы",       desc:"Налоговые и кредитные каникулы на период службы" },
  { icon:"GraduationCap",color:"#A855F7", glow:"rgba(168,85,247,", title:"Образование",              desc:"Бесплатное обучение и повышение квалификации" },
  { icon:"ShieldCheck", color:"#06B6D4",  glow:"rgba(6,182,212,",  title:"Списание долгов",          desc:"Списание задолженностей до 10 000 000 ₽" },
  { icon:"Award",       color:"#FFD700",  glow:"rgba(212,160,23,", title:"Статус ветерана",          desc:"Полный льготный пакет ветерана боевых действий" },
  { icon:"Baby",        color:"#F97316",  glow:"rgba(249,115,22,", title:"Льготы семье",             desc:"Поддержка детей, питание в школах, детсады" },
];

const STEPS = [
  { n:"01", t:"Заявка",       d:"Оставляете заявку онлайн или по телефону",       icon:"Send",        color:"#FF4444" },
  { n:"02", t:"Консультация", d:"Связываемся с вами в течение 24 часов",          icon:"Phone",       color:"#3B9FFF" },
  { n:"03", t:"Оформление",   d:"Документы и медицинское освидетельствование",    icon:"FileCheck",   color:"#FFD700" },
  { n:"04", t:"Прибытие",     d:"Проезд до Читы за счёт подразделения",           icon:"MapPin",      color:"#22C55E" },
  { n:"05", t:"Служба",       d:"Зачисление и получение первых задач",            icon:"ShieldCheck", color:"#A855F7" },
];

const FAQ = [
  { q:"Кто может подать заявку?",          a:"Граждане РФ от 18 до 49 лет. Для IT-специальностей — до 55 лет. Воинский опыт необязателен." },
  { q:"Какие требования к кандидатам?",    a:"Гражданство РФ, отсутствие серьёзных судимостей, прохождение медкомиссии. Специфика зависит от должности." },
  { q:"Где проходит формирование?",        a:"Формирование и подготовка проходят в г. Чита — столице Забайкальского края." },
  { q:"Где проходит служба?",              a:"Служба проходит в Донецке и Мариуполе." },
  { q:"Нужно ли покупать экипировку?",     a:"Нет. Вся необходимая экипировка и техника предоставляются подразделением." },
  { q:"Как подать заявку?",                a:"Оставьте имя и телефон в форме на сайте — специалист свяжется в течение 24 часов." },
  { q:"Как осуществляется отбор?",         a:"Телефонное интервью → встреча с представителем → медкомиссия → оформление документов." },
  { q:"Когда начинаются выплаты?",         a:"Единовременная — в течение первого месяца. Ежемесячное довольствие — с первого дня службы." },
];

/* ── ANIMATED SECTION HOOK ─────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ── ICON BOX ──────────────────────────────────────────── */
function IBox({ icon, color, glow, size = 28, boxSize = 64, radius = 14 }: { icon: string; color: string; glow: string; size?: number; boxSize?: number; radius?: number }) {
  return (
    <div className="ibox shrink-0" style={{ width: boxSize, height: boxSize, background: `linear-gradient(135deg, ${glow}0.22) 0%, ${glow}0.07) 100%)`, border: `1px solid ${glow}0.35)`, borderRadius: radius, boxShadow: `0 0 28px ${glow}0.25), 0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)` }}>
      <Icon name={icon as AnyIcon} size={size} style={{ color, filter: `drop-shadow(0 0 6px ${color}99)` }} />
    </div>
  );
}

/* ── COMPONENT ─────────────────────────────────────────── */
export default function Index() {
  const [spec,    setSpec]    = useState("all");
  const [region,  setRegion]  = useState("all");
  const [level,   setLevel]   = useState("all");
  const [openFaq, setOpenFaq] = useState<number|null>(null);
  const [menu,    setMenu]    = useState(false);

  const filtered = VACANCIES.filter(v =>
    (spec   === "all" || v.specialty === spec)   &&
    (region === "all" || v.region    === region) &&
    (level  === "all" || v.level     === level)
  );

  const aboutRef     = useReveal();
  const vacRef       = useReveal();
  const reqRef       = useReveal();
  const benRef       = useReveal();
  const stepsRef     = useReveal();
  const faqRef       = useReveal();
  const contactsRef  = useReveal();

  return (
    <div className="min-h-screen font-exo" style={{ background: "hsl(222,40%,5%)" }}>

      {/* ══ NAV ══════════════════════════════════════════ */}
      <nav className="fixed top-0 inset-x-0 z-50 h-14 flex items-center"
        style={{ background: "rgba(5,8,18,0.93)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(212,160,23,0.15)" }}>

        {/* Top tricolor stripe */}
        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: "linear-gradient(90deg, #fff 33%, #003791 33% 66%, #CC0000 66%)" }} />

        <div className="max-w-[1440px] w-full mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 shrink-0 group">
            <div className="emblem-glow animate-pulse-gold">
              <GerbRF size={38} />
            </div>
            <div>
              <div className="font-russo text-sm tracking-widest leading-none text-shimmer">OSINT-РЭР</div>
              <div className="font-stm text-[8px] tracking-[0.2em] text-white/35 uppercase leading-none mt-0.5">Служба · Аналитика · РФ</div>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">
            {NAV.map(n => <a key={n.href} href={n.href} className="nav-link">{n.label}</a>)}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <a href="#contacts" className="btn-red hidden sm:flex px-5 py-2.5 text-xs animate-pulse-red" style={{ borderRadius: "3px" }}>
              <Icon name="Send" size={14} />
              Оставить заявку
            </a>
            <button className="lg:hidden" style={{ color: "rgba(255,255,255,0.6)" }} onClick={() => setMenu(!menu)}>
              <Icon name={menu ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {menu && (
          <div className="absolute top-14 inset-x-0 border-t px-6 py-5 flex flex-col gap-4 z-50"
            style={{ background: "rgba(5,8,18,0.98)", borderColor: "rgba(212,160,23,0.15)" }}>
            {NAV.map(n => <a key={n.href} href={n.href} className="nav-link py-1" onClick={() => setMenu(false)}>{n.label}</a>)}
            <a href="#contacts" className="btn-red w-full py-3 text-xs mt-1" style={{ borderRadius: "3px" }}>Оставить заявку</a>
          </div>
        )}
      </nav>

      {/* ══ HERO ═════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-14">
        {/* BG */}
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="OSINT-РЭР" className="w-full h-full object-cover" style={{ filter: "brightness(0.28) saturate(0.6)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(110deg, rgba(5,8,18,0.97) 28%, rgba(5,8,18,0.55) 65%, rgba(5,8,18,0.85) 100%)" }} />
          {/* RF flag color glow */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 50% at 10% 50%, rgba(0,55,145,0.1) 0%, transparent 70%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 40% 60% at 90% 40%, rgba(204,0,0,0.08) 0%, transparent 60%)" }} />
          <div className="absolute inset-0 grid-bg opacity-80" />
          <div className="scan-beam" />
        </div>

        {/* Bottom tricolor bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #fff 33%, #003791 33% 66%, #CC0000 66%)", opacity: 0.5 }} />

        <div className="relative max-w-[1440px] w-full mx-auto px-6 py-24">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_440px] gap-14 items-start">

            {/* LEFT */}
            <div>
              {/* Open badge */}
              <div className="animate-fade-up d0 inline-flex items-center gap-3 mb-7 px-4 py-2.5"
                style={{ background: "rgba(212,160,23,0.1)", border: "1px solid rgba(212,160,23,0.3)", borderRadius: "3px" }}>
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-stm text-[10px] tracking-[0.2em]" style={{ color: "#FFD700" }}>НАБОР ОТКРЫТ · 2024</span>
                <GerbRF size={18} className="emblem-glow" />
              </div>

              <h1 className="animate-fade-up d1 font-russo text-white leading-[0.9] mb-5"
                style={{ fontSize: "clamp(3rem, 7.5vw, 6rem)", textTransform: "uppercase", letterSpacing: "-0.02em", textShadow: "0 0 60px rgba(212,160,23,0.2)" }}>
                OSINT<span className="text-shimmer">-РЭР</span><br />
                <span style={{ color: "#CC0000", textShadow: "0 0 40px rgba(204,0,0,0.5)" }}>Служба</span><br />
                <span style={{ fontSize: "60%", color: "rgba(255,255,255,0.7)" }}>и аналитика</span>
              </h1>

              <p className="animate-fade-up d2 text-white/55 text-base leading-relaxed max-w-[500px] mb-3 font-exo">
                Анализ открытых источников, IT, операторы БпЛА, логистика.
              </p>
              <p className="animate-fade-up d3 font-russo text-base mb-10" style={{ color: "rgba(0,55,145,0.9)", letterSpacing: "0.04em", textShadow: "0 0 20px rgba(0,55,145,0.5)" }}>
                Без участия в боевых действиях · Забайкальский край
              </p>

              <div className="animate-fade-up d4 flex flex-wrap gap-4">
                <a href="#contacts" className="btn-red px-10 py-4 text-sm animate-pulse-red" style={{ borderRadius: "3px" }}>
                  <Icon name="Send" size={18} />
                  Оставить заявку
                </a>
                <a href="#vacancies" className="btn-ghost px-10 py-4 text-sm" style={{ borderRadius: "3px" }}>
                  <Icon name="ChevronDown" size={18} />
                  Вакансии
                </a>
              </div>

              {/* Mini stats */}
              <div className="animate-fade-up d5 mt-12 flex flex-wrap gap-10">
                {[
                  { val:"5 120 000 ₽", sub:"Доход за 1-й год",  color:"#FF4444" },
                  { val:"210 000 ₽",   sub:"В месяц",           color:"#FFD700" },
                  { val:"1000+",        sub:"Задач выполнено",   color:"#3B9FFF" },
                ].map((s, i) => (
                  <div key={i} className="animate-fade-up" style={{ animationDelay: `${0.5 + i * 0.1}s`, opacity: 0 }}>
                    <div className="font-russo leading-none mb-1" style={{ fontSize: "1.8rem", color: s.color, textShadow: `0 0 20px ${s.color}80` }}>{s.val}</div>
                    <div className="font-stm text-[10px] text-white/35 tracking-widest">{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Payment card */}
            <div className="animate-fade-right d3 animate-float">
              <div style={{ filter: "drop-shadow(0 0 50px rgba(204,0,0,0.2)) drop-shadow(0 40px 80px rgba(0,0,0,0.7))" }}>
                <div className="red-card" style={{ borderRadius: "4px" }}>
                  <div style={{ background: "linear-gradient(155deg, rgba(12,16,30,0.99) 0%, rgba(8,11,22,1) 100%)", borderRadius: "3px", padding: "2rem" }}>

                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2.5">
                        <GerbRF size={24} className="emblem-glow" />
                        <span className="font-stm text-[10px] tracking-[0.2em]" style={{ color: "#FFD700" }}>ВЫПЛАТЫ И ДОХОДЫ</span>
                      </div>
                      <div className="flex gap-1.5">
                        {["#f0f0f0","#003791","#CC0000"].map((c,i) => <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c, boxShadow: `0 0 6px ${c}99` }} />)}
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      {PAYMENTS.map((p, i) => (
                        <div key={i} className="flex justify-between items-center py-3 animate-fade-up"
                          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", animationDelay: `${0.3 + i*0.1}s`, opacity: 0 }}>
                          <div className="flex items-center gap-2.5">
                            <IBox icon={p.icon} color={p.color} glow={`rgba(${p.color === "#FFD700" ? "212,160,23" : p.color === "#FF4444" ? "204,0,0" : "249,115,22"},`} size={16} boxSize={34} radius={8} />
                            <span className="font-exo text-sm text-white/55">{p.label}</span>
                          </div>
                          <span className="money text-xl">{p.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-5 mb-5" style={{ background: "rgba(204,0,0,0.12)", border: "1px solid rgba(204,0,0,0.25)", borderRadius: "3px" }}>
                      <div className="font-stm text-[9px] text-white/40 tracking-widest mb-1">ОБЩИЙ ДОХОД ЗА ПЕРВЫЙ ГОД</div>
                      <div className="money leading-none" style={{ fontSize: "2.6rem", textShadow: "0 0 30px rgba(255,68,68,0.5)" }}>от 5 120 000 ₽</div>
                    </div>

                    <div className="flex items-center gap-3 p-3 mb-4" style={{ background: "rgba(212,160,23,0.07)", border: "1px solid rgba(212,160,23,0.2)", borderRadius: "2px" }}>
                      <Icon name="Shield" size={14} style={{ color: "#FFD700", filter: "drop-shadow(0 0 4px #FFD70099)" }} />
                      <span className="font-stm text-[9px] text-white/40 tracking-wider">Выплаты гарантированы Государством РФ</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { icon:"HeartPulse",  label:"Медицина",  color:"#FF4444", glow:"rgba(204,0,0," },
                        { icon:"Home",        label:"Ипотека",   color:"#3B9FFF", glow:"rgba(0,55,145," },
                        { icon:"GraduationCap",label:"Льготы",   color:"#FFD700", glow:"rgba(212,160,23," },
                      ].map((q, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 p-3 cursor-pointer transition-all hover:scale-105"
                          style={{ background: `${q.glow}0.07)`, border: `1px solid ${q.glow}0.2)`, borderRadius: "3px" }}>
                          <IBox icon={q.icon} color={q.color} glow={q.glow} size={16} boxSize={34} radius={8} />
                          <span className="font-stm text-[9px] text-white/40">{q.label}</span>
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

      {/* ══ STATS BAR ════════════════════════════════════ */}
      <div style={{ background: "rgba(255,255,255,0.025)", borderTop: "1px solid rgba(212,160,23,0.15)", borderBottom: "1px solid rgba(212,160,23,0.15)" }}>
        <div className="max-w-[1440px] mx-auto px-6 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {STATS.map((s, i) => (
              <div key={i} className={`stat-card flex items-center gap-4 animate-fade-up`}
                style={{ animationDelay: `${i * 0.1}s`, opacity: 0, borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                <IBox icon={s.icon} color={s.color} glow={s.glow} size={22} boxSize={48} radius={12} />
                <div>
                  <div className="font-russo text-white text-base leading-tight">{s.val}</div>
                  <div className="font-exo text-white/40 text-[11px]">{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ ABOUT ════════════════════════════════════════ */}
      <section id="about" className="py-28">
        <div className="max-w-[1440px] mx-auto px-6">
          <div ref={aboutRef} className="section-entry grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="label-mono mb-3">// О подразделении</div>
              <div className="tricolor-line w-20 mb-7" />
              <h2 className="font-russo text-white uppercase leading-tight mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}>
                Команда <span style={{ color: "#CC0000", textShadow: "0 0 30px rgba(204,0,0,0.5)" }}>OSINT-РЭР</span>
              </h2>
              <p className="font-exo text-white/55 leading-[1.85] mb-5 text-[0.92rem]">
                Каждый специалист становится частью слаженной команды аналитиков, технических специалистов, операторов БпЛА и специалистов обеспечения. Новобранцев встречают опытные командиры и наставники.
              </p>
              <p className="font-russo text-base mb-8" style={{ color: "#003791", textShadow: "0 0 20px rgba(0,55,145,0.4)", letterSpacing: "0.04em" }}>
                Сильная команда · Надёжные командиры · Ясные задачи
              </p>
              <div className="space-y-3.5">
                {[
                  { t:"Сбор информации из открытых источников", color:"#FF4444", glow:"rgba(204,0,0," },
                  { t:"Мониторинг СМИ, соцсетей и цифровых ресурсов", color:"#3B9FFF", glow:"rgba(0,55,145," },
                  { t:"Подготовка аналитических справок и отчётов", color:"#FFD700", glow:"rgba(212,160,23," },
                  { t:"Поддержка принятия решений командованием", color:"#22C55E", glow:"rgba(34,197,94," },
                  { t:"Использование легальных OSINT-методов", color:"#A855F7", glow:"rgba(168,85,247," },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 animate-fade-left" style={{ animationDelay: `${0.1 + i * 0.1}s`, opacity: 0 }}>
                    <div className="ibox mt-0.5 shrink-0" style={{ width: 22, height: 22, background: `${item.glow}0.15)`, border: `1px solid ${item.glow}0.35)`, borderRadius: 6, boxShadow: `0 0 8px ${item.glow}0.2)` }}>
                      <Icon name="Check" size={12} style={{ color: item.color }} />
                    </div>
                    <span className="font-exo text-white/65 text-sm leading-relaxed">{item.t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {/* Chita card */}
              <div className="vol-card p-6" style={{ background: "linear-gradient(135deg, rgba(204,0,0,0.09) 0%, rgba(14,18,30,0.8) 100%)", borderColor: "rgba(204,0,0,0.22)" }}>
                <div className="flex items-start gap-4 mb-4">
                  <IBox icon="MapPin" color="#FF4444" glow="rgba(204,0,0," size={26} boxSize={58} radius={14} />
                  <div>
                    <div className="font-russo text-white text-base uppercase mb-1">г. Чита — место формирования</div>
                    <div className="font-stm text-[9px] text-red-400/70 tracking-widest">Забайкальский край · Россия</div>
                  </div>
                </div>
                <p className="font-exo text-white/55 text-sm leading-[1.8]">
                  Чита — крупный административный центр на востоке России, ~300 000 жителей. Расположена у слияния рек Чита и Ингода, окружена сопками. Развитая инфраструктура: госпитали, учебные заведения, торговые центры. Именно здесь проходит формирование и подготовка личного состава.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon:"Shield",    color:"#3B9FFF", glow:"rgba(0,55,145,",    title:"Аналитическая служба",     desc:"IT, OSINT, операторы, логистика" },
                  { icon:"Users",     color:"#FFD700", glow:"rgba(212,160,23,",  title:"Команда профи",            desc:"Опытные наставники для новобранцев" },
                  { icon:"Utensils",  color:"#22C55E", glow:"rgba(34,197,94,",   title:"Полное обеспечение",       desc:"Питание, снаряжение, техника" },
                  { icon:"Plane",     color:"#A855F7", glow:"rgba(168,85,247,",  title:"Операторы БпЛА",           desc:"Управление и разведка с воздуха" },
                ].map((c, i) => (
                  <div key={i} className="vol-card p-5">
                    <IBox icon={c.icon} color={c.color} glow={c.glow} size={22} boxSize={52} radius={12} />
                    <div className="font-russo text-white text-sm uppercase mt-4 mb-1">{c.title}</div>
                    <div className="font-exo text-white/42 text-xs leading-relaxed">{c.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ VACANCIES ════════════════════════════════════ */}
      <section id="vacancies" className="py-28" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-[1440px] mx-auto px-6">
          <div ref={vacRef} className="section-entry">
            <div className="label-mono mb-3">// Открытые вакансии</div>
            <div className="tricolor-line w-20 mb-6" />
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
              <h2 className="font-russo text-white uppercase leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                Требуемые<br /><span style={{ color: "#CC0000" }}>специалисты</span>
              </h2>
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-2">{SPEC_FILTERS.map(f => <button key={f.v} className={`tag-filter ${spec===f.v?"active":""}`} onClick={() => setSpec(f.v)}>{f.l}</button>)}</div>
                <div className="flex flex-wrap gap-2">
                  {REGION_FILTERS.map(f => <button key={f.v} className={`tag-filter ${region===f.v?"active":""}`} onClick={() => setRegion(f.v)}>{f.l}</button>)}
                  {LEVEL_FILTERS.map(f => <button key={f.v} className={`tag-filter ${level===f.v?"active":""}`} onClick={() => setLevel(f.v)}>{f.l}</button>)}
                </div>
              </div>
            </div>

            {filtered.length === 0
              ? <div className="text-center py-24 font-stm text-white/30 tracking-widest">По выбранным фильтрам вакансий не найдено</div>
              : <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filtered.map((v, vi) => (
                    <div key={v.id} className="vol-card p-7 group animate-fade-up" style={{ animationDelay: `${vi * 0.1}s`, opacity: 0 }}>
                      <div className="flex items-start justify-between mb-5">
                        <IBox icon={v.icon} color={v.iconColor} glow={v.glow} size={26} boxSize={58} radius={14} />
                        <span className="font-stm text-[9px] text-white/30 tracking-widest">{v.region}</span>
                      </div>
                      <h3 className="font-russo text-white text-xl uppercase mb-3 group-hover:text-shimmer transition-colors" style={{ letterSpacing: "-0.01em" }}>{v.title}</h3>
                      <p className="font-exo text-white/50 text-sm leading-[1.75] mb-5">{v.desc}</p>
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {v.tags.map(tag => <span key={tag} className="font-stm text-[9px] px-2.5 py-1" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.38)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "2px" }}>{tag}</span>)}
                        <span className="font-stm text-[9px] px-2.5 py-1" style={{ background: "rgba(0,55,145,0.12)", color: "hsl(210,75%,72%)", border: "1px solid rgba(0,55,145,0.25)", borderRadius: "2px" }}>{v.level}</span>
                      </div>
                      <div className="flex items-center justify-between pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                        <div>
                          <div className="money text-xl leading-none">от 210 000 ₽</div>
                          <div className="font-stm text-[9px] text-white/30 mt-0.5">в месяц</div>
                        </div>
                        <a href="#contacts" className="btn-red text-xs px-5 py-2.5" style={{ borderRadius: "2px" }}>Подать заявку</a>
                      </div>
                    </div>
                  ))}
                </div>
            }
          </div>
        </div>
      </section>

      {/* ══ REQUIREMENTS ═════════════════════════════════ */}
      <section id="requirements" className="py-28" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-[1440px] mx-auto px-6">
          <div ref={reqRef} className="section-entry">
            <div className="label-mono mb-3">// Кто может служить</div>
            <div className="tricolor-line w-20 mb-6" />
            <h2 className="font-russo text-white uppercase leading-tight mb-14" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Требования</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon:"CheckCircle", color:"#22C55E", glow:"rgba(34,197,94,",  title:"Обязательно",
                  items:["Гражданство Российской Федерации","Возраст от 18 до 49 лет (IT — до 55)","Отсутствие серьёзных судимостей","Медицинское освидетельствование","Готовность к переезду в Читу"],
                  chk:"Check", chkColor:"#22C55E" },
                { icon:"Star",        color:"#FFD700", glow:"rgba(212,160,23,", title:"Преимущество",
                  items:["Опыт в IT, аналитике, журналистике","Знание иностранных языков","Навыки работы с открытыми источниками","Опыт управления БпЛА или служба в ВС","Водительское удостоверение B/C"],
                  chk:"ChevronRight", chkColor:"#FFD700" },
              ].map((card, ci) => (
                <div key={ci} className="vol-card p-8">
                  <div className="flex items-center gap-4 mb-8">
                    <IBox icon={card.icon} color={card.color} glow={card.glow} size={28} boxSize={60} radius={14} />
                    <span className="font-russo text-white text-lg uppercase tracking-wider">{card.title}</span>
                  </div>
                  <div className="space-y-4">
                    {card.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 animate-fade-left" style={{ animationDelay: `${0.1 + i * 0.08}s`, opacity: 0 }}>
                        <div className="ibox mt-0.5 shrink-0" style={{ width: 24, height: 24, background: `${card.glow}0.12)`, border: `1px solid ${card.glow}0.35)`, borderRadius: 6, boxShadow: `0 0 8px ${card.glow}0.18)` }}>
                          <Icon name={card.chk as AnyIcon} size={13} style={{ color: card.chkColor }} />
                        </div>
                        <span className="font-exo text-white/62 text-sm leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ BENEFITS ═════════════════════════════════════ */}
      <section id="benefits" className="py-28" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-[1440px] mx-auto px-6">
          <div ref={benRef} className="section-entry">
            <div className="label-mono mb-3">// Социальный пакет</div>
            <div className="tricolor-line w-20 mb-6" />
            <h2 className="font-russo text-white uppercase leading-tight mb-14" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Льготы и гарантии</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {BENEFITS.map((b, i) => (
                <div key={i} className="vol-card p-6 group cursor-default animate-scale-in" style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}>
                  <div className="mb-5 transition-transform group-hover:scale-110 group-hover:rotate-3">
                    <IBox icon={b.icon} color={b.color} glow={b.glow} size={28} boxSize={62} radius={16} />
                  </div>
                  <div className="font-russo text-white text-sm uppercase mb-2 leading-snug">{b.title}</div>
                  <div className="font-exo text-white/45 text-sm leading-[1.7]">{b.desc}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 gold-card p-8 flex flex-col sm:flex-row items-center gap-8" style={{ borderRadius: "4px" }}>
              <div className="animate-pulse-gold">
                <IBox icon="ShieldCheck" color="#FFD700" glow="rgba(212,160,23," size={36} boxSize={80} radius={20} />
              </div>
              <div>
                <div className="font-russo text-white text-2xl uppercase mb-2" style={{ textShadow: "0 0 20px rgba(212,160,23,0.3)" }}>
                  Списание задолженностей до <span className="money-gold">10 000 000 ₽</span>
                </div>
                <div className="font-exo text-white/52 text-sm">Полное списание кредитов, штрафов и задолженностей при выполнении условий контракта.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ STEPS ════════════════════════════════════════ */}
      <section id="steps" className="py-28" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-[1440px] mx-auto px-6">
          <div ref={stepsRef} className="section-entry">
            <div className="label-mono mb-3">// Как вступить</div>
            <div className="tricolor-line w-20 mb-6" />
            <h2 className="font-russo text-white uppercase leading-tight mb-16" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Этапы поступления</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {STEPS.map((s, i) => (
                <div key={i} className="flex flex-col items-center text-center group animate-fade-up" style={{ animationDelay: `${i * 0.12}s`, opacity: 0 }}>
                  <div className="relative mb-5">
                    {/* Outer glow ring */}
                    <div className="absolute inset-0 rounded-full animate-pulse-gold opacity-30" style={{ background: `radial-gradient(circle, ${s.color}40 0%, transparent 70%)`, transform: "scale(1.4)" }} />
                    <div className="relative w-24 h-24 flex flex-col items-center justify-center transition-all group-hover:scale-110"
                      style={{ background: `linear-gradient(135deg, rgba(${s.color === "#FF4444" ? "204,0,0" : s.color === "#3B9FFF" ? "0,55,145" : s.color === "#FFD700" ? "212,160,23" : s.color === "#22C55E" ? "34,197,94" : "168,85,247"},0.22) 0%, rgba(0,0,0,0.6) 100%)`, border: `2px solid ${s.color}60`, borderRadius: "50%", boxShadow: `0 0 40px ${s.color}40, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)` }}>
                      <Icon name={s.icon as AnyIcon} size={24} style={{ color: s.color, filter: `drop-shadow(0 0 6px ${s.color})` }} />
                      <span className="step-num text-sm mt-0.5">{s.n}</span>
                    </div>
                  </div>
                  <div className="font-russo text-white uppercase text-sm mb-2">{s.t}</div>
                  <div className="font-exo text-white/42 text-xs leading-[1.7]">{s.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══════════════════════════════════════════ */}
      <section id="faq" className="py-28" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-[1440px] mx-auto px-6">
          <div ref={faqRef} className="section-entry">
            <div className="label-mono mb-3">// Частые вопросы</div>
            <div className="tricolor-line w-20 mb-6" />
            <h2 className="font-russo text-white uppercase leading-tight mb-12" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Вопросы и ответы</h2>
            <div className="max-w-3xl space-y-2">
              {FAQ.map((item, i) => (
                <div key={i} className={`vol-card overflow-hidden faq-item ${openFaq === i ? "open" : ""} animate-fade-up`} style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}>
                  <button className="w-full flex items-center justify-between p-6 text-left gap-4"
                    style={{ background: openFaq === i ? "rgba(204,0,0,0.06)" : "transparent" }}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span className="font-exo text-white font-semibold text-sm leading-relaxed">{item.q}</span>
                    <div className="ibox shrink-0 transition-all"
                      style={{ width: 36, height: 36,
                        background: openFaq === i ? "linear-gradient(135deg, rgba(204,0,0,0.3), rgba(204,0,0,0.1))" : "rgba(255,255,255,0.05)",
                        border: openFaq === i ? "1px solid rgba(204,0,0,0.5)" : "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "8px",
                        boxShadow: openFaq === i ? "0 0 16px rgba(204,0,0,0.3)" : "none"
                      }}>
                      <Icon name={openFaq === i ? "Minus" : "Plus"} size={16} style={{ color: openFaq === i ? "#FF4444" : "rgba(255,255,255,0.5)" }} />
                    </div>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-6 animate-fade-in" style={{ opacity: 0, animationDelay: "0s" }}>
                      <div className="pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                        <p className="font-exo text-white/55 text-sm leading-[1.85]">{item.a}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CONTACTS ═════════════════════════════════════ */}
      <section id="contacts" className="py-28" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-[1440px] mx-auto px-6">
          <div ref={contactsRef} className="section-entry grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <div className="label-mono mb-3">// Начни сейчас</div>
              <div className="tricolor-line w-20 mb-6" />
              <h2 className="font-russo text-white uppercase leading-tight mb-5" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                Готов стать<br /><span style={{ color: "#CC0000" }}>частью команды?</span>
              </h2>
              <p className="font-exo text-white/48 text-sm leading-[1.85] mb-10 max-w-sm">
                Оставьте заявку — свяжемся в течение 24 часов. Все обращения конфиденциальны.
              </p>
              <div className="space-y-5">
                {[
                  { icon:"Phone",  color:"#22C55E",  glow:"rgba(34,197,94,",    label:"+7 (3022) 55-42-10", sub:"Звонки Пн–Пт 09:00–18:00" },
                  { icon:"Mail",   color:"#3B9FFF",  glow:"rgba(0,55,145,",     label:"info@osint-rer.ru",  sub:"Ответ в течение 24 часов" },
                  { icon:"Send",   color:"#FFD700",  glow:"rgba(212,160,23,",   label:"@OSINT_RER",         sub:"Telegram — 24/7" },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-4 animate-fade-left" style={{ animationDelay: `${0.1 + i * 0.12}s`, opacity: 0 }}>
                    <IBox icon={c.icon} color={c.color} glow={c.glow} size={22} boxSize={52} radius={12} />
                    <div>
                      <div className="font-exo text-white/88 text-sm font-semibold">{c.label}</div>
                      <div className="font-stm text-[9px] text-white/32 tracking-wider mt-0.5">{c.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="vol-card p-10 animate-fade-right" style={{ opacity: 0, animationDelay: "0.2s" }}>
              <div className="flex items-center gap-3 mb-7">
                <GerbRF size={28} className="emblem-glow" />
                <span className="font-stm text-[10px] tracking-[0.2em]" style={{ color: "#FFD700" }}>ФОРМА ЗАЯВКИ</span>
              </div>
              <div className="space-y-5">
                {[
                  { label:"Ваше имя", type:"text", placeholder:"Иванов Иван Иванович" },
                  { label:"Телефон",  type:"tel",  placeholder:"+7 (___) ___-__-__" },
                ].map(f => (
                  <div key={f.label}>
                    <label className="font-stm text-[9px] text-white/35 block mb-2 tracking-widest">{f.label.toUpperCase()}</label>
                    <input type={f.type} placeholder={f.placeholder} className="form-input" />
                  </div>
                ))}
                <div>
                  <label className="font-stm text-[9px] text-white/35 block mb-2 tracking-widest">СПЕЦИАЛЬНОСТЬ</label>
                  <select className="form-input" style={{ appearance: "none" }}>
                    <option value="" style={{ background: "#050812" }}>Выберите направление</option>
                    <option value="osint" style={{ background: "#050812" }}>OSINT-аналитик</option>
                    <option value="it" style={{ background: "#050812" }}>IT-специалист</option>
                    <option value="bpla" style={{ background: "#050812" }}>Оператор БпЛА</option>
                    <option value="logistics" style={{ background: "#050812" }}>Водитель / Логистика</option>
                  </select>
                </div>
                <button className="btn-red w-full py-4 text-sm mt-2 animate-pulse-red" style={{ borderRadius: "3px" }}>
                  <Icon name="Send" size={17} />
                  Оставить заявку
                </button>
              </div>
              <div className="mt-5 flex items-center gap-2">
                <Icon name="Lock" size={12} style={{ color: "rgba(255,255,255,0.22)" }} />
                <span className="font-stm text-[9px] text-white/22 tracking-wider">Данные защищены и конфиденциальны</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════ */}
      <footer style={{ borderTop: "1px solid rgba(212,160,23,0.15)" }}>
        <div className="tricolor-line" />
        <div className="max-w-[1440px] mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <GerbRF size={32} className="emblem-glow" />
            <div>
              <div className="font-russo text-white text-xs tracking-widest text-shimmer">OSINT-РЭР</div>
              <div className="font-stm text-[8px] text-white/25 tracking-[0.15em]">СЛУЖБА · АНАЛИТИКА · РФ</div>
            </div>
          </div>
          <div className="font-stm text-[9px] text-white/22 text-center tracking-wider">© 2024 OSINT-РЭР — Все права защищены · Российская Федерация</div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="font-stm text-[9px] text-white/28 tracking-widest">НАБОР ОТКРЫТ</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
