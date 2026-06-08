import { useState } from "react";
import Icon from "@/components/ui/icon";

const OBJECTIONS = [
  { q: "Это опасно? Придётся участвовать в боях?", a: "Нет. OSINT-РЭР — это аналитическая работа в тыловых районах. Сбор и анализ информации, IT, операторы БпЛА для разведки. Без участия в боевых действиях." },
  { q: "У меня нет военного опыта", a: "Опыт не обязателен. Мы обучаем с нуля бесплатно за 2 недели интенсивной подготовки под руководством наставников. С первого дня начисляется довольствие." },
  { q: "А вдруг не заплатят?", a: "Все выплаты официальные, по контракту с государством. Единовременная выплата — в первый месяц, ежемесячное довольствие — с первого дня службы." },
  { q: "У меня кредиты и долги", a: "На период службы действуют кредитные каникулы — выплаты приостанавливаются без штрафов. При выполнении условий контракта возможно списание задолженностей." },
  { q: "Боюсь бросить семью без поддержки", a: "Семья получает полный соцпакет: медицину, льготы по ЖКХ, места в детсадах без очереди, военную ипотеку. Связь с близкими — в личное время ежедневно." },
  { q: "Сколько длится контракт?", a: "Срок обсуждается индивидуально при оформлении. Специалист расскажет все условия на консультации после вашей заявки." },
];

export default function Objections() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-28 relative overflow-hidden sect-texture t-red" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="absolute inset-0 grid-cyber opacity-20 pointer-events-none" />
      <div className="max-w-[900px] mx-auto px-6 relative">
        <div className="label-mono mb-3">Развеиваем сомнения</div>
        <div className="accent-line" />
        <h2 className="font-orb text-white leading-[0.95] mb-12" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}>
          Частые<br /><span style={{ color: "rgba(255,255,255,0.4)" }}>возражения</span>
        </h2>

        <div className="space-y-3">
          {OBJECTIONS.map((o, i) => (
            <div key={i} className="vol-card overflow-hidden" style={{ borderRadius: 12 }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left transition-colors">
                <span className="flex items-center gap-3.5">
                  <Icon name="MessageCircleQuestion" size={20} style={{ color: "#ef4444", flexShrink: 0 }} />
                  <span className="font-orb text-white" style={{ fontSize: "1.05rem" }}>{o.q}</span>
                </span>
                <Icon name="ChevronDown" size={20}
                  style={{ color: "rgba(255,255,255,0.4)", flexShrink: 0, transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.3s" }} />
              </button>
              <div style={{ maxHeight: open === i ? 240 : 0, overflow: "hidden", transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)" }}>
                <p className="font-exo text-white/65 leading-relaxed px-5 pb-5" style={{ paddingLeft: 56 }}>{o.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
