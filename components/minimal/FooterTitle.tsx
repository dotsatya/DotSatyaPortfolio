"use client";
import { motion } from "framer-motion";

export const FooterTitle = ({ text }: { text: string }) => {
  return (
    <>
      {/* <div className="overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 160 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center -mb-9 sm:-mb-16 md:-mb-22 lg:-mb-30 "
        >
          <h1
            // style={{ fontSize: 200 }}
            className=" font-[helvetica] tracking-wide font-extrabold 
                         text-[60px] sm:text-[100px] md:text-[140px] lg:text-[200px]
                         bg-clip-text text-transparent bg-linear-to-b
                         from-black via-black/40 to-66%
                         dark:from-white/90 dark:via-white/10 dark:to-66%"
          >
            {text}
          </h1>
        </motion.div>
      </div> */}

      <div
        className="
        relative overflow-hidden
        h-[2.5rem] sm:h-[4rem] md:h-[6rem] lg:h-[8rem]
      "
      >
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="
          absolute top-0 inset-x-0 text-center
          font-[helvetica] font-extrabold tracking-wide leading-none
          text-[60px] sm:text-[100px] md:text-[140px] lg:text-[200px]
          bg-clip-text text-transparent bg-linear-to-b
          from-black via-black/40 to-66%
          dark:from-white/90 dark:via-white/10 dark:to-66%
        "
        >
          {text}
        </motion.h1>
      </div>
    </>
  );
};
