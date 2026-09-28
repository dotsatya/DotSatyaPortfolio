"use client";
import { Github, ArrowUpRight } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { motion, Variants } from "framer-motion";

type ProjectCardProps = {
  title: string;
  description: string;
  tags: string[];
  image: StaticImageData;
  github?: string;
  live?: string;
  linkedIn?: string;
};

const ProjectCard = ({
  title,
  description,
  tags,
  image,
  github,
  live,
  linkedIn,
}: ProjectCardProps) => {
  // Framer motion variants for staggering tags from left to right
  const tagsContainer : Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const tagItem : Variants = {
    hidden: { opacity: 0, x: -15 },
    show: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="
        relative w-full overflow-hidden rounded-[24px] mb-8
        bg-white dark:bg-[#0f0f0f]
        border border-neutral-200 dark:border-neutral-800/60
        shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]
        flex flex-col
      "
    >
      {/* Top Section: Image + Overlaid Glass Buttons */}
      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-t-[24px]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Action Buttons Container - Vertical stacking */}
        <div className="absolute bottom-4 right-4 flex flex-row gap-3 z-10">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
              className="
                flex items-center justify-center h-14 w-14 rounded-full
                /* Dark Obsidian Glass for GitHub */
                bg-neutral-900/60 dark:bg-black/50 
                backdrop-blur-md border border-white/20 dark:border-white/10
                text-white
                shadow-[0_8px_16px_rgba(0,0,0,0.2)]
                active:scale-95 transition-transform
              "
            >
              <Github size={24} strokeWidth={2} />
            </a>
          )}
          
          {(live || linkedIn) && (
            <a
              href={live || linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={live ? "Live Site" : "LinkedIn Profile"}
              className="
                flex items-center justify-center h-14 w-14 rounded-full
                /* Vibrant Rose Glass for Live/Link */
                bg-rose-500/60 dark:bg-rose-500/40 
                backdrop-blur-md border border-white/30 dark:border-white/10
                text-white
                shadow-[0_8px_16px_rgba(244,63,94,0.3)]
                active:scale-95 transition-transform
              "
            >
              <ArrowUpRight size={24} strokeWidth={2} />
            </a>
          )}
        </div>
      </div>

      {/* Bottom Section: Content & Animated Tags */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow">
        <h3 className="text-[22px] font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-2.5">
          {title}
        </h3>

        {/* Animated Description Effect with line-clamp */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[14px] leading-relaxed text-neutral-600 dark:text-neutral-400 mb-6 flex-grow line-clamp-3"
        >
          {description}
        </motion.p>

        {/* Framer Motion Animated Tags */}
        <motion.div
          variants={tagsContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px 0px" }}
          className="flex flex-wrap gap-2 mt-auto"
        >
          {tags.map((tag) => (
            <motion.span
              key={tag}
              variants={tagItem}
              className="
                px-3 py-1.5
                text-[10px] font-bold uppercase tracking-widest
                rounded-full
                bg-neutral-100 dark:bg-neutral-800/60
                border border-neutral-200/60 dark:border-neutral-700/50
                text-neutral-600 dark:text-neutral-300
              "
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;