"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { AnimatedTextLines } from "./AnimatedTextLines";

type AnimatedHeaderSectionProps = {
  subTitle: string;
  title: string;
  text: string;
  textColor?: string; // tailwind classes
  withScrollTrigger?: boolean;
};

const AnimatedHeaderSection: React.FC<AnimatedHeaderSectionProps> = ({
  subTitle,
  title,
  text,
  textColor = "text-black dark:text-white",
  withScrollTrigger = false,
}) => {
  const contextRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);

  const shouldSplitTitle = title.includes(" ");
  const titleParts = shouldSplitTitle ? title.split(" ") : [title];

useGSAP(() => {
  if (!contextRef.current || !headerRef.current) return;

  const mm = gsap.matchMedia();

  mm.add("(max-width: 767px)", () => {
    gsap.timeline({
      scrollTrigger: {
        trigger: contextRef.current,
        start: "top 95%",
      },
    })
    .from(contextRef.current, {
      y: "30vh",
      duration: 0.8,
      ease: "circ.out",
    })
    .from(
      headerRef.current,
      {
        opacity: 0,
        y: 120,
        duration: 0.8,
        ease: "circ.out",
      },
      "<+0.15"
    );
  });

  mm.add("(min-width: 768px)", () => {
    gsap.timeline({
      scrollTrigger: {
        trigger: contextRef.current,
        start: "top 80%",
      },
    })
    .from(contextRef.current, {
      y: "50vh",
      duration: 1,
      ease: "circ.out",
    })
    .from(
      headerRef.current,
      {
        opacity: 0,
        y: 200,
        duration: 1,
        ease: "circ.out",
      },
      "<+0.2"
    );
  });

  return () => mm.revert();
}, []);


  return (
    <div ref={contextRef}>
      <div style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
        <div
          ref={headerRef}
          className="flex flex-col justify-center gap-2 
          pt-16
          sm:gap-4"
        >
          <p
            className={`
              px-10 text-sm font-light uppercase tracking-[0.5rem] hidden md:block
              ${textColor}
            `}
          >
            {subTitle}
          </p>

          <div className="md:px-10">
            <h1
              className={`
                banner-text-responsive flex flex-col gap-12 uppercase 
                md:text-8xl text-4xl 
                sm:gap-12 md:block
                ${textColor}
              `}
            >
              {titleParts.map((part, index) => (
                <span key={index}>{part} </span>
              ))}
            </h1>
          </div>
        </div>
      </div>

      <div className={`relative px-10 ${textColor}`}>
        <div className="absolute inset-x-0 border-t-2 border-black/30 dark:border-white/30" />

        <div className="py-4 text-end sm:py-8 ">
          <AnimatedTextLines
            text={text}
            className="value-text-responsive font-light uppercase"
          />
        </div>
      </div>
    </div>
  );
};

export default AnimatedHeaderSection;
