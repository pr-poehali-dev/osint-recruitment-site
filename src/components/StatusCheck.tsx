import { useState } from "react";
import Icon from "@/components/ui/icon";
import { PUBLIC_API } from "@/lib/api";

const STATUS_LABELS: Record<string, { label: string; icon: string; color: string }> = {
  new: { label: "Заявка принята, ожидает обработки", icon: "Inbox", color: "#facc15" },
  in_work: { label: "В работе — специалист скоро свяжется", icon: "Loader", color: "#3b82f6" },
  done: { label: "Заявка обработана, вы приняты", icon: "CheckCircle2", color: "#22c55e" },
  reject: { label: "По заявке принято отрицательное решение", icon: "XCircle", color: "#ef4444" },
};

export default function StatusCheck() {
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState<null | { found: boolean; status?: string }>(null);
  const [loading, setLoading] = useState(false);

  const check = async (e: React.FormEvent) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`${PUBLIC_API}?resource=status&phone=${encodeURIComponent("+" + digits)}`);
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ found: false });
    }
    setLoading(false);
  };

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

  const st = result?.status ? STATUS_LABELS[result.status] : null;

  return (
    <div className="vol-card p-7" style={{ borderRadius: 14, borderColor: "rgba(255,255,255,0.12)" }}>
      <div className="flex items-center gap-3 mb-5">
        <Icon name="SearchCheck" size={22} style={{ color: "#fff" }} />
        <div>
          <div className="font-orb text-white text-sm">Проверить статус заявки</div>
          <div className="font-stm text-[10px] tracking-wide mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>Введите номер, который указывали</div>
        </div>
      </div>
      <form onSubmit={check} className="flex flex-col sm:flex-row gap-3">
        <input className="form-input flex-1" type="tel" placeholder="+7 (___) ___-__-__"
          value={phone} onChange={e => setPhone(fmtPhone(e.target.value))}
          onFocus={e => { if (!e.target.value) setPhone("+7 ("); }} />
        <button type="submit" disabled={loading} className="btn-red-animated px-6 py-3" style={{ borderRadius: 8, opacity: loading ? 0.7 : 1, whiteSpace: "nowrap" }}>
          {loading ? <Icon name="Loader" size={15} className="animate-spin" /> : <Icon name="Search" size={15} />}
          Проверить
        </button>
      </form>

      {result && (
        <div className="mt-5 animate-scale-reveal">
          {result.found && st ? (
            <div className="flex items-center gap-3 p-4" style={{ borderRadius: 10, background: "rgba(255,255,255,0.03)", border: `1px solid ${st.color}40` }}>
              <Icon name={st.icon} size={22} style={{ color: st.color }} />
              <span className="font-exo text-white/85 text-sm">{st.label}</span>
            </div>
          ) : (
            <div className="flex items-center gap-3 p-4" style={{ borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <Icon name="SearchX" size={22} style={{ color: "rgba(255,255,255,0.5)" }} />
              <span className="font-exo text-white/70 text-sm">Заявка с таким номером не найдена. Оставьте заявку в форме ниже.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
