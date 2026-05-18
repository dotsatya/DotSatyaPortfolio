'use client';
import { Skiper16 } from "@/components/ui/skiper-ui/skiper16";
import { Skiper52 } from "@/components/ui/skiper-ui/skiper52";
import AnimatedHeaderSection from "@/lib/AnimattedHeading/AnimatedHeaderSection";
import { motion } from "framer-motion";

const PhotoGraphy = () => {
  return (
    <>
      <section className="pt-20">
        <AnimatedHeaderSection
          subTitle={" My Passion Beyond Code"}
          title={"Passion"}
          text={`Capturing stories, emotions, and 
            moments through My Lens.`}
          textColor={"text-black dark:text-white "}
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
            <Skiper52 />
          </div>
         <div className="block md:hidden">
            <Skiper16 />
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default PhotoGraphy;
