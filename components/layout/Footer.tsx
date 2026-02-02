import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { Portfolio } from "@/lib/Portfolio";

const Footer = () => {
  return (
    <footer id="footer" className="relative py-4 px-6">
      {/* Top Border Line */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-gray-400 to-transparent opacity-50"></div>

      <div className="w-[98%] mx-auto flex  items-center flex-row justify-between px-2">
        {/* Logo / Title */}
        <h1 className="text-lg font-bold hover:text-gray-600 transition-colors hidden sm:block">
          dotsatya
        </h1>

        {/* Copyright */}
        <span className="text-xs font-light text-gray-400text text-center">
          &copy; 2026 dotsatya, All rights reserved.
        </span>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-4 ">
          <a
            href={Portfolio.socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl  hover:text-gray-400 transition-colors hidden sm:block"
            title="Twitter Profile"
          >
            <FaXTwitter size={18}/>
          </a>
          <a
            href={Portfolio.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl hover:text-gray-400 transition-colors"
            title="GitHub Profile"
          >
            <BsGithub size={18}/>
          </a>
          <a
            href={Portfolio.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl hover:text-gray-400 transition-colors"
            title="LinkedIn Profile"
          >
            <BsLinkedin size={18}/>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
