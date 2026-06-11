export default function CyberBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* базовый градиент */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(60,110,255,0.07), transparent 60%), radial-gradient(ellipse 60% 50% at 100% 100%, rgba(200,205,212,0.04), transparent 55%), linear-gradient(180deg, rgba(12,14,17,0.6) 0%, rgba(10,12,15,0.75) 100%)",
        }}
      />
      {/* мягкая сетка */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(200,205,212,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(200,205,212,0.025) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 100% 80% at 50% 0%, #000 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 100% 80% at 50% 0%, #000 30%, transparent 80%)",
        }}
      />
    </div>
  );
}