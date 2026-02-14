"use client";

import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Portfolio } from "@/lib/Portfolio";
import { motion } from "framer-motion";
import AnimatedHeaderSection from "@/lib/AnimattedHeading/AnimatedHeaderSection";

type ServiceRef = HTMLDivElement | null;

const Services: React.FC = () => {
  const serviceRefs = useRef<ServiceRef[]>([]);

  const isDesktopMedia = useMediaQuery({ minWidth: "48rem" });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
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
      className="mx-auto  pt-20 text-black dark:text-white  "
    >
      <AnimatedHeaderSection
        subTitle={"Behind the scene, Beyond the screen"}
        title={"Service"}
        text={`I build secure, high-performance full-stack apps
              with smooth UX to drive growth 
              not headaches.`}
        textColor={"text-black dark:text-white"}
        withScrollTrigger={true}
      />

      {/* <motion.div
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
        <div className="text-center mb-8">
          <h2 className="font-mono text-4xl font-semibold text-gray-900 dark:text-gray-100">
            Services
          </h2>
          <span className="block text-lg mt-2 text-gray-600 dark:text-gray-400">
            🧩 Show My Skills
          </span>
        </div>
      </motion.div> */}

      {servicesData.map((service, index) => (
        <div
          key={index}
          ref={(el) => {
            serviceRefs.current[index] = el;
          }}
          className="sticky px-10 pt-6 pb-12 border-t-2
                     bg-[#F5F5F5] dark:bg-[#080808] text-black border-black/30
                     dark:text-white dark:border-white/30"
          style={
            isDesktop
              ? {
                  top: `calc(10vh + ${index * 5}em)`,
                  // marginBottom: `${(servicesData.length - index - 1) * 5}rem`,
                }
              : { top: 0 }
          }
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-6">
              <h2 className="text-4xl lg:text-4xl">{service.title}</h2>

              <p
                className="text-lg leading-relaxed tracking-widest lg:text-xl
                            text-black/60 dark:text-white/60 text-pretty"
              >
                {service.description}
              </p>

              <div
                className="flex flex-col gap-2 text-xl sm:gap-4 lg:text-2xl
                              text-black/80 dark:text-white/80"
              >
                {service.items.map((item, itemIndex) => (
                  <div key={`item-${index}-${itemIndex}`}>
                    <h3 className="flex">
                      <span className="mr-12 text-lg text-black/30 dark:text-white/30">
                        0{itemIndex + 1}
                      </span>
                      {item.title}
                    </h3>

                    {itemIndex < service.items.length - 1 && (
                      <div className="w-full h-px my-2 bg-black/30 dark:bg-white/30" />
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
