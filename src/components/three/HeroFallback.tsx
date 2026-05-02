/**
 * Static fallback for the R3F hero — shown while the canvas is loading and
 * for users who can't / shouldn't run WebGL (reduced motion, low-end CPU,
 * GPU-blocked browsers). Mirrors the visual feel of the live galaxy with a
 * pure CSS starfield + radial gradient.
 */
export default function HeroFallback() {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      role="img"
      aria-label="Statyczne tło galaktyki — alternatywa dla animacji 3D"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,oklch(0.32_0.08_265/0.55),transparent_60%)]" />
      <div className="absolute inset-0 stars-fallback" />
      <style>{`
        .stars-fallback {
          background-image:
            radial-gradient(1.2px 1.2px at 18% 22%, white, transparent 60%),
            radial-gradient(1px 1px at 31% 65%, white, transparent 60%),
            radial-gradient(1.4px 1.4px at 48% 12%, white, transparent 60%),
            radial-gradient(1px 1px at 63% 78%, white, transparent 60%),
            radial-gradient(1.2px 1.2px at 79% 36%, oklch(0.85 0.16 85), transparent 60%),
            radial-gradient(1px 1px at 88% 84%, white, transparent 60%),
            radial-gradient(1.4px 1.4px at 12% 88%, white, transparent 60%),
            radial-gradient(1px 1px at 93% 17%, oklch(0.85 0.16 85), transparent 60%),
            radial-gradient(1.1px 1.1px at 25% 50%, white, transparent 60%),
            radial-gradient(1.3px 1.3px at 70% 50%, oklch(0.85 0.16 85), transparent 60%),
            radial-gradient(1px 1px at 56% 28%, white, transparent 60%),
            radial-gradient(1px 1px at 38% 90%, white, transparent 60%);
          opacity: 0.85;
        }
      `}</style>
    </div>
  );
}
