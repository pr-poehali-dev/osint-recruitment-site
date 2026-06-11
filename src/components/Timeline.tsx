import Icon from "@/components/ui/icon";

const STEPS = [
  { time: "08:00", icon: "Coffee", title: "Подъём и завтрак", desc: "Полноценное питание за счёт подразделения. Утренний распорядок." },
  { time: "09:00", icon: "Presentation", title: "Брифинг", desc: "Постановка задач на день, разбор актуальной обстановки." },
  { time: "10:00", icon: "Search", title: "Аналитическая работа", desc: "Сбор и анализ данных из открытых источников, мониторинг." },
  { time: "13:00", icon: "UtensilsCrossed", title: "Обед и отдых", desc: "Перерыв, отдых в комфортных условиях." },
  { time: "14:00", icon: "FileText", title: "Подготовка докладов", desc: "Структурирование данных, оформление отчётов для командования." },
  { time: "18:00", icon: "ClipboardCheck", title: "Вечерний доклад", desc: "Подведение итогов дня, передача данных." },
  { time: "19:00", icon: "Moon", title: "Личное время", desc: "Свободное время, связь с семьёй, отдых." },
];

export default function Timeline() {
  return (
    <section className="py-28 relative overflow-hidden sect-texture t-dots" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="absolute inset-0 grid-cyber opacity-20 pointer-events-none" />
      <div className="max-w-[900px] mx-auto px-6 relative">
        <div className="label-mono mb-3">Распорядок</div>
        <div className="accent-line" />
        <h2 className="font-orb text-white leading-[0.95] mb-12" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}>
          Один день<br /><span style={{ color: "rgba(255,255,255,0.4)" }}>специалиста</span>
        </h2>

        <div className="relative">
          {/* вертикальная линия */}
          <div className="absolute top-0 bottom-0" style={{ left: 27, width: 2, background: "linear-gradient(180deg, rgba(47,107,255,0.5), rgba(255,255,255,0.1))" }} />

          <div className="space-y-5">
            {STEPS.map((s, i) => (
              <div key={i} className="flex items-start gap-5 animate-fade-blur" style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}>
                <div className="relative shrink-0 flex items-center justify-center" style={{ width: 56, height: 56, borderRadius: 16, background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.03))", border: "1px solid rgba(255,255,255,0.15)", boxShadow: "0 0 20px rgba(0,0,0,0.4)", zIndex: 1 }}>
                  <Icon name={s.icon} size={24} style={{ color: "#fff" }} />
                </div>
                <div className="vol-card hover-lift flex-1 p-5" style={{ borderRadius: 12 }}>
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="font-orb text-white" style={{ fontSize: "1.1rem", color: "#2f6bff" }}>{s.time}</span>
                    <span className="font-orb text-white" style={{ fontSize: "1.05rem" }}>{s.title}</span>
                  </div>
                  <p className="font-exo text-white/55 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}