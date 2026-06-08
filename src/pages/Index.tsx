import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyIcon = any;

const HERO_IMG =
  "https://cdn.poehali.dev/projects/31cf2f8d-8f85-4cf9-801d-b8ed9fa0968a/files/a267d7bd-fe76-4959-acd1-d2ff2683158f.jpg";

/* ── LOGO S ─────────────────────────────────────────────── */
const LogoS = ({ size = 36 }: { size?: number }) => (
  <div style={{
    width: size, height: size,
    display: "flex", alignItems: "center", justifyContent: "center",
    background: "linear-gradient(140deg, #CC2200 0%, #6b1000 100%)",
    borderRadius: "3px",
    boxShadow: "0 0 20px rgba(204,34,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12)",
    fontFamily: "'Russo One', sans-serif",
    fontSize: size * 0.52,
    color: "#fff",
    letterSpacing: "-0.03em",
    fontWeight: 900,
  }}>
    S
  </div>
);

/* ── ICON BOX — строгий белый ───────────────────────────── */
function IBox({ icon, size = 22, boxSize = 48, radius = 10 }: { icon: string; size?: number; boxSize?: number; radius?: number }) {
  return (
    <div className="ibox shrink-0" style={{
      width: boxSize, height: boxSize,
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: radius,
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 16px rgba(0,0,0,0.4)"
    }}>
      <Icon name={icon as AnyIcon} size={size} style={{ color: "rgba(255,255,255,0.82)" }} />
    </div>
  );
}

/* ── SECTION REVEAL HOOK ────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ── DATA ───────────────────────────────────────────────── */
const NAV = [
  { label: "О подразделении", href: "#about" },
  { label: "Вакансии",        href: "#vacancies" },
  { label: "Требования",      href: "#requirements" },
  { label: "Льготы",          href: "#benefits" },
  { label: "Этапы",           href: "#steps" },
  { label: "FAQ",             href: "#faq" },
  { label: "Контакты",        href: "#contacts" },
];

const PAYMENTS = [
  { label: "Единовременно",    value: "2 600 000 ₽", icon: "Banknote" },
  { label: "Ежемесячно от",   value: "210 000 ₽",   icon: "CalendarDays" },
  { label: "Фед. выплата",    value: "400 000 ₽",   icon: "Landmark" },
];

const STATS = [
  { icon: "Banknote",    val: "> 2,6 млн ₽",     sub: "Единовременная выплата" },
  { icon: "Clock",       val: "24 / 7",           sub: "Аналитическая поддержка" },
  { icon: "BarChart3",   val: "1000+",            sub: "Выполненных задач" },
  { icon: "ShieldCheck", val: "Конфиденциально",  sub: "Полная защита личности" },
  { icon: "MapPin",      val: "Тыловые районы",   sub: "Без боевых действий" },
];

const VACANCIES = [
  { id:1, specialty:"osint",     level:"опыт",      icon:"Search",  title:"OSINT-аналитик",
    desc:"Поиск и верификация данных в открытых источниках. Подготовка аналитических докладов для командования. Работа с цифровыми следами и профилями.", tags:["Аналитика","OSINT","Отчётность"] },
  { id:2, specialty:"it",        level:"опыт",      icon:"Monitor", title:"IT-специалист",
    desc:"Администрирование защищённых систем, настройка сетевой инфраструктуры, обеспечение информационной безопасности подразделения.", tags:["Сети","Безопасность","Системы"] },
  { id:3, specialty:"bpla",      level:"без опыта", icon:"Plane",   title:"Оператор БпЛА",
    desc:"Управление беспилотными летательными аппаратами, воздушная разведка, аэрофотосъёмка объектов. Обучение с нуля.", tags:["БпЛА","Разведка","Навигация"] },
  { id:4, specialty:"logistics", level:"без опыта", icon:"Truck",   title:"Водитель-логист",
    desc:"Обеспечение перемещения личного состава и снаряжения. Техническое обслуживание автопарка. Работа в тыловом обеспечении.", tags:["Логистика","Кат. C","Тыл"] },
  { id:5, specialty:"osint",     level:"без опыта", icon:"Rss",     title:"Мониторинг СМИ",
    desc:"Непрерывный мониторинг открытых СМИ, Telegram-каналов и социальных сетей. Формирование информационных дайджестов.", tags:["Медиа","Мониторинг","OSINT"] },
  { id:6, specialty:"it",        level:"опыт",      icon:"Server",  title:"Системный администратор",
    desc:"Поддержка серверного оборудования, управление VPN и защищёнными каналами связи, резервное копирование данных.", tags:["Linux","Сети","Защита"] },
];

const SPEC_FILTERS  = [{v:"all",l:"Все направления"},{v:"osint",l:"OSINT"},{v:"it",l:"IT"},{v:"bpla",l:"БпЛА"},{v:"logistics",l:"Логистика"}];
const LEVEL_FILTERS = [{v:"all",l:"Любой опыт"},{v:"без опыта",l:"Без опыта"},{v:"опыт",l:"С опытом"}];

const TEAM_ROLES = [
  { icon:"Search",     title:"Аналитики OSINT",     desc:"Специалисты по разведке открытых источников. Работают с цифровыми данными, картами и профилями объектов." },
  { icon:"Monitor",    title:"IT-инженеры",          desc:"Поддерживают инфраструктуру, обеспечивают безопасность каналов связи и защиту данных подразделения." },
  { icon:"Plane",      title:"Операторы БпЛА",       desc:"Управляют беспилотниками для воздушной разведки и аэрофотосъёмки в интересах подразделения." },
  { icon:"Truck",      title:"Специалисты тыла",     desc:"Обеспечивают логистику, снабжение и техническое обслуживание. Основа устойчивой работы команды." },
];

const BENEFITS = [
  { icon:"HeartPulse",     title:"Медицинское обеспечение",  desc:"Полная страховка и лечение за счёт государства" },
  { icon:"Home",           title:"Ипотечное обеспечение",    desc:"Льготная ипотека и жилищные субсидии" },
  { icon:"Zap",            title:"Льготы по ЖКХ",            desc:"Скидки на коммунальные услуги и жильё" },
  { icon:"CreditCard",     title:"Кредитные каникулы",       desc:"Налоговые и кредитные каникулы на период службы" },
  { icon:"GraduationCap",  title:"Образование",              desc:"Бесплатное обучение и повышение квалификации" },
  { icon:"ShieldCheck",    title:"Списание долгов",          desc:"Списание задолженностей до 10 000 000 ₽" },
  { icon:"Award",          title:"Статус ветерана",          desc:"Полный льготный пакет ветерана боевых действий" },
  { icon:"Baby",           title:"Льготы семье",             desc:"Поддержка детей, питание в школах, детсады" },
];

const STEPS = [
  { n:"01", t:"Заявка",       d:"Оставляете заявку онлайн или по телефону",    icon:"Send" },
  { n:"02", t:"Консультация", d:"Связываемся с вами в течение 24 часов",       icon:"Phone" },
  { n:"03", t:"Оформление",   d:"Документы и медицинское освидетельствование", icon:"FileCheck" },
  { n:"04", t:"Прибытие",     d:"Проезд до места формирования за наш счёт",    icon:"MapPin" },
  { n:"05", t:"Служба",       d:"Зачисление в подразделение и начало работы",  icon:"ShieldCheck" },
];

const FAQ = [
  { q:"Кто может подать заявку?",        a:"Граждане РФ от 18 до 49 лет. Для IT-специальностей — до 55 лет. Воинский опыт необязателен." },
  { q:"Какие требования к кандидатам?",  a:"Гражданство РФ, отсутствие серьёзных судимостей, прохождение медкомиссии. Специфика — в зависимости от должности." },
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

  const filtered = VACANCIES.filter(v =>
    (spec  === "all" || v.specialty === spec) &&
    (level === "all" || v.level     === level)
  );

  const aboutRef    = useReveal();
  const vacRef      = useReveal();
  const reqRef      = useReveal();
  const benRef      = useReveal();
  const stepsRef    = useReveal();
  const faqRef      = useReveal();
  const contactsRef = useReveal();

  return (
    <div className="min-h-screen font-exo" style={{ background: "var(--bg)" }}>

      {/* ══ NAV ═════════════════════════════════════════ */}
      <nav className="fixed top-0 inset-x-0 z-50 h-14 flex items-center"
        style={{ background: "rgba(8,10,16,0.96)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-[1440px] w-full mx-auto px-6 flex items-center justify-between">

          <a href="#" className="flex items-center gap-3 shrink-0">
            <LogoS size={34} />
            <div>
              <div className="font-russo text-[13px] tracking-[0.16em] text-white leading-none">OSINT-РЭР</div>
              <div className="font-stm text-[8px] tracking-[0.2em] text-white/30 uppercase leading-none mt-0.5">Служба · Аналитика</div>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-6">
            {NAV.map(n => <a key={n.href} href={n.href} className="nav-link">{n.label}</a>)}
          </div>

          <div className="flex items-center gap-3">
            <a href="#contacts" className="btn-red hidden sm:flex px-5 py-2.5 text-xs animate-pulse-red" style={{ borderRadius: "2px" }}>
              <Icon name="Send" size={13} />
              Оставить заявку
            </a>
            <button className="lg:hidden text-white/50 hover:text-white transition-colors" onClick={() => setMenu(!menu)}>
              <Icon name={menu ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {menu && (
          <div className="absolute top-14 inset-x-0 px-6 py-5 flex flex-col gap-4 z-50"
            style={{ background: "rgba(8,10,16,0.99)", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            {NAV.map(n => <a key={n.href} href={n.href} className="nav-link py-1" onClick={() => setMenu(false)}>{n.label}</a>)}
            <a href="#contacts" className="btn-red py-3 text-xs" style={{ borderRadius: "2px" }}>Оставить заявку</a>
          </div>
        )}
      </nav>

      {/* ══ HERO ════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-14">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="OSINT-РЭР" className="w-full h-full object-cover" style={{ filter: "brightness(0.22) saturate(0.35)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(110deg, rgba(8,10,16,0.98) 30%, rgba(8,10,16,0.6) 65%, rgba(8,10,16,0.88) 100%)" }} />
          <div className="absolute inset-0 grid-bg opacity-60" />
          <div className="scan-beam" />
        </div>

        <div className="relative max-w-[1440px] w-full mx-auto px-6 py-24">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-14 items-start">

            {/* LEFT */}
            <div>
              <div className="animate-fade-up d0 inline-flex items-center gap-2.5 mb-7 px-4 py-2"
                style={{ border: "1px solid rgba(255,255,255,0.12)", borderRadius: "2px", background: "rgba(255,255,255,0.03)" }}>
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-blink" />
                <span className="font-stm text-[10px] tracking-[0.25em] text-white/40">НАБОР ОТКРЫТ · 2024</span>
              </div>

              <h1 className="animate-fade-up d1 font-russo text-white leading-[0.88] mb-6"
                style={{ fontSize: "clamp(3.2rem, 7.5vw, 6.2rem)", textTransform: "uppercase", letterSpacing: "-0.025em" }}>
                OSINT-<span className="text-white-shimmer">РЭР</span><br />
                <span style={{ color: "#CC2200" }}>Служба</span><br />
                <span style={{ fontSize: "55%", color: "rgba(255,255,255,0.55)", fontFamily: "'Exo 2', sans-serif", fontWeight: 300, letterSpacing: "0.02em" }}>и аналитика</span>
              </h1>

              <p className="animate-fade-up d2 text-white/50 text-base leading-relaxed max-w-[480px] mb-3">
                Анализ открытых источников, IT, операторы БпЛА, логистика.
              </p>
              <p className="animate-fade-up d3 font-stm text-sm mb-10 tracking-wider" style={{ color: "rgba(255,255,255,0.28)" }}>
                БЕЗ УЧАСТИЯ В БОЕВЫХ ДЕЙСТВИЯХ
              </p>

              <div className="animate-fade-up d4 flex flex-wrap gap-4">
                <a href="#contacts" className="btn-red px-10 py-4 text-sm animate-pulse-red" style={{ borderRadius: "2px" }}>
                  <Icon name="Send" size={16} />
                  Оставить заявку
                </a>
                <a href="#vacancies" className="btn-ghost px-10 py-4 text-sm" style={{ borderRadius: "2px" }}>
                  <Icon name="ChevronDown" size={16} />
                  Вакансии
                </a>
              </div>

              <div className="animate-fade-up d5 mt-14 grid grid-cols-3 gap-6 max-w-[440px]">
                {[
                  { val:"5 120 000 ₽", sub:"Доход за 1-й год" },
                  { val:"210 000 ₽",   sub:"В месяц" },
                  { val:"1000+",        sub:"Задач выполнено" },
                ].map((s, i) => (
                  <div key={i} className="animate-fade-up" style={{ animationDelay: `${0.5 + i * 0.1}s`, opacity: 0 }}>
                    <div className="font-russo text-white leading-none mb-1" style={{ fontSize: "1.5rem" }}>{s.val}</div>
                    <div className="font-stm text-[9px] text-white/28 tracking-widest">{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Payment card */}
            <div className="animate-fade-right d3 animate-float">
              <div style={{ filter: "drop-shadow(0 0 40px rgba(204,34,0,0.15)) drop-shadow(0 40px 80px rgba(0,0,0,0.7))" }}>
                <div className="red-card" style={{ borderRadius: "3px" }}>
                  <div style={{ background: "linear-gradient(155deg, rgba(10,12,20,0.99), rgba(7,9,16,1))", padding: "2rem" }}>

                    <div className="flex items-center justify-between mb-7">
                      <div className="flex items-center gap-2.5">
                        <LogoS size={22} />
                        <span className="font-stm text-[10px] tracking-[0.22em] text-white/35">ВЫПЛАТЫ И ДОХОДЫ</span>
                      </div>
                      <div className="flex gap-1.5">
                        {["#f0f0f0","#003791","#CC2200"].map((c,i) => <div key={i} className="w-2 h-2 rounded-full" style={{ background: c }} />)}
                      </div>
                    </div>

                    <div className="space-y-3 mb-7">
                      {PAYMENTS.map((p, i) => (
                        <div key={i} className="flex justify-between items-center py-3 animate-fade-up"
                          style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", animationDelay: `${0.3 + i*0.1}s`, opacity: 0 }}>
                          <div className="flex items-center gap-2.5">
                            <IBox icon={p.icon} size={14} boxSize={30} radius={6} />
                            <span className="font-exo text-sm text-white/45">{p.label}</span>
                          </div>
                          <span className="money text-xl">{p.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-5 mb-5" style={{ background: "rgba(204,34,0,0.1)", border: "1px solid rgba(204,34,0,0.22)", borderRadius: "2px" }}>
                      <div className="font-stm text-[9px] text-white/30 tracking-widest mb-1.5">ОБЩИЙ ДОХОД ЗА ПЕРВЫЙ ГОД</div>
                      <div className="money-red leading-none" style={{ fontSize: "2.4rem" }}>от 5 120 000 ₽</div>
                    </div>

                    <div className="flex items-center gap-3 p-3 mb-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "2px" }}>
                      <Icon name="Shield" size={13} style={{ color: "rgba(255,255,255,0.4)" }} />
                      <span className="font-stm text-[9px] text-white/30 tracking-wider">Выплаты гарантированы Государством РФ</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {[{ icon:"HeartPulse", label:"Медицина" },{ icon:"Home", label:"Ипотека" },{ icon:"GraduationCap", label:"Льготы" }].map((q, i) => (
                        <div key={i} className="flex flex-col items-center gap-1.5 p-3 cursor-pointer transition-all hover:scale-105"
                          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "2px" }}>
                          <IBox icon={q.icon} size={14} boxSize={30} radius={6} />
                          <span className="font-stm text-[9px] text-white/30">{q.label}</span>
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

      {/* ══ STATS BAR ═══════════════════════════════════ */}
      <div style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-[1440px] mx-auto px-6 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {STATS.map((s, i) => (
              <div key={i} className="stat-card flex items-center gap-3.5 px-5 py-3 animate-fade-up"
                style={{ animationDelay: `${i * 0.08}s`, opacity: 0, borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                <IBox icon={s.icon} size={18} boxSize={42} radius={10} />
                <div>
                  <div className="font-russo text-white text-sm leading-tight">{s.val}</div>
                  <div className="font-exo text-white/35 text-[11px]">{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ ABOUT ═══════════════════════════════════════ */}
      <section id="about" className="py-28">
        <div className="max-w-[1440px] mx-auto px-6">
          <div ref={aboutRef} className="section-entry grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <div className="label-mono mb-3">// О подразделении</div>
              <div className="accent-line" />
              <h2 className="font-russo text-white uppercase leading-tight mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                Команда <span style={{ color: "#CC2200" }}>OSINT-РЭР</span>
              </h2>
              <p className="font-exo text-white/52 leading-[1.9] mb-5 text-[0.93rem]">
                Каждый специалист становится частью слаженной команды аналитиков, технических инженеров, операторов и специалистов тылового обеспечения. Новобранцев встречают опытные командиры и закреплённые наставники.
              </p>
              <p className="font-russo text-sm text-white/25 tracking-widest mb-10">
                СИЛЬНАЯ КОМАНДА · НАДЁЖНЫЕ КОМАНДИРЫ · ЯСНЫЕ ЗАДАЧИ
              </p>
              <div className="space-y-3.5">
                {["Сбор и верификация данных из открытых источников","Мониторинг СМИ, Telegram-каналов и социальных сетей","Подготовка аналитических докладов и отчётов","Поддержка принятия решений командованием","Использование легальных OSINT-методов и инструментов"].map((t, i) => (
                  <div key={i} className="flex items-start gap-3 animate-fade-left" style={{ animationDelay: `${0.1 + i * 0.08}s`, opacity: 0 }}>
                    <div className="ibox mt-0.5 shrink-0" style={{ width: 20, height: 20, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 5 }}>
                      <Icon name="Check" size={11} style={{ color: "rgba(255,255,255,0.6)" }} />
                    </div>
                    <span className="font-exo text-white/58 text-sm leading-relaxed">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {TEAM_ROLES.map((c, i) => (
                <div key={i} className="vol-card p-6 animate-scale-in" style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}>
                  <IBox icon={c.icon} size={22} boxSize={52} radius={12} />
                  <div className="font-russo text-white text-sm uppercase mt-5 mb-2">{c.title}</div>
                  <div className="font-exo text-white/38 text-xs leading-[1.75]">{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ VACANCIES ═══════════════════════════════════ */}
      <section id="vacancies" className="py-28" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-[1440px] mx-auto px-6">
          <div ref={vacRef} className="section-entry">
            <div className="label-mono mb-3">// Открытые вакансии</div>
            <div className="accent-line" />
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
              <h2 className="font-russo text-white uppercase leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                Требуемые<br /><span style={{ color: "#CC2200" }}>специалисты</span>
              </h2>
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-2">
                  {SPEC_FILTERS.map(f => <button key={f.v} className={`tag-filter ${spec===f.v?"active":""}`} onClick={() => setSpec(f.v)}>{f.l}</button>)}
                </div>
                <div className="flex flex-wrap gap-2">
                  {LEVEL_FILTERS.map(f => <button key={f.v} className={`tag-filter ${level===f.v?"active":""}`} onClick={() => setLevel(f.v)}>{f.l}</button>)}
                </div>
              </div>
            </div>

            {filtered.length === 0
              ? <div className="text-center py-24 font-stm text-white/25 tracking-widest">Вакансий по выбранным фильтрам не найдено</div>
              : <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filtered.map((v, vi) => (
                    <div key={v.id} className="vol-card p-7 group animate-fade-up" style={{ animationDelay: `${vi * 0.08}s`, opacity: 0 }}>
                      <div className="flex items-start justify-between mb-5">
                        <IBox icon={v.icon} size={24} boxSize={56} radius={12} />
                        <span className="font-stm text-[9px] text-white/22 tracking-widest uppercase">{v.level}</span>
                      </div>
                      <h3 className="font-russo text-white text-lg uppercase mb-3 group-hover:text-white/80 transition-colors">{v.title}</h3>
                      <p className="font-exo text-white/45 text-sm leading-[1.8] mb-5">{v.desc}</p>
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {v.tags.map(tag => <span key={tag} className="font-stm text-[9px] px-2.5 py-1" style={{ background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.32)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "2px" }}>{tag}</span>)}
                      </div>
                      <div className="flex items-center justify-between pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                        <div>
                          <div className="money text-xl">от 210 000 ₽</div>
                          <div className="font-stm text-[9px] text-white/25 mt-0.5">в месяц</div>
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

      {/* ══ REQUIREMENTS ════════════════════════════════ */}
      <section id="requirements" className="py-28" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-[1440px] mx-auto px-6">
          <div ref={reqRef} className="section-entry">
            <div className="label-mono mb-3">// Кто может служить</div>
            <div className="accent-line" />
            <h2 className="font-russo text-white uppercase leading-tight mb-14" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Требования</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { icon:"CheckCircle", title:"Обязательно", chk:"Check",
                  items:["Гражданство Российской Федерации","Возраст от 18 до 49 лет (IT — до 55)","Отсутствие серьёзных судимостей","Медицинское освидетельствование","Готовность к переезду"] },
                { icon:"Star", title:"Преимущество", chk:"ChevronRight",
                  items:["Опыт в IT, аналитике, журналистике","Знание иностранных языков","Навыки работы с OSINT-инструментами","Опыт управления БпЛА или служба в ВС","Водительское удостоверение B/C"] },
              ].map((card, ci) => (
                <div key={ci} className="vol-card p-8 animate-fade-up" style={{ animationDelay: `${ci * 0.15}s`, opacity: 0 }}>
                  <div className="flex items-center gap-4 mb-8">
                    <IBox icon={card.icon} size={26} boxSize={56} radius={12} />
                    <span className="font-russo text-white text-lg uppercase tracking-wider">{card.title}</span>
                  </div>
                  <div className="space-y-4">
                    {card.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 animate-fade-left" style={{ animationDelay: `${0.1 + i * 0.07}s`, opacity: 0 }}>
                        <div className="ibox mt-0.5 shrink-0" style={{ width: 22, height: 22, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 5 }}>
                          <Icon name={card.chk as AnyIcon} size={12} style={{ color: "rgba(255,255,255,0.55)" }} />
                        </div>
                        <span className="font-exo text-white/58 text-sm leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ BENEFITS ════════════════════════════════════ */}
      <section id="benefits" className="py-28" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-[1440px] mx-auto px-6">
          <div ref={benRef} className="section-entry">
            <div className="label-mono mb-3">// Социальный пакет</div>
            <div className="accent-line" />
            <h2 className="font-russo text-white uppercase leading-tight mb-14" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Льготы и гарантии</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {BENEFITS.map((b, i) => (
                <div key={i} className="vol-card p-6 group cursor-default animate-scale-in" style={{ animationDelay: `${i * 0.07}s`, opacity: 0 }}>
                  <div className="mb-5 transition-transform group-hover:scale-105">
                    <IBox icon={b.icon} size={24} boxSize={56} radius={14} />
                  </div>
                  <div className="font-russo text-white text-sm uppercase mb-2 leading-snug">{b.title}</div>
                  <div className="font-exo text-white/40 text-sm leading-[1.7]">{b.desc}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 vol-card p-8 flex flex-col sm:flex-row items-center gap-8" style={{ borderColor: "rgba(204,34,0,0.2)", background: "rgba(204,34,0,0.04)" }}>
              <IBox icon="ShieldCheck" size={32} boxSize={72} radius={18} />
              <div>
                <div className="font-russo text-white text-2xl uppercase mb-2">
                  Списание задолженностей до <span className="money-red">10 000 000 ₽</span>
                </div>
                <div className="font-exo text-white/45 text-sm">Полное списание кредитов, штрафов и задолженностей при выполнении условий контракта.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ STEPS ═══════════════════════════════════════ */}
      <section id="steps" className="py-28" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-[1440px] mx-auto px-6">
          <div ref={stepsRef} className="section-entry">
            <div className="label-mono mb-3">// Как вступить</div>
            <div className="accent-line" />
            <h2 className="font-russo text-white uppercase leading-tight mb-16" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Этапы поступления</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5">
              {STEPS.map((s, i) => (
                <div key={i} className="flex flex-col items-center text-center group animate-fade-up" style={{ animationDelay: `${i * 0.12}s`, opacity: 0 }}>
                  <div className="relative mb-5">
                    <div className="relative w-24 h-24 flex flex-col items-center justify-center gap-1 transition-all group-hover:scale-105"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "50%", boxShadow: "0 0 40px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.08)" }}>
                      <Icon name={s.icon as AnyIcon} size={22} style={{ color: "rgba(255,255,255,0.65)" }} />
                      <span className="step-num text-sm">{s.n}</span>
                    </div>
                  </div>
                  <div className="font-russo text-white uppercase text-sm mb-2">{s.t}</div>
                  <div className="font-exo text-white/38 text-xs leading-[1.75]">{s.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ═════════════════════════════════════════ */}
      <section id="faq" className="py-28" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-[1440px] mx-auto px-6">
          <div ref={faqRef} className="section-entry">
            <div className="label-mono mb-3">// Частые вопросы</div>
            <div className="accent-line" />
            <h2 className="font-russo text-white uppercase leading-tight mb-12" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Вопросы и ответы</h2>
            <div className="max-w-3xl space-y-1.5">
              {FAQ.map((item, i) => (
                <div key={i} className={`vol-card overflow-hidden faq-item ${openFaq===i?"open":""} animate-fade-up`} style={{ animationDelay: `${i * 0.07}s`, opacity: 0 }}>
                  <button className="w-full flex items-center justify-between p-6 text-left gap-4"
                    style={{ background: openFaq===i ? "rgba(255,255,255,0.025)" : "transparent" }}
                    onClick={() => setOpenFaq(openFaq===i ? null : i)}>
                    <span className="font-exo text-white font-semibold text-sm leading-relaxed">{item.q}</span>
                    <div className="ibox shrink-0" style={{ width: 34, height: 34, background: openFaq===i ? "rgba(204,34,0,0.15)" : "rgba(255,255,255,0.04)", border: openFaq===i ? "1px solid rgba(204,34,0,0.4)" : "1px solid rgba(255,255,255,0.09)", borderRadius: "8px" }}>
                      <Icon name={openFaq===i ? "Minus" : "Plus"} size={15} style={{ color: openFaq===i ? "#CC2200" : "rgba(255,255,255,0.4)" }} />
                    </div>
                  </button>
                  {openFaq===i && (
                    <div className="px-6 pb-6 animate-fade-in" style={{ opacity: 0 }}>
                      <div className="pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                        <p className="font-exo text-white/50 text-sm leading-[1.9]">{item.a}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CONTACTS ════════════════════════════════════ */}
      <section id="contacts" className="py-28" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-[1440px] mx-auto px-6">
          <div ref={contactsRef} className="section-entry grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <div className="label-mono mb-3">// Начни сейчас</div>
              <div className="accent-line" />
              <h2 className="font-russo text-white uppercase leading-tight mb-5" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                Готов стать<br /><span style={{ color: "#CC2200" }}>частью команды?</span>
              </h2>
              <p className="font-exo text-white/42 text-sm leading-[1.9] mb-10 max-w-sm">
                Оставьте заявку — свяжемся в течение 24 часов. Все обращения конфиденциальны.
              </p>
              <div className="space-y-5">
                {[
                  { icon:"Phone", label:"+7 (3022) 55-42-10", sub:"Звонки Пн–Пт 09:00–18:00" },
                  { icon:"Mail",  label:"info@osint-rer.ru",  sub:"Ответ в течение 24 часов" },
                  { icon:"Send",  label:"@OSINT_RER",         sub:"Telegram — 24/7" },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-4 animate-fade-left" style={{ animationDelay: `${0.1 + i * 0.1}s`, opacity: 0 }}>
                    <IBox icon={c.icon} size={20} boxSize={48} radius={10} />
                    <div>
                      <div className="font-exo text-white/82 text-sm font-semibold">{c.label}</div>
                      <div className="font-stm text-[9px] text-white/28 tracking-wider mt-0.5">{c.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="vol-card p-10 animate-fade-right" style={{ opacity: 0, animationDelay: "0.2s" }}>
              <div className="flex items-center gap-3 mb-7">
                <LogoS size={24} />
                <span className="font-stm text-[10px] tracking-[0.22em] text-white/30">ФОРМА ЗАЯВКИ</span>
              </div>
              <div className="space-y-5">
                {[{label:"Ваше имя",type:"text",placeholder:"Иванов Иван Иванович"},{label:"Телефон",type:"tel",placeholder:"+7 (___) ___-__-__"}].map(f => (
                  <div key={f.label}>
                    <label className="font-stm text-[9px] text-white/28 block mb-2 tracking-widest">{f.label.toUpperCase()}</label>
                    <input type={f.type} placeholder={f.placeholder} className="form-input" />
                  </div>
                ))}
                <div>
                  <label className="font-stm text-[9px] text-white/28 block mb-2 tracking-widest">СПЕЦИАЛЬНОСТЬ</label>
                  <select className="form-input" style={{ appearance: "none" }}>
                    <option value="" style={{ background:"#080a10" }}>Выберите направление</option>
                    <option value="osint" style={{ background:"#080a10" }}>OSINT-аналитик</option>
                    <option value="it" style={{ background:"#080a10" }}>IT-специалист</option>
                    <option value="bpla" style={{ background:"#080a10" }}>Оператор БпЛА</option>
                    <option value="logistics" style={{ background:"#080a10" }}>Водитель / Логистика</option>
                  </select>
                </div>
                <button className="btn-red w-full py-4 text-sm mt-2 animate-pulse-red" style={{ borderRadius: "2px" }}>
                  <Icon name="Send" size={16} />
                  Оставить заявку
                </button>
              </div>
              <div className="mt-5 flex items-center gap-2">
                <Icon name="Lock" size={11} style={{ color: "rgba(255,255,255,0.18)" }} />
                <span className="font-stm text-[9px] text-white/18 tracking-wider">Данные защищены и конфиденциальны</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════ */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-[1440px] mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <LogoS size={30} />
            <div>
              <div className="font-russo text-white text-xs tracking-widest">OSINT-РЭР</div>
              <div className="font-stm text-[8px] text-white/22 tracking-[0.18em]">СЛУЖБА · АНАЛИТИКА</div>
            </div>
          </div>
          <div className="font-stm text-[9px] text-white/18 text-center tracking-wider">© 2024 OSINT-РЭР — Все права защищены</div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-blink" />
            <span className="font-stm text-[9px] text-white/22 tracking-widest">НАБОР ОТКРЫТ</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
