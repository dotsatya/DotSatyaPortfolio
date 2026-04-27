import React from 'react';
import { SKILLS } from "@/lib/AllDetails";

export const SkillsCmd = () => (
  <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-8 mt-2">
    {SKILLS.map((cat, i) => (
      <div key={i}>
        <div className="text-terminal-green mb-2 border-b border-terminal-dim pb-1 uppercase text-sm tracking-wider">
          {cat.category}
        </div>
        <ul className="space-y-1 text-terminal-text-dim text-base">
          {cat.skills.map((s) => (
            <li
              key={s}
              className="before:content-['-'] before:mr-2 before:text-terminal-dim"
            >
              {s}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);
