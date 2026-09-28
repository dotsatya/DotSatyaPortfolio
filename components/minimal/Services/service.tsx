"use client";

import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Portfolio } from "@/lib/AllDetails";
import { motion } from "framer-motion";
import AnimatedHeaderSection from "@/components/ui/AnimattedHeading/AnimatedHeaderSection";

type ServiceRef = HTMLDivElement | null;

const Services: React.FC = () => {
  const serviceRefs = useRef<ServiceRef[]>([]);

  const isDesktopMedia = useMediaQuery({ minWidth: "48rem" });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const isDesktop = mounted && isDesktopMedia;

  useGSAP(() => {
    serviceRefs.current.forEach((el) => {
      if (!el) return;

      gsap.from(el, {
        y: 200,
        duration: 1,
        ease: "circ.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
      });
    });
  }, []);

  const servicesData = Portfolio.servicesData;

  return (
    <section
      id="services"
      className="mx-auto pt-6 md:pt-20 text-black dark:text-white  "
    >
      <AnimatedHeaderSection
        subTitle={
          <>
            BEHIND THE SCENE,{" "}
            <span className="font-bold text-amber-400">BEYOND</span>{" "}
            <span className="italic font-bold text-rose-400">THE SCREEN</span>
          </>
        }
        title={
          <>
            <span className="text-black dark:text-white">EXEC</span>
            <span className="italic text-transparent [-webkit-text-stroke:1.5px_#fbbf24]">
              UTION
            </span>
            <span className="text-rose-400">.</span>
          </>
        }
        text={[
          <>
            Shipping bulletproof{" "}
            <span className="font-bold text-amber-400">architectures</span> at
            scale
          </>,
          <>
            Designed to captivate. Built to{" "}
            <span className="font-bold text-rose-400">win</span>
          </>,
        ]}
        textColor="text-black dark:text-white"
        withScrollTrigger={true}
      />
      {servicesData.map((service, index) => (
        <div
          key={index}
          ref={(el) => {
            serviceRefs.current[index] = el;
          }}
          // Adjusted: px-6 for mobile, md:px-10 for tablet/desktop
          className="sticky px-6 md:px-10 pt-6 pb-12 border-t-2
               bg-[#F5F5F5] dark:bg-[#080808] text-black border-black/30
               dark:text-white dark:border-white/30"
          style={
            isDesktop
              ? {
                  top: `calc(10vh + ${index * 5}em)`,
                }
              : { top: 0 }
          }
        >
          <div className="flex items-center justify-between gap-4">
            {/* Adjusted: gap-4 on mobile, lg:gap-6 on desktop */}
            <div className="flex flex-col gap-4 lg:gap-6">
              {/* Adjusted Title: text-2xl on mobile, scales up to text-4xl */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold lg:font-normal">
                {service.title}
              </h2>

              {/* Adjusted Description: text-sm on mobile, tracking-wide instead of widest to fit better */}
              <p
                className="text-sm md:text-base lg:text-xl leading-relaxed tracking-wide lg:tracking-widest
                     text-black/60 dark:text-white/60 text-pretty"
              >
                {service.description}
              </p>

              {/* Adjusted List Items: text-base on mobile, scales up to text-2xl */}
              <div
                className="flex flex-col gap-3 sm:gap-4 text-base md:text-lg lg:text-2xl
                     text-black/80 dark:text-white/80 mt-2 lg:mt-0"
              >
                {service.items.map((item, itemIndex) => (
                  <div key={`item-${index}-${itemIndex}`}>
                    <h3 className="flex items-start sm:items-center">
                      {/* Adjusted Numbers: smaller margin (mr-4) and text-sm on mobile */}
                      <span className="mr-4 md:mr-8 lg:mr-12 text-sm md:text-base lg:text-lg text-black/30 dark:text-white/30 shrink-0 mt-0.5 sm:mt-0">
                        0{itemIndex + 1}
                      </span>
                      <span>{item.title}</span>
                    </h3>

                    {itemIndex < service.items.length - 1 && (
                      <div className="w-full h-px my-3 bg-black/20 dark:bg-white/20" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Services;
