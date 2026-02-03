"use client";
import PhotoCard from "./PhotoCard";
import { Portfolio } from "@/lib/Portfolio";
import { motion, easeOut } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
};

const Photography = () => {
  const photoData = Portfolio.photography;
  return (
    <section id="portfolio" className="container section mx-auto px-4 py-12">
      {/* Section Title Bar */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          My Passion Beyond Code
        </h2>
        <span className="block text-lg mt-2 text-gray-600 dark:text-gray-400">
          📷 Capturing Moments Through My Lens
        </span>
      </div>

      {/* Page Wrapper */}
      <div className="w-full font-sans">
        <main className="max-w-[1200px] mx-auto px-4">
          {/* Masonry Grid */}
          <motion.div
            className=" columns-1 gap-8 sm:columns-2 lg:columns-3 "
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {photoData.map((photo) => (
              <motion.div
                key={photo.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="break-inside-avoid"
              >
                <PhotoCard key={photo.id} imageUrl={photo.imageUrl} />
              </motion.div>
            ))}
          </motion.div>
        </main>
      </div>
    </section>
  );
};

export default Photography;
