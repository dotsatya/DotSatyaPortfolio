import React from 'react';

// Using the same array from Terminal2.tsx
const CERTIFICATIONS: Array<{ name: string; issuer: string; year: string }> = [];

export const CertificationsCmd = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 text-sm">
    {CERTIFICATIONS.map((cert, i) => (
      <div
        key={i}
        className="flex flex-col p-3 border border-terminal-dim/50 rounded-lg hover:border-terminal-primary/50 transition-colors bg-terminal-dim/5"
      >
        <div className="flex justify-between items-start mb-1">
          <span className="text-terminal-accent text-xs font-bold uppercase tracking-wider">
            {cert.issuer}
          </span>
          <span className="text-terminal-text-dim text-xs font-mono bg-terminal-dim/30 px-2 py-0.5 rounded">
            {cert.year}
          </span>
        </div>
        <div className="text-terminal-text font-bold text-sm">
          {cert.name}
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-terminal-green animate-pulse"></span>
          <span className="text-[10px] text-terminal-text-dim uppercase">
            Verified
          </span>
        </div>
      </div>
    ))}
  </div>
);
