export default function HeroBackground() {
  return (
    <div className="hero-anim-bg absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* движущиеся световые пятна */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      {/* плывущая сетка */}
      <div className="hero-grid" />

      {/* диагональные лучи */}
      <div className="hero-rays" />

      {/* зерно/виньетка */}
      <div className="hero-vignette" />
    </div>
  );
}
