import React from 'react';

export const SudoCmd: React.FC<{ fullName: string }> = ({ fullName }) => (
  <span className="text-red-500 font-bold mt-2 text-base block">
    Permission denied: You are not {fullName}. Nice try though!
  </span>
);
