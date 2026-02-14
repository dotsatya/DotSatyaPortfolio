"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { RiArrowDownSLine } from "react-icons/ri";
import { Button } from "../ui/button";

// 1. Centralized Configuration
type Mode = "minimal" | "terminal"; //| "minimal";

interface NavItem {
  label: string;
  href: string;
}

const NAVIGATION_CONFIG: Record<Mode, { route: string; items: NavItem[] }> = {
  minimal: {
    route: "/",
    items: [
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Projects", href: "#porjects" },
      { label: "Contact", href: "#contact" },
    ],
  },
  // minimal: {
  //   route: "/minimal",
  //   items: [
  // { label: "About", href: "#about" },
  // { label: "Skills", href: "#skills" },
  // { label: "Projects", href: "#porjects" },
  // { label: "Contact", href: "#contact" },
  //   ],
  // },
  terminal: {
    route: "/terminal",
    items: [], // No sub-parts
  },
};

const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMode, setExpandedMode] = useState<Mode | null>(null);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Determine current mode based on route
  const currentMode: Mode = pathname === "/terminal" ? "terminal" : "minimal";

  const accordionVariants = {
    initial: { height: 0, opacity: 0 },
    animate: { height: "auto", opacity: 1 },
    exit: { height: 0, opacity: 0 },
  };

  const textVariants = {
    initial: { opacity: 0, y: -8, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: 8, filter: "blur(6px)" },
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleModeChange = (newMode: Mode) => {
    setOpen(false);
    router.push(NAVIGATION_CONFIG[newMode].route);
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
              <motion.div
                key={currentMode}
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={
                  currentMode === "terminal"
                    ? "text-gray-400 dark:text-gray-500 flex gap-2 font-mono"
                    : "flex items-center gap-2 text-2xl text-black dark:text-white font-semibold"
                }
              >
                {currentMode === "terminal" ? (
                  <>
                    <span>{">_"}</span>
                    <span>bash — dotsatya</span>
                  </>
                ) : (
                  "Dot Satya"
                )}
              </motion.div>
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
              {currentMode}
              <span
                className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              >
                <RiArrowDownSLine />
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
                  {(Object.keys(NAVIGATION_CONFIG) as Mode[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => handleModeChange(m)}
                      className={`w-full text-left px-3 py-2 text-sm transition hover:bg-black/5 dark:hover:bg-white/10 ${currentMode === m ? "text-blue-500 font-bold" : "text-gray-600 dark:text-gray-300"}`}
                    >
                      {m.charAt(0).toUpperCase() + m.slice(1)}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT: Navigation & Theme */}
          <div className="flex items-center gap-5 justify-end">
            <AnimatePresence mode="wait">
              {NAVIGATION_CONFIG[currentMode].items.length > 0 ? (
                <motion.nav
                  key={`nav-${currentMode}`}
                  variants={textVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="hidden md:flex items-center gap-4"
                >
                  {NAVIGATION_CONFIG[currentMode].items.map((item) => (
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
                  key="terminal-dots"
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
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-white dark:bg-black border-r border-black/10 dark:border-white/10 transform transition-transform duration-300 lg:hidden ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-black/10 dark:border-white/10">
          <span className="font-bold text-lg">Menu</span>
          <button onClick={() => setMobileOpen(false)} className="text-xl">
            ×
          </button>
        </div>

        <div className="px-5 py-4">
          <p className="text-xs text-gray-500 mb-3">Mode</p>

          {(Object.keys(NAVIGATION_CONFIG) as Mode[]).map((modeKey) => {
            const hasSubItems = NAVIGATION_CONFIG[modeKey].items.length > 0;
            const isExpanded = expandedMode === modeKey;

            return (
              <div key={modeKey} className="mb-2">
                <div
                  className={`flex items-center rounded-md transition ${currentMode === modeKey ? "bg-blue-500/10 text-blue-500" : "hover:bg-black/5 dark:hover:bg-white/10"}`}
                >
                  {/* Click Label to Navigate */}
                  <button
                    onClick={() => {
                      handleModeChange(modeKey);
                      if (!hasSubItems) setMobileOpen(false);
                    }}
                    className="flex-1 text-left px-3 py-2 capitalize font-semibold"
                  >
                    {modeKey}
                  </button>

                  {/* Click Arrow to Expand */}
                  {hasSubItems && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedMode(isExpanded ? null : modeKey);
                      }}
                      className="px-4 py-2 border-l bg-transparent border-black/10 dark:border-white/10 transition-transform duration-200"
                    >
                      <span
                        className={`block text-black dark:text-white hover:text-blue-500 transition-transform ${isExpanded ? "rotate-180 text-blue-500 " : ""}`}
                      >
                        <RiArrowDownSLine />
                      </span>
                    </Button>
                  )}
                </div>

                <AnimatePresence>
                  {isExpanded && hasSubItems && (
                    <motion.div
                      variants={accordionVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="overflow-hidden pl-3 ml-4 mt-1 border-l border-black/10 dark:border-white/20"
                    >
                      <nav className="flex flex-col py-2 gap-3">
                        {NAVIGATION_CONFIG[modeKey].items.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setMobileOpen(false)}
                            className="text-xl font-medium hover:text-blue-500"
                          >
                            {sub.label}
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
      </aside>
    </>
  );
};

export default Header;
