"use client";

import Magnetic from "@/components/ui/Magnetic";
import { Portfolio } from "@/lib/AllDetails";
import { Github, Linkedin } from "lucide-react";
import { BsBehance } from "react-icons/bs";
import { SiGmail } from "react-icons/si";

const Social = () => {
  return (
    <div className="flex flex-col gap-6 top-1/2 justify-center items-center">
      <Magnetic>
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=satyasundardey4@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          aria-label="GitHub"
        >
          <SiGmail />
        </a>
      </Magnetic>
      <Magnetic>
        <a
          href={Portfolio.socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          aria-label="LinkedIn"
        >
          <Linkedin />
        </a>
      </Magnetic>
      <Magnetic>
        <a
          href={Portfolio.socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          aria-label="GitHub"
        >
          <Github />
        </a>
      </Magnetic>
      <Magnetic>
        <a
          href={Portfolio.socialLinks.behance}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          aria-label="Behance"
        >
          <BsBehance />
        </a>
      </Magnetic>
    </div>
  );
};

export default Social;
