import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyIcon = any;

const HERO_IMG =
  "https://cdn.poehali.dev/projects/31cf2f8d-8f85-4cf9-801d-b8ed9fa0968a/files/6658d0b3-e1a3-4ae6-bbe4-09cd1625f5c1.jpg";
const OSINT_IMG =
  "https://cdn.poehali.dev/projects/31cf2f8d-8f85-4cf9-801d-b8ed9fa0968a/files/8eb5e63c-ad19-4f06-a754-0ea7ae356fb8.jpg";
const OSINT_VIZ_IMG =
  "https://cdn.poehali.dev/projects/31cf2f8d-8f85-4cf9-801d-b8ed9fa0968a/files/a958d524-268e-4fbf-a68e-81b630c18e7d.jpg";
const BPLA_IMG =
  "https://cdn.poehali.dev/projects/31cf2f8d-8f85-4cf9-801d-b8ed9fa0968a/files/8e748e04-f308-4462-a51e-341ca5da8cec.jpg";

/* ── LOGO S ─────────────────────────────────────────────── */
const LogoS = ({ size = 36 }: { size?: number }) => (
  <div style={{
    width: size, height: size,
    display: "flex", alignItems: "center", justifyContent: "center",
    background: "linear-gradient(140deg, #cc2200 0%, #5a0f00 100%)",
    borderRadius: "3px",
    boxShadow: "0 0 20px rgba(204,34,0,0.4), 0 2px 0 rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.3)",
    fontFamily: "'Orbitron', sans-serif",
    fontSize: size * 0.48,
    color: "#fff",
    fontWeight: 900,
    letterSpacing: "-0.02em",
  }}>
    S
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
  { label: "Что такое OSINT", href: "#osint" },
  { label: "Что такое РЭР",  href: "#rer" },
  { label: "О команде",      href: "#about" },
  { label: "Вакансии",       href: "#vacancies" },
  { label: "Льготы",         href: "#benefits" },
  { label: "Этапы",          href: "#steps" },
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

const PAYMENTS = [
  { label: "Единовременно", value: "2 600 000 ₽", icon: "Banknote" },
  { label: "Ежемесячно от", value: "210 000 ₽",   icon: "CalendarDays" },
  { label: "Фед. выплата",  value: "400 000 ₽",   icon: "Landmark" },
];

const STATS = [
  { icon: "Banknote",    val: "> 2,6 млн ₽",    sub: "Единовременная выплата" },
  { icon: "Clock",       val: "24 / 7",          sub: "Аналитическая работа" },
  { icon: "BarChart3",   val: "1000+",           sub: "Выполненных задач" },
  { icon: "ShieldCheck", val: "100%",            sub: "Конфиденциальность" },
  { icon: "MapPin",      val: "Тыловые районы",  sub: "Без боевых действий" },
];

const VACANCIES = [
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

const FAQ = [
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

  const filtered = VACANCIES.filter(v =>
    (spec  === "all" || v.specialty === spec) &&
    (level === "all" || v.level     === level)
  );

  const osintRef    = useReveal();
  const rerRef      = useReveal();
  const aboutRef    = useReveal();
  const vacRef      = useReveal();
  const benRef      = useReveal();
  const stepsRef    = useReveal();
  const faqRef      = useReveal();
  const contactsRef = useReveal();

  return (
    <div className="min-h-screen font-exo" style={{ background: "var(--bg)" }}>

      {/* ══ NAV ═════════════════════════════════════════ */}
      <nav className="fixed top-0 inset-x-0 z-50 h-14 flex items-center"
        style={{ background: "rgba(5,7,13,0.97)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,255,136,0.1)" }}>
        {/* top green line */}
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,136,0.6), rgba(204,34,0,0.4), transparent)" }} />

        <div className="max-w-[1440px] w-full mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 shrink-0">
            <LogoS size={34} />
            <div>
              <div className="font-orb text-[12px] tracking-[0.18em] text-white leading-none">OSINT-РЭР</div>
              <div className="font-stm text-[8px] tracking-[0.2em] text-green-400/40 uppercase leading-none mt-0.5">Служба · Аналитика</div>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-5">
            {NAV.map(n => <a key={n.href} href={n.href} className="nav-link">{n.label}</a>)}
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
            style={{ background: "rgba(5,7,13,0.99)", borderTop: "1px solid rgba(0,255,136,0.1)" }}>
            {NAV.map(n => <a key={n.href} href={n.href} className="nav-link py-1" onClick={() => setMenu(false)}>{n.label}</a>)}
            <a href="#contacts" className="btn-red py-3 text-xs" style={{ borderRadius: "2px" }}>Оставить заявку</a>
          </div>
        )}
      </nav>

      {/* ══ HERO ════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-14 scanlines">
        {/* BG layers */}
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="OSINT-РЭР" className="w-full h-full object-cover"
            style={{ filter: "brightness(0.28) saturate(0.35) contrast(1.15)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(110deg, rgba(5,7,13,0.95) 25%, rgba(5,7,13,0.55) 58%, rgba(5,7,13,0.88) 100%)" }} />
          <div className="absolute inset-0 grid-cyber opacity-80" />
          <div className="absolute inset-0 circuit-lines" />
          {/* Corner accents */}
          <div className="absolute top-20 left-0 w-px h-48" style={{ background: "linear-gradient(180deg, transparent, rgba(0,255,136,0.7), transparent)" }} />
          <div className="absolute top-20 right-0 w-px h-48" style={{ background: "linear-gradient(180deg, transparent, rgba(204,34,0,0.6), transparent)" }} />
          {/* Extra glow spots */}
          <div className="absolute bottom-0 left-1/3 w-96 h-32" style={{ background: "radial-gradient(ellipse, rgba(0,255,136,0.07) 0%, transparent 70%)", filter: "blur(20px)" }} />
          <div className="scan-beam" />
        </div>

        <div className="relative max-w-[1440px] w-full mx-auto px-6 py-24">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-14 items-start">

            {/* LEFT */}
            <div>
              <div className="animate-fade-up d0 inline-flex items-center gap-3 mb-8 px-5 py-3 cyber-frame"
                style={{ border: "1px solid rgba(0,255,136,0.25)", borderRadius: "3px", background: "rgba(0,255,136,0.05)" }}>
                <div className="w-2.5 h-2.5 rounded-full animate-blink" style={{ background: "#00ff88", boxShadow: "0 0 10px #00ff88" }} />
                <span className="font-stm tracking-[0.3em]" style={{ color: "rgba(0,255,136,0.85)", fontSize: "0.82rem" }}>НАБОР ОТКРЫТ · 2026</span>
                <div className="w-2.5 h-2.5 rounded-full animate-blink" style={{ background: "#00ff88", boxShadow: "0 0 10px #00ff88", animationDelay: "0.5s" }} />
              </div>

              <h1 className="animate-fade-up d1 font-orb text-white leading-[0.88] mb-6 animate-glitch"
                style={{ fontSize: "clamp(2.8rem, 7vw, 5.8rem)", textTransform: "uppercase", letterSpacing: "-0.02em" }}>
                OSINT<br />
                <span style={{ color: "#cc2200", textShadow: "0 0 30px rgba(204,34,0,0.6)" }}>подразделение</span><br />
                <span style={{ fontSize: "40%", color: "rgba(255,255,255,0.45)", fontFamily: "'Exo 2', sans-serif", fontWeight: 300, letterSpacing: "0.06em" }}>Радиоэлектронная разведка · РЭР</span>
              </h1>

              <p className="animate-fade-up d2 text-white/48 text-base leading-relaxed max-w-[480px] mb-2">
                Анализ открытых источников, IT, операторы БпЛА, логистика.
              </p>
              <p className="animate-fade-up d3 font-stm text-xs mb-10 tracking-widest" style={{ color: "rgba(0,255,136,0.35)" }}>
                &gt; БЕЗ УЧАСТИЯ В БОЕВЫХ ДЕЙСТВИЯХ_<span className="cursor" />
              </p>

              <div className="animate-fade-up d4 flex flex-wrap gap-4">
                <a href="#contacts" className="btn-red px-10 py-4 text-xs animate-pulse-red" style={{ borderRadius: "2px" }}>
                  <Icon name="Send" size={15} />
                  Оставить заявку
                </a>
                <a href="#rer" className="btn-ghost px-10 py-4 text-xs" style={{ borderRadius: "2px" }}>
                  <Icon name="ChevronDown" size={15} />
                  Что такое РЭР
                </a>
              </div>

              <div className="animate-fade-up d5 mt-14 flex flex-wrap gap-8">
                {[
                  { val:"5 120 000 ₽", sub:"Доход за 1-й год", color:"#ff4422" },
                  { val:"210 000 ₽",   sub:"В месяц",          color:"#ffffff" },
                  { val:"1000+",       sub:"Задач выполнено",   color:"#00ff88" },
                ].map((s, i) => (
                  <div key={i} className="animate-fade-up" style={{ animationDelay: `${0.5 + i * 0.1}s`, opacity: 0 }}>
                    <div className="font-orb leading-none mb-1.5 whitespace-nowrap" style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)", color: s.color, textShadow: `0 0 20px ${s.color}60` }}>{s.val}</div>
                    <div className="font-stm text-[10px] tracking-widest" style={{ color: "rgba(0,255,136,0.4)" }}>{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Payment card */}
            <div className="animate-fade-right d3 animate-float">
              <div className="cyber-frame" style={{ filter: "drop-shadow(0 0 30px rgba(204,34,0,0.18)) drop-shadow(0 40px 80px rgba(0,0,0,0.8))" }}>
                <div className="red-card" style={{ borderRadius: "3px" }}>
                  <div style={{ background: "linear-gradient(155deg, rgba(8,10,18,0.99), rgba(5,7,13,1))", padding: "2rem" }}>

                    <div className="flex items-center justify-between mb-7">
                      <div className="flex items-center gap-2.5">
                        <LogoS size={22} />
                        <span className="font-stm text-[9px] tracking-[0.25em]" style={{ color: "rgba(0,255,136,0.4)" }}>ВЫПЛАТЫ / ДОХОДЫ</span>
                      </div>
                      <div className="flex gap-1.5">
                        {["#f0f0f0","#003791","#cc2200"].map((c,i) => (
                          <div key={i} className="w-2 h-2 rounded-full" style={{ background: c, boxShadow: `0 0 6px ${c}88` }} />
                        ))}
                      </div>
                    </div>

                    {PAYMENTS.map((p, i) => (
                      <div key={i} className="flex justify-between items-center py-3 animate-fade-up"
                        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", animationDelay: `${0.3 + i*0.1}s`, opacity: 0 }}>
                        <div className="flex items-center gap-2.5">
                          <IBox icon={p.icon} size={14} boxSize={30} radius={6} />
                          <span className="font-exo text-sm text-white/42">{p.label}</span>
                        </div>
                        <span className="money text-lg">{p.value}</span>
                      </div>
                    ))}

                    <div className="p-5 mt-5 mb-5" style={{ background: "rgba(204,34,0,0.08)", border: "1px solid rgba(204,34,0,0.2)", borderRadius: "2px" }}>
                      <div className="font-stm text-[9px] tracking-widest mb-1.5" style={{ color: "rgba(0,255,136,0.4)" }}>ОБЩИЙ ДОХОД · ГОД 1</div>
                      <div className="money-red leading-none" style={{ fontSize: "2.2rem" }}>от 5 120 000 ₽</div>
                    </div>

                    <div className="flex items-center gap-3 p-3 mb-4" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "2px" }}>
                      <Icon name="Shield" size={12} style={{ color: "rgba(0,255,136,0.5)" }} />
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

      {/* ══ STATS BAR ═══════════════════════════════════ */}
      <div style={{ background: "rgba(0,255,136,0.03)", borderTop: "1px solid rgba(0,255,136,0.15)", borderBottom: "1px solid rgba(0,255,136,0.12)" }}>
        <div className="max-w-[1440px] mx-auto px-6 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-0">
            {STATS.map((s, i) => (
              <div key={i} className="stat-card flex items-center gap-4 px-6 py-5 animate-fade-up"
                style={{ animationDelay: `${i * 0.08}s`, opacity: 0, borderLeft: i > 0 ? "1px solid rgba(0,255,136,0.1)" : "none" }}>
                {/* Крупная объёмная иконка */}
                <div className="shrink-0" style={{
                  width: 58, height: 58,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "linear-gradient(145deg, rgba(0,255,136,0.14) 0%, rgba(0,255,136,0.04) 60%, rgba(0,0,0,0.15) 100%)",
                  border: "1px solid rgba(0,255,136,0.22)",
                  borderTop: "1px solid rgba(0,255,136,0.35)",
                  borderRadius: 14,
                  boxShadow: "0 0 28px rgba(0,255,136,0.2), 0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)",
                  position: "relative",
                }}>
                  <Icon name={s.icon as AnyIcon} size={26} style={{ color: "rgba(220,240,255,0.9)" }} />
                </div>
                <div className="min-w-0">
                  <div className="font-orb text-white font-bold whitespace-nowrap leading-tight" style={{ fontSize: "clamp(1rem, 1.8vw, 1.35rem)" }}>{s.val}</div>
                  <div className="font-exo text-white/40 text-sm mt-0.5">{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ ЧТО ТАКОЕ OSINT ════════════════════════════ */}
      <section id="osint" className="py-28 relative overflow-hidden" style={{ borderTop: "1px solid rgba(0,255,136,0.1)" }}>
        <div className="absolute inset-0 grid-cyber opacity-40 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-px" style={{ background: "linear-gradient(180deg, transparent, rgba(0,255,136,0.4), transparent)" }} />

        <div className="max-w-[1440px] mx-auto px-6">
          <div ref={osintRef} className="section-entry">
            <div className="label-mono mb-3">// Что такое OSINT</div>
            <div className="accent-line" />
            <h2 className="font-orb text-white uppercase leading-tight mb-10" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              Open Source<br /><span style={{ color: "#00ff88" }}>Intelligence</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-12">
              {/* Текст */}
              <div>
                <div className="vol-card p-7 mb-6" style={{ borderColor: "rgba(0,255,136,0.2)" }}>
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
                          background: i < 9 ? "rgba(0,255,136,0.85)" : "rgba(255,255,255,0.1)",
                          boxShadow: i < 9 ? "0 0 6px rgba(0,255,136,0.5)" : "none",
                          transition: `opacity 0.3s ${i * 0.05}s`,
                        }} />
                      ))}
                    </div>
                    <span className="font-orb text-sm" style={{ color: "#00ff88" }}>9 / 10</span>
                  </div>
                </div>

                {/* Источники OSINT */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon:"Newspaper",    label:"СМИ и новости",        col:"rgba(0,255,136," },
                    { icon:"MessageCircle",label:"Социальные сети",      col:"rgba(0,255,136," },
                    { icon:"Map",          label:"Карты и геоданные",    col:"rgba(0,255,136," },
                    { icon:"Camera",       label:"Фото и видео",         col:"rgba(0,255,136," },
                    { icon:"Database",     label:"Публичные базы данных",col:"rgba(0,255,136," },
                    { icon:"Globe",        label:"Открытые реестры",     col:"rgba(0,255,136," },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 animate-fade-left"
                      style={{ animationDelay: `${i * 0.08}s`, opacity: 0, background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.14)", borderRadius: 4 }}>
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
                    style={{ height: 340, filter: "brightness(0.75) saturate(0.8) contrast(1.1)" }} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(5,7,13,0.9) 100%)" }} />
                  <div className="absolute bottom-5 left-5">
                    <div className="font-stm text-[10px] tracking-widest mb-1" style={{ color: "rgba(0,255,136,0.6)" }}>// OSINT VISUALIZATION</div>
                    <div className="font-orb text-white text-base">Разведка открытых источников</div>
                  </div>
                </div>
                {/* floating badge */}
                <div className="absolute -top-4 -right-4 px-4 py-2 animate-float"
                  style={{ background: "rgba(5,7,13,0.95)", border: "1px solid rgba(0,255,136,0.35)", borderRadius: 3, boxShadow: "0 0 20px rgba(0,255,136,0.15)" }}>
                  <div className="font-orb text-xs" style={{ color: "#00ff88" }}>OSINT · 24/7</div>
                </div>
              </div>
            </div>

            {/* Вторая картинка — аналитики */}
            <div className="relative overflow-hidden cyber-frame animate-fade-up" style={{ opacity: 0, animationDelay: "0.3s", borderRadius: 4 }}>
              <img src={OSINT_IMG} alt="OSINT команда"
                className="w-full object-cover"
                style={{ height: 280, objectPosition: "center 30%", filter: "brightness(0.55) saturate(0.6) contrast(1.1)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(5,7,13,0.85) 0%, transparent 40%, rgba(5,7,13,0.7) 100%)" }} />
              <div className="absolute inset-0 grid-cyber opacity-30" />
              <div className="absolute left-8 top-1/2 -translate-y-1/2">
                <div className="font-stm text-[10px] tracking-[0.3em] mb-2" style={{ color: "rgba(0,255,136,0.6)" }}>// LIVE MONITORING</div>
                <div className="font-orb text-white text-xl uppercase mb-2">Аналитики за работой</div>
                <div className="font-exo text-white/50 text-sm max-w-xs">Круглосуточный мониторинг открытых источников в защищённом контуре</div>
              </div>
              <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                {["СМИ активны", "Telegram · 847 каналов", "Соцсети · мониторинг"].map((t, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-1.5"
                    style={{ background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.2)", borderRadius: 2 }}>
                    <div className="w-1.5 h-1.5 rounded-full animate-blink" style={{ background: "#00ff88", animationDelay: `${i * 0.4}s` }} />
                    <span className="font-stm text-[10px] tracking-wider" style={{ color: "rgba(0,255,136,0.7)" }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ЧТО ТАКОЕ РЭР ══════════════════════════════ */}
      <section id="rer" className="py-28 relative overflow-hidden">
        {/* cyber bg accent */}
        <div className="absolute inset-0 grid-cyber opacity-50 pointer-events-none" />
        <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: "linear-gradient(180deg, transparent, rgba(0,255,136,0.3), transparent)" }} />

        <div className="max-w-[1440px] mx-auto px-6">
          <div ref={rerRef} className="section-entry">
            <div className="label-mono mb-3">// Что такое РЭР</div>
            <div className="accent-line" />
            <h2 className="font-orb text-white uppercase leading-tight mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              Радиоэлектронная<br /><span style={{ color: "#cc2200" }}>разведка</span>
            </h2>
            {/* Главное описание */}
            <div className="max-w-2xl mb-8 p-6 vol-card" style={{ borderColor: "rgba(0,255,136,0.15)" }}>
              <p className="font-exo text-white/70 text-base leading-[1.95] mb-4">
                <span className="font-orb text-white text-sm tracking-wide">РЭР — радиоэлектронная разведка.</span>{" "}
                Это направление разведки, которое занимается обнаружением, перехватом и анализом радиоэлектронных сигналов: связи, радиостанций, радаров и других источников излучения. РЭР помогает понимать активность противника, выявлять источники сигналов и получать важную информацию без прямого контакта.
              </p>
              <p className="font-exo text-white/55 text-sm leading-[1.85] mb-5">
                <span className="font-orb text-white/80 text-xs tracking-wide">Польза РЭР — очень высокая: 9/10.</span>{" "}
                Она помогает быстрее получать данные, повышает осведомлённость об обстановке, поддерживает работу аналитиков, операторов БпЛА и командования.
              </p>
              {/* Рейтинг 9/10 */}
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="h-2 rounded-sm transition-all" style={{
                      width: 18,
                      background: i < 9 ? "rgba(0,255,136,0.85)" : "rgba(255,255,255,0.1)",
                      boxShadow: i < 9 ? "0 0 6px rgba(0,255,136,0.5)" : "none",
                    }} />
                  ))}
                </div>
                <span className="font-orb text-xs" style={{ color: "rgba(0,255,136,0.7)" }}>9 / 10</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {RER_TASKS.map((t, i) => (
                <div key={i} className="vol-card p-6 cyber-frame animate-scale-in" style={{ animationDelay: `${i * 0.09}s`, opacity: 0 }}>
                  <div className="mb-5">
                    <IBox icon={t.icon} size={24} boxSize={54} radius={12} glow />
                  </div>
                  <div className="font-orb text-white text-sm uppercase mb-3 tracking-wide">{t.title}</div>
                  <div className="font-exo text-white/42 text-sm leading-[1.75]">{t.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ ABOUT ═══════════════════════════════════════ */}
      <section id="about" className="py-28 relative" style={{ borderTop: "1px solid rgba(0,255,136,0.08)" }}>
        <div className="absolute right-0 top-0 bottom-0 w-px" style={{ background: "linear-gradient(180deg, transparent, rgba(204,34,0,0.3), transparent)" }} />
        <div className="max-w-[1440px] mx-auto px-6">
          <div ref={aboutRef} className="section-entry">

            {/* ── OSINT описание ── */}
            <div className="label-mono mb-3">// Команда OSINT</div>
            <div className="accent-line" />
            <h2 className="font-orb text-white uppercase leading-tight mb-6" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              Команда <span style={{ color: "#cc2200" }}>OSINT</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* OSINT блок */}
              <div className="vol-card p-7" style={{ borderColor: "rgba(0,255,136,0.15)" }}>
                <div className="flex items-center gap-3 mb-5">
                  <IBox icon="Search" size={22} boxSize={48} radius={12} glow />
                  <span className="font-orb text-white text-sm uppercase tracking-wide">OSINT-подразделение</span>
                </div>
                <p className="font-exo text-white/65 text-sm leading-[1.95] mb-4">
                  <span className="font-orb text-white/90 text-xs tracking-wide">OSINT-подразделение</span> — это команда специалистов, которая занимается сбором, проверкой и анализом информации из открытых источников: СМИ, социальных сетей, карт, публичных баз данных, фото, видео и других доступных материалов. Такая работа помогает быстрее понимать обстановку, выявлять важные события, отслеживать изменения и готовить аналитические материалы для командования.
                </p>
                <p className="font-exo text-white/50 text-sm leading-[1.85] mb-5">
                  <span className="font-orb text-white/75 text-xs">Польза OSINT в армии — очень высокая: 9/10.</span>{" "}
                  OSINT помогает принимать более точные решения, дополняет данные разведки, снижает неопределённость, ускоряет анализ ситуации и поддерживает работу других направлений: РЭР, БпЛА, связи, IT и штабной аналитики.
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div key={i} className="h-2 rounded-sm" style={{
                        width: 16,
                        background: i < 9 ? "rgba(0,255,136,0.85)" : "rgba(255,255,255,0.1)",
                        boxShadow: i < 9 ? "0 0 6px rgba(0,255,136,0.5)" : "none",
                      }} />
                    ))}
                  </div>
                  <span className="font-orb text-xs" style={{ color: "rgba(0,255,136,0.7)" }}>9 / 10</span>
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
                    <div className="ibox mt-0.5 shrink-0" style={{ width: 20, height: 20, background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.2)", borderRadius: 5 }}>
                      <Icon name="ChevronRight" size={11} style={{ color: "rgba(0,255,136,0.7)" }} />
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
                style={{ height: 260, objectPosition: "center 40%", filter: "brightness(0.5) saturate(0.6) contrast(1.15)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(5,7,13,0.92) 0%, transparent 45%, rgba(5,7,13,0.75) 100%)" }} />
              <div className="absolute inset-0 grid-cyber opacity-25" />
              <div className="absolute left-8 top-1/2 -translate-y-1/2">
                <div className="font-stm text-[10px] tracking-[0.3em] mb-2" style={{ color: "rgba(0,255,136,0.6)" }}>// ОПЕРАТОРЫ БпЛА</div>
                <div className="font-orb text-white text-xl uppercase mb-2">Воздушная разведка</div>
                <div className="font-exo text-white/50 text-sm max-w-xs">Управление беспилотниками, аэрофотосъёмка и корректировка данных в реальном времени</div>
              </div>
              <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                {["БпЛА · в воздухе", "Съёмка · активна", "Связь · защищена"].map((t, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-1.5"
                    style={{ background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.2)", borderRadius: 2 }}>
                    <div className="w-1.5 h-1.5 rounded-full animate-blink" style={{ background: "#00ff88", animationDelay: `${i * 0.3}s` }} />
                    <span className="font-stm text-[10px] tracking-wider" style={{ color: "rgba(0,255,136,0.7)" }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Вкладка «О командирах» ── */}
            <div className="vol-card p-8 cyber-frame" style={{ borderColor: "rgba(204,34,0,0.2)", background: "rgba(204,34,0,0.03)" }}>
              <div className="flex items-center gap-4 mb-8">
                <IBox icon="ShieldCheck" size={24} boxSize={56} radius={14} glow />
                <div>
                  <div className="font-orb text-white text-base uppercase tracking-wide mb-0.5">О командирах</div>
                  <div className="font-stm text-[9px] tracking-widest" style={{ color: "rgba(0,255,136,0.4)" }}>ПРОФЕССИОНАЛЬНЫЙ СОСТАВ</div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon:"Star",       title:"Боевой опыт",           desc:"Каждый командир прошёл реальные операции и знает, как действовать в условиях неопределённости." },
                  { icon:"GraduationCap", title:"Профессиональная подготовка", desc:"Специализированное военное образование, курсы разведки и технических дисциплин." },
                  { icon:"Users",      title:"Наставничество",         desc:"Каждый новобранец закрепляется за опытным офицером, который помогает на всех этапах службы." },
                  { icon:"Target",     title:"Результат — главное",    desc:"Командиры ставят чёткие задачи, обеспечивают ресурсами и несут ответственность за итог." },
                ].map((c, i) => (
                  <div key={i} className="flex flex-col gap-3 p-5 animate-scale-in"
                    style={{ animationDelay: `${i * 0.1}s`, opacity: 0, background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "3px" }}>
                    <IBox icon={c.icon} size={20} boxSize={46} radius={10} glow />
                    <div className="font-orb text-white text-xs uppercase tracking-wide leading-snug">{c.title}</div>
                    <div className="font-exo text-white/42 text-xs leading-[1.75]">{c.desc}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ VACANCIES ═══════════════════════════════════ */}
      <section id="vacancies" className="py-28 relative" style={{ borderTop: "1px solid rgba(0,255,136,0.08)" }}>
        <div className="absolute inset-0 grid-cyber opacity-30 pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-6">
          <div ref={vacRef} className="section-entry">
            <div className="label-mono mb-3">// Открытые позиции</div>
            <div className="accent-line" />
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
              <h2 className="font-orb text-white uppercase leading-tight" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
                Требуемые<br /><span style={{ color: "#cc2200" }}>специалисты</span>
              </h2>
              <div className="flex flex-col gap-2.5">
                <div className="flex flex-wrap gap-2">{SPEC_FILTERS.map(f => <button key={f.v} className={`tag-filter ${spec===f.v?"active":""}`} onClick={() => setSpec(f.v)}>{f.l}</button>)}</div>
                <div className="flex flex-wrap gap-2">{LEVEL_FILTERS.map(f => <button key={f.v} className={`tag-filter ${level===f.v?"active":""}`} onClick={() => setLevel(f.v)}>{f.l}</button>)}</div>
              </div>
            </div>

            {filtered.length === 0
              ? <div className="text-center py-24 font-stm text-white/22 tracking-widest">Позиций по фильтрам не найдено</div>
              : <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filtered.map((v, vi) => (
                    <div key={v.id} className="vol-card p-7 group cyber-frame animate-fade-up" style={{ animationDelay: `${vi * 0.08}s`, opacity: 0 }}>
                      <div className="flex items-start justify-between mb-5">
                        <IBox icon={v.icon} size={24} boxSize={56} radius={12} glow />
                        <span className="font-stm text-[8px] tracking-widest" style={{ color: "rgba(0,255,136,0.3)" }}>{v.level}</span>
                      </div>
                      <h3 className="font-orb text-white text-base uppercase mb-3 group-hover:text-white/70 transition-colors tracking-wide">{v.title}</h3>
                      <p className="font-exo text-white/42 text-sm leading-[1.8] mb-5">{v.desc}</p>
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {v.tags.map(tag => (
                          <span key={tag} className="font-stm text-[8px] px-2.5 py-1"
                            style={{ background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.28)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "2px" }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                        <div>
                          <div className="money text-lg">от 210 000 ₽</div>
                          <div className="font-stm text-[8px] mt-0.5" style={{ color: "rgba(0,255,136,0.3)" }}>в месяц</div>
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

      {/* ══ BENEFITS ════════════════════════════════════ */}
      <section id="benefits" className="py-28 relative" style={{ borderTop: "1px solid rgba(0,255,136,0.12)" }}>
        <div className="absolute inset-0 grid-cyber opacity-40 pointer-events-none" />
        <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: "linear-gradient(180deg, transparent, rgba(0,255,136,0.4), transparent)" }} />
        <div className="max-w-[1440px] mx-auto px-6">
          <div ref={benRef} className="section-entry">
            <div className="label-mono mb-3">// Социальный пакет</div>
            <div className="accent-line" />
            <h2 className="font-orb text-white uppercase leading-tight mb-3" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
              Льготы и <span style={{ color: "#cc2200" }}>гарантии</span>
            </h2>
            <p className="font-exo text-white/45 text-base mb-12 max-w-xl leading-relaxed">
              Государство гарантирует полный социальный пакет с первого дня службы — для вас и вашей семьи.
            </p>

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
                        <div className="font-orb text-sm whitespace-nowrap shrink-0" style={{ color: "#00ff88", textShadow: "0 0 12px rgba(0,255,136,0.5)" }}>{b.sum}</div>
                      </div>
                      <div className="font-exo text-white/50 text-sm leading-[1.75]">{b.desc}</div>
                    </div>
                  </div>
                  {/* bottom accent line */}
                  <div className="h-px mx-6" style={{ background: "linear-gradient(90deg, rgba(0,255,136,0.2), transparent)" }} />
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
                <div className="font-stm text-[10px] tracking-widest mb-2" style={{ color: "rgba(0,255,136,0.5)" }}>СПЕЦИАЛЬНАЯ ГАРАНТИЯ ГОСУДАРСТВА</div>
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
      <section id="steps" className="py-28 relative" style={{ borderTop: "1px solid rgba(0,255,136,0.08)" }}>
        <div className="absolute inset-0 grid-cyber opacity-25 pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-6">
          <div ref={stepsRef} className="section-entry">
            <div className="label-mono mb-3">// Алгоритм вступления</div>
            <div className="accent-line" />
            <h2 className="font-orb text-white uppercase leading-tight mb-16" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>Этапы поступления</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5">
              {STEPS.map((s, i) => (
                <div key={i} className="flex flex-col items-center text-center group animate-fade-up" style={{ animationDelay: `${i * 0.12}s`, opacity: 0 }}>
                  <div className="relative mb-5">
                    <div className="absolute inset-0 rounded-full opacity-20 animate-pulse-red" style={{ background: "radial-gradient(circle, rgba(0,255,136,0.3) 0%, transparent 70%)", transform: "scale(1.5)" }} />
                    <div className="relative w-24 h-24 flex flex-col items-center justify-center gap-1.5 transition-all group-hover:scale-105 cyber-frame"
                      style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)", border: "1px solid rgba(0,255,136,0.18)", borderRadius: "50%", boxShadow: "0 0 30px rgba(0,255,136,0.08), inset 0 1px 0 rgba(255,255,255,0.08)" }}>
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
      <section id="faq" className="py-28" style={{ borderTop: "1px solid rgba(0,255,136,0.08)" }}>
        <div className="max-w-[1440px] mx-auto px-6">
          <div ref={faqRef} className="section-entry">
            <div className="label-mono mb-3">// База знаний</div>
            <div className="accent-line" />
            <h2 className="font-orb text-white uppercase leading-tight mb-12" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>Вопросы и ответы</h2>
            <div className="max-w-3xl space-y-1.5">
              {FAQ.map((item, i) => (
                <div key={i} className={`vol-card overflow-hidden faq-item ${openFaq===i?"open":""} animate-fade-up`} style={{ animationDelay: `${i * 0.07}s`, opacity: 0 }}>
                  <button className="w-full flex items-center justify-between p-5 text-left gap-4"
                    style={{ background: openFaq===i ? "rgba(0,255,136,0.03)" : "transparent" }}
                    onClick={() => setOpenFaq(openFaq===i ? null : i)}>
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
                      <div className="pt-4" style={{ borderTop: "1px solid rgba(0,255,136,0.08)" }}>
                        <p className="font-exo text-white/48 text-sm leading-[1.9]">{item.a}</p>
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
      <section id="contacts" className="py-28 relative" style={{ borderTop: "1px solid rgba(0,255,136,0.08)" }}>
        <div className="absolute inset-0 grid-cyber opacity-30 pointer-events-none" />
        <div className="max-w-[1440px] mx-auto px-6">
          <div ref={contactsRef} className="section-entry grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <div className="label-mono mb-3">// Инициировать контакт</div>
              <div className="accent-line" />
              <h2 className="font-orb text-white uppercase leading-tight mb-5" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
                Готов стать<br /><span style={{ color: "#cc2200" }}>частью команды?</span>
              </h2>
              <p className="font-exo text-white/40 text-sm leading-[1.9] mb-10 max-w-sm">
                Оставьте заявку — свяжемся в течение 24 часов. Все данные защищены.
              </p>
              <div className="space-y-5">
                {[
                  { icon:"Phone", label:"+7 (3022) 55-42-10", sub:"Звонки Пн–Пт 09:00–18:00" },
                  { icon:"Mail",  label:"info@osint-rer.ru",  sub:"Ответ в течение 24 часов" },
                  { icon:"Send",  label:"@OSINT_RER",         sub:"Telegram — 24/7" },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-4 animate-fade-left" style={{ animationDelay: `${0.1 + i * 0.1}s`, opacity: 0 }}>
                    <IBox icon={c.icon} size={20} boxSize={48} radius={10} glow />
                    <div>
                      <div className="font-exo text-white/82 text-sm font-semibold">{c.label}</div>
                      <div className="font-stm text-[9px] mt-0.5 tracking-wider" style={{ color: "rgba(0,255,136,0.3)" }}>{c.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="vol-card p-10 cyber-frame animate-fade-right" style={{ opacity: 0, animationDelay: "0.2s" }}>
              <div className="flex items-center gap-3 mb-7">
                <LogoS size={24} />
                <span className="font-stm text-[9px] tracking-[0.25em]" style={{ color: "rgba(0,255,136,0.4)" }}>ФОРМА ЗАЯВКИ</span>
              </div>
              <div className="space-y-5">
                {[{label:"Ваше имя",type:"text",placeholder:"Иванов Иван Иванович"},{label:"Телефон",type:"tel",placeholder:"+7 (___) ___-__-__"}].map(f => (
                  <div key={f.label}>
                    <label className="font-stm text-[8px] block mb-2 tracking-widest" style={{ color: "rgba(255,255,255,0.28)" }}>{f.label.toUpperCase()}</label>
                    <input type={f.type} placeholder={f.placeholder} className="form-input" />
                  </div>
                ))}
                <div>
                  <label className="font-stm text-[8px] block mb-2 tracking-widest" style={{ color: "rgba(255,255,255,0.28)" }}>СПЕЦИАЛЬНОСТЬ</label>
                  <select className="form-input" style={{ appearance: "none" }}>
                    <option value="" style={{ background:"#05070d" }}>Выберите направление</option>
                    <option value="osint" style={{ background:"#05070d" }}>OSINT-аналитик</option>
                    <option value="it" style={{ background:"#05070d" }}>IT-специалист</option>
                    <option value="bpla" style={{ background:"#05070d" }}>Оператор БпЛА</option>
                    <option value="logistics" style={{ background:"#05070d" }}>Водитель / Логистика</option>
                  </select>
                </div>
                <button className="btn-red w-full py-4 text-xs mt-2 animate-pulse-red" style={{ borderRadius: "2px" }}>
                  <Icon name="Send" size={15} />
                  Оставить заявку
                </button>
              </div>
              <div className="mt-5 flex items-center gap-2">
                <Icon name="Lock" size={11} style={{ color: "rgba(0,255,136,0.3)" }} />
                <span className="font-stm text-[8px] tracking-wider" style={{ color: "rgba(255,255,255,0.18)" }}>Данные защищены. Конфиденциально.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════ */}
      <footer style={{ borderTop: "1px solid rgba(0,255,136,0.1)" }}>
        <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,136,0.4), rgba(204,34,0,0.3), transparent)" }} />
        <div className="max-w-[1440px] mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <LogoS size={28} />
            <div>
              <div className="font-orb text-white text-xs tracking-widest">OSINT-РЭР</div>
              <div className="font-stm text-[8px] tracking-[0.2em]" style={{ color: "rgba(0,255,136,0.3)" }}>СЛУЖБА · АНАЛИТИКА</div>
            </div>
          </div>
          <div className="font-stm text-[9px] text-center tracking-wider" style={{ color: "rgba(255,255,255,0.18)" }}>© 2024 OSINT-РЭР — Все права защищены</div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full animate-blink" style={{ background: "#00ff88" }} />
            <span className="font-stm text-[9px] tracking-widest" style={{ color: "rgba(0,255,136,0.3)" }}>НАБОР ОТКРЫТ</span>
          </div>
        </div>
      </footer>
    </div>
  );
}