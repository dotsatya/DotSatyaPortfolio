"use client";
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3674.5!2d88.4333!3d22.9750!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f8bbf0a4c1c6a9%3A0x5d3b1e7e1e1e1e1e!2sKalyani%2C%20Nadia%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1"
          className="w-full h-[280px] md:h-[450px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </motion.div>
  );
};

export default MapBox;
