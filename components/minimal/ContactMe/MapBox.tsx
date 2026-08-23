"use client";
import { Portfolio } from "@/lib/AllDetails";
import { motion } from "framer-motion";

const MapBox = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: +60,
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
      <h3 className="text-2xl font-medium text-center mb-4 text-gray-800 dark:text-gray-200">
        Location
      </h3>

      <div className="rounded-xl overflow-hidden border mt-6 border-white/10 shadow-lg">
        <iframe
          title="My location on Google Maps"
          src={Portfolio.location}
          className="w-full h-[280px] md:h-[450px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </motion.div>
  );
};

export default MapBox;
