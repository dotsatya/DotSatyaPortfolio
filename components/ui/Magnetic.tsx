"use client";

import React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
}

const Magnetic = ({ children, className = "" }: MagneticProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 200,
    damping: 14,
    mass: 0.5,
  });

  const springY = useSpring(y, {
    stiffness: 180,
    damping: 14,
    mass: 0.5,
  });

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const mouseX =
      e.clientX - (rect.left + rect.width / 2);

    const mouseY =
      e.clientY - (rect.top + rect.height / 2);

    x.set(mouseX * 0.5);
    y.set(mouseY * 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
      }}
      className={`inline-flex will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;