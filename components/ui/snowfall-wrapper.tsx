"use client";

import React from "react";
import Snowfall from "react-snowfall";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface SnowfallWrapperProps {
  radius?: [number, number];
  color?: string;
  speed?: [number, number];
  wind?: [number, number];
  style?: React.CSSProperties;
  snowflakeCount?: number;
}

export default function SnowfallWrapper({
  color,
  snowflakeCount = 200,
  ...props
}: SnowfallWrapperProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const snowfallColor =
    color || (resolvedTheme === "dark" ? "#ffffff60" : "#00000040");

  return (
    <div className="hidden md:block">
      <Snowfall
        snowflakeCount={snowflakeCount}
        color={snowfallColor}
        {...props}
      />
    </div>
  );
}
