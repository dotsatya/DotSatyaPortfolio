import React from 'react';
import { ABOUT_TEXT } from "@/lib/AllDetails";

export const AboutCmd = () => (
  <span className="whitespace-pre-wrap leading-relaxed max-w-3xl text-terminal-text mt-2 block text-sm">
    {ABOUT_TEXT}
  </span>
);
