import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { Portfolio } from "@/lib/Portfolio";

const Footer = () => {
  return (
    <footer id="footer" className="relative h-[220px] py-4 px-6"
    style={{clipPath:"polygon(0 0, 100% 0, 100% 100%, 0 100%)"}}>
      <div className="fixed bottom-0 left-0 w-full h-[220px] dark:bg-[#F5F5F5] bg-[#080808] rounded-t-3xl">
      {/* Top Border Line */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-gray-400 to-transparent opacity-50"></div>

      <div className="w-[98%] mx-auto flex  items-center flex-row justify-between px-2 py-6">
        {/* Logo / Title */}
        <h1 className="text-lg font-bold hover:text-gray-600 text-white dark:text-black transition-colors hidden sm:block">
          dotsatya
        </h1>

        {/* Copyright */}
        <span className="text-xs font-light text-gray-400 dark:text-gray-600 text-center  ">
          &copy; 2026 dotsatya, All rights reserved.
        </span>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-4 ">
          <a
            href={Portfolio.socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl  hover:text-gray-400 transition-colors hidden sm:block text-white dark:text-black"
            title="Twitter Profile"
          >
            <FaXTwitter size={18}/>
          </a>
          <a
            href={Portfolio.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl hover:text-gray-400 transition-colors text-white dark:text-black   "
            title="GitHub Profile"
          >
            <BsGithub size={18}/>
          </a>
          <a
            href={Portfolio.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl hover:text-gray-400 transition-colors text-white dark:text-black"
            title="LinkedIn Profile"
          >
            <BsLinkedin size={18}/>
          </a>
        </div>
      </div>
        <div
        className="
        relative overflow-hidden
        h-[2.5rem] sm:h-[4rem] md:h-[6rem] lg:h-[10rem]
      "
      >
        <h1
          className="
          absolute top-0 inset-x-0 text-center
          font-[helvetica] font-extrabold tracking-wide leading-none
          text-[60px] sm:text-[100px] md:text-[140px] lg:text-[200px]
          bg-clip-text text-transparent bg-linear-to-b
          dark:from-black dark:via-black/40 dark:to-72%
          from-white/90 via-white/10 to-72%
        "
        >
          DOT SATYA
        </h1>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
