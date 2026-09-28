"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* Section heading with index + rule */
export function SectionHeading({
  index,
  eyebrow,
  title,
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
}) {
  return (
    <div className="mb-10 md:mb-14">
      <div className="flex items-center gap-4 mb-5">
        <span className="font-mono text-xs text-lime tracking-widest">
          {index}
        </span>
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="h-px flex-1 origin-left bg-white/15"
        />
        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
          {eyebrow}
        </span>
      </div>
      <div className="font-display text-4xl md:text-6xl font-bold leading-[0.95] tracking-tight">
        {title}
      </div>
    </div>
  );
}

/* Animated counter */
export function Counter({
  to,
  suffix = "",
  className = "",
}: {
  to: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const rafId = requestAnimationFrame(() => setVal(to));
      return () => cancelAnimationFrame(rafId);
    }

    let start: number | null = null;
    const dur = 1400;
    let raf: number;

    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      setVal(Math.round(to * eased));

      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref} className={className}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}
