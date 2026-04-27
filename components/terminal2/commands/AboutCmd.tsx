import React from 'react';
import { ABOUT_TEXT } from "@/lib/AllDetails";

export const AboutCmd = () => (
  <span className="whitespace-pre-wrap leading-relaxed max-w-3xl text-terminal-text mt-2 block">
    {ABOUT_TEXT}
  </span>
);
