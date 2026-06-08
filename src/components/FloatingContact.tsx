import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const LINKS = [
  { icon: "Send", label: "Telegram", href: "https://t.me/Ares_deavel7", color: "rgba(255,255,255," },
  { icon: "Phone", label: "Позвонить", href: "tel:+79490914468", color: "rgba(255,255,255," },
  { icon: "Mail", label: "Email", href: "mailto:titanzver200@gmail.com", color: "rgba(255,255,255," },
];

export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-3">
      {/* список контактов */}
      <div className={`flex flex-col items-end gap-3 transition-all duration-400 ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}`}>
        {LINKS.map((l, i) => (
          <a key={i} href={l.href} target="_blank" rel="noreferrer"
            className="flex items-center gap-3 group"
            style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}>
            <span className="font-stm text-[11px] tracking-wide px-3 py-1.5 vol-card"
              style={{ borderRadius: 8, color: "rgba(255,255,255,0.85)", whiteSpace: "nowrap" }}>
              {l.label}
            </span>
            <span className="flex items-center justify-center transition-all group-hover:scale-110"
              style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0.04))", border: "1px solid rgba(255,255,255,0.2)", boxShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
              <Icon name={l.icon} size={20} style={{ color: "#fff" }} />
            </span>
          </a>
        ))}
      </div>

      {/* главная кнопка */}
      <button onClick={() => setOpen(o => !o)} aria-label="Связаться"
        className="relative flex items-center justify-center transition-all hover:scale-105"
        style={{ width: 60, height: 60, borderRadius: 18, background: "linear-gradient(140deg, #b91c1c, #7f1010)", border: "1px solid rgba(255,80,60,0.4)", boxShadow: "0 6px 30px rgba(185,28,28,0.5)" }}>
        {!open && <span className="absolute inset-0 rounded-[18px] animate-ping" style={{ background: "rgba(185,28,28,0.4)" }} />}
        <Icon name={open ? "X" : "MessageCircle"} size={26} style={{ color: "#fff", position: "relative" }} className="transition-transform" />
        {/* онлайн-точка */}
        {!open && <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full animate-blink" style={{ background: "#22c55e", border: "2px solid #0a0a0b" }} />}
      </button>
    </div>
  );
}
