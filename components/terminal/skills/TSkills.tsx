import React, { useState } from "react";
import { Portfolio } from "@/lib/Portfolio";
import { CommandPrompt } from "../CommandPrompt";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const TSkills = () => {
  const [showAllSkills, setShowAllSkills] = useState(false);

  const skills = Portfolio.skills;

  return (
    <>
      {skills.length > 0 && (
        <section id="skills" className="scroll-mt-24 max-w-5xl mx-auto mt-20">
          <CommandPrompt
            command="grep -r 'proficiency' ./skills"
            delay={200}
            path="~/skills"
          />

          <div className="mt-8 border border-[#1414142d] dark:border-[#30363d] bg-[#f9fafb] dark:bg-[#0d1117] p-6 rounded-lg relative overflow-hidden">
            {skills.map((group, groupIndex) => (
              <div
                key={group.id}
                className="pb-6 mb-4 last:mb-0  border-b border-[#30363d1f]"
              >
                {/* Group Title */}
                <h3 className="mb-3.5 text-lg font-bold text-[#2d2f31] dark:text-[#e6edf3]">
                  {"~/"} {group.partName}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6 ">
                  {group.items.map((skill, index) => {
                    const isHiddenOnMobile =
                      index >= 7 && !showAllSkills && groupIndex === 0;

                    return (
                      <motion.div
                        key={skill.subPartName}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className={cn(
                          "group",
                          isHiddenOnMobile && "hidden md:block",
                        )}
                      >
                        <div className="flex justify-between items-end mb-1">
                          <span className="text-sm  font-medium text-[#2d2f31] dark:text-[#e6edf3] group-hover:text-[#7b7b7b] transition-colors">
                            {">"} {skill.subPartName}
                          </span>
                          {/* <span className="text-xs text-[#6e7681] dark:text-[#8b949e]">
                                    {skill.percentage}%
                                  </span> */}
                        </div>

                        {/* <div className="h-1.5 w-full bg-[#e5e7eb] dark:bg-[#21262d] rounded overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.percentage}%` }}
                                    transition={{
                                      duration: 1,
                                      delay: 0.2 + index * 0.05,
                                    }}
                                    className="h-full bg-[#4ade80] opacity-60 group-hover:opacity-100 transition-opacity"
                                  />
                                </div> */}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* See More Button (mobile) */}
            {skills[0]?.items.length > 7 && (
              <Button
                onClick={() => setShowAllSkills(!showAllSkills)}
                className="w-full mt-6 flex items-center justify-center gap-2 text-xs text-[#6e7681] dark:text-[#8b949e] hover:text-[#4ade80] transition-colors md:hidden border border-[#30363d] rounded py-2 bg-[#f3f4f6] dark:bg-[#161b22] group"
              >
                {showAllSkills ? "Show Less" : "See More"}
                <ChevronDown
                  className={cn(
                    "w-3 h-3 transition-transform group-hover:text-[#4ade80]",
                    showAllSkills && "rotate-180",
                  )}
                />
              </Button>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default TSkills;
