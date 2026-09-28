"use client";
import { useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { ImArrowUpRight2 } from "react-icons/im";
import { Portfolio } from "@/lib/AllDetails";
import Image from "next/image";
import { Github } from "lucide-react";
import { createPortal } from "react-dom";
import Magnetic from "../../ui/Magnetic";

const Works: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Motion values for mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs to mimic GSAP's quickTo ease
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return;

    const previewWidth = 680; // Matches the w-[680px] class on your preview container
    const offset = 38;

    // Calculate normal right-side position
    let targetX = e.clientX + offset;

    // If positioning on the right causes it to overflow the screen width, flip it to the left
    if (targetX + previewWidth > window.innerWidth) {
      targetX = e.clientX - previewWidth - offset;
    }

    mouseX.set(targetX);

    // Center it slightly on the Y axis for better visibility, or keep the default offset
    mouseY.set(e.clientY - 100);
  };

  const projects = Portfolio.projects;

  return (
    <section className="container section mx-auto hidden lg:block">
      <div className="relative flex flex-col" onMouseMove={handleMouseMove}>
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            id="project"
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            className="relative flex flex-col gap-1 py-5 cursor-pointer group md:gap-0"
            onMouseEnter={() =>
              window.innerWidth >= 768 && setHoveredIndex(index)
            }
            onMouseLeave={() =>
              window.innerWidth >= 768 && setHoveredIndex(null)
            }
          >
            {/* overlay */}
            <motion.div
              className="absolute inset-0 hidden md:block bg-black dark:bg-white -z-10"
              initial={false}
              animate={{
                clipPath:
                  hoveredIndex === index
                    ? "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
                    : "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />

            {/* title */}
            <div className="flex justify-between px-10 transition-all duration-500 text-black dark:text-white md:group-hover:px-12 md:group-hover:text-white dark:md:group-hover:text-black">
              <h2 className="lg:text-[32px] text-[26px] leading-none">
                {project.title}
              </h2>
            <div className="flex items-center gap-4 text-black dark:text-white transition-colors duration-500 md:group-hover:text-white dark:md:group-hover:text-black">    <Magnetic>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={22} />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href={project.liveUrl || project.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ImArrowUpRight2 className="size-6" />
                  </a>
                </Magnetic>
              </div>
            </div>

            {/* divider */}
            <div className="w-full h-0.5 bg-black/80 dark:bg-white/80" />

            {/* framework */}
            <div className="flex px-10 text-xs leading-loose uppercase transition-all duration-500 md:text-sm gap-x-5 md:group-hover:px-12">
              {project.tags.map((tag, idx) => (
                <p
                  key={idx}
                  className="text-black dark:text-white transition-colors duration-500 md:group-hover:text-white dark:md:group-hover:text-black"
                >
                  {tag}
                </p>
              ))}
            </div>
          </motion.div>
        ))}

        {/* desktop floating preview image */}
        {mounted &&
          createPortal(
            <motion.div
              className="fixed top-0 left-0 z-50 overflow-hidden border-4 border-black rounded-xl dark:border-white pointer-events-none w-[680px] md:block hidden"
              style={{
                x: springX,
                y: springY,
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: hoveredIndex !== null ? 1 : 0,
                scale: hoveredIndex !== null ? 1 : 0.95,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <AnimatePresence mode="wait">
                {hoveredIndex !== null && (
                  <motion.div
                    key={hoveredIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full"
                  >
                    <Image
                      src={projects[hoveredIndex].imageUrl}
                      alt="preview"
                      className="object-cover w-full h-full"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>,
            document.body,
          )}
      </div>
    </section>
  );
};

export default Works;
