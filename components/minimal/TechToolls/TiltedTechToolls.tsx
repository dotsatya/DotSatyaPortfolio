"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useRef } from "react";

// Simplified Array: Just the names are needed now
const skills = [
  "JavaScript",
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind",
  "Node.js",
  "Express",
  "MySQL",
  "Socket.io",
  "CSS",
  "HTML",
  "GitHub",
  "C++",
  "Java",
  "Git",
  "Figma",
  "Canva",
  "Photoshop",
  "Illustrator",
  "Premiere Pro",
  "After Effects",
];

export default function TiltedTechTools() {
  const container = useRef<HTMLDivElement>(null);

  const { scrollY, scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 500,
  });

  // Start slightly on-screen right, slide off-screen left
  const trackPosition = useTransform(scrollYProgress, [0, 1], ["5%", "-70%"]);
  const skewFactor = useTransform(smoothVelocity, [-1000, 1000], [15, -15]);

  return (
    <div className="w-full md:pt-12 lg:pt-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: 0.6,
          type: "spring",
          bounce: 0.3,
          delay: 0.02,
        }}
      >
        <section
          className="relative w-full py-20 sm:py-30 md:py-20 flex items-center overflow-hidden -rotate-3 scale-105"
          ref={container}
        >
          {/* TRACK WRAPPER: Added top and bottom borders and padding here */}
          <div className="relative w-full overflow-hidden border-y-2 border-neutral-300 dark:border-neutral-800 py-4 sm:py-6 md:py-8">
            
            {/* LEFT FADE OVERLAY */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-20 w-24 sm:w-48 bg-gradient-to-r from-[#F5F5F5] via-[#F5F5F5]/80 to-transparent dark:from-[#080808] dark:via-[#080808]/80" />

            {/* RIGHT FADE OVERLAY */}
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-20 w-24 sm:w-48 bg-gradient-to-l from-[#F5F5F5] via-[#F5F5F5]/80 to-transparent dark:from-[#080808] dark:via-[#080808]/80" />
            
            <motion.div
              className="flex items-center w-max px-[5vw] z-10"
              style={{ 
                x: trackPosition, 
                skew: skewFactor,
                willChange: "transform" // OPTIMIZATION: Fixes lag by hardware-accelerating the scroll
              }}
            >
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center">
                  
                  {/* SKILL TEXT */}
                  <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-neutral-800 dark:text-neutral-200 whitespace-nowrap">
                    {skill}
                  </span>
                  
                  {/* SEPARATOR DOT */}
                  <span className="mx-6 sm:mx-10 md:mx-12 text-2xl sm:text-4xl text-neutral-300 dark:text-neutral-700">
                    •
                  </span>
                  
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}