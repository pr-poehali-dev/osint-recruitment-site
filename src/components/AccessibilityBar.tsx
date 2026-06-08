import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

export default function AccessibilityBar() {
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(false);
  const [a11y, setA11y] = useState(false);

  useEffect(() => {
    const savedLight = localStorage.getItem("theme") === "light";
    const savedA11y = localStorage.getItem("a11y") === "1";
    setLight(savedLight);
    setA11y(savedA11y);
    applyTheme(savedLight, savedA11y);
  }, []);

  const applyTheme = (isLight: boolean, isA11y: boolean) => {
    const root = document.documentElement;
    root.classList.toggle("light", isLight && !isA11y);
    root.classList.toggle("a11y", isA11y);
  };

  const toggleLight = () => {
    const v = !light;
    setLight(v);
    localStorage.setItem("theme", v ? "light" : "dark");
    applyTheme(v, a11y);
  };

  const toggleA11y = () => {
    const v = !a11y;
    setA11y(v);
    localStorage.setItem("a11y", v ? "1" : "0");
    applyTheme(light, v);
  };

  return (
    <div className="fixed right-6 z-[89] flex flex-col-reverse items-end gap-2" style={{ bottom: 88 }}>
      <button onClick={() => setOpen(o => !o)} aria-label="Настройки отображения"
        className="flex items-center justify-center transition-all hover:scale-105"
        style={{ width: 48, height: 48, borderRadius: 14, background: "var(--bg2)", border: "1px solid var(--border2)", boxShadow: "0 4px 16px rgba(0,0,0,0.4)" }}>
        <Icon name="Eye" size={20} style={{ color: "var(--white)" }} />
      </button>

      {open && (
        <div className="vol-card p-4 animate-scale-reveal flex flex-col gap-2.5" style={{ borderRadius: 14, minWidth: 220 }}>
          <div className="font-stm text-[10px] tracking-widest px-1 pb-1" style={{ color: "var(--dim)" }}>ОТОБРАЖЕНИЕ</div>

          <button onClick={toggleLight}
            className="flex items-center justify-between gap-3 p-3 transition-all hover:scale-[1.02]"
            style={{ borderRadius: 10, background: light ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.03)", border: "1px solid var(--border2)" }}>
            <span className="flex items-center gap-2.5">
              <Icon name={light ? "Sun" : "Moon"} size={18} style={{ color: "var(--white)" }} />
              <span className="font-exo text-sm" style={{ color: "var(--white)" }}>{light ? "Светлая тема" : "Тёмная тема"}</span>
            </span>
            <div style={{ width: 36, height: 20, borderRadius: 10, background: light ? "var(--red2)" : "var(--border2)", position: "relative", transition: "background 0.2s" }}>
              <div style={{ position: "absolute", top: 2, left: light ? 18 : 2, width: 16, height: 16, borderRadius: "50%", background: "#fff", transition: "left 0.2s" }} />
            </div>
          </button>

          <button onClick={toggleA11y}
            className="flex items-center justify-between gap-3 p-3 transition-all hover:scale-[1.02]"
            style={{ borderRadius: 10, background: a11y ? "rgba(255,255,0,0.12)" : "rgba(255,255,255,0.03)", border: "1px solid var(--border2)" }}>
            <span className="flex items-center gap-2.5">
              <Icon name="Accessibility" size={18} style={{ color: "var(--white)" }} />
              <span className="font-exo text-sm" style={{ color: "var(--white)" }}>Для слабовидящих</span>
            </span>
            <div style={{ width: 36, height: 20, borderRadius: 10, background: a11y ? "#facc15" : "var(--border2)", position: "relative", transition: "background 0.2s" }}>
              <div style={{ position: "absolute", top: 2, left: a11y ? 18 : 2, width: 16, height: 16, borderRadius: "50%", background: "#fff", transition: "left 0.2s" }} />
            </div>
          </button>
        </div>
      )}
    </div>
  );
}