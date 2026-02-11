import { Portfolio } from "@/lib/Portfolio";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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


export const CommandPrompt = ({
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
