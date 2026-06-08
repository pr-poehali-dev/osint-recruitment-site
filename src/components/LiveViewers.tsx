import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

export default function LiveViewers() {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const base = 12 + Math.floor(Math.random() * 18);
    setCount(base);
    const t = setTimeout(() => setShow(true), 4000);
    const id = setInterval(() => {
      setCount(c => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(8, Math.min(48, c + delta));
      });
    }, 4000);
    return () => { clearTimeout(t); clearInterval(id); };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed left-6 z-[88] animate-fade-blur" style={{ bottom: 84 }}>
      <div className="vol-card flex items-center gap-2.5 px-4 py-2.5" style={{ borderRadius: 12 }}>
        <span className="relative flex items-center justify-center" style={{ width: 9, height: 9 }}>
          <span className="absolute inset-0 rounded-full animate-ping" style={{ background: "#22c55e" }} />
          <span className="relative w-2 h-2 rounded-full" style={{ background: "#22c55e" }} />
        </span>
        <Icon name="Eye" size={15} style={{ color: "rgba(255,255,255,0.6)" }} />
        <span className="font-stm text-[12px] tracking-wide" style={{ color: "rgba(255,255,255,0.85)" }}>
          <b className="text-white">{count}</b> смотрят сейчас
        </span>
      </div>
    </div>
  );
}
