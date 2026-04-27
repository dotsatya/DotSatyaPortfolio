import React from 'react';

export const WhoamiCmd: React.FC<{ profileUser: string }> = ({ profileUser }) => (
  <div className="text-terminal-text mt-2">{profileUser}</div>
);
