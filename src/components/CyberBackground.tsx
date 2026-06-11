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
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(60,110,255,0.12), transparent 60%), radial-gradient(ellipse 60% 50% at 100% 100%, rgba(40,90,220,0.1), transparent 55%), linear-gradient(180deg, rgba(7,11,28,0.35) 0%, rgba(5,8,20,0.5) 100%)",
        }}
      />
      {/* мягкая сетка */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(90,130,230,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(90,130,230,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 100% 80% at 50% 0%, #000 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 100% 80% at 50% 0%, #000 30%, transparent 80%)",
        }}
      />
      {/* движущиеся синие лучи на весь сайт */}
      <div className="bg-rays-global" />
      {/* плывущие орбы по всему сайту */}
      <div className="bg-orb bg-orb-a" />
      <div className="bg-orb bg-orb-b" />
      <div className="bg-orb bg-orb-c" />
      <div className="bg-orb bg-orb-d" />
    </div>
  );
}