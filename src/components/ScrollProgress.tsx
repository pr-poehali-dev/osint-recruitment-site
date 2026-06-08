import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (scrolled / max) * 100 : 0);
      setShowTop(scrolled > 800);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Прогресс чтения */}
      <div className="fixed top-0 left-0 right-0 z-[95]" style={{ height: 3, background: "transparent" }}>
        <div style={{
          height: "100%",
          width: `${progress}%`,
          background: "linear-gradient(90deg, rgba(255,255,255,0.6), #dc2626)",
          boxShadow: "0 0 10px rgba(220,38,38,0.5)",
          transition: "width 0.1s linear",
        }} />
      </div>

      {/* Кнопка наверх */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Наверх"
        className="fixed bottom-6 left-6 z-[90] flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{
          width: 48, height: 48, borderRadius: 14,
          background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.03))",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
          opacity: showTop ? 1 : 0,
          pointerEvents: showTop ? "auto" : "none",
          transform: showTop ? "translateY(0)" : "translateY(20px)",
        }}>
        <Icon name="ArrowUp" size={22} style={{ color: "#fff" }} />
      </button>
    </>
  );
}
