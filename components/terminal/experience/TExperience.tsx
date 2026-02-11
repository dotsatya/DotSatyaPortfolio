import React, { useState } from "react";
import { CommandPrompt } from "../CommandPrompt";
import { Portfolio } from "@/lib/Portfolio";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const ExpandableDescription = ({ description }: { description: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <p
        className={cn(
          `  border-l-2 pl-4 leading-relaxed  text-slate-500 dark:text-slate-400  border-slate-300 dark:border-[#30363d]  `,
          !open && "line-clamp-3",
        )}
      >
        {description}
      </p>

      <button
        onClick={() => setOpen(!open)}
        className="  mt-2 text-xs flex items-center gap-1 md:hidden  text-emerald-600 dark:text-[#4ade80]  hover:opacity-80 transition
        "
      >
        {open ? "Read Less" : "Read More"}
        <ChevronDown
          className={cn("w-3 h-3 transition-transform", open && "rotate-180")}
        />
      </button>
    </div>
  );
};

const TExperience = () => {
  const experience = Portfolio.experience;

  return (
    <>
      {experience.length > 0 && (
        <section
          id="experience"
          className="scroll-mt-24 max-w-5xl mx-auto mt-20"
        >
          <CommandPrompt
            command="cat career_history.log"
            delay={200}
            path="~/history"
          />

          <div
            className="
    mt-8 space-y-12 relative ml-3 pl-10
    border-l border-slate-300 dark:border-[#30363d]
  "
          >
            {experience.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                {/* Timeline Dot */}
                <div
                  className="
          absolute -left-[48.5px] top-2.5 h-4 w-4 rounded-full
          bg-white dark:bg-[#0d1117]
          border-2 border-slate-400 dark:border-[#8b949e]
          group-hover:border-emerald-500 dark:group-hover:border-[#4ade80]
          group-hover:scale-110 transition-all
        "
                />

                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-3">
                  <h3
                    className="
            text-2xl font-bold
            text-slate-900 dark:text-[#e6edf3]
          "
                  >
                    {job.company}
                    <span className="mx-2 text-emerald-600 dark:text-[#4ade80]">
                      @
                    </span>
                    <span
                      className="
              font-normal text-lg
              text-slate-700 dark:text-[#e6edf3]
            "
                    >
                      {job.position}
                    </span>
                  </h3>

                  <span
                    className="
            text-sm font-mono px-2 py-1 rounded
            bg-slate-100 dark:bg-[#161b22]
            text-slate-600 dark:text-[#8b949e]
            border border-slate-300 dark:border-[#30363d]
          "
                  >
                    {job.duration}
                  </span>
                </div>

                <ExpandableDescription description={job.description || ""} />
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default TExperience;
