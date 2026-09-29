"use client";
import { Portfolio } from "@/lib/AllDetails";
import { motion, easeOut } from "framer-motion";
import ProjectCard from "./ProjectCard";
import Works from "./Works";
import AnimatedHeaderSection from "@/components/ui/AnimattedHeading/AnimatedHeaderSection";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
};

export default function Projects() {
  const projects = Portfolio.projects;

  return (
    <section id="projects" className="mx-auto pt-20">
      <AnimatedHeaderSection
        subTitle={
          <>
            <span className="text-black/60 dark:text-white/60">Logic</span>{" "}
            <span className="font-bold text-amber-500 dark:text-[#fde68a]">
              meets
            </span>{" "}
            <span className="font-semibold italic text-rose-500 dark:text-rose-300">
              Aesthetics
            </span>
            <span className="text-black/30 dark:text-white/30">
              , Seamlessly
            </span>
          </>
        }
        title={
          <>
            <span className="">FL</span>
            <span
              className="  font-bold
                      italic
                      text-transparent
                      [-webkit-text-stroke:2px_#fbbf24]
                        dark:[-webkit-text-stroke:2px_#fde68a]
                          "
            >
              EXES
            </span>
            <span className="text-rose-500 dark:text-rose-300">.</span>
          </>
        }
        text={[
          <>
            Designed for{" "}
            <span className="font-semibold italic text-rose-500 dark:text-rose-300">
              real users
            </span>{" "}
          </>,
          <>
            and{" "}
            <span className="font-bold text-black dark:text-white">
              built to solve
            </span>{" "}
            something useful
          </>,
        ]}
        textColor="text-black dark:text-white"
        withScrollTrigger={true}
      />
      {/* Section Title Bar */}
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
        <div className="w-full block lg:hidden  md:px-10">
          {" "}
          {/*lg:hidden for midium and small screen*/}
          <main className="max-w-[1200px] mx-auto ">
            <motion.div
              className=" columns-1 gap-8 sm:columns-2 lg:columns-3 "
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  className="break-inside-avoid"
                >
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    tags={project.tags}
                    image={project.imageUrl}
                    github={project.githubUrl}
                    live={project.liveUrl}
                    linkedIn={project.linkedInUrl}
                  />
                </motion.div>
              ))}
            </motion.div>
          </main>
        </div>

        <Works />
      </motion.div>
    </section>
  );
}
