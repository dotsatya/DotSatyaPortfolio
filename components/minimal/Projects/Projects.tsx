"use client";
import { Portfolio } from "@/lib/Portfolio";
import { motion, easeOut } from "framer-motion";
import ProjectCard from "./ProjectCard";

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
    <section id="porjects" className="container section mx-auto  py-12">
      {/* Section Title Bar */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Project Portfolio
        </h2>
        <span className="block text-lg mt-2 text-gray-600 dark:text-gray-400">
          🧩 Showcase My Craft
        </span>
      </div>

      {/* Page Wrapper */}
      <div className="w-full font-sans">
        <main className="max-w-[1200px] mx-auto ">
          {/* Masonry Grid */}
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
                  featured={project.featured}
                  github={project.githubUrl}
                  live={project.liveUrl}
                  linkedIn={project.linkedInUrl}
                />
              </motion.div>
            ))}
          </motion.div>
        </main>
      </div>
    </section>
  );
}
