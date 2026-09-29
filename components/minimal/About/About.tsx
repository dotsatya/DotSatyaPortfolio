"use client";

import Data from "./Data";
import Social from "./Social";
import ScrollDown from "./ScrollDown";
import profilePic from "@/public/pPic.jpg";
import { motion } from "framer-motion";
import ProfileBlob from "./ProfileBlob";

const About = () => {
  const letters = "SATYA".split("");
  return (
    // Added 'relative' and 'overflow-hidden' to contain the background text properly

    <section
      id="about"
      className="relative overflow-hidden mx-auto pt-6 md:pt-12 lg:pt-20 text-black dark:text-white"
    >
      {/* Background Text */}
      <div className="hidden lg:block absolute top-1/2 left-[44%] -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-8 dark:opacity-6">
        <h1 className="italic text-[6rem] sm:text-[10rem] md:text-[14rem] lg:text-[18rem] font-extrabold text-transparent whitespace-nowrap [-webkit-text-stroke:2px_theme(colors.gray.500)] dark:[-webkit-text-stroke:2px_theme(colors.white)]">
          {" "}
          {letters.map((letter, index) => (
            <motion.span  
              key={index}
              initial={{
                y: 250,
                opacity: 0,
              }}
              whileInView={{
                y: 0,
                opacity: 1,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </h1>
      </div>

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
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-[50px_1fr] md:grid-cols-[100px_1fr] gap-6 items-center lg:grid-cols-[120px_1fr_1fr] lg:gap-5 md:gap-14">
            <div className="mb-8 sm:mb-0">
              <Social />
            </div>

            <div className="w-full h-full lg:hidden mb-4 sm:mb-0">
              <ProfileBlob profilePic={profilePic} />
            </div>
            <div className="col-span-2 lg:col-span-1 ">
              <Data />
            </div>
            <div className="w-full h-full hidden lg:block">
              <ProfileBlob profilePic={profilePic} />
            </div>
          </div>
          <ScrollDown />
        </div>
      </motion.div>
    </section>
  );
};

export default About;
