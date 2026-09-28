"use client";

import { useRef } from "react";
import { motion, useInView,type Variants } from "framer-motion";
import { AnimatedTextLines } from "./AnimatedTextLines";

type AnimatedHeaderSectionProps = {
  subTitle: React.ReactNode;
  title: React.ReactNode;
  text: React.ReactNode | React.ReactNode[];
  textColor?: string;
  withScrollTrigger?: boolean;
};

const AnimatedHeaderSection: React.FC<AnimatedHeaderSectionProps> = ({
  subTitle,
  title,
  text,
  textColor = "text-black dark:text-white",
  withScrollTrigger = true,
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.15,
  });

  const sectionVariants : Variants = {
    hidden: {
      y: "25vh",
    },
    visible: {
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const headerVariants : Variants = {
    hidden: {
      opacity: 0,
      y: 120,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.05,
      },
    },
  };

  const lineVariants  : Variants = {
    hidden: {
      scaleX: 0,
    },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.35,
      },
    },
  };

  return (
    <motion.div
      ref={sectionRef}
      initial={withScrollTrigger ? "hidden" : "visible"}
      animate={withScrollTrigger ? (isInView ? "visible" : "hidden") : "visible"}
      variants={sectionVariants}
    >
      {/* HEADER */}
      <div
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        }}
      >
        <motion.div
          variants={headerVariants}
          className="
            flex flex-col justify-center gap-2
            sm:pt-6 md:pt-16
            sm:gap-4
          "
        >
          {/* SUBTITLE */}
          <p
            className={`
              hidden px-10
              text-sm
              font-light
              uppercase
              tracking-[0.5rem]
              md:block
              ${textColor}
            `}
          >
            {subTitle}
          </p>

          {/* TITLE */}
          <div className="md:px-10">
            <h1
              className={`
                banner-text-responsive
                text-4xl
                font-semibold
                uppercase
                md:text-7xl
                lg:text-8xl
                ${textColor}
              `}
            >
              {title}
            </h1>
          </div>
        </motion.div>
      </div>

      {/* TEXT */}
      <div className={`relative px-10 ${textColor}`}>
        {/* ANIMATED LINE */}
        <motion.div
          variants={lineVariants}
          className="
            absolute
            inset-x-0
            origin-left
            border-t-2
            border-black/30
            dark:border-white/30
          "
        />

        {/* TEXT */}
        <div className="py-4 text-end sm:py-8">
          <AnimatedTextLines
            lines={Array.isArray(text) ? text : [text]}
            className="value-text-responsive font-light uppercase hidden md:block"
            animate={isInView}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default AnimatedHeaderSection;