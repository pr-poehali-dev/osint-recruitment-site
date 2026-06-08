import { useState, useEffect, useRef, useCallback } from "react";
import Icon from "@/components/ui/icon";

const REVIEWS_URL = "https://functions.poehali.dev/089447e4-e2ac-479d-b710-5eb8cb862516";

interface Review {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
}

const FALLBACK: Review[] = [
  { id: -1, name: "Алексей М.", role: "OSINT-аналитик · 8 мес. службы", rating: 5,
    text: "Пришёл без опыта, обучили с нуля. Работа интеллектуальная, без участия в боях. Выплаты приходят день в день, всё официально по контракту." },
  { id: -2, name: "Дмитрий К.", role: "Оператор БпЛА · 1 год службы", rating: 5,
    text: "Долго сомневался, но решился. Полностью обеспечили экипировкой, проезд оплатили. Доход за первый год превысил 5 миллионов — закрыл ипотеку." },
  { id: -3, name: "Сергей В.", role: "IT-специалист · 6 мес. службы", rating: 5,
    text: "Занимаюсь защищённой инфраструктурой, по своей специальности. Коллектив профессиональный, командование адекватное. Семья получила все льготы." },
];

function initials(name: string) {
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase() || "").join("");
}

const FILTERS = [
  { v: "all", l: "Все" },
  { v: "OSINT", l: "OSINT" },
  { v: "IT", l: "IT" },
  { v: "БпЛА", l: "БпЛА" },
  { v: "Логист", l: "Логистика" },
  { v: "СМИ", l: "СМИ" },
];

export default function ReviewsCarousel() {
  const [allReviews, setAllReviews] = useState<Review[]>(FALLBACK);
  const [filter, setFilter] = useState("all");
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(3);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", text: "", rating: 5 });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch(REVIEWS_URL);
      const data = await res.json();
      if (data.reviews && data.reviews.length) setAllReviews(data.reviews);
    } catch { /* keep fallback */ }
  }, []);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    const calc = () => setPerView(window.innerWidth < 768 ? 1 : window.innerWidth < 1100 ? 2 : 3);
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const reviews = filter === "all"
    ? allReviews
    : allReviews.filter(r => r.role.toLowerCase().includes(filter.toLowerCase()));

  useEffect(() => { setIndex(0); }, [filter]);

  const maxIndex = Math.max(0, reviews.length - perView);

  const next = useCallback(() => setIndex(i => (i >= maxIndex ? 0 : i + 1)), [maxIndex]);
  const prev = useCallback(() => setIndex(i => (i <= 0 ? maxIndex : i - 1)), [maxIndex]);

  useEffect(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(next, 5000);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [next]);

  useEffect(() => { if (index > maxIndex) setIndex(maxIndex); }, [maxIndex, index]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) return;
    setSending(true);
    try {
      await fetch(REVIEWS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "create", ...form }),
      });
      setSent(true);
      setForm({ name: "", role: "", text: "", rating: 5 });
      setTimeout(() => { setSent(false); setShowForm(false); }, 3500);
    } catch { /* ignore */ }
    setSending(false);
  };

  return (
    <section className="py-28 relative overflow-hidden sect-texture" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="absolute inset-0 grid-cyber opacity-20 pointer-events-none" />
      <div className="max-w-[1440px] mx-auto px-6 relative">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div>
            <div className="label-mono mb-3">Отзывы служащих</div>
            <div className="accent-line" />
            <h2 className="font-orb text-white leading-[0.95]" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}>
              Говорят<br /><span style={{ color: "rgba(255,255,255,0.4)" }}>наши люди</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowForm(true)}
              className="btn-ghost px-6 py-3.5 text-xs hover-lift" style={{ borderRadius: "8px" }}>
              <Icon name="Plus" size={15} />
              Оставить отзыв
            </button>
            <button onClick={prev} aria-label="Назад"
              className="vol-card hover-lift flex items-center justify-center transition-all"
              style={{ width: 48, height: 48, borderRadius: 10 }}>
              <Icon name="ChevronLeft" size={20} style={{ color: "rgba(255,255,255,0.7)" }} />
            </button>
            <button onClick={next} aria-label="Вперёд"
              className="vol-card hover-lift flex items-center justify-center transition-all"
              style={{ width: 48, height: 48, borderRadius: 10 }}>
              <Icon name="ChevronRight" size={20} style={{ color: "rgba(255,255,255,0.7)" }} />
            </button>
          </div>
        </div>

        {/* Фильтры */}
        <div className="flex flex-wrap gap-2.5 mb-10">
          {FILTERS.map(f => (
            <button key={f.v} onClick={() => setFilter(f.v)}
              className="font-stm text-[11px] tracking-wide px-4 py-2 transition-all hover:scale-105"
              style={{
                borderRadius: 8,
                background: filter === f.v ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.03)",
                border: filter === f.v ? "1px solid rgba(255,255,255,0.4)" : "1px solid rgba(255,255,255,0.1)",
                color: filter === f.v ? "#fff" : "rgba(255,255,255,0.5)",
              }}>
              {f.l}
            </button>
          ))}
        </div>

        {reviews.length === 0 ? (
          <div className="vol-card p-12 text-center" style={{ borderRadius: 16 }}>
            <Icon name="MessageSquareOff" size={36} style={{ color: "rgba(255,255,255,0.3)" }} className="mx-auto mb-4" />
            <p className="font-exo text-white/50">По этой специальности пока нет отзывов</p>
          </div>
        ) : (
        <div className="overflow-hidden">
          <div className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ transform: `translateX(-${index * (100 / perView)}%)` }}>
            {reviews.map((r) => (
              <div key={r.id} className="shrink-0 px-3.5" style={{ width: `${100 / perView}%` }}>
                <div className="vol-card hover-lift shimmer-hover p-9 flex flex-col gap-6 h-full"
                  style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                  <Icon name="Quote" size={34} style={{ color: "rgba(255,255,255,0.25)" }} />
                  <p className="font-exo text-white/75 leading-[1.8] flex-1" style={{ fontSize: "1.02rem" }}>{r.text}</p>
                  <div className="flex items-center gap-1.5">
                    {[...Array(5)].map((_, s) => (
                      <Icon key={s} name="Star" size={15}
                        style={{ color: s < r.rating ? "#ffffff" : "rgba(255,255,255,0.15)", fill: s < r.rating ? "#ffffff" : "transparent" }} />
                    ))}
                  </div>
                  <div className="flex items-center gap-4 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="shrink-0 flex items-center justify-center font-orb text-white"
                      style={{ width: 50, height: 50, borderRadius: 14, fontSize: "1rem", background: "linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0.04))", border: "1px solid rgba(255,255,255,0.18)", boxShadow: "0 0 20px rgba(255,255,255,0.06)" }}>
                      {initials(r.name)}
                    </div>
                    <div>
                      <div className="font-orb text-white" style={{ fontSize: "1.05rem" }}>{r.name}</div>
                      <div className="font-stm text-[11px] tracking-wide mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{r.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        )}

        {/* Dots */}
        {reviews.length > perView && (
          <div className="flex items-center justify-center gap-2 mt-10">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button key={i} onClick={() => setIndex(i)} aria-label={`Слайд ${i + 1}`}
                className="transition-all duration-300"
                style={{
                  width: i === index ? 28 : 8, height: 8, borderRadius: 4,
                  background: i === index ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.2)",
                }} />
            ))}
          </div>
        )}
      </div>

      {/* Модалка формы */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
          style={{ background: "rgba(5,5,7,0.85)", backdropFilter: "blur(8px)" }}
          onClick={() => setShowForm(false)}>
          <div className="vol-card w-full max-w-lg p-8 animate-scale-reveal" onClick={e => e.stopPropagation()}
            style={{ borderColor: "rgba(255,255,255,0.15)" }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-orb text-white" style={{ fontSize: "1.5rem" }}>Оставить отзыв</h3>
              <button onClick={() => setShowForm(false)} className="transition-transform hover:rotate-90">
                <Icon name="X" size={22} style={{ color: "rgba(255,255,255,0.5)" }} />
              </button>
            </div>

            {sent ? (
              <div className="flex flex-col items-center gap-4 py-10 animate-scale-in">
                <div className="flex items-center justify-center"
                  style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(255,255,255,0.08)", border: "2px solid rgba(255,255,255,0.3)" }}>
                  <Icon name="Check" size={34} style={{ color: "#ffffff" }} />
                </div>
                <div className="font-orb text-white text-lg text-center">Спасибо за отзыв!</div>
                <div className="font-exo text-white/50 text-sm text-center">Он появится на сайте после проверки модератором</div>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <input className="form-input" placeholder="Ваше имя *" required maxLength={100}
                  value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                <input className="form-input" placeholder="Должность / стаж (например: Оператор БпЛА · 6 мес.)" maxLength={150}
                  value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))} />
                <textarea className="form-input resize-none" rows={4} placeholder="Ваш отзыв *" required
                  value={form.text} onChange={e => setForm(p => ({ ...p, text: e.target.value }))} />
                <div className="flex items-center gap-3">
                  <span className="font-stm text-[11px] tracking-wide" style={{ color: "rgba(255,255,255,0.5)" }}>Оценка:</span>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map(s => (
                      <button key={s} type="button" onClick={() => setForm(p => ({ ...p, rating: s }))}
                        className="transition-transform hover:scale-125">
                        <Icon name="Star" size={22}
                          style={{ color: s <= form.rating ? "#ffffff" : "rgba(255,255,255,0.2)", fill: s <= form.rating ? "#ffffff" : "transparent" }} />
                      </button>
                    ))}
                  </div>
                </div>
                <button type="submit" disabled={sending}
                  className="btn-red-animated w-full py-4 mt-2" style={{ borderRadius: "8px", opacity: sending ? 0.7 : 1 }}>
                  {sending ? <><Icon name="Loader" size={16} className="animate-spin" />Отправляем...</> : <><Icon name="Send" size={16} />Отправить отзыв</>}
                </button>
                <p className="font-stm text-[9px] tracking-wide text-center" style={{ color: "rgba(255,255,255,0.25)" }}>
                  Отзыв публикуется после проверки модератором
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}