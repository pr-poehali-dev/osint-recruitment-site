import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

export default function ExitPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("exit_popup_shown")) return;
    let armed = false;
    const arm = setTimeout(() => { armed = true; }, 8000);

    const onLeave = (e: MouseEvent) => {
      if (armed && e.clientY <= 0) {
        setShow(true);
        sessionStorage.setItem("exit_popup_shown", "1");
        document.removeEventListener("mouseout", onLeave);
      }
    };
    document.addEventListener("mouseout", onLeave);
    return () => {
      clearTimeout(arm);
      document.removeEventListener("mouseout", onLeave);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 animate-fade-in"
      style={{ background: "rgba(5,5,7,0.88)", backdropFilter: "blur(10px)" }}
      onClick={() => setShow(false)}>
      <div className="vol-card cyber-frame w-full max-w-md p-9 animate-scale-reveal relative overflow-hidden"
        onClick={e => e.stopPropagation()} style={{ borderRadius: 16 }}>
        <div className="absolute top-0 inset-x-0 h-28 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at top, rgba(220,38,38,0.18), transparent 70%)" }} />

        <button onClick={() => setShow(false)} className="absolute top-5 right-5 transition-transform hover:rotate-90">
          <Icon name="X" size={22} style={{ color: "rgba(255,255,255,0.5)" }} />
        </button>

        <div className="relative">
          <div className="flex items-center justify-center mb-6" style={{ width: 60, height: 60, borderRadius: 16, background: "rgba(220,38,38,0.12)", border: "1px solid rgba(220,38,38,0.3)" }}>
            <Icon name="Clock" size={28} style={{ color: "#ef4444" }} />
          </div>
          <h3 className="font-orb text-white leading-tight mb-4" style={{ fontSize: "1.7rem" }}>
            Уходите без заявки?
          </h3>
          <p className="font-exo text-white/65 leading-relaxed mb-7">
            Оставьте номер — специалист перезвонит и ответит на все вопросы. Это ни к чему не обязывает, всё конфиденциально.
          </p>
          <a href="#contacts" onClick={() => setShow(false)}
            className="btn-red-animated w-full py-4" style={{ borderRadius: 10 }}>
            <Icon name="Send" size={16} />
            Оставить заявку
          </a>
          <button onClick={() => setShow(false)}
            className="w-full text-center mt-4 font-stm text-[11px] tracking-wide transition-colors"
            style={{ color: "rgba(255,255,255,0.4)" }}>
            Нет, спасибо
          </button>
        </div>
      </div>
    </div>
  );
}
