import { Portfolio } from "@/lib/Portfolio";
import { CommandPrompt } from "../CommandPrompt";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const TProjects = () => {
  const projects = Portfolio.projects;

  return (
    <>
      {projects.length > 0 && (
        <section id="projects" className="scroll-mt-24 max-w-5xl mx-auto mt-20">
          <CommandPrompt
            command="./list_projects.py --verbose"
            delay={200}
            path="~/code"
          />

          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="
        flex flex-col rounded-lg overflow-hidden group transition-all duration-300
        bg-white dark:bg-[#0d1117]
        border border-slate-300 dark:border-[#30363d]
        shadow-md dark:shadow-md
        hover:border-emerald-500 dark:hover:border-[#4ade80]
      "
              >
                {/* Terminal Window Header */}
                <div
                  className="
          flex items-center justify-between px-4 py-2
          bg-slate-100 dark:bg-[#161b22]
          border-b border-slate-300 dark:border-[#30363d]
        "
                >
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  </div>

                  <div className="text-xs font-mono text-slate-500 dark:text-[#8b949e]">
                    {project.title.toLowerCase().replace(/\s+/g, "-")}.sh
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <h3
                      className="
              text-xl font-bold
              text-slate-900 dark:text-[#e6edf3]
              group-hover:text-emerald-600 dark:group-hover:text-[#4ade80]
              transition-colors
            "
                    >
                      {project.title}
                    </h3>

                    {project.featured && (
                      <span
                        className="
                text-[10px] uppercase px-2 py-0.5 rounded animate-pulse
                border border-amber-400 text-amber-500
                dark:border-[#facc15] dark:text-[#facc15]
              "
                      >
                        Featured
                      </span>
                    )}
                  </div>

                  <p
                    className="
            text-sm mb-6 leading-relaxed flex-1
            text-slate-600 dark:text-[#8b949e]
          "
                  >
                    <span className="text-emerald-600 dark:text-[#4ade80] mr-2">
                      $
                    </span>
                    {project.description}
                  </p>

                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="
                  text-[10px] px-2 py-1 rounded
                  bg-slate-100 dark:bg-[#21262d]
                  text-indigo-600 dark:text-[#79c0ff]
                  border border-slate-300 dark:border-[#30363d]
                "
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div
                      className="
              flex items-center gap-4 pt-4
              border-t border-slate-300 dark:border-[#30363d]
            "
                    >
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          className="
                  text-sm flex items-center gap-1
                  text-slate-700 dark:text-[#e6edf3]
                  hover:text-emerald-600 dark:hover:text-[#4ade80]
                  transition-colors
                "
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>live</span>
                        </a>
                      )}

                      {project.linkedInUrl && (
                        <a
                          href={project.linkedInUrl}
                          target="_blank"
                          className="
                  text-sm flex items-center gap-1
                  text-slate-700 dark:text-[#e6edf3]
                  hover:text-emerald-600 dark:hover:text-[#4ade80]
                  transition-colors
                "
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>linkedIn</span>
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          title="github logo"
                          href={project.githubUrl}
                          target="_blank"
                          className="
                  text-sm flex items-center gap-1
                  text-slate-700 dark:text-[#e6edf3]
                  hover:text-emerald-600 dark:hover:text-[#4ade80]
                  transition-colors
                "
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default TProjects;
