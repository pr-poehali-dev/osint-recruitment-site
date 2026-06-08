import Icon from "@/components/ui/icon";

const BEFORE = [
  { icon: "TrendingDown", t: "Нестабильный доход", d: "Зарплата 40–80 тыс., задержки, нет гарантий" },
  { icon: "FileX", t: "Кредитная нагрузка", d: "Платежи по кредитам давят каждый месяц" },
  { icon: "HelpCircle", t: "Неопределённость", d: "Нет соцпакета, льгот и защиты от государства" },
  { icon: "Home", t: "Съёмное жильё", d: "Своя квартира — недостижимая мечта" },
];

const AFTER = [
  { icon: "TrendingUp", t: "Доход от 5,1 млн ₽/год", d: "Стабильные выплаты день в день, официально" },
  { icon: "ShieldCheck", t: "Кредитные каникулы", d: "Приостановка выплат, списание задолженностей" },
  { icon: "Award", t: "Полный соцпакет", d: "Медицина, страхование, статус ветерана" },
  { icon: "Key", t: "Военная ипотека", d: "До 3,9 млн ₽ на жильё за счёт государства" },
];

export default function Comparison() {
  return (
    <section className="py-28 relative overflow-hidden" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="absolute inset-0 grid-cyber opacity-20 pointer-events-none" />
      <div className="max-w-[1100px] mx-auto px-6 relative">
        <div className="label-mono mb-3">Что меняется</div>
        <div className="accent-line" />
        <h2 className="font-orb text-white leading-[0.95] mb-12" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}>
          До и после<br /><span style={{ color: "rgba(255,255,255,0.4)" }}>контракта</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ДО */}
          <div className="vol-card p-8 animate-fade-blur" style={{ borderRadius: 16, borderColor: "rgba(255,255,255,0.1)" }}>
            <div className="flex items-center gap-3 mb-7">
              <div className="flex items-center justify-center" style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)" }}>
                <Icon name="Minus" size={22} style={{ color: "rgba(255,255,255,0.5)" }} />
              </div>
              <div>
                <div className="font-stm text-[10px] tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>СЕЙЧАС</div>
                <div className="font-orb text-white" style={{ fontSize: "1.3rem" }}>До контракта</div>
              </div>
            </div>
            <div className="space-y-5">
              {BEFORE.map((b, i) => (
                <div key={i} className="flex items-start gap-3.5">
                  <Icon name={b.icon} size={19} style={{ color: "rgba(255,255,255,0.4)", marginTop: 2 }} />
                  <div>
                    <div className="font-exo text-white/80 font-semibold">{b.t}</div>
                    <div className="font-exo text-white/45 text-sm mt-0.5">{b.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ПОСЛЕ */}
          <div className="vol-card cyber-frame p-8 animate-fade-blur" style={{ borderRadius: 16, borderColor: "rgba(220,38,38,0.3)", background: "rgba(220,38,38,0.04)", animationDelay: "0.15s", opacity: 0 }}>
            <div className="flex items-center gap-3 mb-7">
              <div className="flex items-center justify-center" style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(220,38,38,0.12)", border: "1px solid rgba(220,38,38,0.3)" }}>
                <Icon name="Plus" size={22} style={{ color: "#ef4444" }} />
              </div>
              <div>
                <div className="font-stm text-[10px] tracking-widest" style={{ color: "rgba(239,68,68,0.85)" }}>С OSINT-РЭР</div>
                <div className="font-orb text-white" style={{ fontSize: "1.3rem" }}>После контракта</div>
              </div>
            </div>
            <div className="space-y-5">
              {AFTER.map((a, i) => (
                <div key={i} className="flex items-start gap-3.5">
                  <Icon name={a.icon} size={19} style={{ color: "#ef4444", marginTop: 2 }} />
                  <div>
                    <div className="font-exo text-white font-semibold">{a.t}</div>
                    <div className="font-exo text-white/55 text-sm mt-0.5">{a.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <a href="#contacts" className="btn-red-animated px-10 py-4 mx-auto inline-flex" style={{ borderRadius: 12 }}>
            <Icon name="Send" size={17} />
            Изменить свою жизнь
          </a>
        </div>
      </div>
    </section>
  );
}
