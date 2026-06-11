import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const REVIEWS_URL = "https://functions.poehali.dev/089447e4-e2ac-479d-b710-5eb8cb862516";

// надбавка к базовой ставке по должности
const ROLES = [
  { id: "osint", label: "OSINT-аналитик", add: 0, icon: "Search" },
  { id: "it", label: "IT-специалист", add: 20000, icon: "Monitor" },
  { id: "bpla", label: "Оператор БпЛА", add: 10000, icon: "Plane" },
  { id: "logistics", label: "Логистика", add: -15000, icon: "Truck" },
  { id: "smi", label: "Мониторинг СМИ", add: -10000, icon: "Rss" },
];

const fmt = (n: number) => n.toLocaleString("ru-RU") + " ₽";

export default function IncomeCalculator() {
  const [roleId, setRoleId] = useState("osint");
  const [months, setMonths] = useState(12);
  const [pay, setPay] = useState({ once: 2600000, monthly: 210000, federal: 400000 });

  useEffect(() => {
    fetch(REVIEWS_URL)
      .then(r => r.json())
      .then(data => {
        const s = data.settings || {};
        setPay({
          once: Number(s.pay_once) || 2600000,
          monthly: Number(s.pay_monthly) || 210000,
          federal: Number(s.pay_federal) || 400000,
        });
      })
      .catch(() => { /* defaults */ });
  }, []);

  const role = ROLES.find(r => r.id === roleId)!;
  const monthly = Math.max(0, pay.monthly + role.add);
  const total = monthly * months + pay.once + pay.federal;

  return (
    <section className="py-28 relative overflow-hidden sect-texture" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="absolute inset-0 grid-cyber opacity-20 pointer-events-none" />
      <div className="max-w-[1100px] mx-auto px-6 relative">
        <div className="label-mono mb-3">Калькулятор дохода</div>
        <div className="accent-line" />
        <h2 className="font-orb text-white leading-[0.95] mb-12" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}>
          Рассчитайте<br /><span style={{ color: "rgba(255,255,255,0.4)" }}>свой доход</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Настройки */}
          <div className="vol-card p-8 flex flex-col gap-8" style={{ borderRadius: 16 }}>
            <div>
              <div className="font-stm text-[11px] tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.55)" }}>ВЫБЕРИТЕ ДОЛЖНОСТЬ</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ROLES.map(r => (
                  <button key={r.id} onClick={() => setRoleId(r.id)}
                    className="flex items-center gap-3 p-3.5 transition-all hover:scale-[1.02]"
                    style={{
                      borderRadius: 10,
                      background: roleId === r.id ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.03)",
                      border: roleId === r.id ? "1px solid rgba(255,255,255,0.4)" : "1px solid rgba(255,255,255,0.1)",
                    }}>
                    <Icon name={r.icon} size={18} style={{ color: roleId === r.id ? "#fff" : "rgba(255,255,255,0.5)" }} />
                    <span className="font-exo text-sm text-left" style={{ color: roleId === r.id ? "#fff" : "rgba(255,255,255,0.6)" }}>{r.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-stm text-[11px] tracking-widest" style={{ color: "rgba(255,255,255,0.55)" }}>СРОК СЛУЖБЫ</span>
                <span className="font-orb text-white text-lg">{months} мес.</span>
              </div>
              <input type="range" min={6} max={36} step={1} value={months}
                onChange={e => setMonths(Number(e.target.value))}
                className="w-full accent-white cursor-pointer" style={{ accentColor: "#fff" }} />
              <div className="flex justify-between mt-2">
                <span className="font-stm text-[9px]" style={{ color: "rgba(255,255,255,0.3)" }}>6 мес.</span>
                <span className="font-stm text-[9px]" style={{ color: "rgba(255,255,255,0.3)" }}>36 мес.</span>
              </div>
            </div>
          </div>

          {/* Результат */}
          <div className="vol-card cyber-frame p-8 flex flex-col justify-center gap-6" style={{ borderRadius: 16, background: "rgba(255,255,255,0.025)" }}>
            <div className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <span className="font-exo text-white/55">Ежемесячно</span>
              <span className="money text-xl">{fmt(monthly)}</span>
            </div>
            <div className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <span className="font-exo text-white/55">За {months} мес.</span>
              <span className="money text-xl">{fmt(monthly * months)}</span>
            </div>
            <div className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <span className="font-exo text-white/55">Единовременно + фед.</span>
              <span className="money text-xl">{fmt(pay.once + pay.federal)}</span>
            </div>
            <div className="mt-2 p-5" style={{ background: "rgba(47,107,255,0.08)", border: "1px solid rgba(47,107,255,0.25)", borderRadius: 12 }}>
              <div className="font-stm text-[10px] tracking-widest mb-2" style={{ color: "rgba(80,140,255,0.85)" }}>ИТОГО ДОХОД</div>
              <div className="money-red leading-none transition-all" style={{ fontSize: "clamp(2rem, 5vw, 2.8rem)" }}>{fmt(total)}</div>
            </div>
            <a href="#contacts" className="btn-red-animated w-full py-4" style={{ borderRadius: 10 }}>
              <Icon name="Send" size={16} />
              Оставить заявку
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}