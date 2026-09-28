"use client";
import { Skiper16 } from "@/components/ui/skiper-ui/skiper16";
import { Skiper52 } from "@/components/ui/skiper-ui/skiper52";
import AnimatedHeaderSection from "@/components/ui/AnimattedHeading/AnimatedHeaderSection";
import { motion } from "framer-motion";
import { Portfolio } from "@/lib/AllDetails";

const PhotoGraphy = () => {
   const images = Portfolio.photography;
  return (
    <>
      <section className="section pt-20">
        <AnimatedHeaderSection
          subTitle={
            <>
              <span className="text-white/60">My</span>{" "}
              <span className="font-semibold text-rose-300">Passion</span>{" "}
              <span className=" text-orange-300">Beyond</span>{" "}
              <span className="text-white/50">Code</span>
            </>
          }
          title={
            <>
              <span className="">PAS</span>
              <span className="font-semibold italic text-[#fb7185]">SION</span>
              <span className="text-white/30">.</span>
            </>
          }
          text={[
            <>
              Capturing{" "}
              <span className="font-semibold text-rose-300">stories</span>,
              emotions, and
            </>,
            <>
              moments <span className=" text-gray-500">through </span>
              <span className="italic font-semibold text-orange-300">
                My Lens
              </span>
              .
            </>,
          ]}
          textColor="text-black dark:text-white"
          withScrollTrigger={true}
        />
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
          <div className="hidden md:block">
            <Skiper52 images={images} />
          </div>
          <div className="block md:hidden">
            <Skiper16 images={images} />
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default PhotoGraphy;
