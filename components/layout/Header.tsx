"use client";

import React, { useState} from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { RiArrowDownSLine } from "react-icons/ri";
import { Button } from "../ui/button";

// 1. Centralized Configuration
type Mode = "minimal" | "terminal";

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
      { label: "Projects", href: "#projects" },
      { label: "Contact", href: "#contact" },
    ],
  },
  terminal: {
    route: "/terminal",
    items: [], // No sub-parts
  },
};

const MagneticNavItem = ({
  item,
  onClick,
}: {
  item: { label: string; href: string };
  onClick: () => void;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring animation
  const springX = useSpring(x, {
    stiffness: 180,
    damping: 14,
    mass: 0.5,
  });

  const springY = useSpring(y, {
    stiffness: 180,
    damping: 12,
    mass: 0.5,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - (rect.left + rect.width / 2);
    const mouseY = e.clientY - (rect.top + rect.height / 2);

    // Magnetic strength
    x.set(mouseX * 0.3);
    y.set(mouseY * 0.6);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        x: springX,
        y: springY,
      }}
      className="magnetic_navigation text-md font-medium hover:text-blue-500 md:hover:text-inherit"
    >
      {item.label}
    </motion.button>
  );
};

const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMode, setExpandedMode] = useState<Mode | null>(null);

  // Determine current mode based on route
  const currentMode: Mode = pathname === "/terminal" ? "terminal" : "minimal";

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

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

  const handleModeChange = (newMode: Mode) => {
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
                    <span className="hidden sm:block">bash — </span>
                    <span>dot satya</span>
                  </>
                ) : (
                  <div className="flex items-center overflow-visible">
                    <h1 className=" font-photograph-signature signature-hover text-[40px] md:text-[44px] lg:text-5xl leading-[0.6] font-normal pl-2 -translate-y-1 whitespace-nowrap ">
                      dot satya
                    </h1>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CENTER: Desktop Mode Switcher (Apple Glass Effect) */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center p-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-inner">
            {(Object.keys(NAVIGATION_CONFIG) as Mode[]).map((m) => {
              const isActive = currentMode === m;
              return (
                <button
                  key={m}
                  onClick={() => handleModeChange(m)}
                  className={`relative px-5 py-1.5 text-sm font-medium capitalize rounded-full transition-colors z-10 ${
                    isActive
                      ? "text-black dark:text-white"
                      : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeModeBackground"
                      className="absolute inset-0 bg-white/90 dark:bg-[#2a2a2a]/60 rounded-full shadow-sm border border-black/5 dark:border-white/10 backdrop-blur-md"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-20">{m}</span>
                </button>
              );
            })}
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
                    <MagneticNavItem
                      key={item.href}
                      item={item}
                      onClick={() =>
                        scrollToSection(item.href.replace("#", ""))
                      }
                    />
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
                          <button
                            key={sub.href}
                            onClick={() => {
                              scrollToSection(sub.href.replace("#", ""));
                              setMobileOpen(false);
                            }}
                            className="text-xl font-medium hover:text-blue-500 text-left"
                          >
                            {sub.label}
                          </button>
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
