import React from 'react';
import { EXPERIENCE } from "@/lib/AllDetails";

export const ExperienceCmd = () => (
  <div className="space-y-6 mt-2">
    {EXPERIENCE.map((e, i) => (
      <div key={i}>
        <div className="flex flex-wrap justify-between items-baseline text-terminal-green text-lg">
          <span className="font-bold mr-2">
            {e.role} @ {e.company}
          </span>
          <span className="text-terminal-text-dim text-sm font-normal font-mono whitespace-nowrap">
            {e.period}
          </span>
        </div>
        <div className="text-terminal-text-dim text-base mt-1">
          {e.description}
        </div>
      </div>
    ))}
  </div>
);
