"use client";
import { Eye, Github } from "lucide-react";
import Image, { StaticImageData } from "next/image";

type ProjectCardProps = {
  title: string;
  description: string;
  tags: string[];
  image: StaticImageData;
  featured?: boolean;
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
  featured,
  live,
  linkedIn,
}: ProjectCardProps) => {
  return (
    <div
      className="
        relative overflow-hidden rounded-2xl
       shadow-md shadow-neutral-400 dark:shadow-black
        transition-transform duration-300 ease-in-out
        lg:hover:-translate-y-2
        break-inside-avoid mb-8
        border border-neutral-400/30 dark:border-neutral-600/30
        group 
      "
    >
      {/* Image */}

      <Image
        src={image}
        alt={title}
        className="w-full h-auto object-cover block"
      />

      {/* Title Overlay - Hidden on mobile/tablet because it's part of the main info block there */}
      <div
        className="
          absolute bottom-0 left-0 right-0
          p-5
          bg-gradient-to-t
          from-black/70 to-transparent
          lg:block hidden
        "
      >
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>

      {/* Content Block: Static on mobile/tablet, Hover on Desktop */}
      <div
        className="
          /* Mobile/Tablet Styles (Matching your image) */
          relative p-6 flex flex-col items-start text-left
          
          /* Desktop Hover Styles */
          lg:absolute lg:inset-0 lg:bg-white/60 lg:dark:bg-black/60
          lg:backdrop-blur-lg lg:items-center lg:justify-center lg:text-center
          lg:opacity-0 lg:group-hover:opacity-100
          lg:transition-opacity lg:duration-300 lg:ease-in-out
        "
      >
        {/* Title for Mobile */}
        <h3 className="text-xl font-bold dark:text-white text-black mb-2 lg:hidden">
          {title}
        </h3>

        <p className="text-sm mb-6 text-neutral-400 lg:text-neutral-700 lg:dark:text-neutral-300">
          {description}
        </p>

        <div className="flex flex-wrap justify-start lg:justify-center gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="
                px-3 py-1
                text-[10px] uppercase tracking-wide 
                rounded-md
                bg-neutral-800 text-orange-200/70
                lg:bg-neutral-800  
              "
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-4 justify-start lg:justify-center w-full">
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2
              bg-neutral-200 dark:bg-neutral-800
              text-black dark:text-white
              px-4 py-2 rounded-md
              font-semibold text-sm
              transition-colors duration-200
              hover:bg-neutral-400/50 dark:hover:bg-neutral-600/50
            "
          >
            <Github size={16} />
            GitHub
          </a>

          <a
            href={live || linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2
              bg-neutral-200 dark:bg-neutral-800
              text-black dark:text-white
              px-4 py-2 rounded-md
              font-semibold text-sm
              transition-colors duration-200
              hover:bg-neutral-400/50 dark:hover:bg-neutral-600/50
            "
          >
            <Eye size={16} />
            {live ? "Live" : "LinkedIn"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
