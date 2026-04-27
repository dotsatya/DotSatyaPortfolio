import React from 'react';
import { Portfolio, PROJECTS, SKILLS } from "@/lib/AllDetails";

export const DotSatyaCmd = () => {
  const S_ASCII_ART = Portfolio.S_ASCII_ART;
  const profileUser = Portfolio.userName;
  const profileHost = "portfolio";
  const topSkills = SKILLS.flatMap((s) => s.skills)
    .slice(0, 5)
    .join(" • ");

  return (
    <div className="flex flex-col md:flex-row gap-12 mt-4 mb-6">
      {/* ASCII Art - Linux Kali Style with Gradient */}
      <div className="font-bold text-[10px] sm:text-xs leading-tight select-none shrink-0 whitespace-pre text-transparent bg-clip-text bg-gradient-to-br from-terminal-primary to-terminal-accent">
        {S_ASCII_ART}
      </div>

      {/* Personal Info */}
      <div className="font-mono text-sm flex-1 space-y-0.5 pt-2">
        <div className="mb-3">
          <span className="text-[#FF8C00] font-bold">
            {profileUser}@{profileHost}
          </span>
          <div className="text-terminal-text">----------------</div>
        </div>

        <div>
          <span className="text-[#FF8C00] font-bold">User</span>:{" "}
          <span className="text-terminal-text">{Portfolio.fullName}</span>
        </div>
        <div>
          <span className="text-[#FF8C00] font-bold">Role</span>:{" "}
          <span className="text-terminal-text">{Portfolio.title}</span>
        </div>
        <div>
          <span className="text-[#FF8C00] font-bold">Experience</span>:{" "}
          <span className="text-terminal-text">
            {Portfolio.experience.length}+ roles
          </span>
        </div>
        <div>
          <span className="text-[#FF8C00] font-bold">Skills</span>:{" "}
          <span className="text-terminal-text">{topSkills}</span>
        </div>
        <div>
          <span className="text-[#FF8C00] font-bold">Projects</span>:{" "}
          <span className="text-terminal-text">
            {PROJECTS.length} Active Packages
          </span>
        </div>
        <div>
          <span className="text-[#FF8C00] font-bold">Shell</span>:{" "}
          <span className="text-terminal-text">dotsatya-sh</span>
        </div>
        <div>
          <span className="text-[#FF8C00] font-bold">Terminal</span>:{" "}
          <span className="text-terminal-text">dotsatya-tty</span>
        </div>
        <div>
          <span className="text-[#FF8C00] font-bold">CPU</span>:{" "}
          <span className="text-terminal-text">dotsatya @ 100% Focus</span>
        </div>
        <div>
          <span className="text-[#FF8C00] font-bold">Memory</span>:{" "}
          <span className="text-terminal-text">Infinite Learning Cap</span>
        </div>

        {/* Color Palette Strip - Matching the reference image style */}
        <div className="flex gap-0 mt-4 h-4 w-52">
          <div className="flex-1 bg-black"></div>
          <div className="flex-1 bg-[#FF0000]"></div>
          <div className="flex-1 bg-[#00FF00]"></div>
          <div className="flex-1 bg-[#FFFF00]"></div>
          <div className="flex-1 bg-[#0000FF]"></div>
          <div className="flex-1 bg-[#FF00FF]"></div>
          <div className="flex-1 bg-[#00FFFF]"></div>
          <div className="flex-1 bg-[#FFFFFF]"></div>
        </div>
      </div>
    </div>
  );
};
