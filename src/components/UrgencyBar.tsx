import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const REVIEWS_URL = "https://functions.poehali.dev/089447e4-e2ac-479d-b710-5eb8cb862516";

function getTarget() {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  d.setHours(23, 59, 59, 0);
  return d.getTime();
}

export default function UrgencyBar() {
  const [target, setTarget] = useState(getTarget);
  const [left, setLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  useEffect(() => {
    let cancelled = false;
    fetch(REVIEWS_URL)
      .then(r => r.json())
      .then(data => {
        if (cancelled) return;
        const s = data.settings || {};
        if (s.deadline_date) {
          const d = new Date(s.deadline_date + "T23:59:59");
          if (!isNaN(d.getTime())) setTarget(d.getTime());
        }
        const total = Number(data.applications_count) || 1247;
        let cur = Math.max(0, total - 40);
        const id = setInterval(() => {
          cur += 1;
          setCount(cur);
          if (cur >= total) clearInterval(id);
        }, 35);
      })
      .catch(() => setCount(1247));
    return () => { cancelled = true; };
  }, []);

  const cell = (val: number, label: string) => (
    <div className="flex flex-col items-center">
      <div className="font-orb text-white tabular-nums" style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", minWidth: "1.8ch", textAlign: "center" }}>
        {String(val).padStart(2, "0")}
      </div>
      <div className="font-stm text-[9px] tracking-widest mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</div>
    </div>
  );

  return (
    <div className="relative overflow-hidden" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(185,28,28,0.04)" }}>
      <div className="max-w-[1440px] mx-auto px-6 py-7">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Таймер */}
          <div className="flex items-center gap-5">
            <div className="flex items-center justify-center shrink-0" style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(220,38,38,0.12)", border: "1px solid rgba(220,38,38,0.3)" }}>
              <Icon name="Clock" size={22} style={{ color: "#ef4444" }} />
            </div>
            <div>
              <div className="font-stm text-[10px] tracking-widest mb-2" style={{ color: "rgba(239,68,68,0.85)" }}>НАБОР В ГРУППУ ЗАКРЫВАЕТСЯ ЧЕРЕЗ</div>
              <div className="flex items-center gap-3">
                {cell(left.d, "ДНЕЙ")}
                <span className="font-orb text-white/30 text-xl -mt-4">:</span>
                {cell(left.h, "ЧАС")}
                <span className="font-orb text-white/30 text-xl -mt-4">:</span>
                {cell(left.m, "МИН")}
                <span className="font-orb text-white/30 text-xl -mt-4">:</span>
                {cell(left.s, "СЕК")}
              </div>
            </div>
          </div>

          {/* Счётчик заявок */}
          <div className="flex items-center gap-4 px-6 py-4 vol-card" style={{ borderRadius: 12 }}>
            <Icon name="Users" size={26} style={{ color: "#fff" }} />
            <div>
              <div className="font-orb text-white tabular-nums" style={{ fontSize: "1.7rem" }}>{count.toLocaleString("ru-RU")}</div>
              <div className="font-stm text-[10px] tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>УЖЕ ПОДАЛИ ЗАЯВКУ</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}