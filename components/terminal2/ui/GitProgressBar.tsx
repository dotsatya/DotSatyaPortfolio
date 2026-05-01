import React, { useState, useEffect } from "react";

// Simulated Progress Bar Component for Git Clone
// Note: Google Drive links block CORS, so we cannot track actual download progress bytes in JS.
// We simulate the visual progress to 100% before triggering the actual browser download.
export const GitProgressBar: React.FC<{ onComplete: () => void }> = ({
  onComplete,
}) => {
  const [percent, setPercent] = useState(0);
  const totalSize = 4.2; // Mock size in MiB

  useEffect(() => {
    let current = 0;
    // Simulation speed: finishes in approx 1.5 - 2 seconds
    const interval = setInterval(() => {
      // Random increment between 1% and 5%
      const increment = Math.random() * 4 + 1;
      current += increment;

      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setPercent(100);
        // Wait a moment at 100% before triggering completion
        setTimeout(onComplete, 400);
      } else {
        setPercent(current);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  const width = 25;
  const filled = Math.floor((percent / 100) * width);
  const empty = Math.max(0, width - filled);

  // Desktop: [████░░░]
  const filledStr = "█".repeat(filled);
  const emptyStr = "░".repeat(empty);

  // Mobile Bar (Smaller)
  const filledMobile = "█".repeat(Math.floor(filled / 2));
  const emptyMobile = "░".repeat(Math.floor(empty / 2));

  const loadedSize = (percent / 100) * totalSize;

  return (
    <div className="font-mono mt-1 w-full max-w-2xl">
      <div className="flex items-center gap-2 text-sm md:text-base flex-wrap">
        <span className="text-terminal-text-dim text-sm whitespace-nowrap">
          Receiving objects:
        </span>
        <span className="text-terminal-text-dim text-sm min-w-[3ch] text-right">
          {Math.floor(percent)}%
        </span>

        {/* Desktop Bar */}
        <span className="text-terminal-primary text-sm hidden sm:inline font-bold">
          [{filledStr}
          {emptyStr}]
        </span>

        {/* Mobile Bar */}
        <span className="text-terminal-primary sm:hidden font-bold">
          [{filledMobile}
          {emptyMobile}]
        </span>

        <span className="text-terminal-text-dim whitespace-nowrap ml-2 text-xs">
          {loadedSize.toFixed(2)} MiB / {totalSize} MiB
        </span>
      </div>
    </div>
  );
};
