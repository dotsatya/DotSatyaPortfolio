"use client"

import {  ArrowDown } from "lucide-react";

const ScrollDown= () => {
  return (
    <div className="ml-30 mt-10">
      <a
        href="#about"
        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
      >
        {/* Mouse SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 247 390"
          className="w-8 h-8"
          style={{
            fillRule: "evenodd",
            clipRule: "evenodd",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeMiterlimit: 1.5,
          }}
        >
          {/* Wheel */}
          <path
            d="M123.359,79.775l0,72.843"
            className="animate-bounce"
            style={{
              fill: "none",
              stroke: "#808080",
              strokeWidth: "20px",
            }}
          />

          {/* Mouse body */}
          <path
            d="M236.717,123.359c0,-62.565 -50.794,-113.359 -113.358,-113.359c-62.565,0 -113.359,50.794 -113.359,113.359l0,143.237c0,62.565 50.794,113.359 113.359,113.359c62.564,0 113.358,-50.794 113.358,-113.359l0,-143.237Z"
            style={{
              fill: "none",
              stroke: "#404040",
              strokeWidth: "20px",
            }}
          />
        </svg>

        {/* Text */}
        <span className="text-sm font-medium">Scroll Down</span>

        {/* Arrow */}
        <div className="text-sm mt-.5 " ><ArrowDown  size={16}/></div>
      </a>
    </div>
  );
};

export default ScrollDown;
