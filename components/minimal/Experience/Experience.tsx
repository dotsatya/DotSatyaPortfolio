"use client";
import { Portfolio } from "@/lib/Portfolio";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
const TimelineScrollAnimation = ({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scrollY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Map scroll progress to line height and dot position
  const height = useTransform(scrollY, [0, 1], ["0%", "100%"]);

  return (
    <>
      <motion.div
        style={{ height }}
        className="
        absolute left-9.75 md:left-[52.6px] top-[5.2px] w-px z-0 opacity-50
        bg-linear-to-b
        from-blue-400 via-purple-400 to-orange-400
        dark:from-[#3b82f6] dark:via-[#a855f7] dark:to-[#f97316]
      "
      />

      {/* dot */}
      <motion.div
        style={{ top: height }}
        className="
        absolute left-9.75 md:left-13.25
        h-2.5 w-2.5 rounded-full
        -translate-x-1/2 -translate-y-1/2

        bg-red-600 shadow-[0_0_8px_rgba(0,0,0,0.6)]
        dark:bg-gray-50 dark:shadow-[0_0_10px_white]
      "
      />
    </>
  );
};
const Experience = () => {
  const experience = Portfolio.experience;
  const experienceContainerRef = useRef<HTMLDivElement>(null);
  return (
    <>
      {experience.length > 0 && (
        <section id="experience" className="pt-20 relative overflow-hidden">
          <motion.div
            initial={{
              opacity: 0,
              x: -60,
              scale: 0.96,
              filter: "blur(6px)",
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              scale: 1,
              filter: "blur(0px)",
            }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.12,
            }}
          >
            <div className="mx-auto max-w-6xl w-full px-6 md:px-10 relative">
              <h2 className="mb-16 block text-center font-mono text-4xl font-semibold  uppercase tracking-[0.2em] text-black dark:text-white">
                Experience
              </h2>

              <div
                className="relative pl-8 md:pl-12"
                ref={experienceContainerRef}
              >
                {/* Static Line  */}
                <div
                  className="
    hidden md:block absolute left-9.75 md:left-[52.6px] top-2 bottom-0 w-px
    bg-linear-to-b
    from-black/5 via-black/8 to-transparent
    dark:from-white/5 dark:via-white/10 dark:to-transparent
  "
                />

                {/* Animated Scroll Point with bar */}
                <div className="hidden md:block">
                  <TimelineScrollAnimation
                    containerRef={experienceContainerRef}
                  />
                </div>

                <div className="space-y-12">
                  {experience.map((exp, i) => {
                    const colors = [
                      "border-cyan-400 text-cyan-400",
                      "border-purple-400 text-purple-400",
                      "border-orange-400 text-orange-400",
                      "border-green-400 text-green-400",
                    ];
                    const colorClass = colors[i % colors.length];

                    return (
                      <motion.div
                        key={exp.id}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="relative grid grid-cols-[1fr] md:grid-cols-[200px_1fr] md:gap-x-12 group"
                      >
                        {/* Timeline Dot (Absolute to line) */}
                        <div className="absolute left-2.75 md:left-1.25 -translate-x-1/2 top-[5.3px] hidden md:flex items-center justify-center">
                          <div
                            className={cn(
                              `
          h-4 w-4 rounded-full border-2 z-10
          transition-transform duration-300 group-hover:scale-125
          bg-white border-neutral-300
          dark:bg-[#050505] dark:border-neutral-700
          `,
                              colorClass.split(" ")[0],
                            )}
                          />
                        </div>

                        {/* Meta (Date) */}
                        <div className="mb-2 md:mb-0 md:text-right">
                          <span
                            className={cn(
                              "font-mono text-sm",
                              colorClass.split(" ")[1],
                            )}
                          >
                            {exp.duration}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="flex flex-col">
                          <h3 className="text-2xl font-medium mb-1 text-neutral-900 dark:text-white">
                            {exp.position}
                          </h3>

                          <h4 className="text-base font-light font-sans tracking-wide mb-4 text-neutral-600 dark:text-white/60">
                            {exp.company}
                          </h4>

                          <p className="text-base leading-relaxed max-w-2xl font-light text-neutral-700 dark:text-neutral-400">
                            {exp.description}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      )}
    </>
  );
};

export default Experience;
