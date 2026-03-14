"use client";
import { Portfolio } from "@/lib/Portfolio";
import { FaXTwitter } from "react-icons/fa6";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import AgeTimer from "@/lib/AgeTimer/AgeTimer";

const Footer = () => {
  return (
    <div
      className="relative h-[100px] sm:h-[162px] md:h-[180px] lg:h-[220px]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div
        className="relative 
            h-[calc(100vh+100px)] sm:h-[calc(100vh+162px)] md:h-[calc(100vh+180px)] lg:h-[calc(100vh+220px)]
            -top-[100vh]"
      >
        <div
          className="sticky top-[calc(100vh-100px)] sm:top-[calc(100vh-162px)] md:top-[calc(100vh-180px)] lg:top-[calc(100vh-220px)]"
        >
          <div
            className="w-full h-[100px] sm:h-[162px] md:h-[180px] lg:h-[220px] 
          dark:bg-[#F5F5F5] bg-[#080808] rounded-t-3xl"
          >
            {/* Top Border Line */}
            <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-gray-400 to-transparent opacity-50"></div>

            <div className="w-[98%] mx-auto flex flex-col px-4 pt-1  md:pb-4">
              <div className="w-full flex items-center flex-row justify-between py-2">
                {/* Logo */}
                <h1 className="text-lg font-bold hover:text-gray-600 text-white dark:text-black transition-colors hidden sm:block">
                  dotsatya
                </h1>

                {/* Copyright */}
                <span className="text-xs font-light text-gray-400 dark:text-gray-600 text-center">
                  &copy; 2026 dotsatya, All rights reserved.
                </span>

                {/* Social Links */}
                <div className="flex items-center justify-center gap-4">
                  <a
                    href={Portfolio.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl hover:text-gray-400 transition-colors hidden sm:block text-white dark:text-black"
                    title="Twitter Profile"
                  >
                    <FaXTwitter size={18} />
                  </a>

                  <a
                    href={Portfolio.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl hover:text-gray-400 transition-colors text-white dark:text-black"
                    title="GitHub Profile"
                  >
                    <BsGithub size={18} />
                  </a>

                  <a
                    href={Portfolio.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl hover:text-gray-400 transition-colors text-white dark:text-black"
                    title="LinkedIn Profile"
                  >
                    <BsLinkedin size={18} />
                  </a>
                </div>
              </div>

              <AgeTimer />
            </div>

            <div
              className="
          relative overflow-y-hidden
          h-[4rem] sm:h-[6rem] md:h-[6rem] lg:h-[10rem]
        "
            >
              <h1
                className="
            absolute top-2 sm:top-4 md:top-0 inset-x-0  text-center
            font-[helvetica] font-extrabold tracking-wide leading-none
            text-[60px] sm:text-[100px] md:text-[120px] lg:text-[180px]
            bg-clip-text text-transparent bg-linear-to-b
            dark:from-black dark:via-black/40 dark:to-72%
            from-white/90 via-white/10 to-72%
          "
              >
                DOT SATYA
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
