import { useState, useCallback } from "react";
import Icon from "@/components/ui/icon";

const REVIEWS_URL = "https://functions.poehali.dev/089447e4-e2ac-479d-b710-5eb8cb862516";

interface Review {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
  status: string;
  created_at: string | null;
}

export default function Admin() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cfg, setCfg] = useState({
    applications_count: "", deadline_date: "",
    pay_once: "", pay_monthly: "", pay_federal: "", pay_year_total: "",
  });
  const [cfgSaved, setCfgSaved] = useState(false);

  const load = useCallback(async (pwd: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${REVIEWS_URL}?all=1`, {
        headers: { "X-Admin-Password": pwd },
      });
      const data = await res.json();
      setReviews(data.reviews || []);
      const s = data.settings || {};
      setCfg({
        applications_count: String(data.applications_count ?? s.applications_count ?? ""),
        deadline_date: s.deadline_date || "",
        pay_once: s.pay_once || "2600000",
        pay_monthly: s.pay_monthly || "210000",
        pay_federal: s.pay_federal || "400000",
        pay_year_total: s.pay_year_total || "5120000",
      });
      setAuthed(true);
    } catch {
      setError("Ошибка загрузки");
    }
    setLoading(false);
  }, []);

  const saveCfg = async () => {
    try {
      await fetch(REVIEWS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Admin-Password": password },
        body: JSON.stringify({ action: "set_settings", settings: cfg }),
      });
      setCfgSaved(true);
      setTimeout(() => setCfgSaved(false), 2500);
    } catch { /* ignore */ }
  };

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim()) load(password);
  };

  const moderate = async (id: number, action: "approve" | "reject" | "delete") => {
    try {
      await fetch(REVIEWS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Admin-Password": password },
        body: JSON.stringify({ action, id }),
      });
      load(password);
    } catch { /* ignore */ }
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--bg)" }}>
        <form onSubmit={login} className="vol-card p-9 w-full max-w-sm animate-scale-reveal" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
          <div className="flex items-center gap-3 mb-7">
            <div className="flex items-center justify-center" style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)" }}>
              <Icon name="ShieldCheck" size={22} style={{ color: "#ffffff" }} />
            </div>
            <div>
              <div className="font-orb text-white text-lg">Модерация</div>
              <div className="font-stm text-[10px] tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>Панель администратора</div>
            </div>
          </div>
          <input type="password" className="form-input mb-4" placeholder="Пароль администратора"
            value={password} onChange={e => setPassword(e.target.value)} autoFocus />
          {error && <div className="font-exo text-sm mb-4" style={{ color: "#ef4444" }}>{error}</div>}
          <button type="submit" disabled={loading} className="btn-red-animated w-full py-3.5" style={{ borderRadius: 8, opacity: loading ? 0.7 : 1 }}>
            {loading ? <><Icon name="Loader" size={16} className="animate-spin" />Вход...</> : <><Icon name="LogIn" size={16} />Войти</>}
          </button>
        </form>
      </div>
    );
  }

  const pending = reviews.filter(r => r.status === "pending");
  const others = reviews.filter(r => r.status !== "pending");

  const card = (r: Review) => (
    <div key={r.id} className="vol-card hover-lift p-6 flex flex-col gap-4 animate-fade-blur" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, s) => (
            <Icon key={s} name="Star" size={13} style={{ color: s < r.rating ? "#ffffff" : "rgba(255,255,255,0.15)", fill: s < r.rating ? "#ffffff" : "transparent" }} />
          ))}
        </div>
        <span className="font-stm text-[9px] tracking-widest px-2.5 py-1" style={{
          borderRadius: 4,
          background: r.status === "approved" ? "rgba(255,255,255,0.1)" : r.status === "rejected" ? "rgba(239,68,68,0.12)" : "rgba(255,200,0,0.12)",
          color: r.status === "approved" ? "rgba(255,255,255,0.8)" : r.status === "rejected" ? "#ef4444" : "#ffc800",
        }}>
          {r.status === "approved" ? "ОПУБЛИКОВАН" : r.status === "rejected" ? "ОТКЛОНЁН" : "НА ПРОВЕРКЕ"}
        </span>
      </div>
      <p className="font-exo text-white/75 text-sm leading-relaxed">{r.text}</p>
      <div className="font-orb text-white text-sm">{r.name}</div>
      <div className="font-stm text-[10px] tracking-wide" style={{ color: "rgba(255,255,255,0.4)" }}>{r.role}</div>
      <div className="flex gap-2 pt-2">
        {r.status !== "approved" && (
          <button onClick={() => moderate(r.id, "approve")} className="btn-ghost flex-1 py-2.5 text-[10px]" style={{ borderRadius: 6 }}>
            <Icon name="Check" size={13} />Одобрить
          </button>
        )}
        {r.status !== "rejected" && (
          <button onClick={() => moderate(r.id, "reject")} className="btn-ghost flex-1 py-2.5 text-[10px]" style={{ borderRadius: 6 }}>
            <Icon name="X" size={13} />Скрыть
          </button>
        )}
        <button onClick={() => moderate(r.id, "delete")} className="flex items-center justify-center px-3 py-2.5 transition-all hover:scale-105"
          style={{ borderRadius: 6, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)" }}>
          <Icon name="Trash2" size={13} style={{ color: "#ef4444" }} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen px-6 py-12" style={{ background: "var(--bg)" }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-orb text-white" style={{ fontSize: "2rem" }}>Модерация отзывов</h1>
            <div className="font-stm text-[11px] tracking-wider mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
              На проверке: {pending.length} · Всего: {reviews.length}
            </div>
          </div>
          <button onClick={() => load(password)} className="btn-ghost px-5 py-3 text-xs hover-lift" style={{ borderRadius: 8 }}>
            <Icon name="RefreshCw" size={15} />Обновить
          </button>
        </div>

        {/* Настройки сайта */}
        <div className="vol-card p-7 mb-10" style={{ borderRadius: 14, borderColor: "rgba(255,255,255,0.12)" }}>
          <div className="flex items-center gap-3 mb-6">
            <Icon name="SlidersHorizontal" size={22} style={{ color: "#fff" }} />
            <div>
              <div className="font-orb text-white text-base">Настройки сайта</div>
              <div className="font-stm text-[10px] tracking-wide mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>Числа отображаются на главной странице</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { k: "deadline_date", l: "Дата окончания набора", hint: "Когда таймер дойдёт до нуля", type: "date" },
              { k: "applications_count", l: "Счётчик «Уже подали»", hint: "Число заявок", type: "number" },
              { k: "pay_once", l: "Единовременная выплата ₽", hint: "При заключении контракта", type: "number" },
              { k: "pay_monthly", l: "Ежемесячная выплата ₽", hint: "Базовая зарплата в месяц", type: "number" },
              { k: "pay_federal", l: "Федеральная выплата ₽", hint: "Доп. выплата от государства", type: "number" },
              { k: "pay_year_total", l: "Доход за 1-й год ₽", hint: "Итоговая цифра в баннере", type: "number" },
            ].map(f => (
              <div key={f.k}>
                <label className="font-stm text-[10px] block mb-2 tracking-widest" style={{ color: "rgba(255,255,255,0.55)" }}>{f.l}</label>
                <input type={f.type} min={0} className="form-input"
                  value={cfg[f.k as keyof typeof cfg]}
                  onChange={e => setCfg(p => ({ ...p, [f.k]: e.target.value }))} />
                <div className="font-stm text-[9px] mt-1.5" style={{ color: "rgba(255,255,255,0.3)" }}>{f.hint}</div>
              </div>
            ))}
          </div>

          <button onClick={saveCfg} className="btn-red-animated px-7 py-3.5 text-xs mt-6" style={{ borderRadius: 8 }}>
            {cfgSaved ? <><Icon name="Check" size={15} />Сохранено</> : <><Icon name="Save" size={15} />Сохранить настройки</>}
          </button>
        </div>

        {pending.length > 0 && (
          <>
            <div className="label-mono mb-4">Ожидают модерации</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
              {pending.map(card)}
            </div>
          </>
        )}

        <div className="label-mono mb-4">Все отзывы</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {others.map(card)}
        </div>
        {reviews.length === 0 && (
          <div className="font-exo text-white/40 text-center py-20">Отзывов пока нет</div>
        )}
      </div>
    </div>
  );
}