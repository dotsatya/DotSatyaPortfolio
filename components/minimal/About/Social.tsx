"use client";

import { Portfolio } from "@/lib/Portfolio";
import { Github, Linkedin } from "lucide-react";
import { BsBehance } from "react-icons/bs";

const Social = () => {
  return (
    <div className="flex flex-col gap-6 top-1/2 justify-center items-center">
      <a
        href={Portfolio.socialLinks.behance}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        aria-label="Behance"
      >
        <BsBehance />
      </a>

      <a
        href={Portfolio.socialLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        aria-label="LinkedIn"
      >
        <Linkedin />
      </a>

      <a
        href={Portfolio.socialLinks.github}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        aria-label="GitHub"
      >
        <Github />
      </a>
    </div>
  );
};

export default Social;
