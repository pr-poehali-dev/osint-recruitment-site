import Icon from "@/components/ui/icon";

const FACTS = [
  { icon: "Banknote", text: "Доход от 5 120 000 ₽ за первый год" },
  { icon: "ShieldCheck", text: "Служба без участия в боевых действиях" },
  { icon: "GraduationCap", text: "Бесплатное обучение с нуля" },
  { icon: "Home", text: "Военная ипотека до 3 900 000 ₽" },
  { icon: "Clock", text: "Ответ на заявку в течение 24 часов" },
  { icon: "Award", text: "Полный социальный пакет и статус ветерана" },
  { icon: "Users", text: "Более 1140 специалистов в подразделении" },
];

export default function Ticker() {
  const items = [...FACTS, ...FACTS];
  return (
    <div className="relative overflow-hidden py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(220,38,38,0.04)" }}>
      <div className="ticker-track flex items-center gap-12 whitespace-nowrap">
        {items.map((f, i) => (
          <div key={i} className="flex items-center gap-3 shrink-0">
            <Icon name={f.icon} size={17} style={{ color: "#ef4444" }} />
            <span className="font-stm text-[13px] tracking-wide" style={{ color: "rgba(255,255,255,0.75)" }}>{f.text}</span>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
