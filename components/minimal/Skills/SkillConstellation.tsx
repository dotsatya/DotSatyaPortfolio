"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TECH_SKILL_LINKS, TECH_SKILLS } from "@/lib/AllDetails";
import AnimatedHeaderSection from "@/components/ui/AnimattedHeading/AnimatedHeaderSection";

const POSITIONS: Record<string, [number, number]> = {
  // ───────────────── FRONTEND ─────────────────

  JavaScript: [27, 16],
  TypeScript: [11, 22],
  React: [43, 29],
  "Next.js": [59, 17],

  Angular: [27, 40],
  "Tailwind CSS": [51, 39],
  Redux: [43, 50],

  // ───────────────── BACKEND ─────────────────

  "Node.js": [68, 35],
  "Express.js": [82, 43],

  MySQL: [61, 53],
  MongoDB: [80, 57],

  "Socket.IO": [68, 67],
  Redis: [54, 67],

  // ───────────────── DEVOPS ─────────────────

  Docker: [66, 79],
  Nginx: [79, 70],
  AWS: [92, 75],
  "CI/CD": [88, 88],

  // ───────────────── LANGUAGES ─────────────────

  Java: [9, 62],
  "C++": [18, 73],
  Python: [30, 67],
  C: [12, 87],

  // ───────────────── TOOLS ─────────────────

  Git: [76, 22],
  GitHub: [91, 22],

  // ───────────────── DESIGN ─────────────────

  Figma: [34, 56],
  Canva: [44, 64],

  Photoshop: [28, 82],
  Illustrator: [48, 82],

  "Premiere Pro": [36, 91],
  "After Effects": [57, 91],
};
const GROUP_COLOR: Record<string, string> = {
  web: "#D7FF3F",
  backend: "#7DEEFF",
  devops: "#FF5C8A",
  language: "#9A9BA3",
  tools: "#FFB84D",
  design: "#8B5CFF",
};

// How close to the edge a node is allowed to get, in percent.
const EDGE_PADDING_X = 3;
const EDGE_PADDING_Y = 4;

export default function SkillConstellation() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  // Positions now live in state so nodes can be dragged to a new spot.
  // Seeded once from the original static POSITIONS map.
  const [positions, setPositions] = useState<Record<string, [number, number]>>(
    () => {
      const initial: Record<string, [number, number]> = {};
      TECH_SKILLS.forEach((skill) => {
        initial[skill.name] = POSITIONS[skill.name] ?? [50, 50];
      });
      return initial;
    },
  );

  const fieldRef = useRef<HTMLDivElement>(null);
  const draggingSkillRef = useRef<string | null>(null);
  const movedRef = useRef(false);
  const [activeDrag, setActiveDrag] = useState<string | null>(null);

  const neighbors = useMemo(() => {
    if (!hoveredSkill) {
      return new Set<string>();
    }

    const result = new Set<string>([hoveredSkill]);

    TECH_SKILL_LINKS.forEach(([from, to]) => {
      if (from === hoveredSkill) result.add(to);
      if (to === hoveredSkill) result.add(from);
    });

    return result;
  }, [hoveredSkill]);

  const activeConnections = useMemo(() => {
    if (!hoveredSkill) return [];

    return TECH_SKILL_LINKS.filter(
      ([from, to]) => from === hoveredSkill || to === hoveredSkill,
    );
  }, [hoveredSkill]);

  const clampToField = (rawX: number, rawY: number): [number, number] => {
    const x = Math.min(100 - EDGE_PADDING_X, Math.max(EDGE_PADDING_X, rawX));
    const y = Math.min(100 - EDGE_PADDING_Y, Math.max(EDGE_PADDING_Y, rawY));
    return [x, y];
  };

  const handlePointerDown = (
    event: React.PointerEvent<HTMLButtonElement>,
    name: string,
  ) => {
    event.preventDefault();
    draggingSkillRef.current = name;
    movedRef.current = false;
    setActiveDrag(name);
    setHoveredSkill(name);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    const name = draggingSkillRef.current;
    if (!name || !fieldRef.current) return;

    movedRef.current = true;

    const rect = fieldRef.current.getBoundingClientRect();
    const rawX = ((event.clientX - rect.left) / rect.width) * 100;
    const rawY = ((event.clientY - rect.top) / rect.height) * 100;
    const [x, y] = clampToField(rawX, rawY);

    setPositions((prev) => ({ ...prev, [name]: [x, y] }));
  };

  const endDrag = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (
      draggingSkillRef.current &&
      event.currentTarget.hasPointerCapture(event.pointerId)
    ) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    draggingSkillRef.current = null;
    setActiveDrag(null);
  };

  const handleClick = (name: string) => {
    // A drag ending shouldn't also toggle the hovered/selected skill.
    if (movedRef.current) {
      movedRef.current = false;
      return;
    }
    setHoveredSkill(hoveredSkill === name ? null : name);
  };

  return (
    <section
      id="skills"
      aria-label="Technology skills"
      className="section pt-20"
    >
      <AnimatedHeaderSection
        subTitle={
          <>
            things <span className="font-bold text-violet-400">BEHIND</span> I{" "}
            <span className="font-bold text-lime-300">BUILD</span> with
          </>
        }
        title={
          <>
            <span className="text-black dark:text-white">MY</span>{" "}
            <span className="italic text-violet-400">LIVING FIELD</span>
            <span className="text-lime-300">.</span>
          </>
        }
        text={[
          <>
            A living map of the{" "}
            <span className="font-semibold text-violet-400">technologies</span>{" "}
            I use to build,
          </>,
          <>
            <span className="font-semibold text-lime-300">Hover</span> to see
            how they connect
          </>,
        ]}
        textColor="text-black dark:text-white"
        withScrollTrigger={true}
      />
      <div className="container mx-auto">
        {/* <div className="relative md:px-28 md:py"> */}
        <motion.div
          initial={{
            opacity: 0,
            x: -60,
            scale: 0.96,
            filter: "blur(6px)",
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            scale: 1,
            filter: "blur(0px)",
          }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.12,
          }}
        >
          {/* ───────────────── FIELD ───────────────── */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 30,
                    filter: "blur(8px)",
                  }
            }
            whileInView={
              reduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }
            }
            viewport={{
              once: true,
              margin: "-100px",
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div
              ref={fieldRef}
              className="
            skill-field
            relative hidden
            h-[560px]
            overflow-hidden
            rounded-[28px]
            border border-black/10 dark:border-white/10
            md:block
          "
              onMouseLeave={() => {
                if (!activeDrag) setHoveredSkill(null);
              }}
            >
              {/* Grid */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage: `
                linear-gradient(
                  rgba(255,255,255,0.045) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  90deg,
                  rgba(255,255,255,0.045) 1px,
                  transparent 1px
                )
              `,
                  backgroundSize: "68px 68px",
                }}
              />

              {/* Soft vignette */}
              <div
                className="
              pointer-events-none absolute inset-0
              bg-[radial-gradient(
                circle_at_center,
                transparent_0%,
                rgba(5,6,10,0.15)_48%,
                rgba(5,6,10,0.8)_100%
              )]
            "
              />

              {/* Top-right selected information */}
              <div className="absolute right-5 top-5 z-20 text-right">
                {hoveredSkill ? (
                  <>
                    <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-black/40 dark:text-white/30 ">
                      {activeDrag ? "dragging" : "tracing"}
                    </p>

                    <p
                      className="mt-1 font-mono text-xs"
                      style={{
                        color:
                          GROUP_COLOR[
                            TECH_SKILLS.find(
                              (skill) => skill.name === hoveredSkill,
                            )?.group ?? "web"
                          ],
                      }}
                    >
                      {hoveredSkill}
                    </p>
                  </>
                ) : (
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-black/40 dark:text-white/30">
                    hover to trace · hold to drag
                  </p>
                )}
              </div>

              {/* SVG connections */}

              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 h-full w-full"
              >
                {TECH_SKILL_LINKS.map(([from, to]) => {
                  const start = positions[from];
                  const end = positions[to];

                  if (!start || !end) return null;

                  const active = hoveredSkill === from || hoveredSkill === to;

                  return (
                    <motion.line
                      key={`${from}-${to}`}
                      x1={start[0]}
                      y1={start[1]}
                      x2={end[0]}
                      y2={end[1]}
                      stroke={active ? "#D7FF3F" : "rgba(255,255,255,0.09)"}
                      strokeWidth={active ? 0.65 : 0.24}
                      strokeDasharray={active ? "1.4 1" : "1.2 1.5"}
                      initial={false}
                      animate={{
                        opacity: hoveredSkill && !active ? 0.25 : 1,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                      vectorEffect="non-scaling-stroke"
                    />
                  );
                })}
              </svg>

              {/* Nodes */}

              {TECH_SKILLS.map((skill) => {
                const position = positions[skill.name] ?? [50, 50];

                const isActive = hoveredSkill === skill.name;

                const isNeighbor = neighbors.has(skill.name);

                const isDimmed = hoveredSkill !== null && !isNeighbor;

                const isDragging = activeDrag === skill.name;

                const accent = GROUP_COLOR[skill.group];

                return (
                  <motion.button
                    key={skill.name}
                    type="button"
                    onMouseEnter={() => {
                      if (!activeDrag) setHoveredSkill(skill.name);
                    }}
                    onFocus={() => setHoveredSkill(skill.name)}
                    onPointerDown={(event) =>
                      handlePointerDown(event, skill.name)
                    }
                    onPointerMove={handlePointerMove}
                    onPointerUp={endDrag}
                    onPointerCancel={endDrag}
                    onClick={() => handleClick(skill.name)}
                    className="
                  absolute
                  -translate-x-1/2
                  -translate-y-1/2
                  select-none
                  rounded-full
                  border
                  px-4 py-2
                  font-mono
                  text-[11px]
                  tracking-[0.08em]
                  whitespace-nowrap
                  outline-none
                  transition-colors
                  duration-200
                  focus-visible:ring-2
                  focus-visible:ring-[#D7FF3F]
                "
                    style={{
                      left: `${position[0]}%`,
                      top: `${position[1]}%`,
                      touchAction: "none",
                      cursor: isDragging ? "grabbing" : "grab",
                      borderColor:
                        isActive || isNeighbor
                          ? accent
                          : "rgba(255,255,255,0.13)",
                      color:
                        isActive || isNeighbor
                          ? accent
                          : "rgba(255,255,255,0.63)",
                      background: isActive ? "#D7FF3F" : "rgba(7,8,12,0.84)",
                      opacity: isDimmed ? 0.23 : 1,
                      boxShadow: isActive
                        ? `0 0 0 1px ${accent},
                       0 0 28px rgba(215,255,63,0.18)`
                        : "none",
                      zIndex: isDragging ? 30 : isActive ? 20 : 10,
                    }}
                    animate={{
                      scale: isDragging
                        ? 1.15
                        : isActive
                          ? 1.18
                          : isNeighbor
                            ? 1.08
                            : 1,
                      y: isActive && !isDragging ? -2 : 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 280,
                      damping: 22,
                    }}
                  >
                    <span
                      style={{
                        color: isActive ? "#05060A" : undefined,
                      }}
                    >
                      {skill.name}
                    </span>
                  </motion.button>
                );
              })}

              {/* Caption */}

              <div className="absolute bottom-4 left-5">
                <p className="font-mono text-[9px] uppercase tracking-[0.32em] text-black/40 dark:text-white/30">
                  EXPLORE THE DEVELOPMENT STACK · TRACE THE CONNECTIONS
                </p>
              </div>

              {/* Connection count */}

              {hoveredSkill && !activeDrag && (
                <div className="absolute bottom-4 right-5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-black/40 dark:text-white/30">
                    {activeConnections.length} connections
                  </p>
                </div>
              )}
            </div>

            {/* ───────────────── MOBILE ───────────────── */}

            <div className="space-y-8 md:hidden">
              {[
                ["Frontend", "web"],
                ["Backend", "backend"],
                ["Cloud & DevOps", "devops"],
                ["Languages", "language"],
                ["Tools", "tools"],
                ["Design", "design"],
              ].map(([title, group]) => {
                const skills = TECH_SKILLS.filter(
                  (skill) => skill.group === group,
                );

                const color = GROUP_COLOR[group];

                return (
                  <div key={group}>
                    <div className="mb-3 flex items-center gap-3">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{
                          backgroundColor: color,
                        }}
                      />

                      <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-black/45 dark:text-white/35">
                        {title}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <motion.span
                          key={skill.name}
                          initial={{
                            opacity: 0,
                            y: 10,
                          }}
                          whileInView={{
                            opacity: 1,
                            y: 0,
                          }}
                          viewport={{
                            once: true,
                          }}
                          transition={{
                            delay: Math.min(index * 0.035, 0.3),
                          }}
                          className="
                            rounded-full
                            px-3.5 py-2
                            font-mono text-[11px] tracking-wide
                            border border-black/10 dark:border-white/10
                            bg-black/5 dark:bg-white/5
                            
                            /* // // // The Magic Fix for Light Mode */
                            brightness-50 saturate-500 
                            dark:brightness-100 dark:saturate-100
                          "
                          style={{
                            color,
                          }}
                        >
                          {skill.name}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
