import { useState } from "react";
import Icon from "@/components/ui/icon";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyIcon = any;

const HERO_IMG = "https://cdn.poehali.dev/projects/31cf2f8d-8f85-4cf9-801d-b8ed9fa0968a/files/340db8d9-e581-4e16-9d02-76a1a6ba0aeb.jpg";

const NAV_ITEMS = [
  { label: "О подразделении", href: "#about" },
  { label: "Направления", href: "#vacancies" },
  { label: "Требования", href: "#requirements" },
  { label: "Служба и быт", href: "#service" },
  { label: "Льготы", href: "#benefits" },
  { label: "Этапы", href: "#steps" },
  { label: "Вопросы", href: "#faq" },
  { label: "Контакты", href: "#contacts" },
];

const VACANCIES = [
  {
    id: 1,
    title: "OSINT-аналитик",
    specialty: "osint",
    region: "забайкальский",
    level: "опыт",
    icon: "Search",
    description: "Сбор и анализ открытых источников, подготовка аналитических справок, поддержка принятия решений.",
    tags: ["Аналитика", "OSINT", "Отчётность"],
    salary: "от 210 000 ₽",
  },
  {
    id: 2,
    title: "IT-специалист",
    specialty: "it",
    region: "забайкальский",
    level: "опыт",
    icon: "Monitor",
    description: "Администрирование систем, разработка защищённых решений, анализ информационных потоков.",
    tags: ["Администрирование", "Сети", "Безопасность"],
    salary: "от 210 000 ₽",
  },
  {
    id: 3,
    title: "Оператор БпЛА",
    specialty: "bpla",
    region: "забайкальский",
    level: "без опыта",
    icon: "Plane",
    description: "Управление БпЛА, разведка и аэрофотосъёмка, контроль воздушной обстановки.",
    tags: ["БпЛА", "Разведка", "Навигация"],
    salary: "от 210 000 ₽",
  },
  {
    id: 4,
    title: "Водитель",
    specialty: "logistics",
    region: "забайкальский",
    level: "без опыта",
    icon: "Truck",
    description: "Перевозка личного состава и грузов, обеспечение логистики, техническое обслуживание.",
    tags: ["Логистика", "Категория C", "Тыл"],
    salary: "от 210 000 ₽",
  },
  {
    id: 5,
    title: "Специалист по мониторингу СМИ",
    specialty: "osint",
    region: "читинский",
    level: "без опыта",
    icon: "Rss",
    description: "Мониторинг социальных сетей, СМИ и цифровых ресурсов, подготовка сводок.",
    tags: ["Медиа", "Мониторинг", "OSINT"],
    salary: "от 210 000 ₽",
  },
  {
    id: 6,
    title: "Системный администратор",
    specialty: "it",
    region: "читинский",
    level: "опыт",
    icon: "Server",
    description: "Поддержка серверной инфраструктуры, управление сетями, обеспечение защиты данных.",
    tags: ["Linux", "Сети", "Защита данных"],
    salary: "от 210 000 ₽",
  },
];

const SPECIALTY_FILTERS = [
  { value: "all", label: "Все направления" },
  { value: "osint", label: "OSINT / Аналитика" },
  { value: "it", label: "IT / Технологии" },
  { value: "bpla", label: "Операторы БпЛА" },
  { value: "logistics", label: "Логистика" },
];

const REGION_FILTERS = [
  { value: "all", label: "Все регионы" },
  { value: "забайкальский", label: "Забайкальский край" },
  { value: "читинский", label: "Чита" },
];

const LEVEL_FILTERS = [
  { value: "all", label: "Любой опыт" },
  { value: "без опыта", label: "Без опыта" },
  { value: "опыт", label: "С опытом" },
];

const BENEFITS = [
  { icon: "Heart", title: "Медицинское обеспечение", desc: "Полная медицинская страховка и лечение за счёт государства" },
  { icon: "Home", title: "Ипотечное обеспечение", desc: "Льготная ипотека и жилищные субсидии для военнослужащих" },
  { icon: "Zap", title: "Льготы по ЖКХ", desc: "Скидки на коммунальные услуги и жильё" },
  { icon: "CreditCard", title: "Кредитные каникулы", desc: "Налоговые и кредитные каникулы на период службы" },
  { icon: "GraduationCap", title: "Образовательные льготы", desc: "Бесплатное обучение и повышение квалификации" },
  { icon: "Shield", title: "Списание задолженностей", desc: "Списание долгов до 10 000 000 ₽ при выполнении условий" },
  { icon: "Award", title: "Статус ветерана", desc: "Полный пакет льгот ветерана боевых действий" },
  { icon: "Baby", title: "Льготы для семьи", desc: "Поддержка детей, питание в школах, детские сады" },
];

const STEPS = [
  { num: "01", title: "Заявка", desc: "Оставляете заявку на сайте или по телефону" },
  { num: "02", title: "Консультация", desc: "Наш специалист связывается с вами в течение 24 часов" },
  { num: "03", title: "Оформление", desc: "Подготовка документов и прохождение медкомиссии" },
  { num: "04", title: "Прибытие в Читу", desc: "Проезд и размещение за счёт подразделения" },
  { num: "05", title: "Начало службы", desc: "Зачисление в подразделение и получение первых задач" },
];

const FAQ = [
  { q: "Кто может подать заявку?", a: "Граждане РФ мужского пола от 18 до 49 лет, имеющие или не имеющие воинский опыт. Для ряда IT-специальностей — до 55 лет." },
  { q: "Какие требования к кандидатам?", a: "Гражданство РФ, отсутствие серьёзных судимостей, прохождение медицинского освидетельствования. Специфические требования — в зависимости от должности." },
  { q: "Где проходит служба?", a: "Тыловые районы Забайкальского края, преимущественно г. Чита и прилегающие объекты. Без участия в прямых боевых действиях." },
  { q: "Как осуществляется отбор?", a: "После подачи заявки — телефонное интервью, затем встреча с представителем подразделения, медкомиссия и оформление документов." },
  { q: "Когда начинаются выплаты?", a: "Единовременная выплата — в течение первого месяца после зачисления. Ежемесячное денежное довольствие — с первого дня службы." },
];

export default function Index() {
  const [specialty, setSpecialty] = useState("all");
  const [region, setRegion] = useState("all");
  const [level, setLevel] = useState("all");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filtered = VACANCIES.filter((v) => {
    if (specialty !== "all" && v.specialty !== specialty) return false;
    if (region !== "all" && v.region !== region) return false;
    if (level !== "all" && v.level !== level) return false;
    return true;
  });

  return (
    <div className="min-h-screen font-ibm" style={{ background: "hsl(220,25%,6%)" }}>
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/8" style={{ background: "rgba(8,14,22,0.92)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 flex items-center justify-center" style={{ background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.4)", borderRadius: "3px" }}>
              <span className="text-lg">🦉</span>
            </div>
            <div>
              <div className="font-oswald font-bold text-white text-sm tracking-widest leading-none">OSINT</div>
              <div className="font-mono text-[9px] tracking-[0.2em] text-white/40 uppercase leading-none mt-0.5">Служба и аналитика</div>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className="nav-link">{item.label}</a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="#contacts" className="red-btn hidden sm:flex items-center gap-2 px-5 py-2.5 text-sm">
              Оставить заявку
            </a>
            <button className="lg:hidden text-white/70 hover:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/8 px-6 py-4 flex flex-col gap-3" style={{ background: "rgba(8,14,22,0.98)" }}>
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className="nav-link py-1" onClick={() => setMobileMenuOpen(false)}>{item.label}</a>
            ))}
            <a href="#contacts" className="red-btn flex items-center justify-center gap-2 px-5 py-2.5 text-sm mt-2">
              Оставить заявку
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-14 overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="OSINT командный центр" className="w-full h-full object-cover object-center" style={{ filter: "brightness(0.3) saturate(0.5)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(8,14,22,0.95) 35%, rgba(8,14,22,0.5) 100%)" }} />
          <div className="absolute inset-0 grid-bg opacity-60" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 w-full py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">
            <div>
              <div className="section-label mb-4">// Набор 2024 — Открытые позиции</div>
              <h1 className="font-oswald font-bold leading-none text-white mb-5"
                style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", letterSpacing: "-0.02em", textTransform: "uppercase" }}>
                Присоединяйся<br />
                к <span style={{ color: "hsl(0,80%,55%)" }}>OSINT</span>-<br />
                подразделению
              </h1>
              <p className="text-white/60 text-base leading-relaxed max-w-[480px] mb-8">
                Анализ открытых источников и поддержка в интересах безопасности.<br />
                Аналитика, IT, БпЛА, логистика — служба без участия в боевых действиях.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#contacts" className="red-btn px-8 py-3.5 text-sm pulse-red">
                  Оставить заявку
                </a>
                <a href="#vacancies" className="outline-btn px-8 py-3.5 text-sm">
                  Смотреть вакансии
                </a>
              </div>
            </div>

            <div className="data-card p-6">
              <div className="flex items-center gap-2 mb-5">
                <Icon name="TrendingUp" size={14} className="text-blue-400" />
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-blue-400">Выплаты и доходы</span>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Единовременно", value: "2 600 000 ₽" },
                  { label: "Ежемесячно от", value: "210 000 ₽" },
                  { label: "Федеральная выплата", value: "400 000 ₽" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2.5 border-b border-white/6">
                    <span className="text-white/55 text-sm">{item.label}</span>
                    <span className="money-value text-xl">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 p-4 rounded" style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)" }}>
                <div className="text-white/50 text-xs mb-1">Общий доход за первый год —</div>
                <div className="font-oswald font-bold text-3xl" style={{ color: "hsl(0,80%,58%)" }}>от 5 120 000 ₽</div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="font-mono text-[10px] text-white/35 tracking-wider">Выплаты гарантированы государством</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="border-y border-white/8" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="max-w-[1400px] mx-auto px-6 py-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { icon: "DollarSign", val: "> 2 600 000 ₽", label: "Единовременная выплата" },
              { icon: "Clock", val: "24/7", label: "Аналитическая поддержка" },
              { icon: "BarChart2", val: "1000+", label: "Операций и задач" },
              { icon: "Lock", val: "Конфиденциальность", label: "Защита данных и личности" },
              { icon: "MapPin", val: "Тыловые районы", label: "Без боевых действий" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3 px-4 first:pl-0 border-l border-white/8 first:border-l-0">
                <Icon name={s.icon as AnyIcon} size={18} className="text-blue-400 shrink-0" />
                <div>
                  <div className="font-oswald font-semibold text-white text-sm leading-tight">{s.val}</div>
                  <div className="text-white/40 text-[11px] leading-snug">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="section-label mb-4">// О подразделении</div>
              <h2 className="font-oswald font-bold text-white text-4xl uppercase leading-tight mb-5">
                Команда<br /><span style={{ color: "hsl(0,80%,55%)" }}>OSINT</span>
              </h2>
              <p className="text-white/55 leading-relaxed mb-4">
                Каждый специалист становится частью слаженной команды аналитиков, технических специалистов, операторов БпЛА и специалистов обеспечения.
                Новобранцев встречают компетентные командиры и ответственные наставники.
              </p>
              <p className="text-white/70 font-medium mb-8">Сильная команда. Надёжные командиры. Ясные задачи.</p>
              <div className="flex flex-col gap-3">
                {[
                  "Сбор информации из открытых источников",
                  "Мониторинг СМИ, соцсетей и цифровых ресурсов",
                  "Подготовка аналитических справок и отчётов",
                  "Поддержка принятия решений командованием",
                  "Использование легальных OSINT-методов и инструментов",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1 h-1 rounded-full mt-2.5 shrink-0" style={{ background: "hsl(0,80%,55%)" }} />
                    <span className="text-white/65 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "MapPin", title: "Служба в Чите", desc: "Столица Забайкальского края, тыловой район" },
                { icon: "Shield", title: "Без боевых задач", desc: "Аналитическая и техническая служба" },
                { icon: "Users", title: "Наставники", desc: "Опытные командиры для каждого новобранца" },
                { icon: "Utensils", title: "Полное обеспечение", desc: "Питание, снаряжение, техника за счёт подразделения" },
              ].map((card, i) => (
                <div key={i} className="data-card p-5">
                  <Icon name={card.icon as AnyIcon} size={20} className="text-blue-400 mb-3" />
                  <div className="font-oswald font-semibold text-white text-sm uppercase mb-1">{card.title}</div>
                  <div className="text-white/45 text-xs leading-relaxed">{card.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VACANCIES */}
      <section id="vacancies" className="py-20 border-t border-white/8">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="section-label mb-4">// Открытые вакансии</div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <h2 className="font-oswald font-bold text-white text-4xl uppercase leading-tight">
              Требуемые<br />специалисты
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                {SPECIALTY_FILTERS.map((f) => (
                  <button key={f.value} className={`tag-filter ${specialty === f.value ? "active" : ""}`} onClick={() => setSpecialty(f.value)}>
                    {f.label}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {REGION_FILTERS.map((f) => (
                  <button key={f.value} className={`tag-filter ${region === f.value ? "active" : ""}`} onClick={() => setRegion(f.value)}>
                    {f.label}
                  </button>
                ))}
                {LEVEL_FILTERS.map((f) => (
                  <button key={f.value} className={`tag-filter ${level === f.value ? "active" : ""}`} onClick={() => setLevel(f.value)}>
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-white/35 font-mono text-sm">
              По выбранным фильтрам вакансий не найдено
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((v) => (
                <div key={v.id} className="data-card p-6 group hover:border-blue-500/30 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded" style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)" }}>
                      <Icon name={v.icon as AnyIcon} size={18} className="text-blue-400" />
                    </div>
                    <span className="font-mono text-[10px] text-white/35 tracking-wider uppercase">{v.region}</span>
                  </div>
                  <h3 className="font-oswald font-semibold text-white text-lg uppercase mb-2 group-hover:text-blue-300 transition-colors">{v.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-4">{v.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {v.tags.map((tag) => (
                      <span key={tag} className="font-mono text-[10px] px-2 py-0.5 rounded-sm" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.08)" }}>{tag}</span>
                    ))}
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-sm" style={{ background: "rgba(59,130,246,0.08)", color: "rgba(147,197,253,0.8)", border: "1px solid rgba(59,130,246,0.15)" }}>{v.level}</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-white/6">
                    <span className="money-value text-base">{v.salary}</span>
                    <a href="#contacts" className="red-btn text-xs px-4 py-2">Подать заявку</a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* REQUIREMENTS */}
      <section id="requirements" className="py-20 border-t border-white/8">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="section-label mb-4">// Кто может служить</div>
          <h2 className="font-oswald font-bold text-white text-4xl uppercase leading-tight mb-12">Требования к кандидатам</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="data-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <Icon name="CheckCircle" size={20} className="text-green-400" />
                <span className="font-oswald font-semibold text-white text-sm uppercase tracking-wider">Обязательно</span>
              </div>
              <div className="space-y-3">
                {[
                  "Гражданство Российской Федерации",
                  "Возраст от 18 до 49 лет (IT-специальности — до 55)",
                  "Отсутствие серьёзных судимостей",
                  "Прохождение медицинского освидетельствования",
                  "Готовность к переезду в Забайкальский край",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Icon name="Check" size={14} className="text-green-400 mt-0.5 shrink-0" />
                    <span className="text-white/65 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="data-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <Icon name="Star" size={20} className="text-blue-400" />
                <span className="font-oswald font-semibold text-white text-sm uppercase tracking-wider">Преимущество</span>
              </div>
              <div className="space-y-3">
                {[
                  "Опыт работы в IT, аналитике, журналистике",
                  "Знание иностранных языков",
                  "Навыки работы с открытыми источниками",
                  "Опыт управления БпЛА или служба в ВС",
                  "Водительское удостоверение категории B/C",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Icon name="ChevronRight" size={14} className="text-blue-400 mt-0.5 shrink-0" />
                    <span className="text-white/65 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section id="benefits" className="py-20 border-t border-white/8">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="section-label mb-4">// Социальный пакет</div>
          <h2 className="font-oswald font-bold text-white text-4xl uppercase leading-tight mb-12">Льготы и гарантии</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BENEFITS.map((b, i) => (
              <div key={i} className="data-card p-5 hover:border-blue-500/25 transition-all duration-300">
                <div className="w-9 h-9 flex items-center justify-center rounded mb-4" style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.15)" }}>
                  <Icon name={b.icon as AnyIcon} size={16} className="text-blue-400" />
                </div>
                <div className="font-oswald font-semibold text-white text-sm uppercase mb-2">{b.title}</div>
                <div className="text-white/45 text-xs leading-relaxed">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section id="steps" className="py-20 border-t border-white/8">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="section-label mb-4">// Как вступить</div>
          <h2 className="font-oswald font-bold text-white text-4xl uppercase leading-tight mb-12">Этапы поступления</h2>
          <div className="relative">
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent 5%, rgba(59,130,246,0.3) 20%, rgba(59,130,246,0.3) 80%, transparent 95%)" }} />
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {STEPS.map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="relative z-10 w-16 h-16 flex items-center justify-center rounded mb-4"
                    style={{ background: "hsl(220,25%,6%)", border: "2px solid rgba(59,130,246,0.4)" }}>
                    <span className="font-oswald font-bold text-blue-400 text-lg">{step.num}</span>
                  </div>
                  <div className="font-oswald font-semibold text-white uppercase text-sm mb-2">{step.title}</div>
                  <div className="text-white/45 text-xs leading-relaxed">{step.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 border-t border-white/8">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="section-label mb-4">// Частые вопросы</div>
          <h2 className="font-oswald font-bold text-white text-4xl uppercase leading-tight mb-12">Вопросы и ответы</h2>
          <div className="max-w-3xl space-y-2">
            {FAQ.map((item, i) => (
              <div key={i} className="data-card overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-5 text-left transition-colors"
                  style={{ background: openFaq === i ? "rgba(255,255,255,0.03)" : "transparent" }}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-ibm font-medium text-white text-sm">{item.q}</span>
                  <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={16} className="text-white/40 shrink-0 ml-4" />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <div className="pt-3 border-t border-white/8">
                      <p className="text-white/55 text-sm leading-relaxed">{item.a}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contacts" className="py-20 border-t border-white/8">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="section-label mb-4">// Подай заявку сейчас</div>
              <h2 className="font-oswald font-bold text-white text-4xl uppercase leading-tight mb-4">
                Готов стать<br />частью команды?
              </h2>
              <p className="text-white/50 text-sm leading-relaxed mb-8">
                Оставьте заявку — мы свяжемся с вами в течение 24 часов и ответим на все вопросы. Все обращения конфиденциальны и обрабатываются в защищённом контуре.
              </p>
              <div className="space-y-4">
                {[
                  { icon: "Phone", label: "+7 (3022) 55-42-10", sub: "Звонки Пн–Пт 09:00–18:00" },
                  { icon: "Mail", label: "info@osint-sluzba.ru", sub: "Ответ в течение 24 часов" },
                  { icon: "Send", label: "@OSINT_ZABAIKALIE", sub: "Telegram — работаем 24/7" },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-9 h-9 flex items-center justify-center rounded shrink-0" style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)" }}>
                      <Icon name={c.icon as AnyIcon} size={15} className="text-blue-400" />
                    </div>
                    <div>
                      <div className="text-white/85 text-sm font-medium">{c.label}</div>
                      <div className="text-white/35 text-xs">{c.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="data-card p-8">
              <div className="space-y-4">
                <div>
                  <label className="font-mono text-[10px] text-white/40 tracking-wider uppercase block mb-2">Ваше имя</label>
                  <input type="text" placeholder="Иванов Иван Иванович"
                    className="w-full px-4 py-3 text-sm text-white/85 placeholder-white/25 outline-none transition-colors"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "3px" }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(59,130,246,0.5)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] text-white/40 tracking-wider uppercase block mb-2">Телефон</label>
                  <input type="tel" placeholder="+7 (___) ___-__-__"
                    className="w-full px-4 py-3 text-sm text-white/85 placeholder-white/25 outline-none transition-colors"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "3px" }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(59,130,246,0.5)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] text-white/40 tracking-wider uppercase block mb-2">Интересующая специальность</label>
                  <select className="w-full px-4 py-3 text-sm text-white/85 outline-none"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "3px", color: "rgba(255,255,255,0.85)" }}>
                    <option value="" style={{ background: "#0d1117" }}>Выберите направление</option>
                    <option value="osint" style={{ background: "#0d1117" }}>OSINT-аналитик</option>
                    <option value="it" style={{ background: "#0d1117" }}>IT-специалист</option>
                    <option value="bpla" style={{ background: "#0d1117" }}>Оператор БпЛА</option>
                    <option value="logistics" style={{ background: "#0d1117" }}>Водитель / Логистика</option>
                  </select>
                </div>
                <button className="red-btn w-full py-4 text-sm mt-2 flex items-center justify-center gap-2">
                  <Icon name="Send" size={15} />
                  Оставить заявку
                </button>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Icon name="Lock" size={12} className="text-white/25" />
                <span className="font-mono text-[10px] text-white/25 tracking-wider">Все обращения конфиденциальны и защищены</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/8 py-8">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="text-base">🦉</span>
            <div>
              <div className="font-oswald font-bold text-white text-xs tracking-widest">OSINT</div>
              <div className="font-mono text-[9px] tracking-[0.15em] text-white/30 uppercase">Служба и аналитика</div>
            </div>
          </div>
          <div className="font-mono text-[10px] text-white/25 text-center">
            © 2024 OSINT — Служба и аналитика. Все права защищены.
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="font-mono text-[10px] text-white/30">Набор открыт</span>
          </div>
        </div>
      </footer>
    </div>
  );
}