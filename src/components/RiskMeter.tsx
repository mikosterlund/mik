import { motion } from "framer-motion";

interface Props {
  value: number; // 0-100
}

export function RiskMeter({ value }: Props) {
  const clamped = Math.max(0, Math.min(100, value));
  const angle = -90 + (clamped / 100) * 180; // -90 to 90

  let label = "LOW";
  let color = "var(--neon-green)";
  if (clamped > 70) {
    label = "HIGH";
    color = "var(--neon-red)";
  } else if (clamped > 40) {
    label = "MODERATE";
    color = "var(--neon-orange)";
  }

  // Build semi-circle arc using SVG
  const r = 90;
  const cx = 110;
  const cy = 110;
  const segs = [
    { color: "oklch(0.78 0.2 160)", start: -90, end: -54 },
    { color: "oklch(0.85 0.18 130)", start: -54, end: -18 },
    { color: "oklch(0.78 0.18 50)", start: -18, end: 18 },
    { color: "oklch(0.72 0.22 30)", start: 18, end: 54 },
    { color: "oklch(0.65 0.27 20)", start: 54, end: 90 },
  ];

  const polar = (deg: number, radius: number) => {
    const rad = (deg * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  };
  const arcPath = (start: number, end: number, radius: number, width: number) => {
    const s1 = polar(start, radius);
    const e1 = polar(end, radius);
    const s2 = polar(end, radius - width);
    const e2 = polar(start, radius - width);
    const large = end - start > 180 ? 1 : 0;
    return `M ${s1.x} ${s1.y} A ${radius} ${radius} 0 ${large} 1 ${e1.x} ${e1.y} L ${s2.x} ${s2.y} A ${radius - width} ${radius - width} 0 ${large} 0 ${e2.x} ${e2.y} Z`;
  };

  const needle = polar(angle, r - 12);

  return (
    <div className="glass-card glass-card-hover p-6 h-full">
      <h3 className="section-label neon-text-pink mb-2">Risk Meter</h3>
      <div className="grid place-items-center">
        <svg viewBox="0 0 220 130" className="w-full max-w-[280px]">
          {segs.map((s, i) => (
            <path key={i} d={arcPath(s.start, s.end, r, 22)} fill={s.color} opacity={0.95} />
          ))}
          <motion.line
            x1={cx}
            y1={cy}
            x2={needle.x}
            y2={needle.y}
            stroke="white"
            strokeWidth={3}
            strokeLinecap="round"
            initial={{ x2: cx, y2: cy }}
            animate={{ x2: needle.x, y2: needle.y }}
            transition={{ type: "spring", stiffness: 80, damping: 14 }}
            style={{ filter: "drop-shadow(0 0 6px white)" }}
          />
          <circle cx={cx} cy={cy} r={6} fill="white" />
        </svg>
        <div
          className="display-num mt-1 text-2xl"
          style={{ color, textShadow: `0 0 18px ${color}` }}
        >
          {label}
        </div>
        <div className="text-xs text-muted-foreground">
          Manage risk. Stay disciplined.
        </div>
      </div>
    </div>
  );
}
