"use client";
import { Portfolio } from "@/lib/Portfolio";
import dynamic from "next/dynamic";
import React, { ComponentType } from "react";
import {
  Github,
  Code2,
  Database,
  FileCode,
  FileJson,
} from "lucide-react";
import { BiLogoTailwindCss } from "react-icons/bi";
import {
  SiAdobeaftereffects,
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiAdobepremierepro,
  SiCanva,
  SiExpress,
  SiSocketdotio,
} from "react-icons/si";
import { AiOutlineHtml5 } from "react-icons/ai";
import {
  FaCss3,
  FaGitAlt,
  FaJava,
  FaNodeJs,
  FaReact,
} from "react-icons/fa";
import { LuFigma } from "react-icons/lu";
import { TbBrandCpp, TbBrandNextjs } from "react-icons/tb";
// --- Icon & Color Mapping for Skills ---
// const TechStackMap: Record<string, { icon: any; color: string }> = {

const TechStackMap: Record<
  string,
  {
    icon: ComponentType<{ className?: string; style?: React.CSSProperties }>;
    color: string;
  }
> = {
  javascript: { icon: FileJson, color: "#F7DF1E" },
  react: { icon: FaReact, color: "#61DAFB" },
  nextjs: { icon: TbBrandNextjs, color: "#FFFFFF" },
  typescript: { icon: FileCode, color: "#3178C6" },
  tailwind: { icon: BiLogoTailwindCss, color: "#06B6D4" },
  nodejs: { icon: FaNodeJs, color: "#339933" },
  express: { icon: SiExpress, color: "#3776AB" },
  mysql: { icon: Database, color: "#47A248" },
  socketio: { icon: SiSocketdotio, color: "#2496ED" },
  css: { icon: FaCss3, color: "#1572B6" },
  html: { icon: AiOutlineHtml5, color: "#E34F26" },
  github: { icon: Github, color: "#F05032" },
  cpp: { icon: TbBrandCpp, color: "#4d4d4d" },
  java: { icon: FaJava, color: "#2D3748" },
  git: { icon: FaGitAlt, color: "#F05032" },
  figma: { icon: LuFigma, color: "#FF9900" },
  canva: { icon: SiCanva, color: "#FFCA28" },
  adobephotoshop: { icon: SiAdobephotoshop, color: "#4169E1" },
  adobeillustrator: { icon: SiAdobeillustrator, color: "#4169E1" },
  adobepremierepro: { icon: SiAdobepremierepro, color: "#3ECF8E" },
  adobeaftereffects: { icon: SiAdobeaftereffects, color: "#E10098" },
};
const getSkillStyle = (skill: string) => {
  const normalizedSkill = skill
    .toLowerCase()
    .trim()
    .replace(/[\s.]+/g, "");
  return (
    TechStackMap[normalizedSkill] || {
      icon: Code2, // Generic Icon
      color: "#a3a3a3", // Generic Gray
    }
  );
};

const Marquee = dynamic(() => import("react-fast-marquee"), { ssr: false });

const TechToolls = () => {
  const skills = Portfolio.skills.flatMap((section) =>
    section.items.map((item) => ({
      name: item.subPartName,
      percentage: item.percentage,
      category: section.partName,
    })),
  );

  return (
    <>
      {Portfolio.skills.length > 0 && (
        <section className="py-20  overflow-hidden">
          <div className="mx-auto max-w-6xl w-full px-6 md:px-10 mb-12">
            <h3 className="hidden lg:block  mb-8 text-center text-4xl font-semibold font-sans  text-neutral-900 dark:text-white">
              Technologies & Tools
            </h3>
          </div>

          <div className="mx-auto max-w-6xl w-full">
            <div className="mb-8">
              <Marquee
                autoFill
                gradient
                gradientColor="var(--marquee-fade)"
                speed={30}
                direction="left"
                pauseOnHover={true}
              >
                {skills.map((skill, i) => {
                  const { icon: Icon, color } = getSkillStyle(skill.name);

                  return (
                    <div
                      key={`${skill.name}-${i}`}
                      className=" mx-0 sm:mx-4 md:mx-3  flex h-20 w-20 md:h-24 md:w-28 lg:h-32 lg:w-40 flex-col items-center justify-center gap-3 rounded-xl md:rounded-xl sm:rounded-2xl sm:border transition-all sm:bg-[#e0e0e058] sm:dark:bg-[#0e0e0e]/80"
                    >
                      <Icon className="h-10 w-10" style={{ color }} />

                      <span className=" hidden lg:block  text-sm font-light  capitalize  text-neutral-700 dark:text-neutral-400  ">
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </Marquee>
            </div>

            <div className="mb-8">
              <Marquee
                autoFill
                gradient
                gradientColor="var(--marquee-fade)"
                speed={40}
                direction="right"
                pauseOnHover={true}
              >
                {skills.map((skill, i) => {
                  const { icon: Icon, color } = getSkillStyle(skill.name);

                  return (
                    <div
                      key={`${skill.name}-${i}`}
                      className=" mx-0 sm:mx-4 md:mx-3  flex h-20 w-20 md:h-24 md:w-28 lg:h-32 lg:w-40 flex-col items-center justify-center gap-3 rounded-xl md:rounded-xl sm:rounded-2xl sm:border transition-all sm:bg-[#e0e0e058] sm:dark:bg-[#0e0e0e]/80"
                    >
                      <Icon className="h-10 w-10" style={{ color }} />

                      <span className=" hidden lg:block  text-sm font-light  capitalize  text-neutral-700 dark:text-neutral-400  ">
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </Marquee>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default TechToolls;
