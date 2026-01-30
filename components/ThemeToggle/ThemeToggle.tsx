"use client";
import React from "react";
import { Button } from "../ui/button";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="rounded-full cursor-grab"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <FaSun className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
      <FaMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
    </Button>
  );
};

export default ThemeToggle;
