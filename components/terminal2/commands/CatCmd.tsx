import React from 'react';
import { FileSystemNode } from "@/lib/AllDetails";

export const CatCmd: React.FC<{ node: FileSystemNode | undefined | null, target: string }> = ({ node, target }) => {
  if (!node) {
    return <div className="text-red-500 mt-2">cat: {target}: No such file or directory</div>;
  }
  if (node.type === "directory") {
    return <div className="text-red-500 mt-2">cat: {target}: Is a directory</div>;
  }
  return (
    <div className="whitespace-pre-wrap text-terminal-text mt-2 ">
      {node.content}
    </div>
  );
};
