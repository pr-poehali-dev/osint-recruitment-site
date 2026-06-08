import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const ADMIN_URL = "https://functions.poehali.dev/88252a0d-1b4c-4850-a460-7bcb94f113d5";

interface Item { id: number; url: string; caption: string; }

const FALLBACK: Item[] = [
  { id: 1, url: "https://cdn.poehali.dev/projects/31cf2f8d-8f85-4cf9-801d-b8ed9fa0968a/files/ad4b5353-0a0b-4317-94b5-d35ec12225fa.jpg", caption: "Командный центр OSINT" },
  { id: 2, url: "https://cdn.poehali.dev/projects/31cf2f8d-8f85-4cf9-801d-b8ed9fa0968a/files/5b44f9f3-1727-4817-a7ae-0d6468503cc8.jpg", caption: "Оператор БпЛА на задаче" },
  { id: 3, url: "https://cdn.poehali.dev/projects/31cf2f8d-8f85-4cf9-801d-b8ed9fa0968a/files/20bc72b4-167e-40d8-b4da-1a32cc9d85a8.jpg", caption: "Защищённая инфраструктура" },
  { id: 4, url: "https://cdn.poehali.dev/projects/31cf2f8d-8f85-4cf9-801d-b8ed9fa0968a/files/9c9a0c15-454d-4448-93df-73ee4e30b848.jpg", caption: "Анализ спутниковых данных" },
  { id: 5, url: "https://cdn.poehali.dev/projects/31cf2f8d-8f85-4cf9-801d-b8ed9fa0968a/files/07027175-6375-4b29-a5d1-bfe9cfbd25e0.jpg", caption: "Тыловое обеспечение" },
  { id: 6, url: "https://cdn.poehali.dev/projects/31cf2f8d-8f85-4cf9-801d-b8ed9fa0968a/files/196a39fe-3378-4cd0-b1c6-2d6d73b751b5.jpg", caption: "Наши специалисты" },
];

export default function Gallery() {
  const [items, setItems] = useState<Item[]>(FALLBACK);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${ADMIN_URL}?resource=gallery`)
      .then(r => r.json())
      .then(d => { if (d.gallery && d.gallery.length) setItems(d.gallery); })
      .catch(() => { /* fallback */ });
  }, []);

  const close = () => setActive(null);
  const prev = () => setActive(i => (i === null ? null : (i - 1 + items.length) % items.length));
  const next = () => setActive(i => (i === null ? null : (i + 1) % items.length));

  return (
    <section className="py-28 relative overflow-hidden" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="absolute inset-0 grid-cyber opacity-20 pointer-events-none" />
      <div className="max-w-[1440px] mx-auto px-6 relative">
        <div className="label-mono mb-3">Подразделение в деле</div>
        <div className="accent-line" />
        <h2 className="font-orb text-white leading-[0.95] mb-12" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}>
          Галерея<br /><span style={{ color: "rgba(255,255,255,0.4)" }}>службы</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((it, i) => (
            <button key={it.id} onClick={() => setActive(i)}
              className="group relative overflow-hidden hover-lift"
              style={{ borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", aspectRatio: "4/3" }}>
              <img src={it.url} alt={it.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                style={{ filter: "brightness(0.78) saturate(0.9)" }} loading="lazy" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(5,5,7,0.92))" }} />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                <div className="font-stm text-[11px] tracking-wide text-white/85">{it.caption}</div>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center justify-center" style={{ width: 34, height: 34, borderRadius: 9, background: "rgba(5,5,7,0.7)", border: "1px solid rgba(255,255,255,0.2)" }}>
                  <Icon name="Maximize2" size={15} style={{ color: "#fff" }} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Лайтбокс */}
      {active !== null && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 animate-fade-in"
          style={{ background: "rgba(5,5,7,0.94)", backdropFilter: "blur(8px)" }} onClick={close}>
          <button onClick={close} className="absolute top-6 right-6 transition-transform hover:rotate-90 z-10">
            <Icon name="X" size={28} style={{ color: "rgba(255,255,255,0.7)" }} />
          </button>
          <button onClick={e => { e.stopPropagation(); prev(); }}
            className="absolute left-4 sm:left-8 flex items-center justify-center transition-all hover:scale-110"
            style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.18)" }}>
            <Icon name="ChevronLeft" size={24} style={{ color: "#fff" }} />
          </button>
          <div className="max-w-4xl w-full animate-scale-reveal" onClick={e => e.stopPropagation()}>
            <img src={items[active].url} alt={items[active].caption}
              className="w-full max-h-[80vh] object-contain" style={{ borderRadius: 12 }} />
            <div className="text-center mt-5 font-orb text-white" style={{ fontSize: "1.2rem" }}>{items[active].caption}</div>
          </div>
          <button onClick={e => { e.stopPropagation(); next(); }}
            className="absolute right-4 sm:right-8 flex items-center justify-center transition-all hover:scale-110"
            style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.18)" }}>
            <Icon name="ChevronRight" size={24} style={{ color: "#fff" }} />
          </button>
        </div>
      )}
    </section>
  );
}
