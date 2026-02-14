/**
 * AURORA SANCTUM — Ethereal Background Layer
 * Living aurora with floating orbs creating depth and parallax
 */
export default function AuroraBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base void */}
      <div className="absolute inset-0 bg-[oklch(0.03_0.015_260)]" />

      {/* Aurora gradient layers */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 20% -10%, oklch(0.25 0.12 192 / 40%), transparent 60%),
            radial-gradient(ellipse 100% 60% at 80% 110%, oklch(0.2 0.15 295 / 30%), transparent 50%),
            radial-gradient(ellipse 80% 50% at 60% 50%, oklch(0.15 0.08 85 / 15%), transparent 60%)
          `,
          animation: 'auroraShift 45s ease-in-out infinite',
          backgroundSize: '200% 200%, 200% 200%, 200% 200%',
        }}
      />

      {/* Floating orbs */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          top: '10%',
          left: '15%',
          background: 'radial-gradient(circle, oklch(0.82 0.15 192 / 12%), transparent 70%)',
          filter: 'blur(60px)',
          animation: 'floatOrb 25s ease-in-out infinite',
        }}
      />
      <div
        className="absolute w-[300px] h-[300px] rounded-full"
        style={{
          top: '60%',
          right: '10%',
          background: 'radial-gradient(circle, oklch(0.62 0.24 295 / 10%), transparent 70%)',
          filter: 'blur(50px)',
          animation: 'floatOrb2 30s ease-in-out infinite',
        }}
      />
      <div
        className="absolute w-[250px] h-[250px] rounded-full"
        style={{
          bottom: '20%',
          left: '40%',
          background: 'radial-gradient(circle, oklch(0.82 0.15 85 / 8%), transparent 70%)',
          filter: 'blur(45px)',
          animation: 'floatOrb3 35s ease-in-out infinite',
        }}
      />
      <div
        className="absolute w-[200px] h-[200px] rounded-full"
        style={{
          top: '30%',
          right: '30%',
          background: 'radial-gradient(circle, oklch(0.72 0.17 162 / 8%), transparent 70%)',
          filter: 'blur(40px)',
          animation: 'floatOrb 20s ease-in-out infinite reverse',
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(oklch(1 0 0 / 100%) 1px, transparent 1px),
            linear-gradient(90deg, oklch(1 0 0 / 100%) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  );
}
