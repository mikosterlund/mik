import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Props {
  value: number;
  format?: (n: number) => string;
  className?: string;
  duration?: number;
}

export function AnimatedNumber({
  value,
  format = (n) => n.toLocaleString(),
  className,
  duration = 0.8,
}: Props) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);
  useEffect(() => {
    const start = prev.current;
    const end = value;
    const startT = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - startT) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(start + (end - start) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else prev.current = end;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {format(display)}
    </motion.span>
  );
}
