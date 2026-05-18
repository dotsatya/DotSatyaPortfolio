"use client";

import { Portfolio } from "@/lib/AllDetails";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import ReactLenis from "lenis/react";
import Image, { StaticImageData } from "next/image";
import React, { useRef } from "react";

const images = Portfolio.photography;

// const projects = [
//   {
//     title: "Project 1",
//     src: "/images/lummi/img8.png",
//   },
//   {
//     title: "Project 2",
//     src: "/images/lummi/img14.png",
//   },
//   {
//     title: "Project 3",
//     src: "/images/lummi/img10.png",
//   },
//   {
//     title: "Project 4",
//     src: "/images/lummi/img15.png",
//   },
//   {
//     title: "Project 5",
//     src: "/images/lummi/img12.png",
//   },
// ];

const StickyCard_001 = ({
  i,
  imageUrl,
  progress,
  range,
  targetScale,
}: {
  i: number;
  imageUrl: StaticImageData;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}) => {
  const container = useRef<HTMLDivElement>(null);

  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="sticky top-0 flex items-center justify-center"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 20 + 80}px)`,
        }}
        className="rounded-4xl relative -top-1/4 flex h-[300px] w-[300px] origin-top flex-col overflow-hidden"
      >
        <Image
          src={imageUrl}
          className="h-full w-full object-cover"
          alt="image"
        />
      </motion.div>
    </div>
  );
};

const Skiper16 = () => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <ReactLenis root>
      <main
        ref={container}
        className="relative flex w-full flex-col items-center justify-center pb-34"
      >
        {images.map((image, i) => {
          const targetScale = Math.max(0.5, 1 - (images.length - i - 1) * 0.1);
          return (
            <StickyCard_001
              key={`p_${i}`}
              i={i}
              {...image}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </main>
    </ReactLenis>
  );
};

export { Skiper16, StickyCard_001 };

/**
 * Skiper 16 StickyCard_001 — React + Framer Motion
 * We respect the original creators. This is an inspired rebuild with our own taste and does not claim any ownership.
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.in
 * Twitter: https://x.com/Gur__vi
 */
