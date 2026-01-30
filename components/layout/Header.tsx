"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation"; // Added useRouter
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

type Mode = "normal" | "terminal";

const NORMAL_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter(); // Initialize router
  
  // mode is derived from the current path
  const mode: Mode = pathname === "/terminal" ? "terminal" : "normal";

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const textVariants = {
    initial: { opacity: 0, y: -8, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: 8, filter: "blur(6px)" },
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Helper to handle navigation
  const handleModeChange = (newMode: Mode) => {
    setOpen(false);
    if (newMode === "terminal") {
      router.push("/terminal");
    } else {
      router.push("/");
    }
  };

  return (
    <header className="sticky top-2 z-40 w-[96%] max-w-8xl mx-auto px-5 py-3 rounded-xl bg-white/50 dark:bg-black/50 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-lg shadow-black/10 dark:shadow-black/40">
      <div className="relative flex items-center justify-between">
        
        {/* LEFT: Branding/Status */}
        <div className="flex items-center gap-2 min-w-[200px]">
          <AnimatePresence mode="wait">
            {mode === "terminal" ? (
              <motion.div
                key="terminal"
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="text-gray-400 dark:text-gray-500 flex gap-2 font-mono"
              >
                <span>{">_"}</span>
                <span>bash — dotsatya</span>
              </motion.div>
            ) : (
              <motion.div
                key="normal"
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex items-center gap-2 text-2xl text-black dark:text-white font-semibold"
              >
                Dot Satya
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CENTER: Mode Switcher */}
        <div ref={dropdownRef} className="absolute left-1/2 -translate-x-1/2">
          <button
            onClick={() => setOpen(!open)}
            className="w-32 flex items-center justify-center gap-2 px-3 py-1.5 rounded-md border border-black/10 dark:border-white/10 bg-white/5 dark:bg-white/5 hover:bg-black/5 hover:dark:bg-white/10 transition font-medium capitalize"
          >
            {mode}
            <span className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>▾</span>
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="absolute top-11 left-0 w-full rounded-md bg-white/90 dark:bg-stone-900/90 backdrop-blur-xl border border-black/10 dark:border-white/10 overflow-hidden shadow-xl"
              >
                {(["normal", "terminal"] as Mode[]).map((item) => (
                  <button
                    key={item}
                    onClick={() => handleModeChange(item)}
                    className={`w-full text-left px-3 py-2 text-sm transition hover:bg-black/5 dark:hover:bg-white/10 ${
                      mode === item ? "text-blue-500 font-bold" : "text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT: Navigation & Theme */}
        <div className="flex items-center gap-5 min-w-[320px] justify-end">
          <AnimatePresence mode="wait">
            {mode === "normal" ? (
              <motion.nav
                key="nav"
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35 }}
                className="hidden md:flex items-center gap-4"
              >
                {NORMAL_ITEMS.map((item) => (
                  <Link key={item.href} href={item.href} className="text-sm font-medium hover:text-blue-500 transition-colors">
                    {item.label}
                  </Link>
                ))}
              </motion.nav>
            ) : (
              <motion.div
                key="terminal-controls"
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35 }}
                className="flex items-center gap-2"
              >
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="pl-2 border-l border-black/10 dark:border-white/10">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;