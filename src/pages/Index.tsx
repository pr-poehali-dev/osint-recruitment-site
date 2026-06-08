import { useState } from "react";
import Icon from "@/components/ui/icon";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyIcon = any;

const HERO_IMG =
  "https://cdn.poehali.dev/projects/31cf2f8d-8f85-4cf9-801d-b8ed9fa0968a/files/53feafdf-9089-49c0-af7b-0548c4432968.jpg";

/* ── DATA ────────────────────────────────────────────── */

const NAV = [
  { label: "О подразделении", href: "#about" },
  { label: "Направления", href: "#vacancies" },
  { label: "Требования", href: "#requirements" },
  { label: "Льготы", href: "#benefits" },
  { label: "Этапы", href: "#steps" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакты", href: "#contacts" },
];

const PAYMENTS = [
  { label: "Единовременно", value: "2 600 000 ₽" },
  { label: "Ежемесячно от", value: "210 000 ₽" },
  { label: "Федеральная выплата", value: "400 000 ₽" },
];

const STATS = [
  { icon: "DollarSign", val: "> 2,6 млн ₽",  sub: "Единовременная выплата" },
  { icon: "Clock",      val: "24/7",           sub: "Аналитическая поддержка" },
  { icon: "BarChart2",  val: "1000+",          sub: "Операций выполнено" },
  { icon: "Lock",       val: "Конфиденциально",sub: "Защита данных и личности" },
  { icon: "MapPin",     val: "Тыловые районы", sub: "Без боевых действий" },
];

const VACANCIES = [
  {
    id: 1, specialty: "osint", region: "забайкальский", level: "опыт",
    icon: "Search", title: "OSINT-аналитик",
    desc: "Сбор и анализ открытых источников, подготовка аналитических справок и поддержка принятия решений.",
    tags: ["Аналитика", "OSINT", "Отчётность"],
  },
  {
    id: 2, specialty: "it", region: "забайкальский", level: "опыт",
    icon: "Monitor", title: "IT-специалист",
    desc: "Администрирование систем, разработка защищённых решений, анализ информационных потоков.",
    tags: ["Администрирование", "Сети", "Безопасность"],
  },
  {
    id: 3, specialty: "bpla", region: "забайкальский", level: "без опыта",
    icon: "Plane", title: "Оператор БпЛА",
    desc: "Управление беспилотниками, разведка и аэрофотосъёмка, контроль воздушной обстановки.",
    tags: ["БпЛА", "Разведка", "Навигация"],
  },
  {
    id: 4, specialty: "logistics", region: "забайкальский", level: "без опыта",
    icon: "Truck", title: "Водитель",
    desc: "Перевозка личного состава и грузов, обеспечение логистики, техническое обслуживание техники.",
    tags: ["Логистика", "Категория C", "Тыл"],
  },
  {
    id: 5, specialty: "osint", region: "читинский", level: "без опыта",
    icon: "Rss", title: "Мониторинг СМИ",
    desc: "Мониторинг социальных сетей, медиа и цифровых ресурсов, подготовка информационных сводок.",
    tags: ["Медиа", "Мониторинг", "OSINT"],
  },
  {
    id: 6, specialty: "it", region: "читинский", level: "опыт",
    icon: "Server", title: "Системный администратор",
    desc: "Поддержка серверной инфраструктуры, управление сетями, обеспечение защиты данных.",
    tags: ["Linux", "Сети", "Защита данных"],
  },
];

const SPEC_FILTERS = [
  { v: "all",      l: "Все" },
  { v: "osint",    l: "OSINT" },
  { v: "it",       l: "IT" },
  { v: "bpla",     l: "БпЛА" },
  { v: "logistics",l: "Логистика" },
];
const REGION_FILTERS = [
  { v: "all",            l: "Все регионы" },
  { v: "забайкальский",  l: "Забайкальский край" },
  { v: "читинский",      l: "Чита" },
];
const LEVEL_FILTERS = [
  { v: "all",         l: "Любой опыт" },
  { v: "без опыта",   l: "Без опыта" },
  { v: "опыт",        l: "С опытом" },
];

const BENEFITS = [
  { icon: "Heart",       title: "Медицинское обеспечение", desc: "Полная страховка и лечение за счёт государства" },
  { icon: "Home",        title: "Ипотечное обеспечение",   desc: "Льготная ипотека и жилищные субсидии" },
  { icon: "Zap",         title: "Льготы по ЖКХ",           desc: "Скидки на коммунальные услуги и жильё" },
  { icon: "CreditCard",  title: "Кредитные каникулы",      desc: "Налоговые и кредитные каникулы на период службы" },
  { icon: "GraduationCap",title:"Образование",             desc: "Бесплатное обучение и повышение квалификации" },
  { icon: "Shield",      title: "Списание долгов",         desc: "Списание задолженностей до 10 000 000 ₽" },
  { icon: "Award",       title: "Статус ветерана",         desc: "Полный льготный пакет ветерана боевых действий" },
  { icon: "Baby",        title: "Льготы семье",            desc: "Поддержка детей, питание в школах, детсады" },
];

const STEPS = [
  { n: "01", t: "Заявка",        d: "Оставляете заявку онлайн или по телефону" },
  { n: "02", t: "Консультация",  d: "Связываемся с вами в течение 24 часов" },
  { n: "03", t: "Оформление",    d: "Документы и медицинское освидетельствование" },
  { n: "04", t: "Прибытие",      d: "Проезд до Читы за счёт подразделения" },
  { n: "05", t: "Служба",        d: "Зачисление и получение первых задач" },
];

const FAQ = [
  { q: "Кто может подать заявку?", a: "Граждане РФ от 18 до 49 лет. Для IT-специальностей — до 55 лет. Воинский опыт необязателен." },
  { q: "Какие требования к кандидатам?", a: "Гражданство РФ, отсутствие серьёзных судимостей, прохождение медкомиссии. Специфика — в зависимости от должности." },
  { q: "Где проходит формирование?", a: "Формирование и подготовка проходят в г. Чита — столице Забайкальского края." },
  { q: "Где проходит служба?", a: "Служба проходит в Донецке и Мариуполе." },
  { q: "Нужно ли покупать экипировку самому?", a: "Нет. Вся необходимая экипировка и техника предоставляются подразделением." },
  { q: "Как подать заявку?", a: "Оставьте своё имя и телефон в форме на сайте — наш специалист свяжется с вами в течение 24 часов." },
  { q: "Как осуществляется отбор?", a: "Телефонное интервью → встреча с представителем → медкомиссия → оформление документов." },
  { q: "Когда начинаются выплаты?", a: "Единовременная — в течение первого месяца. Ежемесячное довольствие — с первого дня службы." },
];

/* ── COMPONENT ───────────────────────────────────────── */

export default function Index() {
  const [spec,   setSpec]   = useState("all");
  const [region, setRegion] = useState("all");
  const [level,  setLevel]  = useState("all");
  const [openFaq,setOpenFaq]= useState<number|null>(null);
  const [menu,   setMenu]   = useState(false);

  const filtered = VACANCIES.filter(v =>
    (spec   === "all" || v.specialty === spec)   &&
    (region === "all" || v.region    === region) &&
    (level  === "all" || v.level     === level)
  );

  return (
    <div className="min-h-screen font-ibm" style={{ background: "hsl(218,30%,5%)" }}>

      {/* ══ NAV ══════════════════════════════════════════ */}
      <nav
        className="fixed top-0 inset-x-0 z-50 h-14 flex items-center"
        style={{ background: "rgba(6,10,18,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="max-w-[1440px] w-full mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 shrink-0 group">
            <div
              className="w-8 h-8 flex items-center justify-center font-oswald font-bold text-white text-xs tracking-widest"
              style={{
                background: "linear-gradient(135deg, hsl(0,78%,48%) 0%, hsl(0,65%,36%) 100%)",
                boxShadow: "0 0 20px rgba(200,30,30,0.4)",
                borderRadius: "3px",
                letterSpacing: "0.05em",
              }}
            >
              FO
            </div>
            <div>
              <div className="font-oswald font-bold text-white text-sm tracking-[0.18em] leading-none">FO.RU</div>
              <div className="label-mono text-[9px] text-white/35 leading-none mt-0.5">OSINT · Служба · Аналитика</div>
            </div>
          </a>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-7">
            {NAV.map(n => <a key={n.href} href={n.href} className="nav-link">{n.label}</a>)}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <a href="#contacts" className="btn-red hidden sm:flex px-5 py-2.5 text-xs animate-pulse-red" style={{ borderRadius: "3px" }}>
              Оставить заявку
            </a>
            <button className="lg:hidden text-white/60 hover:text-white transition-colors" onClick={() => setMenu(!menu)}>
              <Icon name={menu ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menu && (
          <div className="absolute top-14 inset-x-0 border-t border-white/7 px-6 py-5 flex flex-col gap-4"
            style={{ background: "rgba(6,10,18,0.98)" }}>
            {NAV.map(n => (
              <a key={n.href} href={n.href} className="nav-link py-1" onClick={() => setMenu(false)}>{n.label}</a>
            ))}
            <a href="#contacts" className="btn-red w-full py-3 text-xs mt-1" style={{ borderRadius: "3px" }}>Оставить заявку</a>
          </div>
        )}
      </nav>

      {/* ══ HERO ═════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-14">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt="Командный центр"
            className="w-full h-full object-cover object-center"
            style={{ filter: "brightness(0.28) saturate(0.55)" }}
          />
          {/* Gradient overlays for depth */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(100deg, rgba(6,10,18,0.97) 30%, rgba(6,10,18,0.55) 70%, rgba(6,10,18,0.8) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 15% 50%, rgba(37,99,235,0.07) 0%, transparent 70%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 70% at 85% 40%, rgba(200,30,30,0.06) 0%, transparent 60%)" }} />
          <div className="absolute inset-0 grid-bg opacity-70" />
          {/* Scan beam */}
          <div className="scan-beam" />
        </div>

        <div className="relative max-w-[1440px] w-full mx-auto px-6 py-24">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-12 items-start">

            {/* ── LEFT ── */}
            <div>
              {/* Badge */}
              <div className="animate-fade-up d0 inline-flex items-center gap-2.5 mb-6 px-4 py-2"
                style={{ background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.25)", borderRadius: "2px" }}>
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="label-mono text-[10px]">Набор открыт · 2024</span>
              </div>

              {/* Headline */}
              <h1 className="animate-fade-up d1 font-oswald font-bold text-white leading-[0.92] mb-6 text-glow-white"
                style={{ fontSize: "clamp(3.2rem, 7.5vw, 6.2rem)", textTransform: "uppercase", letterSpacing: "-0.025em" }}>
                Присоединяйся<br />
                к <span className="text-glow-red" style={{ color: "hsl(0,80%,60%)" }}>OSINT</span>-<br />
                подразделению
              </h1>

              {/* Sub */}
              <p className="animate-fade-up d2 text-white/55 text-base leading-relaxed max-w-[500px] mb-3">
                Анализ открытых источников, IT, операторы БпЛА, логистика.
              </p>
              <p className="animate-fade-up d3 font-oswald font-light text-lg mb-10" style={{ color: "hsl(210,70%,68%)", letterSpacing: "0.04em" }}>
                Служба без участия в боевых действиях · Забайкальский край
              </p>

              {/* CTA buttons */}
              <div className="animate-fade-up d4 flex flex-wrap gap-4">
                <a href="#contacts" className="btn-red px-10 py-4 text-sm animate-pulse-red" style={{ borderRadius: "3px" }}>
                  <Icon name="Send" size={18} />
                  Оставить заявку
                </a>
                <a href="#vacancies" className="btn-ghost px-10 py-4 text-sm" style={{ borderRadius: "3px" }}>
                  <Icon name="ChevronDown" size={18} />
                  Смотреть вакансии
                </a>
              </div>

              {/* Mini-stats row */}
              <div className="animate-fade-up d5 mt-12 flex flex-wrap gap-8">
                {[
                  { val: "5 120 000", unit: "₽", sub: "Доход за 1-й год" },
                  { val: "210 000",   unit: "₽/мес", sub: "Ежемесячно" },
                  { val: "1000+",     unit: "",  sub: "Выполненных задач" },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="font-oswald font-bold text-white leading-none" style={{ fontSize: "1.7rem", letterSpacing: "-0.02em" }}>
                      {s.val} <span className="text-base font-normal" style={{ color: "hsl(0,70%,62%)" }}>{s.unit}</span>
                    </div>
                    <div className="label-mono text-[10px] text-white/35 mt-1">{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Payment card ── */}
            <div className="animate-fade-up d3 animate-float">
              {/* Outer glow container */}
              <div style={{ filter: "drop-shadow(0 0 60px rgba(200,30,30,0.18)) drop-shadow(0 40px 80px rgba(0,0,0,0.6))" }}>
                <div className="red-card" style={{ borderRadius: "4px", padding: "1px" }}>
                  <div style={{ background: "linear-gradient(155deg, rgba(14,18,30,0.98) 0%, rgba(10,13,22,0.99) 100%)", borderRadius: "3px", padding: "2rem" }}>

                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <Icon name="TrendingUp" size={14} className="text-blue-400" />
                        <span className="label-mono text-[10px]">Выплаты и доходы</span>
                      </div>
                      <div className="flex gap-1">
                        {[0,1,2].map(i => <div key={i} className="w-2 h-2 rounded-full" style={{ background: i===0?"hsl(0,75%,55%)":i===1?"hsl(40,90%,55%)":"hsl(140,60%,45%)" }} />)}
                      </div>
                    </div>

                    {/* Rows */}
                    <div className="space-y-4 mb-6">
                      {PAYMENTS.map(p => (
                        <div key={p.label} className="flex justify-between items-center py-3"
                          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                          <span className="text-white/50 text-sm">{p.label}</span>
                          <span className="money text-xl">{p.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Total */}
                    <div className="p-5 mb-5" style={{ background: "rgba(200,30,30,0.1)", border: "1px solid rgba(200,30,30,0.22)", borderRadius: "3px" }}>
                      <div className="text-white/45 text-xs mb-1">Общий доход за первый год</div>
                      <div className="font-oswald font-bold text-glow-red leading-none" style={{ fontSize: "2.4rem", color: "hsl(0,80%,62%)" }}>
                        от 5 120 000 ₽
                      </div>
                    </div>

                    {/* Guarantee */}
                    <div className="flex items-center gap-3 p-3" style={{ background: "rgba(37,99,235,0.07)", border: "1px solid rgba(37,99,235,0.15)", borderRadius: "2px" }}>
                      <Icon name="Shield" size={14} className="text-blue-400 shrink-0" />
                      <span className="label-mono text-[9px] text-white/40">Выплаты гарантированы государством</span>
                    </div>

                    {/* Quick links */}
                    <div className="mt-5 grid grid-cols-3 gap-2">
                      {[
                        { icon: "Heart",       label: "Страховка" },
                        { icon: "Home",        label: "Ипотека" },
                        { icon: "GraduationCap",label:"Льготы" },
                      ].map((q, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 p-4 cursor-pointer transition-all hover:scale-105"
                          style={{ background: "rgba(37,99,235,0.07)", border: "1px solid rgba(37,99,235,0.18)", borderRadius: "3px" }}>
                          <div className="w-8 h-8 flex items-center justify-center rounded-full"
                            style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.3), rgba(37,99,235,0.1))", boxShadow: "0 0 12px rgba(37,99,235,0.3)" }}>
                            <Icon name={q.icon as AnyIcon} size={16} className="text-blue-300" />
                          </div>
                          <span className="label-mono text-[9px] text-white/45">{q.label}</span>
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
      <div style={{ background: "rgba(255,255,255,0.025)", borderTop: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-[1440px] mx-auto px-6 py-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {STATS.map((s, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-3"
                style={{ borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                <div className="w-11 h-11 flex items-center justify-center shrink-0 relative"
                  style={{
                    background: "linear-gradient(135deg, rgba(37,99,235,0.22) 0%, rgba(37,99,235,0.06) 100%)",
                    border: "1px solid rgba(37,99,235,0.35)",
                    borderRadius: "10px",
                    boxShadow: "0 0 18px rgba(37,99,235,0.2), inset 0 1px 0 rgba(255,255,255,0.08)"
                  }}>
                  <Icon name={s.icon as AnyIcon} size={20} className="text-blue-300" />
                </div>
                <div>
                  <div className="font-oswald font-bold text-white text-base leading-tight">{s.val}</div>
                  <div className="text-white/38 text-[11px] mt-0.5">{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ ABOUT ════════════════════════════════════════ */}
      <section id="about" className="py-28">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div>
              <div className="label-mono mb-3">// О подразделении</div>
              <div className="w-12 h-0.5 mb-6" style={{ background: "linear-gradient(90deg, hsl(0,78%,50%), transparent)" }} />
              <h2 className="font-oswald font-bold text-white uppercase leading-tight mb-6"
                style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", letterSpacing: "-0.02em" }}>
                Команда <span style={{ color: "hsl(0,80%,60%)" }}>OSINT</span>
              </h2>
              <p className="text-white/55 leading-[1.8] mb-5 text-[0.92rem]">
                Каждый специалист становится частью слаженной команды аналитиков, технических специалистов,
                операторов БпЛА и специалистов обеспечения. Новобранцев встречают опытные командиры и наставники.
              </p>
              <p className="font-oswald font-light text-lg mb-8" style={{ color: "hsl(210,65%,68%)" }}>
                Сильная команда · Надёжные командиры · Ясные задачи
              </p>
              <div className="space-y-3">
                {[
                  "Сбор информации из открытых источников",
                  "Мониторинг СМИ, соцсетей и цифровых ресурсов",
                  "Подготовка аналитических справок и отчётов",
                  "Поддержка принятия решений командованием",
                  "Использование легальных OSINT-методов",
                ].map((t, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 flex items-center justify-center mt-0.5 shrink-0"
                      style={{ background: "rgba(200,30,30,0.15)", border: "1px solid rgba(200,30,30,0.3)", borderRadius: "2px" }}>
                      <Icon name="Check" size={11} className="text-red-400" />
                    </div>
                    <span className="text-white/62 text-sm leading-relaxed">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {/* Chita highlight */}
              <div className="vol-card p-6" style={{ background: "linear-gradient(135deg, rgba(239,68,68,0.08) 0%, rgba(14,18,30,0.8) 100%)", borderColor: "rgba(239,68,68,0.2)" }}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 flex items-center justify-center shrink-0"
                    style={{ background: "linear-gradient(135deg, rgba(239,68,68,0.22), rgba(239,68,68,0.07))", border: "1px solid rgba(239,68,68,0.35)", borderRadius: "12px", boxShadow: "0 0 24px rgba(239,68,68,0.2)" }}>
                    <Icon name="MapPin" size={26} className="text-red-400" />
                  </div>
                  <div>
                    <div className="font-oswald font-bold text-white text-base uppercase mb-1">г. Чита — место формирования</div>
                    <div className="label-mono text-[9px] text-red-400/70">Забайкальский край · Россия</div>
                  </div>
                </div>
                <p className="text-white/55 text-sm leading-[1.75]">
                  Чита — крупный административный центр на востоке России с населением около 300 000 человек. Город расположен в живописном месте у слияния рек Чита и Ингода, окружён сопками. Развитая инфраструктура: госпитали, учебные заведения, торговые центры. Умеренный континентальный климат с морозными зимами и тёплым летом. Именно здесь проходит формирование, подготовка и оформление личного состава подразделения.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "Shield",   title: "Аналитическая служба", desc: "IT, OSINT, операторы, логистика", color: "rgba(37,99,235," },
                  { icon: "Users",    title: "Команда профессионалов", desc: "Опытные наставники для новобранцев", color: "rgba(37,99,235," },
                  { icon: "Utensils", title: "Полное обеспечение", desc: "Питание, снаряжение, техника", color: "rgba(16,185,129," },
                  { icon: "Plane",    title: "Операторы БпЛА", desc: "Управление и разведка с воздуха", color: "rgba(168,85,247," },
                ].map((c, i) => (
                  <div key={i} className="vol-card p-5">
                    <div className="w-12 h-12 flex items-center justify-center mb-4"
                      style={{
                        background: `linear-gradient(135deg, ${c.color}0.18) 0%, ${c.color}0.05) 100%)`,
                        border: `1px solid ${c.color}0.3)`,
                        borderRadius: "12px",
                        boxShadow: `0 0 20px ${c.color}0.18), inset 0 1px 0 rgba(255,255,255,0.07)`
                      }}>
                      <Icon name={c.icon as AnyIcon} size={22} className={i === 2 ? "text-emerald-400" : i === 3 ? "text-purple-400" : "text-blue-400"} />
                    </div>
                    <div className="font-oswald font-semibold text-white text-sm uppercase mb-1">{c.title}</div>
                    <div className="text-white/42 text-xs leading-relaxed">{c.desc}</div>
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
          <div className="label-mono mb-3">// Открытые вакансии</div>
          <div className="w-12 h-0.5 mb-6" style={{ background: "linear-gradient(90deg, hsl(0,78%,50%), transparent)" }} />

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <h2 className="font-oswald font-bold text-white uppercase leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", letterSpacing: "-0.02em" }}>
              Требуемые<br />специалисты
            </h2>

            {/* ── FILTERS ── */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                {SPEC_FILTERS.map(f => (
                  <button key={f.v} className={`tag-filter ${spec === f.v ? "active" : ""}`} onClick={() => setSpec(f.v)}>{f.l}</button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {REGION_FILTERS.map(f => (
                  <button key={f.v} className={`tag-filter ${region === f.v ? "active" : ""}`} onClick={() => setRegion(f.v)}>{f.l}</button>
                ))}
                {LEVEL_FILTERS.map(f => (
                  <button key={f.v} className={`tag-filter ${level === f.v ? "active" : ""}`} onClick={() => setLevel(f.v)}>{f.l}</button>
                ))}
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-24 label-mono text-white/30">По выбранным фильтрам вакансий не найдено</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map(v => (
                <div key={v.id} className="vol-card p-7 group">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-14 h-14 flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, rgba(37,99,235,0.2) 0%, rgba(37,99,235,0.06) 100%)",
                        border: "1px solid rgba(37,99,235,0.3)",
                        borderRadius: "14px",
                        boxShadow: "0 0 28px rgba(37,99,235,0.2), inset 0 1px 0 rgba(255,255,255,0.08)"
                      }}>
                      <Icon name={v.icon as AnyIcon} size={26} className="text-blue-300" />
                    </div>
                    <span className="label-mono text-[9px] text-white/30">{v.region}</span>
                  </div>
                  <h3 className="font-oswald font-bold text-white text-xl uppercase mb-3 group-hover:text-blue-300 transition-colors"
                    style={{ letterSpacing: "-0.01em" }}>
                    {v.title}
                  </h3>
                  <p className="text-white/48 text-sm leading-[1.7] mb-5">{v.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {v.tags.map(tag => (
                      <span key={tag} className="label-mono text-[9px] px-2.5 py-1"
                        style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.38)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "2px" }}>
                        {tag}
                      </span>
                    ))}
                    <span className="label-mono text-[9px] px-2.5 py-1"
                      style={{ background: "rgba(37,99,235,0.1)", color: "hsl(210,75%,72%)", border: "1px solid rgba(37,99,235,0.2)", borderRadius: "2px" }}>
                      {v.level}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                    <div>
                      <div className="money text-xl leading-none">от 210 000 ₽</div>
                      <div className="label-mono text-[9px] text-white/30 mt-0.5">в месяц</div>
                    </div>
                    <a href="#contacts" className="btn-red text-xs px-5 py-2.5" style={{ borderRadius: "2px" }}>Подать заявку</a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══ REQUIREMENTS ═════════════════════════════════ */}
      <section id="requirements" className="py-28" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="label-mono mb-3">// Кто может служить</div>
          <div className="w-12 h-0.5 mb-6" style={{ background: "linear-gradient(90deg, hsl(0,78%,50%), transparent)" }} />
          <h2 className="font-oswald font-bold text-white uppercase leading-tight mb-14"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", letterSpacing: "-0.02em" }}>
            Требования
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: "CheckCircle", color: "text-green-400", borderColor: "rgba(52,211,153,0.3)",
                title: "Обязательно",
                items: [
                  "Гражданство Российской Федерации",
                  "Возраст от 18 до 49 лет (IT — до 55)",
                  "Отсутствие серьёзных судимостей",
                  "Медицинское освидетельствование",
                  "Готовность к переезду в Читу",
                ],
              },
              {
                icon: "Star", color: "text-blue-400", borderColor: "rgba(37,99,235,0.3)",
                title: "Преимущество",
                items: [
                  "Опыт в IT, аналитике, журналистике",
                  "Знание иностранных языков",
                  "Навыки работы с открытыми источниками",
                  "Опыт управления БпЛА или служба в ВС",
                  "Водительское удостоверение B/C",
                ],
              },
            ].map((card, ci) => (
              <div key={ci} className="vol-card p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 flex items-center justify-center shrink-0"
                    style={{
                      background: ci === 0
                        ? "linear-gradient(135deg, rgba(52,211,153,0.2), rgba(52,211,153,0.05))"
                        : "linear-gradient(135deg, rgba(37,99,235,0.2), rgba(37,99,235,0.05))",
                      border: `1px solid ${card.borderColor}`,
                      borderRadius: "14px",
                      boxShadow: ci === 0
                        ? "0 0 28px rgba(52,211,153,0.2), inset 0 1px 0 rgba(255,255,255,0.07)"
                        : "0 0 28px rgba(37,99,235,0.2), inset 0 1px 0 rgba(255,255,255,0.07)"
                    }}>
                    <Icon name={card.icon as AnyIcon} size={28} className={card.color} />
                  </div>
                  <span className="font-oswald font-bold text-white text-lg uppercase tracking-wider">{card.title}</span>
                </div>
                <div className="space-y-4">
                  {card.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 flex items-center justify-center mt-0.5 shrink-0"
                        style={{
                          background: ci === 0 ? "rgba(52,211,153,0.12)" : "rgba(37,99,235,0.12)",
                          border: `1px solid ${card.borderColor}`,
                          borderRadius: "6px",
                          boxShadow: ci === 0 ? "0 0 8px rgba(52,211,153,0.15)" : "0 0 8px rgba(37,99,235,0.15)"
                        }}>
                        <Icon name={ci === 0 ? "Check" : "ChevronRight"} size={13} className={card.color} />
                      </div>
                      <span className="text-white/60 text-sm leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BENEFITS ═════════════════════════════════════ */}
      <section id="benefits" className="py-28" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="label-mono mb-3">// Социальный пакет</div>
          <div className="w-12 h-0.5 mb-6" style={{ background: "linear-gradient(90deg, hsl(0,78%,50%), transparent)" }} />
          <h2 className="font-oswald font-bold text-white uppercase leading-tight mb-14"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", letterSpacing: "-0.02em" }}>
            Льготы и гарантии
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BENEFITS.map((b, i) => (
              <div key={i} className="vol-card p-6 group cursor-default">
                <div className="w-14 h-14 flex items-center justify-center mb-5 transition-all group-hover:scale-110"
                  style={{
                    background: "linear-gradient(135deg, rgba(37,99,235,0.2) 0%, rgba(37,99,235,0.06) 100%)",
                    border: "1px solid rgba(37,99,235,0.28)",
                    borderRadius: "16px",
                    boxShadow: "0 0 24px rgba(37,99,235,0.18), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.2)"
                  }}>
                  <Icon name={b.icon as AnyIcon} size={26} className="text-blue-300" />
                </div>
                <div className="font-oswald font-bold text-white text-base uppercase mb-2 leading-snug">{b.title}</div>
                <div className="text-white/45 text-sm leading-[1.7]">{b.desc}</div>
              </div>
            ))}
          </div>

          {/* Big callout */}
          <div className="mt-8 red-card p-8 flex flex-col sm:flex-row items-center gap-8" style={{ borderRadius: "3px" }}>
            <div className="w-20 h-20 flex items-center justify-center shrink-0"
              style={{
                background: "linear-gradient(135deg, rgba(200,30,30,0.3) 0%, rgba(200,30,30,0.1) 100%)",
                border: "1px solid rgba(200,30,30,0.45)",
                borderRadius: "20px",
                boxShadow: "0 0 40px rgba(200,30,30,0.3), inset 0 1px 0 rgba(255,255,255,0.08)"
              }}>
              <Icon name="Shield" size={36} className="text-red-400" />
            </div>
            <div>
              <div className="font-oswald font-bold text-white text-2xl uppercase mb-1">Списание задолженностей до 10 000 000 ₽</div>
              <div className="text-white/50 text-sm">Полное списание кредитов, штрафов и задолженностей при выполнении условий контракта.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ STEPS ════════════════════════════════════════ */}
      <section id="steps" className="py-28" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="label-mono mb-3">// Как вступить</div>
          <div className="w-12 h-0.5 mb-6" style={{ background: "linear-gradient(90deg, hsl(0,78%,50%), transparent)" }} />
          <h2 className="font-oswald font-bold text-white uppercase leading-tight mb-16"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", letterSpacing: "-0.02em" }}>
            Этапы поступления
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {STEPS.map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                {/* Circle */}
                <div className="relative w-24 h-24 flex items-center justify-center mb-6 transition-all group-hover:scale-110"
                  style={{
                    background: "linear-gradient(135deg, rgba(37,99,235,0.22) 0%, rgba(37,99,235,0.07) 100%)",
                    border: "2px solid rgba(37,99,235,0.4)",
                    borderRadius: "50%",
                    boxShadow: "0 0 40px rgba(37,99,235,0.22), 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)"
                  }}>
                  <span className="font-oswald font-bold text-2xl" style={{ color: "hsl(210,80%,76%)" }}>{s.n}</span>
                  {/* Connector */}
                  {i < STEPS.length - 1 && (
                    <div className="hidden lg:block absolute left-full top-1/2 -translate-y-1/2 ml-2" style={{ width: "calc(100% - 2.5rem)", height: "1px", background: "linear-gradient(90deg, rgba(37,99,235,0.5), rgba(37,99,235,0.1))" }} />
                  )}
                </div>
                <div className="font-oswald font-semibold text-white uppercase text-sm mb-2">{s.t}</div>
                <div className="text-white/42 text-xs leading-[1.7]">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ══════════════════════════════════════════ */}
      <section id="faq" className="py-28" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="label-mono mb-3">// Частые вопросы</div>
          <div className="w-12 h-0.5 mb-6" style={{ background: "linear-gradient(90deg, hsl(0,78%,50%), transparent)" }} />
          <h2 className="font-oswald font-bold text-white uppercase leading-tight mb-12"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", letterSpacing: "-0.02em" }}>
            Вопросы и ответы
          </h2>
          <div className="max-w-3xl space-y-2">
            {FAQ.map((item, i) => (
              <div key={i} className="vol-card overflow-hidden transition-all">
                <button
                  className="w-full flex items-center justify-between p-6 text-left gap-4"
                  style={{ background: openFaq === i ? "rgba(37,99,235,0.06)" : "transparent" }}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-white text-sm font-medium leading-relaxed">{item.q}</span>
                  <div className="w-9 h-9 flex items-center justify-center shrink-0 transition-all"
                    style={{
                      background: openFaq === i
                        ? "linear-gradient(135deg, rgba(37,99,235,0.3), rgba(37,99,235,0.1))"
                        : "rgba(255,255,255,0.05)",
                      border: openFaq === i ? "1px solid rgba(37,99,235,0.5)" : "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      boxShadow: openFaq === i ? "0 0 14px rgba(37,99,235,0.25)" : "none"
                    }}>
                    <Icon name={openFaq === i ? "Minus" : "Plus"} size={16} className={openFaq === i ? "text-blue-300" : "text-white/50"} />
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6">
                    <div className="pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                      <p className="text-white/52 text-sm leading-[1.8]">{item.a}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONTACTS ═════════════════════════════════════ */}
      <section id="contacts" className="py-28" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

            {/* Left */}
            <div>
              <div className="label-mono mb-3">// Начни сейчас</div>
              <div className="w-12 h-0.5 mb-6" style={{ background: "linear-gradient(90deg, hsl(0,78%,50%), transparent)" }} />
              <h2 className="font-oswald font-bold text-white uppercase leading-tight mb-5"
                style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", letterSpacing: "-0.02em" }}>
                Готов стать<br />частью команды?
              </h2>
              <p className="text-white/48 text-sm leading-[1.8] mb-10 max-w-sm">
                Оставьте заявку — свяжемся в течение 24 часов. Все обращения конфиденциальны.
              </p>

              <div className="space-y-5">
                {[
                  { icon: "Phone", label: "+7 (3022) 55-42-10", sub: "Звонки Пн–Пт 09:00–18:00" },
                  { icon: "Mail",  label: "info@fo.ru",          sub: "Ответ в течение 24 часов" },
                  { icon: "Send",  label: "@FO_ZABAIKALIE",      sub: "Telegram — 24/7" },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-13 h-13 flex items-center justify-center shrink-0"
                      style={{
                        width: "52px", height: "52px",
                        background: "linear-gradient(135deg, rgba(37,99,235,0.22) 0%, rgba(37,99,235,0.07) 100%)",
                        border: "1px solid rgba(37,99,235,0.3)",
                        borderRadius: "12px",
                        boxShadow: "0 0 20px rgba(37,99,235,0.18), inset 0 1px 0 rgba(255,255,255,0.08)"
                      }}>
                      <Icon name={c.icon as AnyIcon} size={22} className="text-blue-300" />
                    </div>
                    <div>
                      <div className="text-white/85 text-sm font-medium">{c.label}</div>
                      <div className="text-white/32 text-xs mt-0.5">{c.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="vol-card p-10">
              <div className="label-mono mb-6">// Форма заявки</div>
              <div className="space-y-5">
                {[
                  { label: "Ваше имя", type: "text", placeholder: "Иванов Иван Иванович" },
                  { label: "Телефон",  type: "tel",  placeholder: "+7 (___) ___-__-__" },
                ].map(f => (
                  <div key={f.label}>
                    <label className="label-mono text-[9px] text-white/35 block mb-2">{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder} className="form-input" />
                  </div>
                ))}
                <div>
                  <label className="label-mono text-[9px] text-white/35 block mb-2">Специальность</label>
                  <select className="form-input" style={{ appearance: "none" }}>
                    <option value="" style={{ background: "#060a12" }}>Выберите направление</option>
                    <option value="osint" style={{ background: "#060a12" }}>OSINT-аналитик</option>
                    <option value="it" style={{ background: "#060a12" }}>IT-специалист</option>
                    <option value="bpla" style={{ background: "#060a12" }}>Оператор БпЛА</option>
                    <option value="logistics" style={{ background: "#060a12" }}>Водитель / Логистика</option>
                  </select>
                </div>
                <button className="btn-red w-full py-4 text-sm mt-2 animate-pulse-red" style={{ borderRadius: "3px" }}>
                  <Icon name="Send" size={15} />
                  Оставить заявку
                </button>
              </div>
              <div className="mt-5 flex items-center gap-2">
                <Icon name="Lock" size={12} className="text-white/22" />
                <span className="label-mono text-[9px] text-white/22">Данные защищены и обрабатываются конфиденциально</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════ */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-[1440px] mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 flex items-center justify-center font-oswald font-bold text-white text-xs"
              style={{ background: "linear-gradient(135deg, hsl(0,78%,48%) 0%, hsl(0,65%,36%) 100%)", borderRadius: "2px", letterSpacing: "0.05em" }}>
              FO
            </div>
            <div>
              <div className="font-oswald font-bold text-white text-xs tracking-widest">FO.RU</div>
              <div className="label-mono text-[8px] text-white/25">OSINT · Служба · Аналитика</div>
            </div>
          </div>
          <div className="label-mono text-[9px] text-white/22 text-center">© 2024 fo.ru — Все права защищены</div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="label-mono text-[9px] text-white/28">Набор открыт</span>
          </div>
        </div>
      </footer>
    </div>
  );
}