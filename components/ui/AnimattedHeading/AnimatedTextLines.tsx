"use client";

import { motion ,type Variants } from "framer-motion";

type AnimatedTextLinesProps = {
  lines: React.ReactNode[];
  className?: string;
  animate?: boolean;
};

export const AnimatedTextLines: React.FC<AnimatedTextLinesProps> = ({
  lines,
  className = "",
  animate = false,
}) => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const lineVariants : Variants = {
    hidden: {
      y: 100,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={animate ? "visible" : "hidden"}
      className={className}
    >
      {lines.map((line, index) => (
        <motion.span
          key={index}
          variants={lineVariants}
          className="
            block
            leading-relaxed
            tracking-wide
            text-pretty
            text-sm
            text-black/80
            dark:text-white/80
            md:text-lg
          "
        >
          {line}
        </motion.span>
      ))}
    </motion.div>
  );
};