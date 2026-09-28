"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion"; // or "motion/react" if using the latest beta
import { useRef } from "react";
import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";

// Icon Imports
import { FileJson, FileCode, Database, Github } from "lucide-react";
import { FaReact, FaNodeJs, FaCss3, FaJava, FaGitAlt } from "react-icons/fa";
import { TbBrandNextjs, TbBrandCpp } from "react-icons/tb";
import { BiLogoTailwindCss } from "react-icons/bi";
import {
  SiExpress,
  SiSocketdotio,
  SiCanva,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiAdobepremierepro,
  SiAdobeaftereffects,
} from "react-icons/si";
import { AiOutlineHtml5 } from "react-icons/ai";
import { LuFigma } from "react-icons/lu";

// TypeScript Definition
type Skill = {
  name: string;
  icon: IconType | LucideIcon;
  color: string;
};

// Skill Data
const skills: Skill[] = [
  { name: "JavaScript", icon: FileJson, color: "#F7DF1E" },
  { name: "React", icon: FaReact, color: "#61DAFB" },
  { name: "Next.js", icon: TbBrandNextjs, color: "#FFFFFF" },
  { name: "TypeScript", icon: FileCode, color: "#3178C6" },
  { name: "Tailwind", icon: BiLogoTailwindCss, color: "#06B6D4" },
  { name: "Node.js", icon: FaNodeJs, color: "#339933" },
  { name: "Express", icon: SiExpress, color: "#3776AB" },
  { name: "MySQL", icon: Database, color: "#47A248" },
  { name: "Socket.io", icon: SiSocketdotio, color: "#2496ED" },
  { name: "CSS", icon: FaCss3, color: "#1572B6" },
  { name: "HTML", icon: AiOutlineHtml5, color: "#E34F26" },
  { name: "GitHub", icon: Github, color: "#FFFFFF" },
  { name: "C++", icon: TbBrandCpp, color: "#00599C" },
  { name: "Java", icon: FaJava, color: "#E32D2F" },
  { name: "Git", icon: FaGitAlt, color: "#F05032" },
  { name: "Figma", icon: LuFigma, color: "#F24E1E" },
  { name: "Canva", icon: SiCanva, color: "#00C4CC" },
  { name: "Photoshop", icon: SiAdobephotoshop, color: "#31A8FF" },
  { name: "Illustrator", icon: SiAdobeillustrator, color: "#FF9A00" },
  { name: "Premiere Pro", icon: SiAdobepremierepro, color: "#9999FF" },
  { name: "After Effects", icon: SiAdobeaftereffects, color: "#9999FF" },
];

export default function TiltedTechToolls() {
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
    /* ADDED THIS WRAPPER TO FIX THE HORIZONTAL SCROLLBAR */
    <div className="w-full md:pt-12 lg:pt-20 overflow-hidden">
      <motion.div
        // 1. Starts 50px down (y: 50) and invisible (opacity: 0)
        initial={{ opacity: 0, y: 50 }}
        // 2. Animates to original position (y: 0) and fully visible
        whileInView={{ opacity: 1, y: 0 }}
        // 3. Ensures it only animates once when scrolling down
        viewport={{ once: true, margin: "-100px" }}
        // 4. Controls the speed and bounce
        transition={{
          duration: 0.6,
          type: "spring",
          bounce: 0.3,
          delay: 0.02,
        }}
      >
        <section
          className="section relative w-full py-20 sm:py-30 md:py-20 flex items-center overflow-hidden -rotate-3 scale-105"
          ref={container}
        >
          {/* Scrolling Icon Track */}
          <div className="relative w-full flex overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <motion.div
              className="flex items-center w-max px-[5vw] z-10 var(--marquee-fade)"
              style={{ x: trackPosition, skew: skewFactor }}
            >
              {skills.map((skill, index) => {
                const IconComponent = skill.icon;
                return (
                  <div
                    key={index}
                    // 1. Adjusted widths to scale smoothly from mobile -> tablet -> desktop
                    className="flex flex-col items-center justify-center gap-0 md:gap-2 min-w-[86px] sm:min-w-[106px] md:min-w-[136px] lg:min-w-[180px]"
                  >
                    <div
                      // 2. Removed 'sm:' prefixes on borders/backgrounds so mobile gets the card UI too
                      // 3. Perfected Light/Dark mode colors using alpha transparency for a modern look
                      className="
                          md:mx-2
                          flex flex-col items-center justify-center 
                          h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-28 lg:h-28 lg:w-36 
                          rounded-xl sm:rounded-2xl 
                          border border-black/5 dark:border-white/10 
                          bg-neutral-100/60 dark:bg-neutral-900/50 
                          shadow-sm backdrop-blur-sm 
                          transition-transform duration-300 hover:scale-110
                        "
                      style={{ color: skill.color }}
                    >
                      {/* 4. Removed hardcoded size={40} to make the icon responsive via Tailwind */}
                      <IconComponent className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 drop-shadow-md" />
                    </div>

                    {/* 5. Kept text hidden on very small phones, but visible on tablets (md) and up */}
                    <span className="hidden md:block text-xs lg:text-sm font-medium capitalize text-neutral-600 dark:text-neutral-400">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
