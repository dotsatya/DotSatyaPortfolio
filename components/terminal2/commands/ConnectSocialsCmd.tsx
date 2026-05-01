import React from 'react';
import { SOCIALS } from "@/lib/AllDetails";

const getHandleFromUrl = (url?: string) => {
  if (!url) return "";
  try {
    const trimmed = url.trim();
    const normalized = trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
    const parsed = new URL(normalized);
    const segment = parsed.pathname.split("/").filter(Boolean).pop() ?? "";
    return segment.replace(/^@/, "");
  } catch {
    return "";
  }
};

export const ConnectSocialsCmd = () => {
  const githubHandle = getHandleFromUrl(SOCIALS.github) || "github";
  const linkedinHandle = getHandleFromUrl(SOCIALS.linkedin) || "linkedin";
  const twitterHandle = getHandleFromUrl(SOCIALS.twitter) || "twitter";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2 text-sm">
      {[
        {
          name: "Email",
          value: SOCIALS.email,
          link: `mailto:${SOCIALS.email}`,
          color: "text-terminal-green",
          borderColor: "border-green-400/30",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          ),
        },
        {
          name: "GitHub",
          value: githubHandle,
          link: SOCIALS.github,
          color: "text-white",
          borderColor: "border-white/20",
          icon: (
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          ),
        },
        {
          name: "LinkedIn",
          value: linkedinHandle,
          link: SOCIALS.linkedin,
          color: "text-blue-400",
          borderColor: "border-blue-400/30",
          icon: (
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                clipRule="evenodd"
              />
            </svg>
          ),
        },
        {
          name: "Twitter",
          value: `@${twitterHandle}`,
          link: SOCIALS.twitter,
          color: "text-sky-400",
          borderColor: "border-sky-400/30",
          icon: (
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          ),
        },
      ].map((contact, i) => (
        <a
          key={i}
          href={contact.link}
          target="_blank"
          rel="noreferrer"
          className={`flex items-center gap-3 p-3 bg-terminal-dim/10 border border-transparent rounded-lg hover:bg-terminal-dim/20 transition-all group ${contact.borderColor} hover:border-current`}
        >
          <div
            className={`${contact.color} p-2 bg-terminal-dim/30 rounded-full group-hover:scale-110 transition-transform`}
          >
            {contact.icon}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-terminal-text font-bold text-sm">
              {contact.name}
            </span>
            <span className="text-terminal-text-dim text-xs truncate font-mono opacity-80 group-hover:opacity-100 transition-opacity">
              {contact.value}
            </span>
          </div>
        </a>
      ))}
    </div>
  );
};
