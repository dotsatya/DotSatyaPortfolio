import React from 'react';
import { FileSystemNode } from "@/lib/AllDetails";

export const LsCmd: React.FC<{ items: string[], currentDir: { [key: string]: FileSystemNode } }> = ({ items, currentDir }) => (
  <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2 text-sm">
    {items.map((item) => {
      const isDir = currentDir[item].type === "directory";
      return (
        <span
          key={item}
          className={
            (isDir
              ? "text-terminal-blue font-bold"
              : "text-terminal-text") +
            " block break-all whitespace-normal"
          }
          title={item}
        >
          {item}
          {isDir ? "/" : ""}
        </span>
      );
    })}
  </div>
);
