"use client";

import Data from "./Data";
import Social from "./Social";
import ScrollDown from "./ScrollDown";
import profilePic from "@/public/pPic.jpg";
import { motion } from "framer-motion";
import ProfileBlob from "./ProfileBlob";

const About = () => {
  return (
    <section id="about" className="mx-auto pt-20 text-black dark:text-white ">
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
          <div className="grid grid-cols-[0.5fr-auto] gap-10   items-center lg:grid-cols-[120px_1fr_1fr] lg:gap-5 md:gap-14">
            <div className="order-1 -top-10">
              <Social />
            </div>

            <div className="order-2 lg:order-3 justify-self-start lg:justify-self-auto">
              <ProfileBlob profilePic={profilePic} />
            </div>
            <div className="col-span-2 lg:col-span-1 order-3 lg:order-2">
              <Data />
            </div>
          </div>
          <ScrollDown />
        </div>
      </motion.div>
    </section>
  );
};

export default About;
