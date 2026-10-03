"use client";
import HandIcon from "@/components/ui/AnimatedIcon/HandIcon";
import { Portfolio } from "@/lib/AllDetails";
import { FiDownloadCloud, FiSend } from "react-icons/fi";
import { TypeAnimation } from "react-type-animation";

const Data = () => {
  return (
    <div className="  ">
      {/* Title */}
      <div>
        <p className="block text-gray-600 dark:text-gray-400 font-medium text-xl sm:text-2xl md:text-3xl mb-1">
          Hello, Myself
        </p>
        <h1 className="k-hover block uppercase text-3xl sm:text-4xl md:text-5xl font-bold sm:font-semibold text-gray-900 dark:text-gray-100 leading-tight break-words">
          {Portfolio.fullName}
          <HandIcon className="hand" />
        </h1>
      </div>

      {/* Animated Subtitle */}
      <h3 className="italic mt-2 md:mt-4 font-mono font-medium text-xl md:text-2xl opacity-40 text-black dark:text-white relative pl-[2.5rem] lg:pl-[5.4rem]  mb-4 before:content-[''] before:absolute before:left-0 before:top-4 before:w-[30px] lg:before:w-[70px] before:h-[2px] before:bg-gray-700 dark:before:bg-gray-300">
        <TypeAnimation
          sequence={[
            "Web Developer",
            1000,
            "Software Developer",
            1000,
            "AIML Enthusiast",
            1000,
            "UI/UX Designer",
            1000,
            "Graphic Designer",
            1000,
          ]}
          speed={60}
          repeat={Infinity}
        />
      </h3>

      {/* Description */}
      <p className="mt-6 text-sm sm:text-md  text-gray-600 dark:text-gray-400 leading-relaxed">
        {Portfolio.bio}
      </p>
      <div className="flex flex-wrap items-center gap-4 mt-8">
        {/* CTA Button */}
        <a
          href="#contact"
          className="inline-flex items-center justify-center gap-2 
    px-5 py-2.5 md:px-8 md:py-3 
    text-sm md:text-base
    rounded-4xl font-medium 
    bg-gray-900 text-white dark:text-white dark:bg-[#4f4f4f]
    hover:scale-105 transition-transform duration-200"
        >
          Say Hello
          <FiSend />
        </a>

        {/* Download CV Button */}
        <a
          href={Portfolio.socialLinks.resume}
          download
          className="inline-flex items-center justify-center gap-2 
    px-4 py-2.5 md:px-6 md:py-3 
    text-sm md:text-base
    rounded-tr-2xl rounded-sm font-medium 
    bg-gray-900 text-white dark:text-white dark:bg-[#4f4f4f]
    hover:scale-105 transition-transform duration-200"
        >
          Download CV
          <FiDownloadCloud />
        </a>
      </div>
    </div>
  );
};

export default Data;
