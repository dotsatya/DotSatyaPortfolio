"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TAbout from "@/components/terminal/about/TAbout";
import TProjects from "@/components/terminal/projects/TProjects";
import TSkills from "@/components/terminal/skills/TSkills";
import TExperience from "@/components/terminal/experience/TExperience";
import TNetworks from "@/components/terminal/networks/TNetworks";
import TConnection from "../../components/terminal/connection/TConnection";


const TerminalPreloader = ({ onComplete }: { onComplete: () => void }) => {
  const [lines, setLines] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const bootText = [
    "Initializing system core...",
    "Loading kernel modules...",
    "> [OK] CPU Check verified",
    "> [OK] Memory Integrity verified",
    "Mounting file systems...",
    "Starting network services...",
    "Connecting to portfolio host...",
    "Fetching user data...",
    "Establishing secure connection...",
    "Access granted.",
  ];

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    let delay = 0;

    bootText.forEach((line, index) => {
      delay += Math.random() * 300 + 150;
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev, line]);

        if (index === bootText.length - 1) {
          const completeTimeout = setTimeout(onComplete, 800);
          timeouts.push(completeTimeout);
        }
      }, delay);
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center 
  bg-[#F5F5F5] dark:bg-[#080808]
  font-mono text-sm text-[#0f172a] dark:text-[#c9d1d9]"
    >
      <div
        className="
      w-[350px] rounded-lg border
      border-[#d0d7de] dark:border-[#30363d]
      bg-white dark:bg-[#0d1117]
      shadow-2xl overflow-hidden
    "
      >
        {/* Terminal Header */}
        <div
          className="
        flex items-center justify-between border-b
        border-[#d0d7de] dark:border-[#30363d]
        px-4 py-2
        bg-[#eaeaea] dark:bg-[#161b22]
      "
        >
          <span className="text-xs text-[#57606a] dark:text-[#8b949e]">
            bash.exe
          </span>

          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
          </div>
        </div>

        {/* Terminal Body */}
        <div
          ref={scrollRef}
          className="
        h-64 overflow-y-auto p-4 space-y-1 text-xs
        scrollbar-hide
        text-[#0f172a] dark:text-[#c9d1d9]
      "
        >
          {lines.map((line, i) => (
            <div key={i} className="flex gap-2">
              <span className="text-[#16a34a] dark:text-[#4ade80] shrink-0">
                $
              </span>

              <span
                className={
                  line.includes("[OK]")
                    ? "text-[#16a34a] dark:text-[#4ade80]"
                    : ""
                }
              >
                {line}
              </span>
            </div>
          ))}

          {/* Cursor */}
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="mt-2 block text-[#16a34a] dark:text-[#4ade80]"
          >
            _
          </motion.div>
        </div>
      </div>
    </div>
  );
};

/* -------------------- Main Component -------------------- */
const TerminalTemplate = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {loading && <TerminalPreloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="min-h-screen p-10 text-[#5f6366]   dark:text-[#c9d1d9]   font-mono  md:p-8 ">
          <TAbout />

          <TProjects />

          <TSkills />

          <TExperience />

          <TNetworks />

          <TConnection />
        </div>
      )}
    </>
  );
};
export default TerminalTemplate;
