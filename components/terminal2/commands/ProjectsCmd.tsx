import React from 'react';
import { PROJECTS } from "@/lib/AllDetails";

export const ProjectsCmd = () => (
  <div className="grid grid-cols-1 gap-6 mt-2">
    {PROJECTS.map((p, i) => (
      <div key={i} className="pl-4 border-l border-terminal-dim text-sm">
        <div className="text-terminal-green font-bold text-sm">
          {p.name}
        </div>
        <div className="text-terminal-text-dim my-1 text-xs sm:text-sm">
          {p.description}
        </div>
        <div className="flex flex-wrap gap-2 text-terminal-cyan text-xs">
          {p.tech.map((t) => (
            <span key={t}>[{t}]</span>
          ))}
        </div>
      </div>
    ))}
  </div>
);
