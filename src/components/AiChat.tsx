import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

const AI_API = "https://functions.poehali.dev/ee4c7558-db81-4129-ab4d-a51f6900a448";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content:
    "Здравия желаю! Я ИИ-консультант. Спрашивайте про службу по контракту: льготы, выплаты, этапы поступления — отвечу за минуту.",
};

const QUICK = ["Какие выплаты?", "Какие льготы?", "Как подать заявку?"];

export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || loading) return;
    const next = [...messages, { role: "user" as const, content: q }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch(AI_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      const reply =
        data.reply ||
        "Извините, не удалось получить ответ. Попробуйте позже или закажите звонок.";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Связь прервалась. Попробуйте ещё раз или оставьте заявку — мы перезвоним.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <>
      {/* кнопка-триггер */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="ИИ-консультант"
          className="fixed left-6 z-[90] flex items-center justify-center transition-all hover:scale-105"
          style={{
            bottom: 96,
            width: 60,
            height: 60,
            borderRadius: 18,
            background: "linear-gradient(140deg, #1e50e0, #0e2a80)",
            border: "1px solid rgba(90,150,255,0.4)",
            boxShadow: "0 6px 30px rgba(47,107,255,0.5)",
          }}
        >
          <span
            className="absolute inset-0 rounded-[18px] animate-ping"
            style={{ background: "rgba(47,107,255,0.35)" }}
          />
          <Icon name="Sparkles" size={26} style={{ color: "#fff", position: "relative" }} />
          <span
            className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full animate-blink"
            style={{ background: "#22c55e", border: "2px solid #0a0a0b" }}
          />
        </button>
      )}

      {/* окно чата */}
      {open && (
        <div
          className="fixed left-4 right-4 sm:left-6 sm:right-auto z-[95] flex flex-col animate-fade-up"
          style={{
            bottom: 96,
            width: "auto",
            maxWidth: 380,
            height: "min(70vh, 560px)",
            borderRadius: 18,
            overflow: "hidden",
            background: "rgba(16,19,24,0.97)",
            border: "1px solid rgba(90,150,255,0.3)",
            boxShadow: "0 12px 50px rgba(0,0,0,0.6)",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* шапка */}
          <div
            className="flex items-center gap-3 px-4 py-3"
            style={{
              background: "linear-gradient(135deg, #1e50e0, #0e2a80)",
              borderBottom: "1px solid rgba(90,150,255,0.3)",
            }}
          >
            <span
              className="flex items-center justify-center"
              style={{
                width: 38,
                height: 38,
                borderRadius: 12,
                background: "rgba(255,255,255,0.12)",
              }}
            >
              <Icon name="Sparkles" size={20} style={{ color: "#fff" }} />
            </span>
            <div className="flex-1">
              <div className="font-orb text-white text-sm leading-tight">ИИ-консультант</div>
              <div className="font-stm text-[11px] flex items-center gap-1" style={{ color: "rgba(255,255,255,0.7)" }}>
                <span className="w-2 h-2 rounded-full" style={{ background: "#22c55e" }} />
                на связи
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Закрыть" className="p-1.5 rounded-lg hover:bg-white/10 transition">
              <Icon name="X" size={20} style={{ color: "#fff" }} />
            </button>
          </div>

          {/* сообщения */}
          <div className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] px-3.5 py-2.5 text-sm font-exo leading-relaxed ${
                  m.role === "user" ? "self-end" : "self-start"
                }`}
                style={{
                  borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                  background:
                    m.role === "user"
                      ? "linear-gradient(135deg, #1e50e0, #0e2a80)"
                      : "rgba(255,255,255,0.06)",
                  color: m.role === "user" ? "#fff" : "rgba(255,255,255,0.9)",
                  border: m.role === "user" ? "none" : "1px solid rgba(255,255,255,0.08)",
                  whiteSpace: "pre-wrap",
                }}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div
                className="self-start px-4 py-3 flex items-center gap-1.5"
                style={{ borderRadius: "14px 14px 14px 4px", background: "rgba(255,255,255,0.06)" }}
              >
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="w-1.5 h-1.5 rounded-full animate-bounce"
                    style={{ background: "rgba(255,255,255,0.5)", animationDelay: `${d * 0.15}s` }}
                  />
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* быстрые кнопки */}
          {messages.length <= 1 && (
            <div className="px-3 pb-2 flex flex-wrap gap-2">
              {QUICK.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="font-stm text-[11px] px-3 py-1.5 transition hover:scale-105"
                  style={{
                    borderRadius: 10,
                    background: "rgba(47,107,255,0.12)",
                    border: "1px solid rgba(47,107,255,0.35)",
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* поле ввода */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 p-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Напишите вопрос..."
              className="flex-1 bg-transparent outline-none font-exo text-sm text-white placeholder:text-white/30 px-2"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Отправить"
              className="flex items-center justify-center transition hover:scale-105 disabled:opacity-40"
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: "linear-gradient(135deg, #1e50e0, #0e2a80)",
                border: "1px solid rgba(90,150,255,0.4)",
              }}
            >
              <Icon name="Send" size={18} style={{ color: "#fff" }} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
