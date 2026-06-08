import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Answer { label: string; tag: string; icon: string; }
interface Question { q: string; answers: Answer[]; }

const QUESTIONS: Question[] = [
  {
    q: "Что вам ближе по складу характера?",
    answers: [
      { label: "Анализ информации, поиск данных", tag: "osint", icon: "Search" },
      { label: "Техника, компьютеры, сети", tag: "it", icon: "Monitor" },
      { label: "Управление техникой, движение", tag: "bpla", icon: "Plane" },
      { label: "Организация, логистика, порядок", tag: "logistics", icon: "Truck" },
    ],
  },
  {
    q: "Есть ли у вас профильный опыт?",
    answers: [
      { label: "Да, работал по специальности", tag: "exp", icon: "Award" },
      { label: "Нет, но готов учиться с нуля", tag: "noexp", icon: "GraduationCap" },
    ],
  },
  {
    q: "Что для вас важнее всего?",
    answers: [
      { label: "Высокий стабильный доход", tag: "money", icon: "Banknote" },
      { label: "Работа без боевых действий", tag: "safe", icon: "ShieldCheck" },
      { label: "Профессиональный рост", tag: "growth", icon: "TrendingUp" },
    ],
  },
];

const RESULTS: Record<string, { title: string; desc: string; icon: string }> = {
  osint: { title: "OSINT-аналитик", desc: "Вам подходит аналитическая работа с открытыми источниками. Интеллектуальный труд в тылу.", icon: "Search" },
  it: { title: "IT-специалист", desc: "Ваш профиль — защищённая инфраструктура и администрирование. Работа по специальности.", icon: "Monitor" },
  bpla: { title: "Оператор БпЛА", desc: "Вам подойдёт управление беспилотниками для разведки. Обучение с нуля бесплатно.", icon: "Plane" },
  logistics: { title: "Логистика и обеспечение", desc: "Ваша стихия — порядок и снабжение. Тыловое обеспечение подразделения.", icon: "Truck" },
};

export default function Quiz() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const reset = () => { setStep(0); setTags([]); setDone(false); };

  const pick = (tag: string) => {
    const newTags = [...tags, tag];
    setTags(newTags);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  };

  const resultKey = tags.find(t => RESULTS[t]) || "osint";
  const result = RESULTS[resultKey];
  const progress = done ? 100 : (step / QUESTIONS.length) * 100;

  return (
    <section className="py-28 relative overflow-hidden" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="absolute inset-0 grid-cyber opacity-20 pointer-events-none" />
      <div className="max-w-[760px] mx-auto px-6 relative text-center">
        <div className="label-mono mb-3">Подбор должности</div>
        <div className="accent-line mx-auto" style={{ marginLeft: "auto", marginRight: "auto" }} />
        <h2 className="font-orb text-white leading-[0.95] mb-6" style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)" }}>
          Какая должность<br /><span style={{ color: "rgba(255,255,255,0.4)" }}>вам подходит?</span>
        </h2>
        <p className="font-exo text-white/55 mb-10 max-w-lg mx-auto">
          Пройдите короткий тест из 3 вопросов — подберём подходящее направление службы за 30 секунд.
        </p>

        {!open ? (
          <button onClick={() => { setOpen(true); reset(); }}
            className="btn-red-animated px-10 py-4 mx-auto" style={{ borderRadius: 12 }}>
            <Icon name="ClipboardList" size={18} />
            Пройти тест
          </button>
        ) : (
          <div className="vol-card cyber-frame p-8 sm:p-10 text-left animate-scale-reveal" style={{ borderRadius: 18 }}>
            {/* Прогресс */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="font-stm text-[10px] tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {done ? "ГОТОВО" : `ВОПРОС ${step + 1} / ${QUESTIONS.length}`}
                </span>
                <span className="font-stm text-[10px] tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {Math.round(progress)}%
                </span>
              </div>
              <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,0.08)" }}>
                <div style={{ height: "100%", width: `${progress}%`, borderRadius: 2, background: "linear-gradient(90deg, rgba(255,255,255,0.6), #dc2626)", transition: "width 0.4s ease" }} />
              </div>
            </div>

            {!done ? (
              <div className="animate-fade-blur" key={step}>
                <h3 className="font-orb text-white mb-7" style={{ fontSize: "1.4rem" }}>{QUESTIONS[step].q}</h3>
                <div className="space-y-3">
                  {QUESTIONS[step].answers.map((a, i) => (
                    <button key={i} onClick={() => pick(a.tag)}
                      className="w-full flex items-center gap-4 p-4 transition-all hover:scale-[1.02] hover-lift text-left"
                      style={{ borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)" }}>
                      <div className="shrink-0 flex items-center justify-center" style={{ width: 44, height: 44, borderRadius: 11, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
                        <Icon name={a.icon} size={20} style={{ color: "#fff" }} />
                      </div>
                      <span className="font-exo text-white/85">{a.label}</span>
                      <Icon name="ChevronRight" size={18} style={{ color: "rgba(255,255,255,0.3)", marginLeft: "auto" }} />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center animate-scale-reveal py-4">
                <div className="flex items-center justify-center mx-auto mb-6" style={{ width: 80, height: 80, borderRadius: 20, background: "linear-gradient(135deg, rgba(220,38,38,0.18), rgba(220,38,38,0.05))", border: "1px solid rgba(220,38,38,0.3)" }}>
                  <Icon name={result.icon} size={38} style={{ color: "#ef4444" }} />
                </div>
                <div className="font-stm text-[11px] tracking-widest mb-2" style={{ color: "rgba(239,68,68,0.85)" }}>ВАМ ПОДХОДИТ</div>
                <h3 className="font-orb text-white mb-4" style={{ fontSize: "2rem" }}>{result.title}</h3>
                <p className="font-exo text-white/60 leading-relaxed mb-8 max-w-md mx-auto">{result.desc}</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href="#contacts" className="btn-red-animated px-8 py-3.5" style={{ borderRadius: 10 }}>
                    <Icon name="Send" size={16} />Оставить заявку
                  </a>
                  <button onClick={reset} className="btn-ghost px-8 py-3.5" style={{ borderRadius: 10 }}>
                    <Icon name="RotateCcw" size={16} />Пройти заново
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
