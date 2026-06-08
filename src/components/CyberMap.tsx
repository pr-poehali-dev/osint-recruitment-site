import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Point {
  x: number;
  y: number;
  city: string;
  role: string;
  icon: string;
  desc: string;
  count: string;
}

const POINTS: Point[] = [
  { x: 820, y: 235, city: "Чита", role: "Формирование", icon: "GraduationCap", desc: "Учебный центр и оформление контрактов. Подготовка специалистов с нуля.", count: "320+ на обучении" },
  { x: 300, y: 300, city: "Донецк", role: "Служба", icon: "Building2", desc: "Аналитическая работа в тыловых районах. OSINT и мониторинг.", count: "540+ специалистов" },
  { x: 285, y: 320, city: "Мариуполь", role: "Служба", icon: "Building2", desc: "Защищённая инфраструктура и обеспечение. Без боевых действий.", count: "280+ специалистов" },
  { x: 360, y: 250, city: "Москва", role: "Координация", icon: "Network", desc: "Центр управления и координации подразделений. Связь 24/7.", count: "Штаб" },
];

export default function CyberMap() {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section className="py-28 relative overflow-hidden sect-texture t-red" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="absolute inset-0 grid-cyber opacity-20 pointer-events-none" />
      <div className="max-w-[1440px] mx-auto px-6 relative">
        <div className="label-mono mb-3">Зона операций</div>
        <div className="accent-line" />
        <h2 className="font-orb text-white leading-[0.95] mb-12" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}>
          Карта<br /><span style={{ color: "rgba(255,255,255,0.4)" }}>дислокации</span>
        </h2>

        <div className="vol-card relative overflow-hidden" style={{ borderRadius: 18, padding: "clamp(1rem, 3vw, 2.5rem)" }}>
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(circle at 30% 40%, rgba(220,38,38,0.08), transparent 60%)",
          }} />

          <svg viewBox="0 0 1000 460" className="w-full h-auto relative" style={{ maxHeight: 520 }}>
            <defs>
              <linearGradient id="mapStroke" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
              </linearGradient>
              <radialGradient id="dotGlow">
                <stop offset="0%" stopColor="rgba(220,38,38,0.6)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            <path
              d="M120 260 L180 220 L240 235 L300 210 L340 230 L400 215 L460 235 L540 210 L620 230 L700 205 L780 225 L860 210 L920 235 L900 270 L840 285 L880 310 L820 330 L760 310 L700 335 L640 315 L580 340 L520 318 L460 345 L400 320 L340 348 L280 322 L220 350 L160 320 L120 300 Z"
              fill="rgba(255,255,255,0.025)"
              stroke="url(#mapStroke)"
              strokeWidth="1.5"
              style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.1))" }}
            />

            {POINTS.slice(1).map((p, i) => (
              <line key={i}
                x1={POINTS[0].x} y1={POINTS[0].y} x2={p.x} y2={p.y}
                stroke="rgba(220,38,38,0.35)" strokeWidth="1.2" strokeDasharray="6 8"
                className="map-line" style={{ animationDelay: `${i * 0.4}s` }} />
            ))}

            {POINTS.map((p, i) => (
              <g key={i} className="map-point" style={{ animationDelay: `${i * 0.3}s`, cursor: "pointer" }}
                onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
                {/* увеличенная зона наведения */}
                <circle cx={p.x} cy={p.y} r="40" fill="transparent" />
                <circle cx={p.x} cy={p.y} r="26" fill="url(#dotGlow)" className="map-pulse" style={{ transformOrigin: `${p.x}px ${p.y}px`, animationDelay: `${i * 0.5}s` }} />
                <circle cx={p.x} cy={p.y} r={hover === i ? 7 : 5} fill="#dc2626" filter="url(#glow)" style={{ transition: "r 0.2s" }} />
                <circle cx={p.x} cy={p.y} r={hover === i ? 13 : 9} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1" style={{ transition: "r 0.2s" }} />
                <text x={p.x} y={p.y - 18} textAnchor="middle" fill="#fff" fontSize="15" fontWeight="700" fontFamily="Manrope, sans-serif">{p.city}</text>
                <text x={p.x} y={p.y + 30} textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="10" fontFamily="Inter, sans-serif" letterSpacing="1">{p.role.toUpperCase()}</text>
              </g>
            ))}

            <line x1="0" y1="0" x2="0" y2="460" stroke="rgba(255,255,255,0.25)" strokeWidth="2" className="map-scan" />
          </svg>

          {/* Всплывающая карточка-подсказка */}
          {hover !== null && (
            <div className="absolute z-20 animate-scale-reveal pointer-events-none"
              style={{
                left: `${(POINTS[hover].x / 1000) * 100}%`,
                top: `${(POINTS[hover].y / 460) * 100}%`,
                transform: "translate(-50%, calc(-100% - 24px))",
              }}>
              <div className="vol-card p-4" style={{ borderRadius: 12, minWidth: 220, borderColor: "rgba(220,38,38,0.3)", boxShadow: "0 12px 40px rgba(0,0,0,0.6)" }}>
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="flex items-center justify-center shrink-0" style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(220,38,38,0.14)", border: "1px solid rgba(220,38,38,0.3)" }}>
                    <Icon name={POINTS[hover].icon} size={18} style={{ color: "#ef4444" }} />
                  </div>
                  <div>
                    <div className="font-orb text-white text-base leading-tight">{POINTS[hover].city}</div>
                    <div className="font-stm text-[9px] tracking-widest" style={{ color: "rgba(239,68,68,0.85)" }}>{POINTS[hover].role.toUpperCase()}</div>
                  </div>
                </div>
                <p className="font-exo text-white/65 text-sm leading-snug mb-2.5">{POINTS[hover].desc}</p>
                <div className="flex items-center gap-2 pt-2.5" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                  <Icon name="Users" size={13} style={{ color: "rgba(255,255,255,0.5)" }} />
                  <span className="font-stm text-[11px] tracking-wide text-white/80">{POINTS[hover].count}</span>
                </div>
              </div>
              <div style={{ width: 0, height: 0, margin: "0 auto", borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: "8px solid rgba(220,38,38,0.3)" }} />
            </div>
          )}

          <div className="flex flex-wrap gap-x-8 gap-y-3 mt-6 pt-6 relative" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="flex items-center gap-2.5">
              <span className="inline-block" style={{ width: 10, height: 10, borderRadius: "50%", background: "#dc2626", boxShadow: "0 0 10px #dc2626" }} />
              <span className="font-stm text-[11px] tracking-wide" style={{ color: "rgba(255,255,255,0.6)" }}>Точки дислокации</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Icon name="Radio" size={16} style={{ color: "rgba(255,255,255,0.6)" }} />
              <span className="font-stm text-[11px] tracking-wide" style={{ color: "rgba(255,255,255,0.6)" }}>Защищённые каналы связи</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Icon name="MousePointerClick" size={16} style={{ color: "rgba(255,255,255,0.6)" }} />
              <span className="font-stm text-[11px] tracking-wide" style={{ color: "rgba(255,255,255,0.6)" }}>Наведите на город для деталей</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
