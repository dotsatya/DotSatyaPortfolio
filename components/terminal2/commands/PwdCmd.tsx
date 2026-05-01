import React from 'react';

export const PwdCmd: React.FC<{ path: string }> = ({ path }) => (
  <div className="text-terminal-text mt-2 text-sm">{path}</div>
);
