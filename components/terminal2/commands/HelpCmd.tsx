import React from 'react';

export const HelpCmd = () => (
  <div className="mt-2 text-terminal-text space-y-1 text-sm">
    <div className="mb-2">Available commands:</div>
    <div className="grid grid-cols-[140px_1fr] gap-x-4 gap-y-1">
      <span>ls</span>
      <span className="text-terminal-text-dim">
        - List directory contents
      </span>
      <span>cd [dir]</span>
      <span className="text-terminal-text-dim">- Change directory</span>
      <span>cat [file]</span>
      <span className="text-terminal-text-dim">
        - Print file content
      </span>
      <span>pwd</span>
      <span className="text-terminal-text-dim">
        - Print working directory
      </span>
      <span>rm / mkdir</span>
      <span className="text-terminal-text-dim">
        - Modify file system
      </span>
      <span>clear</span>
      <span className="text-terminal-text-dim">
        - Clear the terminal
      </span>
      <span>history</span>
      <span className="text-terminal-text-dim">
        - Show command history
      </span>
      <span>date</span>
      <span className="text-terminal-text-dim">
        - Show current date
      </span>
      <span>echo [text]</span>
      <span className="text-terminal-text-dim">
        - Print text to terminal
      </span>
      <span>sudo</span>
      <span className="text-terminal-text-dim">
        - Superuser privileges
      </span>
      <span>dotsatya</span>
      <span className="text-terminal-text-dim">
        - Display system info
      </span>
      <span>whoami</span>
      <span className="text-terminal-text-dim">
        - Display current user
      </span>
      <span className="col-span-2 mt-2 mb-1 text-terminal-green/50">
        -- Shortcuts --
      </span>
      <span>about</span>
      <span className="text-terminal-text-dim">- Learn about me</span>
      <span>projects</span>
      <span className="text-terminal-text-dim">- View my projects</span>
      <span>skills</span>
      <span className="text-terminal-text-dim">
        - See my technical skills
      </span>
      <span>experience</span>
      <span className="text-terminal-text-dim">
        - My work experience
      </span>
      <span>education</span>
      <span className="text-terminal-text-dim">
        - View my education
      </span>
      <span>certifications</span>
      <span className="text-terminal-text-dim">
        - My certifications
      </span>
      <span>socials</span>
      <span className="text-terminal-text-dim">- How to reach me</span>
      <span>git clone resume</span>
      <span className="text-terminal-text-dim">
        - Download my resume
      </span>
      <span>ping_me</span>
      <span className="text-terminal-text-dim">
        - Send me a quick message
      </span>
    </div>
  </div>
);
