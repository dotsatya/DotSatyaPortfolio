/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect, useRef, KeyboardEvent } from "react";
import { Typewriter } from "@/components/terminal2/typewriter/Typewriter";
import {
  Portfolio,
  ABOUT_TEXT,
  SOCIALS,
  PROJECTS,
  SKILLS,
  EXPERIENCE,
  FILE_SYSTEM,
  FileSystemNode,
} from "@/lib/Portfolio";
import { generateAIResponse } from "@/services/geminiService";

type LineType = "input" | "output" | "system";
interface TerminalLine {
  type: LineType;
  content: React.ReactNode;
  isStopped?: boolean;
}

const CERTIFICATIONS: Array<{ name: string; issuer: string; year: string }> =
  [];

const getHandleFromUrl = (url?: string) => {
  if (!url) return "";
  try {
    const trimmed = url.trim();
    const normalized = trimmed.startsWith("http")
      ? trimmed
      : `https://${trimmed}`;
    const parsed = new URL(normalized);
    const segment = parsed.pathname.split("/").filter(Boolean).pop() ?? "";
    return segment.replace(/^@/, "");
  } catch {
    return "";
  }
};

const COMMANDS = [
  "help",
  "about",
  "projects",
  "skills",
  "experience",
  "contact",
  "education",
  "sudo",
  "ls",
  "cd",
  "cat",
  "pwd",
  "clear",
  "dotsatya",
  "whoami",
  "git",
];

interface TerminalProps {
  externalCommand?: string | null;
  onCommandComplete?: () => void;
  onRestart?: () => void;
  onPowerOff?: () => void;
  onLogOut?: () => void;
}

// Simulated Progress Bar Component for Git Clone
// Note: Google Drive links block CORS, so we cannot track actual download progress bytes in JS.
// We simulate the visual progress to 100% before triggering the actual browser download.
const GitProgressBar: React.FC<{ onComplete: () => void }> = ({
  onComplete,
}) => {
  const [percent, setPercent] = useState(0);
  const totalSize = 4.2; // Mock size in MiB

  useEffect(() => {
    let current = 0;
    // Simulation speed: finishes in approx 1.5 - 2 seconds
    const interval = setInterval(() => {
      // Random increment between 1% and 5%
      const increment = Math.random() * 4 + 1;
      current += increment;

      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setPercent(100);
        // Wait a moment at 100% before triggering completion
        setTimeout(onComplete, 400);
      } else {
        setPercent(current);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  const width = 25;
  const filled = Math.floor((percent / 100) * width);
  const empty = Math.max(0, width - filled);

  // Desktop: [████░░░]
  const filledStr = "█".repeat(filled);
  const emptyStr = "░".repeat(empty);

  // Mobile Bar (Smaller)
  const filledMobile = "█".repeat(Math.floor(filled / 2));
  const emptyMobile = "░".repeat(Math.floor(empty / 2));

  const loadedSize = (percent / 100) * totalSize;

  return (
    <div className="font-mono mt-1 w-full max-w-2xl">
      <div className="flex items-center gap-2 text-sm md:text-base flex-wrap">
        <span className="text-terminal-text-dim whitespace-nowrap">
          Receiving objects:
        </span>
        <span className="text-terminal-text-dim min-w-[3ch] text-right">
          {Math.floor(percent)}%
        </span>

        {/* Desktop Bar */}
        <span className="text-terminal-primary hidden sm:inline font-bold">
          [{filledStr}
          {emptyStr}]
        </span>

        {/* Mobile Bar */}
        <span className="text-terminal-primary sm:hidden font-bold">
          [{filledMobile}
          {emptyMobile}]
        </span>

        <span className="text-terminal-text-dim whitespace-nowrap ml-2 text-xs">
          {loadedSize.toFixed(2)} MiB / {totalSize} MiB
        </span>
      </div>
    </div>
  );
};

const Terminal2: React.FC<TerminalProps> = ({
  externalCommand,
  onCommandComplete,
}) => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const [currentPath, setCurrentPath] = useState<string[]>([]); // Empty array = root (~)
  const [cursorPos, setCursorPos] = useState(0);

  // Scroll Button State
  const [showScrollButton, setShowScrollButton] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const shortcutsRef = useRef<HTMLDivElement>(null);
  const S_ASCII_ART = Portfolio.S_ASCII_ART;
  const profileUser = Portfolio.userName;
  const profileHost = "portfolio";
  const promptIdentity = `${profileUser}.${profileHost}`;
  const homePath = `/home/${profileUser}`;
  const githubHandle = getHandleFromUrl(SOCIALS.github) || profileUser;
  const linkedinHandle = getHandleFromUrl(SOCIALS.linkedin) || profileUser;
  const twitterHandle = getHandleFromUrl(SOCIALS.twitter) || profileUser;
  const topSkills = SKILLS.flatMap((s) => s.skills)
    .slice(0, 5)
    .join(", ");

  // Ref to track the current command execution to handle cancellations
  const commandIdRef = useRef(0);

  // Helper to render DotSatya Output
  const renderDotSatya = () => (
    <div className="flex flex-col md:flex-row gap-12 mt-4 mb-6">
      {/* ASCII Art - Linux Kali Style with Gradient */}
      <div className="font-bold text-[10px] sm:text-xs leading-tight select-none shrink-0 whitespace-pre text-transparent bg-clip-text bg-gradient-to-br from-terminal-primary to-terminal-accent">
        {S_ASCII_ART}
      </div>

      {/* Personal Info */}
      <div className="font-mono text-sm flex-1 space-y-0.5 pt-2">
        <div className="mb-3">
          <span className="text-[#FF8C00] font-bold">
            {profileUser}@{profileHost}
          </span>
          <div className="text-white">----------------</div>
        </div>

        <div>
          <span className="text-[#FF8C00] font-bold">Name</span>:{" "}
          <span className="text-white">{Portfolio.fullName}</span>
        </div>
        <div>
          <span className="text-[#FF8C00] font-bold">Role</span>:{" "}
          <span className="text-white">{Portfolio.title}</span>
        </div>
        <div>
          <span className="text-[#FF8C00] font-bold">Experience</span>:{" "}
          <span className="text-white">
            {Portfolio.experience.length}+ roles
          </span>
        </div>
        <div>
          <span className="text-[#FF8C00] font-bold">Skills</span>:{" "}
          <span className="text-white">{topSkills}</span>
        </div>
        <div>
          <span className="text-[#FF8C00] font-bold">Projects</span>:{" "}
          <span className="text-white">{PROJECTS.length} Active Packages</span>
        </div>
        <div>
          <span className="text-[#FF8C00] font-bold">Shell</span>:{" "}
          <span className="text-white">zsh 5.9</span>
        </div>
        <div>
          <span className="text-[#FF8C00] font-bold">Resolution</span>:{" "}
          <span className="text-white">
            {typeof window !== "undefined" ? window.innerWidth : 1920}x
            {typeof window !== "undefined" ? window.innerHeight : 1080}
          </span>
        </div>
        <div>
          <span className="text-[#FF8C00] font-bold">Terminal</span>:{" "}
          <span className="text-white">Web-tty1</span>
        </div>
        <div>
          <span className="text-[#FF8C00] font-bold">CPU</span>:{" "}
          <span className="text-white">
            {Portfolio.fullName} (1) @ 100% Focus
          </span>
        </div>
        <div>
          <span className="text-[#FF8C00] font-bold">Memory</span>:{" "}
          <span className="text-white">Infinite Learning Cap</span>
        </div>

        {/* Color Palette Strip - Matching the reference image style */}
        <div className="flex gap-0 mt-4 h-4 w-52">
          <div className="flex-1 bg-black"></div>
          <div className="flex-1 bg-[#FF0000]"></div>
          <div className="flex-1 bg-[#00FF00]"></div>
          <div className="flex-1 bg-[#FFFF00]"></div>
          <div className="flex-1 bg-[#0000FF]"></div>
          <div className="flex-1 bg-[#FF00FF]"></div>
          <div className="flex-1 bg-[#00FFFF]"></div>
          <div className="flex-1 bg-[#FFFFFF]"></div>
        </div>
      </div>
    </div>
  );

  // Initial Welcome Message
  useEffect(() => {
    setIsTyping(true);
    setLines([
      {
        type: "system",
        content: (
          <div className="mb-8 font-mono text-base">
            <div className="flex flex-col mb-4">
              <div className="flex items-center gap-0">
                <span className="text-terminal-cyan">┌──(</span>
                <span className="text-terminal-blue font-bold">
                  {promptIdentity}
                </span>
                <span className="text-terminal-cyan">)-[</span>
                <span className="text-terminal-text font-bold">~</span>
                <span className="text-terminal-cyan">]</span>
              </div>
              <div className="flex items-center">
                <span className="text-terminal-cyan mr-2">└─$</span>
                <span className="text-terminal-green">dotsatya</span>
              </div>
            </div>

            {renderDotSatya()}

            <div className="text-terminal-text mb-4">
              Hi, I&apos;m {Portfolio.fullName}, a {Portfolio.title}.
            </div>
            <div className="text-terminal-text mb-4">
              Welcome to my interactive &apos;AI powered&apos; portfolio
              terminal!
              <br />
              Type &apos;help&apos; to see available commands or explore the
              file system using &apos;ls&apos; and &apos;cd&apos;.
            </div>
          </div>
        ),
      },
    ]);
  }, []);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }

      // Fallback: if the page itself is scrolling (instead of only terminal body),
      // keep viewport pinned to the latest output as well.
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "auto",
      });
    });
  };

  const autoScrollTerminal = () => {
    scrollToBottom();
    inputRef.current?.focus();
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const isNotBottom = scrollHeight - scrollTop - clientHeight > 100;
      setShowScrollButton(isNotBottom);
    }
  };

  useEffect(() => {
    autoScrollTerminal();
  }, [lines, isProcessing, isTyping, inputValue]);

  useEffect(() => {
    if (!inputValue.trim()) {
      setSuggestion("");
      return;
    }
    const match = COMMANDS.find((c) => c.startsWith(inputValue.toLowerCase()));
    if (match && match !== inputValue.toLowerCase()) {
      setSuggestion(match);
    } else {
      setSuggestion("");
    }
  }, [inputValue]);

  useEffect(() => {
    if (!isProcessing && !isTyping) {
      inputRef.current?.focus();
    }
  }, [isProcessing, isTyping]);

  // Global Ctrl+C handler for cancellation during processing/typing
  useEffect(() => {
    const handleGlobalKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.ctrlKey && (e.key === "c" || e.key === "C")) {
        if (isProcessing || isTyping) {
          e.preventDefault();
          e.stopPropagation();

          // Invalidate current operation
          commandIdRef.current++;
          setIsProcessing(false);
          setIsTyping(false);

          setLines((prev) => {
            const newLines = [...prev];

            // Mark the last line as stopped to freeze typewriter effect
            if (isTyping && newLines.length > 0) {
              const lastIndex = newLines.length - 1;
              newLines[lastIndex] = { ...newLines[lastIndex], isStopped: true };
            }

            // Add ^C
            newLines.push({
              type: "output",
              content: <div className="text-terminal-text-dim mt-1">^C</div>,
            });
            return newLines;
          });
        }
      }
    };

    if (isProcessing || isTyping) {
      window.addEventListener("keydown", handleGlobalKeyDown);
    }

    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isProcessing, isTyping]);

  const getCurrentDirectoryNode = (): { [key: string]: FileSystemNode } => {
    let current = FILE_SYSTEM;
    for (const segment of currentPath) {
      const node = current[segment];
      if (node && node.type === "directory") {
        current = node.children;
      } else {
        return {};
      }
    }
    return current;
  };

  const getPathString = () => {
    return currentPath.length === 0 ? "~" : `~/${currentPath.join("/")}`;
  };

  const scrollShortcuts = (direction: "left" | "right") => {
    if (shortcutsRef.current) {
      const amount = 200;
      shortcutsRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  async function handleCommand(rawInput: string) {
    // Increment command ID to associate this execution with a unique ID
    const currentCmdId = ++commandIdRef.current;

    // Standard Command Processing
    const rawTrimmed = rawInput.trim();

    // Determine color for the command in the output log (History aesthetic)
    const cmdFirstWord = rawTrimmed.split(" ")[0].toLowerCase();
    const isKnownCmd = COMMANDS.includes(cmdFirstWord);

    // Echo the command to the terminal with Kali style
    const inputLine: TerminalLine = {
      type: "input",
      content: (
        <div className="mt-2 group">
          <div className="flex items-center gap-0">
            <span className="text-terminal-cyan">┌──(</span>
            <span className="text-terminal-blue font-bold">
              {promptIdentity}
            </span>
            <span className="text-terminal-cyan">)-[</span>
            <span className="text-terminal-text font-bold">
              {getPathString()}
            </span>
            <span className="text-terminal-cyan">]</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-2">
            <span className="text-terminal-cyan">└─$</span>
            <span
              className={`${isKnownCmd ? "text-terminal-blue font-bold" : "text-terminal-text"} break-words whitespace-pre-wrap`}
            >
              {rawInput}
            </span>
          </div>
        </div>
      ),
    };
    setLines((prev) => [...prev, inputLine]);

    setInputValue("");
    setSuggestion("");
    setCursorPos(0);

    const parts = rawTrimmed.split(/\s+/).filter((p) => p);
    const cmd = parts[0]?.toLowerCase();
    const args = parts.slice(1);

    if (!cmd && !rawTrimmed) return;

    setIsProcessing(true);

    let output: React.ReactNode = null;
    let textOutput: string = "";

    switch (cmd) {
      case "help":
        textOutput =
          "Available commands: ls, cd, cat, pwd, clear, dotsatya, whoami, about, projects, skills, experience, contact";
        output = (
          <div className="mt-2 text-terminal-text space-y-1">
            <div className="mb-2">Available commands:</div>
            <div className="grid grid-cols-[140px_1fr] gap-x-4 gap-y-1">
              <span>ls</span>
              <span className="text-terminal-text-dim">
                - List directory contents
              </span>
              <span>cd [dir]</span>
              <span className="text-terminal-text-dim">- Change directory</span>
              <span>cat [file]</span>
              <span className="text-terminal-text-dim">
                - Print file content
              </span>
              <span>pwd</span>
              <span className="text-terminal-text-dim">
                - Print working directory
              </span>
              <span>clear</span>
              <span className="text-terminal-text-dim">
                - Clear the terminal
              </span>
              <span>dotsatya</span>
              <span className="text-terminal-text-dim">
                - Display system info
              </span>
              <span>whoami</span>
              <span className="text-terminal-text-dim">
                - Display current user
              </span>
              <span className="col-span-2 mt-2 mb-1 text-terminal-green/50">
                -- Shortcuts --
              </span>
              <span>about</span>
              <span className="text-terminal-text-dim">- Learn about me</span>
              <span>projects</span>
              <span className="text-terminal-text-dim">- View my projects</span>
              <span>skills</span>
              <span className="text-terminal-text-dim">
                - See my technical skills
              </span>
              <span>experience</span>
              <span className="text-terminal-text-dim">
                - My work experience
              </span>
              <span>contact</span>
              <span className="text-terminal-text-dim">- How to reach me</span>
              <span>git clone resume</span>
              <span className="text-terminal-text-dim">
                - Download my resume
              </span>
            </div>
          </div>
        );
        break;

      case "whoami":
        textOutput = profileUser;
        output = <div className="text-terminal-text mt-2">{profileUser}</div>;
        break;

      case "ls":
        const currentDir = getCurrentDirectoryNode();
        const items = Object.keys(currentDir).sort();
        textOutput = items
          .map((item) =>
            currentDir[item].type === "directory" ? item + "/" : item,
          )
          .join("  ");
        // Responsive Grid using auto-fill for fluid columns
        output = (
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
            {items.map((item) => {
              const isDir = currentDir[item].type === "directory";
              return (
                <span
                  key={item}
                  className={
                    (isDir
                      ? "text-terminal-blue font-bold"
                      : "text-terminal-text") +
                    " block break-all whitespace-normal"
                  }
                  title={item}
                >
                  {item}
                  {isDir ? "/" : ""}
                </span>
              );
            })}
          </div>
        );
        break;

      case "pwd":
        const path =
          currentPath.length === 0
            ? homePath
            : `${homePath}/${currentPath.join("/")}`;
        textOutput = path;
        output = <div className="text-terminal-text mt-2">{path}</div>;
        break;

      case "cd":
        if (args.length === 0) {
          setCurrentPath([]); // Go to root (~)
          textOutput = "";
        } else {
          const target = args[0];
          if (target === "/") {
            setCurrentPath([]);
            textOutput = "";
          } else if (target === "..") {
            setCurrentPath((prev) => prev.slice(0, -1));
            textOutput = "";
          } else {
            const dirNode = getCurrentDirectoryNode();
            const node = dirNode[target];

            if (node && node.type === "directory") {
              setCurrentPath((prev) => [...prev, target]);
              textOutput = "";
            } else if (node && node.type === "file") {
              textOutput = `cd: not a directory: ${target}`;
              output = <div className="text-red-500 mt-2">{textOutput}</div>;
            } else {
              textOutput = `cd: no such file or directory: ${target}`;
              output = <div className="text-red-500 mt-2">{textOutput}</div>;
            }
          }
        }
        break;

      case "cat":
        if (args.length === 0) {
          textOutput = "cat: missing operand";
          output = <div className="text-red-500 mt-2">{textOutput}</div>;
        } else {
          const target = args[0];
          const dirNode = getCurrentDirectoryNode();
          const node = dirNode[target];

          if (node) {
            if (node.type === "file") {
              textOutput = node.content;
              output = (
                <div className="whitespace-pre-wrap text-terminal-text mt-2">
                  {node.content}
                </div>
              );
            } else {
              textOutput = `cat: ${target}: Is a directory`;
              output = <div className="text-red-500 mt-2">{textOutput}</div>;
            }
          } else {
            textOutput = `cat: ${target}: No such file or directory`;
            output = <div className="text-red-500 mt-2">{textOutput}</div>;
          }
        }
        break;

      case "clear":
        setLines([]);
        setIsProcessing(false);
        setIsTyping(false);
        return;

      case "dotsatya":
        textOutput = "Profile Information";
        output = renderDotSatya();
        break;

      case "about":
        textOutput = ABOUT_TEXT;
        output = (
          <span className="whitespace-pre-wrap leading-relaxed max-w-3xl text-terminal-text mt-2 block">
            {ABOUT_TEXT}
          </span>
        );
        break;
      case "projects":
        textOutput = PROJECTS.map((p) => `${p.name}: ${p.description}`).join(
          "\n",
        );
        output = (
          <div className="grid grid-cols-1 gap-6 mt-2">
            {PROJECTS.map((p, i) => (
              <div key={i} className="pl-4 border-l border-terminal-dim">
                <div className="text-terminal-green font-bold text-lg">
                  {p.name}
                </div>
                <div className="text-terminal-text-dim text-base my-1">
                  {p.description}
                </div>
                <div className="flex flex-wrap gap-2 text-sm text-terminal-cyan">
                  {p.tech.map((t) => (
                    <span key={t}>[{t}]</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
        break;
      case "experience":
        textOutput = EXPERIENCE.map(
          (e) => `${e.role} @ ${e.company} (${e.period})`,
        ).join("\n");
        output = (
          <div className="space-y-6 mt-2">
            {EXPERIENCE.map((e, i) => (
              <div key={i}>
                <div className="flex flex-wrap justify-between items-baseline text-terminal-green text-lg">
                  <span className="font-bold mr-2">
                    {e.role} @ {e.company}
                  </span>
                  <span className="text-terminal-text-dim text-sm font-normal font-mono whitespace-nowrap">
                    {e.period}
                  </span>
                </div>
                <div className="text-terminal-text-dim text-base mt-1">
                  {e.description}
                </div>
              </div>
            ))}
          </div>
        );
        break;
      case "skills":
        textOutput = SKILLS.map(
          (s) => `${s.category}: ${s.skills.join(", ")}`,
        ).join("\n");
        output = (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-8 mt-2">
            {SKILLS.map((cat, i) => (
              <div key={i}>
                <div className="text-terminal-green mb-2 border-b border-terminal-dim pb-1 uppercase text-sm tracking-wider">
                  {cat.category}
                </div>
                <ul className="space-y-1 text-terminal-text-dim text-base">
                  {cat.skills.map((s) => (
                    <li
                      key={s}
                      className="before:content-['-'] before:mr-2 before:text-terminal-dim"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
        break;
      case "contact":
        textOutput = `Email: ${SOCIALS.email}\nGitHub: ${SOCIALS.github}\nLinkedIn: ${SOCIALS.linkedin}\nTwitter: ${SOCIALS.twitter}`;
        output = (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
            {[
              {
                name: "Email",
                value: SOCIALS.email,
                link: `mailto:${SOCIALS.email}`,
                color: "text-terminal-green",
                borderColor: "border-green-400/30",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                ),
              },
              {
                name: "GitHub",
                value: githubHandle,
                link: SOCIALS.github,
                color: "text-white",
                borderColor: "border-white/20",
                icon: (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                ),
              },
              {
                name: "LinkedIn",
                value: linkedinHandle,
                link: SOCIALS.linkedin,
                color: "text-blue-400",
                borderColor: "border-blue-400/30",
                icon: (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                      clipRule="evenodd"
                    />
                  </svg>
                ),
              },
              {
                name: "Twitter",
                value: `@${twitterHandle}`,
                link: SOCIALS.twitter,
                color: "text-sky-400",
                borderColor: "border-sky-400/30",
                icon: (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                ),
              },
            ].map((contact, i) => (
              <a
                key={i}
                href={contact.link}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-3 p-3 bg-terminal-dim/10 border border-transparent rounded-lg hover:bg-terminal-dim/20 transition-all group ${contact.borderColor} hover:border-current`}
              >
                <div
                  className={`${contact.color} p-2 bg-terminal-dim/30 rounded-full group-hover:scale-110 transition-transform`}
                >
                  {contact.icon}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-terminal-text font-bold text-sm">
                    {contact.name}
                  </span>
                  <span className="text-terminal-text-dim text-xs truncate font-mono opacity-80 group-hover:opacity-100 transition-opacity">
                    {contact.value}
                  </span>
                </div>
              </a>
            ))}
          </div>
        );
        break;
      case "education":
        textOutput = Portfolio.education
          .map((edu) => `${edu.degree}\n${edu.institution} | ${edu.duration}`)
          .join("\n\n");
        output = (
          <div className="mt-2 text-base space-y-4">
            {Portfolio.education.map((edu) => (
              <div key={edu.id}>
                <div className="text-terminal-green font-bold">
                  {edu.degree}
                </div>
                <div className="text-terminal-text-dim">
                  {edu.institution} | {edu.duration}
                </div>
              </div>
            ))}
          </div>
        );
        break;
      case "certifications":
        textOutput = CERTIFICATIONS.map(
          (c) => `[${c.year}] ${c.name} - ${c.issuer}`,
        ).join("\n");
        output = (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            {CERTIFICATIONS.map((cert, i) => (
              <div
                key={i}
                className="flex flex-col p-3 border border-terminal-dim/50 rounded-lg hover:border-terminal-primary/50 transition-colors bg-terminal-dim/5"
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-terminal-accent text-xs font-bold uppercase tracking-wider">
                    {cert.issuer}
                  </span>
                  <span className="text-terminal-text-dim text-xs font-mono bg-terminal-dim/30 px-2 py-0.5 rounded">
                    {cert.year}
                  </span>
                </div>
                <div className="text-terminal-text font-bold text-sm">
                  {cert.name}
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-terminal-green animate-pulse"></span>
                  <span className="text-[10px] text-terminal-text-dim uppercase">
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        );
        break;
      case "sudo":
        textOutput = `Permission denied: You are not ${Portfolio.fullName}. Nice try though!`;
        output = (
          <span className="text-red-500 font-bold mt-2 text-base block">
            {textOutput}
          </span>
        );
        break;
      case "git":
        if (args[0] === "clone" && args[1]) {
          const target = args[1];

          setLines((prev) => [
            ...prev,
            {
              type: "output",
              content: (
                <div className="text-terminal-text mt-2">
                  Cloning into &apos;{target === "resume" ? "resume" : "url"}
                  &apos;...
                </div>
              ),
            },
          ]);

          await new Promise((r) => setTimeout(r, 400));
          setLines((prev) => [
            ...prev,
            {
              type: "output",
              content: (
                <div className="text-terminal-text">
                  remote: Enumerating objects: 24, done.
                </div>
              ),
            },
          ]);
          await new Promise((r) => setTimeout(r, 300));
          setLines((prev) => [
            ...prev,
            {
              type: "output",
              content: (
                <div className="text-terminal-text">
                  remote: Counting objects: 100% (24/24), done.
                </div>
              ),
            },
          ]);
          await new Promise((r) => setTimeout(r, 300));
          setLines((prev) => [
            ...prev,
            {
              type: "output",
              content: (
                <div className="text-terminal-text">
                  remote: Compressing objects: 100% (18/18), done.
                </div>
              ),
            },
          ]);

          setIsProcessing(true);

          await new Promise<void>((resolve) => {
            setLines((prev) => [
              ...prev,
              {
                type: "output",
                content: <GitProgressBar onComplete={resolve} />,
              },
            ]);
          });

          if (target === "resume") {
            // 📄 download resume
            const link = document.createElement("a");
            link.href = Portfolio.socialLinks.resume;
            link.setAttribute("download", "Satya_Sundar_Dey_Resume.pdf");
            link.target = "_blank";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } else if (/^https?:\/\//.test(target)) {
            // 🌐 open github / any link
            // window.open(target, "_blank");
          } else {
            setLines((prev) => [
              ...prev,
              {
                type: "output",
                content: (
                  <div className="text-red-500">
                    fatal: repository &apos;{target}&apos; not found
                  </div>
                ),
              },
            ]);
          }

          setIsProcessing(false);
          setIsTyping(true);
          return;
        } else {
          output = (
            <div className="text-red-500 mt-2">
              usage: git clone &lt;url | resume&gt;
            </div>
          );
        }
        break;
      default:
        try {
          const aiResponse = await generateAIResponse(rawTrimmed);
          if (currentCmdId !== commandIdRef.current) return;

          textOutput = aiResponse;
          output = (
            <span className="text-terminal-cyan whitespace-pre-wrap mt-2 text-base block">
              {aiResponse}
            </span>
          );
        } catch (e: unknown) {
          if (currentCmdId !== commandIdRef.current) return;

          const errorMessage =
            e instanceof Error ? e.message : "Error: Neural link disconnected.";
          textOutput = errorMessage;
          output = (
            <span className="text-red-500 mt-2 text-base block">
              {errorMessage}
            </span>
          );
        }
    }

    if (currentCmdId !== commandIdRef.current) return;

    setLines((prev) => [...prev, { type: "output", content: output }]);
    setIsProcessing(false);

    if (output) {
      setIsTyping(true);
    }
  }

  // Handle External Commands (from ID Card buttons)
  useEffect(() => {
    if (externalCommand) {
      handleCommand(externalCommand);
      if (onCommandComplete) {
        onCommandComplete();
      }
    }
  }, [externalCommand]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    setCursorPos(e.target.selectionStart || 0);
  };

  const handleSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    setCursorPos(e.currentTarget.selectionStart || 0);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCommand(inputValue);
    } else if (e.ctrlKey && e.key === "c") {
      e.preventDefault();

      const cancelledLine: TerminalLine = {
        type: "input",
        content: (
          <div className="mt-2 group">
            <div className="flex items-center gap-0">
              <span className="text-terminal-cyan">┌──(</span>
              <span className="text-terminal-blue font-bold">
                {promptIdentity}
              </span>
              <span className="text-terminal-cyan">)-[</span>
              <span className="text-terminal-text font-bold">
                {getPathString()}
              </span>
              <span className="text-terminal-cyan">]</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-2">
              <span className="text-terminal-cyan">└─$</span>
              <span className="text-terminal-text break-words whitespace-pre-wrap">
                {inputValue}^C
              </span>
            </div>
          </div>
        ),
      };

      setLines((prev) => [...prev, cancelledLine]);
      setInputValue("");
      setCursorPos(0);
      setSuggestion("");
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (suggestion) {
        setInputValue(suggestion);
        setCursorPos(suggestion.length);
      }
    } else if (e.key === "ArrowRight") {
      if (suggestion && cursorPos === inputValue.length) {
        setInputValue(suggestion);
        setCursorPos(suggestion.length);
      }
    }
  };

  const focusInput = () => {
    if (!isProcessing && !isTyping) {
      inputRef.current?.focus();
    }
  };

  const currentFirstWord = inputValue.trim().split(" ")[0].toLowerCase();
  const isTypingKnownCommand = COMMANDS.includes(currentFirstWord);

  return (
    <>
      <div
        className="h-full flex flex-col font-mono text-base relative"
        onClick={focusInput}
      >
        <div className="flex-none p-3 border-b border-terminal-dim z-20 sticky top-0 flex items-center gap-2">
          <button
            onClick={() => scrollShortcuts("left")}
            className="p-2 text-terminal-text-dim hover:text-terminal-primary transition-colors focus:outline-none select-none flex-shrink-0"
          >
            ◀
          </button>

          <div
            ref={shortcutsRef}
            className="flex-1 overflow-x-auto scrollbar-hide scroll-smooth"
          >
            <div className="flex items-center gap-2 px-1">
              {COMMANDS.map((cmd) => (
                <button
                  key={cmd}
                  onClick={() =>
                    !isProcessing && !isTyping && handleCommand(cmd)
                  }
                  disabled={isProcessing || isTyping}
                  className={`
                           px-3 py-1.5 
                           border border-terminal-dim 
                           rounded
                           text-sm font-mono text-terminal-text
                           hover:border-terminal-text hover:bg-white/10 hover:text-white
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all duration-200 
                           whitespace-nowrap select-none
                        `}
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => scrollShortcuts("right")}
            className="p-2 text-terminal-text-dim hover:text-terminal-primary transition-colors focus:outline-none select-none flex-shrink-0"
          >
            ▶
          </button>
        </div>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-2 pb-48 scroll-smooth custom-scrollbar"
        >
          {lines.map((line, idx) => {
            const isLast = idx === lines.length - 1;

            return (
              <div key={idx}>
                {line.type === "input" ? (
                  line.content
                ) : (isLast || line.isStopped) && line.type !== "system" ? (
                  <Typewriter
                    onComplete={() => setIsTyping(false)}
                    onUpdate={autoScrollTerminal}
                    isStopped={line.isStopped}
                  >
                    {line.content}
                  </Typewriter>
                ) : isLast && line.type === "system" ? (
                  <Typewriter
                    onComplete={() => setIsTyping(false)}
                    onUpdate={autoScrollTerminal}
                    speed={1}
                    step={5}
                  >
                    {line.content}
                  </Typewriter>
                ) : (
                  line.content
                )}
              </div>
            );
          })}

          {isProcessing && (
            <div className="text-terminal-text-dim animate-pulse mt-2 text-sm">
              ... thinking ...
            </div>
          )}

          {!isProcessing && !isTyping && (
            <div className="mt-4 text-terminal-blue">
              <div className="flex items-center gap-0">
                <span className="text-terminal-cyan">┌──(</span>
                <span className="text-terminal-blue font-bold">
                  {promptIdentity}
                </span>
                <span className="text-terminal-cyan">)-[</span>
                <span className="text-terminal-text font-bold">
                  {getPathString()}
                </span>
                <span className="text-terminal-cyan">]</span>
              </div>

              <div className="flex items-start group relative">
                <span className="mr-2 whitespace-nowrap">
                  <span className="text-terminal-cyan">└─$</span>
                </span>

                <div className="relative flex-grow">
                  <div
                    className={`relative z-0 whitespace-pre-wrap break-all font-normal text-base min-h-[1.5rem] ${isTypingKnownCommand ? "text-terminal-blue font-bold" : "text-terminal-text"}`}
                    style={{ wordBreak: "break-word" }}
                  >
                    <span>{inputValue.slice(0, cursorPos)}</span>
                    <span className="inline-block bg-green-500 text-black cursor-blink min-w-[10px] h-[1.2em] align-text-bottom leading-none">
                      {inputValue[cursorPos] ?? "\u00A0"}
                    </span>
                    <span>{inputValue.slice(cursorPos + 1)}</span>

                    {suggestion &&
                      suggestion
                        .toLowerCase()
                        .startsWith(inputValue.toLowerCase()) && (
                        <span className="text-terminal-text-dim font-normal">
                          {suggestion.slice(inputValue.length)}
                        </span>
                      )}
                  </div>

                  <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onSelect={handleSelect}
                    className="absolute inset-0 z-10 w-full h-full bg-transparent border-none outline-none text-transparent resize-none overflow-hidden font-inherit p-0 m-0"
                    autoFocus
                    autoComplete="off"
                    spellCheck="false"
                    rows={1}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="h-16 shrink-0 w-full"></div>
        </div>

        {showScrollButton && (
          <button
            onClick={() => {
              scrollToBottom();
              inputRef.current?.focus();
            }}
            className="absolute bottom-20 right-6 z-40 p-2 bg-red-500 text-terminal-primary rounded-full hover:bg-terminal-dim hover:text-white transition-all border border-terminal-primary/30 shadow-[0_0_15px_rgba(74,246,38,0.2)] backdrop-blur-sm"
            title="Scroll to Bottom"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
        )}
      </div>
    </>
  );
};

export default Terminal2;
