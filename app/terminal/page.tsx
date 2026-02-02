"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  FileText,
  ExternalLink,
  Terminal,
  Globe,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Portfolio } from "@/lib/Portfolio";
import Connection from "./Connection";
import { TypeAnimation } from "react-type-animation";

/* -------------------- Utility Components -------------------- */

const Typewriter = ({
  text,
  delay = 0,
  className,
  onComplete,
}: {
  text?: string;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started || !text) return;
    let i = 0;
    const id = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i === text.length) {
        clearInterval(id);
        onComplete?.();
      }
    }, 35);
    return () => clearInterval(id);
  }, [started, text, onComplete]);

  return <span className={className}>{displayedText}</span>;
};

const CommandPrompt = ({
  command,
  path = "~",
  delay = 0,
  userName = Portfolio.userName,
}: {
  command: string;
  path?: string;
  delay?: number;
  userName?: string;
}) => {
  const [done, setDone] = useState(false);
  const user = userName.toLowerCase().replace(/\s+/g, "");

  return (
    <div className="flex flex-wrap items-center gap-2 font-mono text-sm mb-4">
      <div
        className="
      flex gap-1
      text-emerald-600 dark:text-[#4ade80]
    "
      >
        <span>{user}.portfolio</span>

        <span className="text-slate-800 dark:text-white">:</span>

        <span className="text-indigo-600 dark:text-blue-400">{path}</span>

        <span className="text-slate-800 dark:text-white">$</span>
      </div>

      <Typewriter
        text={command}
        delay={delay}
        className="
      text-amber-500 dark:text-[#facc15]
    "
        onComplete={() => setDone(true)}
      />

      {done && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="
        ml-1 h-4 w-2
        bg-slate-400 dark:bg-neutral-400
      "
        />
      )}
    </div>
  );
};

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

/* -------------------- Main Component -------------------- */
const TerminalTemplate = () => {
  const {
    fullName,
    title,
    bio,
    skills = [],
    projects = [],
    experience = [],
    socialLinks,
    blogs = [],
  } = Portfolio;

  // Smooth scroll
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = ["about", "projects", "skills", "experience", "contact"];

  const [loading, setLoading] = useState(true);
  const [showAllSkills, setShowAllSkills] = useState(false);

  return (
    <>
      <AnimatePresence>
        {loading && <TerminalPreloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="min-h-screen p-10 text-[#5f6366]   dark:text-[#c9d1d9]   font-mono  md:p-8 ">
          {/* Hero */}
          <section
            id="about"
            className="   border-l  border-[#30363d] dark:border-[#30363d]  border-slate-300 max-w-5xl mx-auto pl-10 mt-6 dark:bg-transparent"
          >
            <CommandPrompt command="./init.sh" delay={500} />

            <h1 className=" text-4xl font-bold mt-6 text-slate-900 dark:text-[#e6edf3] ">
              {"Hello, I'm "}
              <span className="text-emerald-600 dark:text-[#4ade80]">
                {fullName}
              </span>
            </h1>

            <p className="text-2xl my-4 text-slate-600 dark:text-[#8b949e]">
              {">"}{" "}
              <TypeAnimation
                sequence={[
                  "Web Developer",
                  1000,
                  "Software Developer",
                  1000,
                  "AIML Enthusiast",
                  1000,
                  "UI/UX Designer",
                  1000,
                  "Graphic Designer",
                  1000,
                ]}
                wrapper="span"
                speed={60}
                className="text-2xl font-medium"
                repeat={Infinity}
              />
            </p>

            {bio && (
              <p className=" max-w-2xl leading text-slate-700 dark:text-[#c9d1d9]">
                <span className="text-indigo-500 dark:text-[#79c0ff] opacity-60">
                  {"//"}
                </span>{" "}
                {bio}
              </p>
            )}

            {/* Social Links */}
            <div className="flex flex-wrap gap-4 mt-8 pt-4">
              {Object.entries(socialLinks || {}).map(([key, value]) => {
                if (!value) return null;

                const Icon = key.includes("github")
                  ? Github
                  : key.includes("linkedin")
                    ? Linkedin
                    : key.includes("twitter")
                      ? Twitter
                      : key.includes("email")
                        ? Mail
                        : key.includes("website")
                          ? Globe
                          : ExternalLink;

                return (
                  <a
                    key={key}
                    href={
                      key === "email"
                        ? `https://mail.google.com/mail/?view=cm&fs=1&to=${value}`
                        : value
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="  flex items-center gap-2 px-3 py-1.5 rounded text-sm  bg-white dark:bg-[#21262d]  border border-slate-300 dark:border-[#30363d]  text-slate-700 dark:text-[#c9d1d9]  hover:border-emerald-500 hover:text-emerald-600  dark:hover:border-[#4ade80] dark:hover:text-[#4ade80]  transition-colors shadow-sm dark:shadow-none"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{key}</span>
                  </a>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="  flex flex-wrap gap-4 mt-8 text-sm border-t border-slate-300 dark:border-[#30363d]  pt-6">
              <div className="italic w-full mb-2 text-slate-500 dark:text-[#8b949e]">
                # Navigation
              </div>

              {navItems.map((item, i) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item)}
                  className="  text-slate-600 dark:text-[#8b949e]  hover:text-indigo-600 dark:hover:text-[#facc15]  hover:underline decoration-dashed underline-offset-4"
                >
                  {`[${i + 1}] jump_to_${item}`}
                </button>
              ))}
            </div>
          </section>

          {/* Projects Section  */}
          {projects.length > 0 && (
            <section
              id="projects"
              className="scroll-mt-24 max-w-5xl mx-auto mt-20"
            >
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

          {/* Skills Section  */}
          {skills.length > 0 && (
            <section
              id="skills"
              className="scroll-mt-24 max-w-5xl mx-auto mt-20"
            >
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
                  <button
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
                  </button>
                )}
              </div>
            </section>
          )}

          {/* Experience */}
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

                    <ExpandableDescription
                      description={job.description || ""}
                    />
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Contact*/}
          <section id="contact" className="pb-12 max-w-5xl mx-auto mt-20">
            <CommandPrompt
              command="./connect.sh --status"
              delay={200}
              path="~/network"
            />

            <div
              className="
    mt-8 rounded-lg overflow-hidden shadow-md
    bg-white dark:bg-[#0d1117]
    border border-slate-300 dark:border-[#30363d]
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
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  </div>
                  <span className="text-xs font-mono text-slate-600 dark:text-[#8b949e]">
                    network_manager — v2.4.0
                  </span>
                </div>

                <div className="text-xs font-mono text-slate-600 dark:text-[#8b949e]">
                  UPTIME:{" "}
                  <span className="text-emerald-600 dark:text-[#4ade80]">
                    99.9%
                  </span>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6 md:p-8 font-mono">
                <div
                  className="
        mb-6 text-sm flex flex-col md:flex-row md:items-center justify-between gap-4
        text-slate-600 dark:text-[#8b949e]
      "
                >
                  <div>
                    <span className="text-emerald-600 dark:text-[#4ade80]">
                      $
                    </span>{" "}
                    netstat -an | grep LISTEN
                    <br />
                    <span className="opacity-50">
                      # Scanning available communication channels...
                    </span>
                  </div>

                  <div
                    className="
          px-3 py-1 rounded text-xs
          bg-slate-50 dark:bg-[#0d1117]
          border border-slate-300 dark:border-[#30363d]
        "
                  >
                    STATUS:{" "}
                    <span className="text-emerald-600 dark:text-[#4ade80] animate-pulse">
                      ONLINE
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  {/* Table Header */}
                  <div
                    className="
          grid grid-cols-[auto_1fr_auto] md:grid-cols-[150px_1fr_150px] gap-4
          px-4 py-2 text-xs uppercase tracking-wider
          text-slate-500 dark:text-[#6e7681]
          border-b border-slate-300 dark:border-[#30363d]
        "
                  >
                    <div>Protocol</div>
                    <div>Endpoint / Address</div>
                    <div className="text-right">Action</div>
                  </div>

                  {/* Reusable row styles applied automatically */}
                  {[
                    {
                      show: socialLinks.email,
                      href: `https://mail.google.com/mail/?view=cm&fs=1&to=${socialLinks.email}`,
                      label: "MAILTO",
                      value: socialLinks.email,
                      Icon: Mail,
                    },
                    {
                      show: socialLinks.github,
                      href: socialLinks.github,
                      label: "SSH / GIT",
                      value: socialLinks.github?.replace("https://", ""),
                      Icon: Github,
                    },
                    {
                      show: socialLinks.linkedin,
                      href: socialLinks.linkedin,
                      label: "LINKEDIN",
                      value: socialLinks.linkedin?.split("in/")[1] || "profile",
                      Icon: Linkedin,
                    },
                    {
                      show: socialLinks.website,
                      href: socialLinks.website,
                      label: "HTTPS",
                      value: socialLinks.website?.replace(/^https?:\/\//, ""),
                      Icon: Globe,
                    },
                  ].map(
                    (item, i) =>
                      item.show && (
                        <a
                          key={i}
                          href={item.href}
                          target="_blank"
                          className="
                grid grid-cols-[auto_1fr_auto] md:grid-cols-[150px_1fr_150px] gap-4 items-center
                px-4 py-3 group transition-colors
                hover:bg-slate-100 dark:hover:bg-[#161b22]
                border-b border-slate-300/50 dark:border-[#30363d]/50
              "
                        >
                          <div className="flex items-center gap-2 text-slate-900 dark:text-[#e6edf3]">
                            <item.Icon className="w-4 h-4 text-amber-500 dark:text-[#facc15]" />
                            <span className="font-bold">{item.label}</span>
                          </div>

                          <div className="text-sm truncate text-slate-600 dark:text-[#8b949e] group-hover:text-emerald-600 dark:group-hover:text-[#4ade80]">
                            {item.value}
                          </div>

                          <div className="text-right">
                            <span
                              className="
                    text-xs px-2 py-1 rounded
                    bg-white dark:bg-[#0d1117]
                    text-indigo-600 dark:text-[#79c0ff]
                    border border-slate-300 dark:border-[#30363d]
                    group-hover:border-indigo-500 dark:group-hover:border-[#79c0ff]
                  "
                            >
                              CONNECT
                            </span>
                          </div>
                        </a>
                      ),
                  )}
                </div>

                <div
                  className="
        mt-6 pt-4 flex justify-between items-center text-xs
        border-t border-slate-300 dark:border-[#30363d]
        text-slate-600 dark:text-[#8b949e]
      "
                >
                  <div>
                    <span className="text-emerald-600 dark:text-[#4ade80]">
                      ✔
                    </span>{" "}
                    4 ports open
                  </div>
                  <div className="flex items-center gap-2">
                    <span>latency: 24ms</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-[#4ade80]" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className=" max-w-5xl mx-auto mt-6">
            <CommandPrompt
              command="./connection.sh --let's connect"
              delay={200}
              path="~/feedback"
            />
            <Connection />
          </section>
        </div>
      )}
    </>
  );
};
export default TerminalTemplate;
