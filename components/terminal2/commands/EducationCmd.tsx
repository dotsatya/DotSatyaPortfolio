import React from 'react';
import { Portfolio } from "@/lib/AllDetails";

export const EducationCmd = () => (
  <div className="mt-2 text-base space-y-4">
    {Portfolio.education.map((edu) => (
      <div key={edu.id}>
        <div className="text-terminal-green font-bold">
          {edu.degree}
        </div>
        <div className="text-terminal-text-dim">
          {edu.institution} | {edu.duration}
        </div>
      </div>
    ))}
  </div>
);
