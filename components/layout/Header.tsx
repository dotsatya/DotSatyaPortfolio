"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

type Mode = "minimal" | "terminal";

const MINIMAL_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  // { label: "Services", href: "#services" },
  { label: "Projects", href: "#porjects" },
  { label: "Contact", href: "#contact" },
];

const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMode, setExpandedMode] = useState<Mode | null>(null);

  const accordionVariants = {
    initial: { height: 0, opacity: 0 },
    animate: { height: "auto", opacity: 1 },
    exit: { height: 0, opacity: 0 },
  };

  const mode: Mode = pathname === "/terminal" ? "terminal" : "minimal";
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

  const handleModeChange = (newMode: Mode) => {
    setOpen(false); // Closes desktop dropdown
    setMobileOpen(false); // Optional: Uncomment this if you want the sidebar to close immediately on "minimal" click too
    if (newMode === "terminal") {
      router.push("/terminal");
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <header className="sticky top-2 z-40 w-[96%] max-w-8xl mx-auto px-5 py-3 rounded-xl bg-white/50 dark:bg-black/50 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-lg shadow-black/10 dark:shadow-black/40">
        <div className="relative flex items-center justify-between">
          {/* LEFT: Branding */}
          <div className="flex items-center gap-2 min-w-[200px]">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/20 text-xl"
            >
              ☰
            </button>

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
                  key="minimal"
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

          {/* CENTER: Desktop Mode Switcher */}
          <div
            ref={dropdownRef}
            className="hidden lg:block absolute left-1/2 -translate-x-1/2"
          >
            <button
              onClick={() => setOpen(!open)}
              className="w-32 flex items-center justify-center gap-2 px-3 py-1.5 rounded-md border border-black/10 dark:border-white/10 bg-white/5 dark:bg-white/5 hover:bg-black/5 hover:dark:bg-white/10 transition font-medium capitalize"
            >
              {mode}
              <span
                className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              >
                ▾
              </span>
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute top-11 left-0 w-full rounded-md bg-white/90 dark:bg-stone-900/90 backdrop-blur-xl border border-black/10 dark:border-white/10 overflow-hidden shadow-xl"
                >
                  {(["minimal", "terminal"] as Mode[]).map((item) => (
                    <button
                      key={item}
                      onClick={() => handleModeChange(item)}
                      className={`w-full text-left px-3 py-2 text-sm transition hover:bg-black/5 dark:hover:bg-white/10 ${
                        mode === item
                          ? "text-blue-500 font-bold"
                          : "text-gray-600 dark:text-gray-300"
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
          <div className="flex items-center gap-5 justify-end">
            <AnimatePresence mode="wait">
              {mode === "minimal" ? (
                <motion.nav
                  key="nav"
                  variants={textVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="hidden md:flex items-center gap-4"
                >
                  {MINIMAL_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-sm font-medium hover:text-blue-500 transition-colors"
                    >
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

      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* MOBILE SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-white dark:bg-black border-r border-black/10 dark:border-white/10 transform transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-black/10 dark:border-white/10">
          <span className="font-bold text-lg">Menu</span>
          <button onClick={() => setMobileOpen(false)} className="text-xl">
            ×
          </button>
        </div>

        <div className="px-5 py-4">
          <p className="text-xs text-gray-500 mb-3">Mode</p>

          {(["minimal", "terminal"] as Mode[]).map((item) => {
            const isOpen = expandedMode === item;

            return (
              <div key={item} className="mb-2">
                {/* MODE BUTTON */}
                <button
                  onClick={() => {
                    // 1. Trigger navigation for both modes
                    handleModeChange(item);

                    if (item === "minimal") {
                      // 2. For minimal, toggle the accordion to show sub-links
                      setExpandedMode(isOpen ? null : item);
                    } else {
                      // 3. For terminal, since there are no sub-links, just close the sidebar
                      setMobileOpen(false);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition ${
                    mode === item
                      ? "bg-blue-500/10 text-blue-500 font-semibold"
                      : "hover:bg-black/5 dark:hover:bg-white/10"
                  }`}
                >
                  <span className="capitalize">{item}</span>
                  {/* Arrow ONLY for minimal mode */}
                  {item === "minimal" && (
                    <span
                      className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    >
                      ▾
                    </span>
                  )}
                </button>
                {/* SUB CONTENT - Only renders for minimal */}
                <AnimatePresence mode="wait">
                  {isOpen && item === "minimal" && (
                    <motion.div
                      variants={accordionVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden pl-3 ml-1 mt-2 border-l border-black/10 dark:border-white/20"
                    >
                      <nav className="space-y-3">
                        {MINIMAL_ITEMS.map((nav) => (
                          <Link
                            key={nav.href}
                            href={nav.href}
                            onClick={() => {
                              setMobileOpen(false);
                              setExpandedMode(null);
                            }}
                            className="block text-2xl font-medium hover:text-blue-500"
                          >
                            {nav.label}
                          </Link>
                        ))}
                      </nav>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* TERMINAL DOTS - Decorative bottom element */}
        <div className="px-5 py-4 flex gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
      </aside>
    </>
  );
};
export default Header;
