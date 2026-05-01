"use client";

import { useEffect, useState } from "react";

const TFooter = () => {
  const [dateStr, setDateStr] = useState<string | null>(null);
  const [timeStr, setTimeStr] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setDateStr(
        now.toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        })
      );
      setTimeStr(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };

    updateTime(); // initial
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer id="footer" className="fixed bottom-0 left-0 w-full py-1.5 px-6 bg-[#F5F5F5] dark:bg-[#080808]">
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-gray-400 to-transparent opacity-50"></div>

      <div className="w-[98%] mx-auto h-8 flex items-center justify-between px-4 text-sm select-none">
        <span className="text-terminal-green font-bold text-xs">
          dotsatya.OS <span className="hidden sm:inline">v2.8</span>
        </span>
        
        <span className="text-xs font-light text-gray-400 text-center hidden md:inline">
          &copy; 2026 dotsatya, All rights reserved.
        </span>

        <span className="text-terminal-primary text-xs">
          <span className="sm:hidden">{dateStr ?? "--/--/----"}</span>
          <span className="hidden sm:inline">
            {dateStr && timeStr ? `${dateStr} ${timeStr}` : "--/--/---- --:--:--"}
          </span>
        </span>
      </div>
    </footer>
  );
};

export default TFooter;
