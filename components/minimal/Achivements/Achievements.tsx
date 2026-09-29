"use client";

import { motion } from "framer-motion";
import { Trophy, Cpu, Users, Megaphone } from "lucide-react";
import { SectionHeading, Counter } from "@/components/ui/primitives";
import { ACHIEVEMENTS } from "@/lib/AllDetails";

import AnimatedHeaderSection from "@/components/ui/AnimattedHeading/AnimatedHeaderSection";

const ICONS = [Trophy, Cpu, Users, Megaphone];

export default function Achievements() {
  return (
    <section aria-label="Achievements" className="pt-20 ">
      <AnimatedHeaderSection
        subTitle={
          <>
            BEYOND THE <span className="font-bold text-cyan-400">CODEBASE</span>{" "}
            <span className="font-bold text-lime-400">STATISTICS</span>
          </>
        }
        title={
          <>
            <span className="italic text-transparent [-webkit-text-stroke:1.5px_#a3e635]">
              SOMEHOW
            </span>{" "}
            <span className="text-black dark:text-white">ACHIEVED</span>
            <span className="text-cyan-400">.</span>
          </>
        }
        text={[
          <>
            Transforming late-night commits into{" "}
            <span className="font-semibold text-cyan-400">
              industry-standard
            </span>{" "}
            platforms
          </>,
          <>
            and cultivating an{" "}
            <span className="font-bold text-lime-400">
              engaged tech community
            </span>
            .
          </>,
        ]}
        textColor="text-black dark:text-white"
        withScrollTrigger={true}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ACHIEVEMENTS.map((a, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 40, rotate: i % 2 ? 1.5 : -1.5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{
                delay: i * 0.1,
                type: "spring",
                stiffness: 140,
                damping: 18,
              }}
              className="group relative overflow-hidden rounded-2xl md:rounded-3xl p-4 md:p-6 transition-all duration-500 ease-out hover:-translate-y-2
        bg-white/40 dark:bg-white/5 
        backdrop-blur-xl border border-white/40 dark:border-white/10 
        shadow-[0_8px_32px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)]
        hover:border-lime-500/50 dark:hover:border-lime-400/50 
        hover:shadow-[0_0_40px_rgba(132,204,22,0.15)] dark:hover:shadow-[0_0_40px_rgba(163,230,53,0.15)]
        isolate transform-gpu"
            >
              <Icon
                size={22}
                className="text-lime-600 dark:text-lime-400 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12"
                aria-hidden
              />

              {/* Reduced desktop size: md:text-[52px] instead of md:text-6xl */}
              <h1 className="mt-3 md:mt-4 font-display text-4xl md:text-[52px] font-bold tracking-tighter text-gray-900 dark:text-white leading-none">
                <Counter to={a.value} suffix={a.suffix} />
              </h1>

              {/* Reduced desktop label size: md:text-[15px] instead of md:text-base */}
              <p className="mt-1 md:mt-3 text-sm md:text-[15px] font-semibold leading-snug text-gray-800 dark:text-gray-200">
                {a.label}
              </p>

              {/* Kept note uniformly small at text-[10px] */}
              <p className="font-mono text-[10px] tracking-wider mt-1 text-gray-500 dark:text-gray-400 opacity-50 transition-opacity duration-500 group-hover:opacity-100">
                {a.note}
              </p>

              <span
                className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 -z-10 h-24 w-24 md:h-32 md:w-32 rounded-full 
        bg-lime-500/20 dark:bg-lime-400/10 
        blur-2xl transition-all duration-700 ease-out 
        group-hover:scale-[3] group-hover:bg-lime-500/30 dark:group-hover:bg-lime-400/20"
                aria-hidden
              />

              <span
                className="absolute -top-8 -left-8 md:-top-10 md:-left-10 -z-10 h-16 w-16 md:h-24 md:w-24 rounded-full bg-white/60 dark:bg-white/10 blur-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                aria-hidden
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
