import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { PUBLIC_API } from "@/lib/api";

const TIMES = ["Как можно скорее", "В течение часа", "Сегодня вечером", "Завтра утром", "Завтра днём"];

export default function CallbackModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", preferred_time: TIMES[0] });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const onOpen = () => { setOpen(true); setSent(false); };
    window.addEventListener("open-callback", onOpen);
    return () => window.removeEventListener("open-callback", onOpen);
  }, []);

  const fmtPhone = (raw: string) => {
    let d = raw.replace(/\D/g, "");
    if (d.startsWith("8")) d = "7" + d.slice(1);
    if (!d.startsWith("7")) d = "7" + d;
    d = d.slice(0, 11);
    const p = d.slice(1);
    let out = "+7";
    if (p.length > 0) out += " (" + p.slice(0, 3);
    if (p.length >= 3) out += ") " + p.slice(3, 6);
    if (p.length >= 6) out += "-" + p.slice(6, 8);
    if (p.length >= 8) out += "-" + p.slice(8, 10);
    return out;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.phone.replace(/\D/g, "").length !== 11) return;
    setSending(true);
    try {
      await fetch(PUBLIC_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "callback", ...form }),
      });
      setSent(true);
      setForm({ name: "", phone: "", preferred_time: TIMES[0] });
      setTimeout(() => { setSent(false); setOpen(false); }, 3500);
    } catch { /* ignore */ }
    setSending(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[111] flex items-center justify-center p-4 animate-fade-in"
      style={{ background: "rgba(5,5,7,0.88)", backdropFilter: "blur(10px)" }} onClick={() => setOpen(false)}>
      <div className="vol-card cyber-frame w-full max-w-md p-8 animate-scale-reveal relative" onClick={e => e.stopPropagation()} style={{ borderRadius: 16 }}>
        <button onClick={() => setOpen(false)} className="absolute top-5 right-5 transition-transform hover:rotate-90">
          <Icon name="X" size={22} style={{ color: "rgba(255,255,255,0.5)" }} />
        </button>

        {sent ? (
          <div className="flex flex-col items-center gap-4 py-10 animate-scale-in">
            <div className="flex items-center justify-center" style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(34,197,94,0.12)", border: "2px solid rgba(34,197,94,0.4)" }}>
              <Icon name="PhoneCall" size={32} style={{ color: "#22c55e" }} />
            </div>
            <div className="font-orb text-white text-lg text-center">Заявка принята!</div>
            <div className="font-exo text-white/55 text-center text-sm">Перезвоним в указанное время</div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center" style={{ width: 48, height: 48, borderRadius: 13, background: "rgba(220,38,38,0.12)", border: "1px solid rgba(220,38,38,0.3)" }}>
                <Icon name="PhoneCall" size={22} style={{ color: "#ef4444" }} />
              </div>
              <div>
                <h3 className="font-orb text-white" style={{ fontSize: "1.4rem" }}>Заказать звонок</h3>
                <div className="font-stm text-[10px] tracking-wide" style={{ color: "rgba(255,255,255,0.45)" }}>Перезвоним когда удобно</div>
              </div>
            </div>
            <form onSubmit={submit} className="space-y-4">
              <input className="form-input" placeholder="Ваше имя" value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
              <input className="form-input" type="tel" placeholder="+7 (___) ___-__-__" required value={form.phone}
                onChange={e => setForm(p => ({ ...p, phone: fmtPhone(e.target.value) }))}
                onFocus={e => { if (!e.target.value) setForm(p => ({ ...p, phone: "+7 (" })); }} />
              <div>
                <label className="font-stm text-[10px] block mb-2 tracking-widest" style={{ color: "rgba(255,255,255,0.55)" }}>КОГДА ПЕРЕЗВОНИТЬ</label>
                <div className="grid grid-cols-2 gap-2">
                  {TIMES.map(t => (
                    <button key={t} type="button" onClick={() => setForm(p => ({ ...p, preferred_time: t }))}
                      className="font-stm text-[11px] tracking-wide px-3 py-2.5 transition-all"
                      style={{ borderRadius: 8, background: form.preferred_time === t ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.03)", border: form.preferred_time === t ? "1px solid rgba(255,255,255,0.4)" : "1px solid rgba(255,255,255,0.1)", color: form.preferred_time === t ? "#fff" : "rgba(255,255,255,0.55)" }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <button type="submit" disabled={sending} className="btn-red-animated w-full py-4" style={{ borderRadius: 10, opacity: sending ? 0.7 : 1 }}>
                {sending ? <><Icon name="Loader" size={16} className="animate-spin" />Отправляем...</> : <><Icon name="PhoneCall" size={16} />Заказать звонок</>}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
