import Icon from "@/components/ui/icon";

const LOCATIONS = [
  { city: "Чита", region: "Забайкальский край", role: "Формирование и подготовка", icon: "GraduationCap", note: "Здесь проходит обучение и оформление" },
  { city: "Донецк", region: "ДНР", role: "Место службы", icon: "Building2", note: "Тыловые районы, аналитическая работа" },
  { city: "Мариуполь", region: "ДНР", role: "Место службы", icon: "Building2", note: "Тыловые районы, без боевых действий" },
];

export default function LocationsBlock() {
  return (
    <section className="py-28 relative overflow-hidden sect-texture t-dots" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="absolute inset-0 grid-cyber opacity-20 pointer-events-none" />
      <div className="max-w-[1440px] mx-auto px-6 relative">
        <div className="label-mono mb-3">География</div>
        <div className="accent-line" />
        <h2 className="font-orb text-white leading-[0.95] mb-12" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}>
          Где проходит<br /><span style={{ color: "rgba(255,255,255,0.4)" }}>служба</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LOCATIONS.map((l, i) => (
            <div key={i} className="vol-card hover-lift shimmer-hover p-8 flex flex-col gap-5 animate-fade-blur"
              style={{ animationDelay: `${0.15 + i * 0.15}s`, opacity: 0, borderRadius: 16, borderColor: "rgba(255,255,255,0.1)" }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-center" style={{ width: 52, height: 52, borderRadius: 14, background: "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.03))", border: "1px solid rgba(255,255,255,0.18)" }}>
                  <Icon name={l.icon} size={24} style={{ color: "#fff" }} />
                </div>
                <span className="font-stm text-[10px] tracking-widest px-3 py-1.5" style={{ borderRadius: 6, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.55)" }}>
                  {l.role}
                </span>
              </div>
              <div>
                <div className="font-orb text-white" style={{ fontSize: "1.6rem" }}>{l.city}</div>
                <div className="font-stm text-[11px] tracking-wide mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{l.region}</div>
              </div>
              <div className="flex items-start gap-2.5 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <Icon name="MapPin" size={15} style={{ color: "rgba(255,255,255,0.4)", marginTop: 2 }} />
                <p className="font-exo text-white/55 text-sm leading-relaxed">{l.note}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-3 px-6 py-5 vol-card" style={{ borderRadius: 12, borderColor: "rgba(255,255,255,0.1)" }}>
          <Icon name="ShieldCheck" size={22} style={{ color: "#fff" }} />
          <p className="font-exo text-white/65 text-sm leading-relaxed">
            Проезд до места формирования — <span className="text-white font-semibold">за счёт подразделения</span>. Служба проходит в тыловых районах без участия в боевых действиях.
          </p>
        </div>
      </div>
    </section>
  );
}