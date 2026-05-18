"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { cn } from "@/lib/utils";
import { Portfolio } from "@/lib/AllDetails";
import Image, { StaticImageData } from "next/image";

const Skiper52 = () => {
  const images = Portfolio.photography;

  // const images = [
  //   {
  //     src: "/images/x.com/13.jpeg",
  //     alt: "Illustrations by my fav AarzooAly",
  //     code: "# 23",
  //   },
  //   {
  //     src: "/images/x.com/32.jpeg",
  //     alt: "Illustrations by my fav AarzooAly",
  //     code: "# 23",
  //   },
  //   {
  //     src: "/images/x.com/20.jpeg",
  //     alt: "Illustrations by my fav AarzooAly",
  //     code: "# 23",
  //   },
  //   {
  //     src: "/images/x.com/21.jpeg",
  //     alt: "Illustrations by my fav AarzooAly",
  //     code: "# 23",
  //   },
  //   {
  //     src: "/images/x.com/19.jpeg",
  //     alt: "Illustrations by my fav AarzooAly",
  //     code: "# 23",
  //   },
  //   {
  //     src: "/images/x.com/1.jpeg",
  //     alt: "Illustrations by my fav AarzooAly",
  //     code: "# 23",
  //   },
  //   {
  //     src: "/images/x.com/2.jpeg",
  //     alt: "Illustrations by my fav AarzooAly",
  //     code: "# 23",
  //   },
  //   {
  //     src: "/images/x.com/3.jpeg",
  //     alt: "Illustrations by my fav AarzooAly",
  //     code: "# 23",
  //   },
  //   {
  //     src: "/images/x.com/4.jpeg",
  //     alt: "Illustrations by my fav AarzooAly",
  //     code: "# 23",
  //   },
  // ];

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden">
      <HoverExpand_001 className="" images={images} />{" "}
    </div>
  );
};

export { Skiper52 };

const HoverExpand_001 = ({
  images,
  className,
}: {
  images: { id: number; imageUrl: StaticImageData }[];
  className?: string;
}) => {
  const [activeImage, setActiveImage] = useState<number | null>(1);

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.5,
      }}
      className={cn("relative w-full max-w-6xl px-5", className)}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <div className="flex w-full items-center justify-center gap-1">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="relative cursor-pointer overflow-hidden rounded-3xl"
              initial={{ width: "2.5rem", height: "20rem" }}
              animate={{
                width: activeImage === index ? "24rem" : "5rem",
                height: activeImage === index ? "24rem" : "24rem",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={() => setActiveImage(index)}
              onHoverStart={() => setActiveImage(index)}
            >
              <AnimatePresence>
                {activeImage === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute h-full w-full bg-gradient-to-t from-black/40 to-transparent"
                  />
                )}
              </AnimatePresence>
              <AnimatePresence>
                {activeImage === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute flex h-full w-full flex-col items-end justify-end p-4"
                  >
                    <Image
                      src={Portfolio.logoPic}
                      alt="logo"
                      width={20}
                      height={20}
                      className="mt-2 rounded-full opacity-50"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <Image src={image.imageUrl} alt="image" className="size-full object-cover" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export { HoverExpand_001 };