"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

type AnimatedTextLinesProps = {
  text: string;
  className?: string;
};

export const AnimatedTextLines: React.FC<AnimatedTextLinesProps> = ({
  text,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lineRefs = useRef<HTMLSpanElement[]>([]);

  const lines = text.split("\n").filter((line) => line.trim() !== "");

  useGSAP(() => {
    if (!containerRef.current || lineRefs.current.length === 0) return;

    gsap.from(lineRefs.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
    });
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {lines.map((line, index) => (
        <span
          key={index}
          ref={(el) => {
            if (el) lineRefs.current[index] = el;
          }}
          className="
            block leading-relaxed tracking-wide text-pretty 
            text-sm md:text-lg
            text-black/80 dark:text-white/80   hidden md:block
          "
        >
          {line}
        </span>
      ))}
    </div>
  );
};
