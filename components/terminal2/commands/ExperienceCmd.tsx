import React from 'react';
import { EXPERIENCE } from "@/lib/AllDetails";

export const ExperienceCmd = () => (
  <div className="grid grid-cols-1 gap-4 mt-2">
    {EXPERIENCE.map((e, i) => (
      <div key={i} className='pl-4 border-l border-terminal-dim'>
        <div className="flex flex-wrap justify-between items-baseline text-terminal-green text-sm">
          <span className="font-bold mr-2">
            {e.role} @ {e.company}
          </span>
          <span className="text-terminal-text-dim text-xs font-normal font-mono whitespace-nowrap">
            {e.period}
          </span>
        </div>
        <div className="text-terminal-text-dim text-sm mt-1">
          {e.description}
        </div>
      </div>
    ))}
  </div>
);
