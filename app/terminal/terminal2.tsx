/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect, useRef, KeyboardEvent } from "react";
import { Typewriter } from "@/components/terminal2/typewriter/Typewriter";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { HelpCmd } from "@/components/terminal2/commands/HelpCmd";
import { AboutCmd } from "@/components/terminal2/commands/AboutCmd";
import { ProjectsCmd } from "@/components/terminal2/commands/ProjectsCmd";
import { ExperienceCmd } from "@/components/terminal2/commands/ExperienceCmd";
import { SkillsCmd } from "@/components/terminal2/commands/SkillsCmd";
import { EducationCmd } from "@/components/terminal2/commands/EducationCmd";
import { CertificationsCmd } from "@/components/terminal2/commands/CertificationsCmd";
import { ConnectSocialsCmd } from "@/components/terminal2/commands/ConnectSocialsCmd";
import { DotSatyaCmd } from "@/components/terminal2/commands/DotSatyaCmd";
import { TerminalPreloader } from "@/components/terminal2/ui/TerminalPreloader";
import { GitProgressBar } from "@/components/terminal2/ui/GitProgressBar";
import { WhoamiCmd } from "@/components/terminal2/commands/WhoamiCmd";
import { PwdCmd } from "@/components/terminal2/commands/PwdCmd";
import { SudoCmd } from "@/components/terminal2/commands/SudoCmd";
import { LsCmd } from "@/components/terminal2/commands/LsCmd";
import { CatCmd } from "@/components/terminal2/commands/CatCmd";
import { SendMessageInTerminal } from "@/components/terminal2/commands/SendMessageInTerminal";
import {
  Portfolio,
  ABOUT_TEXT,
  PROJECTS,
  SKILLS,
  EXPERIENCE,
  FILE_SYSTEM,
  FileSystemNode,
} from "@/lib/AllDetails";
import { generateAIResponse } from "@/services/geminiService";
import { AnimatePresence } from "framer-motion";

type LineType = "input" | "output" | "system";
interface TerminalLine {
  type: LineType;
  content: React.ReactNode;
  isStopped?: boolean;
}

// Removed CERTIFICATIONS and getHandleFromUrl (moved to components)

const COMMANDS = [
  // Core portfolio navigation
  "help",
  "about",
  "dotsatya",
  "projects",
  "skills",
  "experience",
  "education",
  "socials",
  "ping_me",

  // Utility
  "clear",
  
  // File system navigation
  "ls",
  "cd",
  "pwd",
  "cat",

  // User interaction
  "whoami",
  "history",
  "date",
  "echo",

  // Advanced / system-like
  "git",
  "sudo",

  // Restricted / simulated commands
  "rm",
  "mkdir",
  "touch",
  "cp",
  "mv",
];

interface TerminalProps {
  externalCommand?: string | null;
  onCommandComplete?: () => void;
}

const Terminal2: React.FC<TerminalProps> = ({
  externalCommand,
  onCommandComplete,
}) => {
  const [loading, setLoading] = useState(true);

  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isPinging, setIsPinging] = useState(false);

  const [currentPath, setCurrentPath] = useState<string[]>([]); // Empty array = root (~)
  const [previousPath, setPreviousPath] = useState<string[]>([]);
  const [cursorPos, setCursorPos] = useState(0);

  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const [interactiveMode, setInteractiveMode] = useState<"none" | "ping_me">(
    "none",
  );
  const [pingMeStep, setPingMeStep] = useState<"name" | "email" | "message">(
    "name",
  );
  const [pingMeForm, setPingMeForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Scroll Button State
  const [showScrollButton, setShowScrollButton] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const shortcutsRef = useRef<HTMLDivElement>(null);
  const profileUser = Portfolio.userName;
  const profileHost = "portfolio";
  const promptIdentity = `${profileUser}.${profileHost}`;
  const homePath = `/home/${profileUser}`;

  // Ref to track the current command execution to handle cancellations
  const commandIdRef = useRef(0);

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

            <DotSatyaCmd />

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

  const resolvePath = (
    current: string[],
    target: string,
  ): { path: string[]; node: FileSystemNode | null } => {
    if (!target || target === "~" || target === "/") {
      return {
        path: [],
        node: {
          type: "directory",
          children: FILE_SYSTEM,
        } as unknown as FileSystemNode,
      };
    }

    const parts = target.split("/").filter(Boolean);
    const newPath =
      target.startsWith("/") || target.startsWith("~") ? [] : [...current];

    for (const part of parts) {
      if (part === "." || part === "~") continue;
      if (part === "..") {
        newPath.pop();
      } else {
        newPath.push(part);
      }
    }

    let currentNode: Record<string, FileSystemNode> = FILE_SYSTEM;
    let finalNode: FileSystemNode | null = {
      type: "directory",
      children: FILE_SYSTEM,
    } as unknown as FileSystemNode;

    for (let i = 0; i < newPath.length; i++) {
      const seg = newPath[i];
      if (currentNode[seg]) {
        finalNode = currentNode[seg];
        if (finalNode?.type === "directory") {
          currentNode = finalNode.children;
        } else if (i < newPath.length - 1) {
          return { path: newPath, node: null }; // Invalid intermediate path
        }
      } else {
        return { path: newPath, node: null }; // Path not found
      }
    }

    return { path: newPath, node: finalNode };
  };

  const getCurrentDirectoryNode = (): { [key: string]: FileSystemNode } => {
    const resolved = resolvePath(currentPath, "");
    return resolved.node?.type === "directory" ? resolved.node.children : {};
  };

  useEffect(() => {
    if (!inputValue || interactiveMode !== "none") {
      setSuggestion("");
      return;
    }

    const parts = inputValue.split(" ");
    const cmd = parts[0].toLowerCase();

    if ((cmd === "cd" || cmd === "cat") && parts.length === 2) {
      const arg = parts[1];
      const currentNode = getCurrentDirectoryNode();
      const files = Object.keys(currentNode);
      const match = files.find((f) =>
        f.toLowerCase().startsWith(arg.toLowerCase()),
      );
      if (match && match.toLowerCase() !== arg.toLowerCase()) {
        // Keep the original case typed by the user for the command
        setSuggestion(`${parts[0]} ${match}`);
      } else {
        setSuggestion("");
      }
      return;
    }

    const match = COMMANDS.find((c) => c.startsWith(inputValue.toLowerCase()));
    if (match && match !== inputValue.toLowerCase()) {
      setSuggestion(match);
    } else {
      setSuggestion("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, currentPath, interactiveMode]);

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
          setIsPinging(false);

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

    if (rawTrimmed) {
      setCommandHistory((prev) => [rawTrimmed, ...prev].slice(0, 100));
    }
    setHistoryIndex(-1);

    if (interactiveMode === "ping_me") {
      const promptStr =
        pingMeStep === "name"
          ? "enter_name:"
          : pingMeStep === "email"
            ? "input_email:"
            : "type_message_here:";

      const inputLine: TerminalLine = {
        type: "input",
        content: (
          <div className="mt-2 text-terminal-text">
            <span className="text-terminal-cyan mr-2">?</span>
            <span className="text-terminal-blue font-bold mr-2">
              {promptStr}
            </span>
            <span className="text-terminal-text">{rawTrimmed}</span>
          </div>
        ),
      };
      setLines((prev) => [...prev, inputLine]);
      setInputValue("");
      setCursorPos(0);

      if (pingMeStep === "name") {
        setPingMeForm((f) => ({ ...f, name: rawTrimmed }));
        setPingMeStep("email");
      } else if (pingMeStep === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(rawTrimmed)) {
          setLines((prev) => [
            ...prev,
            {
              type: "system",
              content: (
                <div className="mt-2 text-red-500 mb-2">
                  Invalid email address. Please enter a valid email containing &apos;@&apos; and a domain.
                </div>
              ),
            },
          ]);
        } else {
          setPingMeForm((f) => ({ ...f, email: rawTrimmed }));
          setPingMeStep("message");
        }
      } else if (pingMeStep === "message") {
        const finalForm = { ...pingMeForm, message: rawTrimmed };
        setIsPinging(true);
        setIsProcessing(true);
        setLines((prev) => [
          ...prev,
          {
            type: "output",
            content: (
              <SendMessageInTerminal
                name={finalForm.name}
                email={finalForm.email}
                message={finalForm.message}
                onComplete={() => {
                  setIsProcessing(false);
                  setIsPinging(false);
                  setIsTyping(true);
                }}
              />
            ),
          },
        ]);
        setInteractiveMode("none");
        setPingMeStep("name");
        setPingMeForm({ name: "", email: "", message: "" });
      }
      return;
    }

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
    setLines((prev) => [...prev, inputLine].slice(-200));

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
        output = HelpCmd() as React.ReactNode;
        break;

      case "whoami":
        textOutput = profileUser;
        output = WhoamiCmd({ profileUser }) as React.ReactNode;
        break;

      case "ls": {
        let lsNode: FileSystemNode | null = {
          type: "directory",
          children: FILE_SYSTEM,
        } as unknown as FileSystemNode;

        if (args.length > 0) {
          const resolved = resolvePath(currentPath, args[0]);
          if (resolved.node && resolved.node.type === "directory") {
            lsNode = resolved.node;
          } else if (resolved.node && resolved.node.type === "file") {
            textOutput = args[0];
            output = <div className="text-terminal-text mt-2">{args[0]}</div>;
            break;
          } else {
            textOutput = `ls: cannot access '${args[0]}': No such file or directory`;
            output = <div className="text-red-500 mt-2">{textOutput}</div>;
            break;
          }
        } else {
          lsNode = resolvePath(currentPath, "").node;
        }

        const children =
          lsNode && lsNode.type === "directory" ? lsNode.children : {};
        const items = Object.keys(children).sort();
        textOutput = items
          .map((item) =>
            children[item]?.type === "directory" ? item + "/" : item,
          )
          .join("  ");
        output = LsCmd({ items, currentDir: children }) as React.ReactNode;
        break;
      }

      case "pwd": {
        const path =
          currentPath.length === 0
            ? homePath
            : `${homePath}/${currentPath.join("/")}`;
        textOutput = path;
        output = PwdCmd({ path }) as React.ReactNode;
        break;
      }

      case "cd": {
        if (args.length === 0 || args[0] === "~") {
          setPreviousPath([...currentPath]);
          setCurrentPath([]); // Go to root (~)
          textOutput = "";
        } else if (args[0] === "-") {
          if (previousPath.length >= 0) {
            const temp = [...currentPath];
            setCurrentPath(previousPath);
            setPreviousPath(temp);
            textOutput =
              previousPath.length === 0
                ? homePath
                : `${homePath}/${previousPath.join("/")}`;
            output = (
              <div className="text-terminal-text mt-2">{textOutput}</div>
            );
          }
        } else {
          const target = args[0];
          const resolved = resolvePath(currentPath, target);

          if (resolved.node && resolved.node.type === "directory") {
            setPreviousPath([...currentPath]);
            setCurrentPath(resolved.path);
            textOutput = "";
          } else if (resolved.node && resolved.node.type === "file") {
            textOutput = `cd: not a directory: ${target}`;
            output = <div className="text-red-500 mt-2">{textOutput}</div>;
          } else {
            textOutput = `cd: no such file or directory: ${target}`;
            output = <div className="text-red-500 mt-2">{textOutput}</div>;
          }
        }
        break;
      }

      case "cat": {
        if (args.length === 0) {
          textOutput = "cat: missing operand";
          output = <div className="text-red-500 mt-2">{textOutput}</div>;
        } else {
          const target = args[0];
          const resolved = resolvePath(currentPath, target);
          const node = resolved.node;

          if (node) {
            if (node.type === "file") {
              textOutput = node.content;
            } else {
              textOutput = `cat: ${target}: Is a directory`;
            }
          } else {
            textOutput = `cat: ${target}: No such file or directory`;
          }
          output = CatCmd({ node, target }) as React.ReactNode;
        }
        break;
      }

      case "history": {
        textOutput = commandHistory
          .map((c, i) => `  ${commandHistory.length - i}  ${c}`)
          .reverse()
          .join("\n");
        output = (
          <div className="text-terminal-text mt-2 whitespace-pre-wrap">
            {textOutput}
          </div>
        );
        break;
      }

      case "date": {
        const currentDate = new Date().toString();
        textOutput = currentDate;
        output = <div className="text-terminal-text mt-2">{currentDate}</div>;
        break;
      }

      case "echo": {
        textOutput = args.join(" ");
        output = <div className="text-terminal-text mt-2">{textOutput}</div>;
        break;
      }

      case "rm":
      case "mkdir":
      case "touch":
      case "cp":
      case "mv": {
        textOutput = `${cmd}: Permission denied: read-only file system`;
        output = <div className="text-red-500 mt-2">{textOutput}</div>;
        break;
      }

      case "clear":
        setLines([]);
        setIsProcessing(false);
        setIsTyping(false);
        return;

      case "ping_me":
        setInteractiveMode("ping_me");
        setPingMeStep("name");
        setPingMeForm({ name: "", email: "", message: "" });
        setIsProcessing(false);
        setIsTyping(false);
        return;

      case "dotsatya":
        textOutput = "Profile Information";
        output = DotSatyaCmd() as React.ReactNode;
        break;

      case "about":
        textOutput = ABOUT_TEXT;
        output = AboutCmd() as React.ReactNode;
        break;
      case "projects":
        textOutput = PROJECTS.map((p) => `${p.name}: ${p.description}`).join(
          "\n",
        );
        output = ProjectsCmd() as React.ReactNode;
        break;
      case "experience":
        textOutput = EXPERIENCE.map(
          (e) => `${e.role} @ ${e.company} (${e.period})`,
        ).join("\n");
        output = ExperienceCmd() as React.ReactNode;
        break;
      case "skills":
        textOutput = SKILLS.map(
          (s) => `${s.category}: ${s.skills.join(", ")}`,
        ).join("\n");
        output = SkillsCmd() as React.ReactNode;
        break;
      case "socials":
        textOutput = "Connect with me!";
        output = ConnectSocialsCmd() as React.ReactNode;
        break;
      case "education":
        textOutput = Portfolio.education
          .map((edu) => `${edu.degree}\n${edu.institution} | ${edu.duration}`)
          .join("\n\n");
        output = EducationCmd() as React.ReactNode;
        break;
      case "certifications":
        textOutput = "Certifications List";
        output = CertificationsCmd() as React.ReactNode;
        break;
      case "sudo":
        textOutput = `Permission denied: You are not ${Portfolio.fullName}. Nice try though!`;
        output = SudoCmd({ fullName: Portfolio.fullName }) as React.ReactNode;
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

    setLines((prev) =>
      [...prev, { type: "output" as LineType, content: output }].slice(-200),
    );
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
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
        setHistoryIndex(nextIndex);
        setInputValue(commandHistory[nextIndex]);
        setCursorPos(commandHistory[nextIndex].length);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInputValue(commandHistory[nextIndex]);
        setCursorPos(commandHistory[nextIndex].length);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputValue("");
        setCursorPos(0);
      }
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
      setInteractiveMode("none");
      setPingMeStep("name");
      setPingMeForm({ name: "", email: "", message: "" });
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
      <AnimatePresence>
        {loading && <TerminalPreloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div
          className="h-full flex flex-col font-mono text-base relative"
          onClick={focusInput}
        >
          <div className="flex-none p-3 border-b border-terminal-dim z-20 sticky top-0 flex items-center gap-2">
            <button
              onClick={() => scrollShortcuts("left")}
              className="p-2 text-terminal-text-dim hover:text-terminal-primary transition-colors focus:outline-none select-none flex-shrink-0"
            >
              <GrFormPrevious />
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
              <GrFormNext />
            </button>
          </div>

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-2 pb-48 scroll-smooth"
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

            {isProcessing && !isPinging && (
              <div className="text-terminal-text-dim animate-pulse mt-2 text-sm">
                ... thinking ...
              </div>
            )}

            {!isProcessing && !isTyping && (
              <div className="mt-4 text-terminal-blue">
                {interactiveMode === "none" && (
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
                )}

                <div className="flex items-start group relative">
                  <span className="mr-2 whitespace-nowrap">
                    {interactiveMode === "none" ? (
                      <span className="text-terminal-cyan">└─$</span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <span className="text-terminal-cyan">?</span>
                        <span className="text-terminal-blue font-bold">
                          {pingMeStep === "name"
                            ? "enter_name:"
                            : pingMeStep === "email"
                              ? "input_email:"
                              : "type_message_here:"}
                        </span>
                      </span>
                    )}
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
      )}
    </>
  );
};

export default Terminal2;
