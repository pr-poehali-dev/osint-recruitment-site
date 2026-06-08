import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { PUBLIC_API } from "@/lib/api";

interface Post { id: number; title: string; excerpt: string; body: string; image_url: string; created_at: string | null; }

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [active, setActive] = useState<Post | null>(null);

  useEffect(() => {
    fetch(`${PUBLIC_API}?resource=blog`)
      .then(r => r.json())
      .then(d => setPosts(d.blog || []))
      .catch(() => {});
  }, []);

  if (!posts.length) return null;

  return (
    <section id="blog" className="py-28 relative overflow-hidden sect-texture" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="absolute inset-0 grid-cyber opacity-20 pointer-events-none" />
      <div className="max-w-[1440px] mx-auto px-6 relative">
        <div className="label-mono mb-3">Новости и статьи</div>
        <div className="accent-line" />
        <h2 className="font-orb text-white leading-[0.95] mb-12" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}>
          База<br /><span style={{ color: "rgba(255,255,255,0.4)" }}>знаний</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <button key={p.id} onClick={() => setActive(p)}
              className="vol-card hover-lift overflow-hidden text-left animate-fade-blur flex flex-col"
              style={{ borderRadius: 14, animationDelay: `${i * 0.1}s`, opacity: 0 }}>
              {p.image_url && (
                <div className="overflow-hidden" style={{ aspectRatio: "16/9" }}>
                  <img src={p.image_url} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" style={{ filter: "brightness(0.8)" }} loading="lazy" />
                </div>
              )}
              <div className="p-6 flex-1 flex flex-col">
                <div className="font-orb text-white mb-3 leading-tight" style={{ fontSize: "1.2rem" }}>{p.title}</div>
                <p className="font-exo text-white/55 text-sm leading-relaxed flex-1">{p.excerpt}</p>
                <div className="flex items-center gap-2 mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                  <span className="font-stm text-[11px] tracking-wide" style={{ color: "#ef4444" }}>Читать</span>
                  <Icon name="ArrowRight" size={14} style={{ color: "#ef4444" }} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Модалка статьи */}
      {active && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 animate-fade-in"
          style={{ background: "rgba(5,5,7,0.92)", backdropFilter: "blur(8px)" }} onClick={() => setActive(null)}>
          <div className="vol-card w-full max-w-2xl max-h-[85vh] overflow-y-auto animate-scale-reveal" onClick={e => e.stopPropagation()} style={{ borderRadius: 16 }}>
            {active.image_url && (
              <img src={active.image_url} alt={active.title} className="w-full object-cover" style={{ maxHeight: 280, filter: "brightness(0.85)" }} />
            )}
            <div className="p-8">
              <button onClick={() => setActive(null)} className="float-right transition-transform hover:rotate-90">
                <Icon name="X" size={24} style={{ color: "rgba(255,255,255,0.5)" }} />
              </button>
              <h3 className="font-orb text-white mb-5" style={{ fontSize: "1.8rem" }}>{active.title}</h3>
              <p className="font-exo text-white/70 leading-[1.8] whitespace-pre-line">{active.body || active.excerpt}</p>
              <a href="#contacts" onClick={() => setActive(null)} className="btn-red-animated mt-7 px-8 py-3.5 inline-flex" style={{ borderRadius: 10 }}>
                <Icon name="Send" size={16} />Оставить заявку
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
