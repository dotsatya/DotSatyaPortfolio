"use client";

import { useEffect, useState } from "react";

const TFooter = () => {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
      );
    };

    updateTime(); // initial
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer id="footer" className="relative py-2 px-6">
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-gray-400 to-transparent opacity-50"></div>

      <div className="w-[98%] mx-auto h-8 flex items-center justify-between px-4 text-sm select-none">
        <span className="text-terminal-green font-bold  hidden md:inline text-xs">
          dotsatya.OS v2.5
        </span>
        
        <span className="text-xs font-light text-gray-400text text-center">
          &copy; 2026 dotsatya, All rights reserved.
        </span>

        <span className="text-terminal-primary text-xs md:text-sm">
          {time ?? "--/--/---- --:--:--"}
        </span>
      </div>
    </footer>
  );
};

export default TFooter;
