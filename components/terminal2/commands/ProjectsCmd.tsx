import React from 'react';
import { PROJECTS } from "@/lib/AllDetails";

export const ProjectsCmd = () => (
  <div className="grid grid-cols-1 gap-6 mt-2">
    {PROJECTS.map((p, i) => (
      <div key={i} className="pl-4 border-l border-terminal-dim">
        <div className="text-terminal-green font-bold text-lg">
          {p.name}
        </div>
        <div className="text-terminal-text-dim text-base my-1">
          {p.description}
        </div>
        <div className="flex flex-wrap gap-2 text-sm text-terminal-cyan">
          {p.tech.map((t) => (
            <span key={t}>[{t}]</span>
          ))}
        </div>
      </div>
    ))}
  </div>
);
