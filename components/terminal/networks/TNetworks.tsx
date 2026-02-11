import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Globe } from "lucide-react";
import { Portfolio } from "@/lib/Portfolio";
import { CommandPrompt } from "../CommandPrompt";

const TNetworks = () => {
  const socialLinks = Portfolio.socialLinks;

  return (
    <>
      <section id="network" className="pb-12 max-w-5xl mx-auto mt-20">
        <CommandPrompt
          command="./connect.sh --status"
          delay={200}
          path="~/network"
        />
        <div
          className="
        mt-8 rounded-lg overflow-hidden shadow-md
        bg-white dark:bg-[#0d1117]
        border border-slate-300 dark:border-[#30363d]
      "
        >
          <motion.div
            initial={{
              opacity: 0,
              x: -60,
              scale: 0.96,
              filter: "blur(6px)",
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              scale: 1,
              filter: "blur(0px)",
            }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.12,
            }}
          >
            {/* Terminal Window Header */}
            <div
              className="
          flex items-center justify-between px-4 py-2
          bg-slate-100 dark:bg-[#161b22]
          border-b border-slate-300 dark:border-[#30363d]
        "
            >
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                </div>
                <span className="text-xs font-mono text-slate-600 dark:text-[#8b949e]">
                  network_manager — v2.4.0
                </span>
              </div>

              <div className="text-xs font-mono text-slate-600 dark:text-[#8b949e]">
                UPTIME:{" "}
                <span className="text-emerald-600 dark:text-[#4ade80]">
                  99.9%
                </span>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6 md:p-8 font-mono">
              <div
                className="
            mb-6 text-sm flex flex-col md:flex-row md:items-center justify-between gap-4
            text-slate-600 dark:text-[#8b949e]
          "
              >
                <div>
                  <span className="text-emerald-600 dark:text-[#4ade80]">
                    $
                  </span>{" "}
                  netstat -an | grep LISTEN
                  <br />
                  <span className="opacity-50">
                    # Scanning available communication channels...
                  </span>
                </div>

                <div
                  className="
              px-3 py-1 rounded text-xs
              bg-slate-50 dark:bg-[#0d1117]
              border border-slate-300 dark:border-[#30363d]
            "
                >
                  STATUS:{" "}
                  <span className="text-emerald-600 dark:text-[#4ade80] animate-pulse">
                    ONLINE
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                {/* Table Header */}
                <div
                  className="
              grid grid-cols-[auto_1fr_auto] md:grid-cols-[150px_1fr_150px] gap-4
              px-4 py-2 text-xs uppercase tracking-wider
              text-slate-500 dark:text-[#6e7681]
              border-b border-slate-300 dark:border-[#30363d]
            "
                >
                  <div>Protocol</div>
                  <div>Endpoint / Address</div>
                  <div className="text-right">Action</div>
                </div>

                {/* Reusable row styles applied automatically */}
                {[
                  {
                    show: Portfolio.socialLinks.email,
                    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${socialLinks.email}`,
                    label: "MAILTO",
                    value: socialLinks.email,
                    Icon: Mail,
                  },
                  {
                    show: socialLinks.github,
                    href: socialLinks.github,
                    label: "SSH / GIT",
                    value: socialLinks.github?.replace("https://", ""),
                    Icon: Github,
                  },
                  {
                    show: socialLinks.linkedin,
                    href: socialLinks.linkedin,
                    label: "LINKEDIN",
                    value: socialLinks.linkedin?.split("in/")[1] || "profile",
                    Icon: Linkedin,
                  },
                  {
                    show: socialLinks.website,
                    href: socialLinks.website,
                    label: "HTTPS",
                    value: socialLinks.website?.replace(/^https?:\/\//, ""),
                    Icon: Globe,
                  },
                ].map(
                  (item, i) =>
                    item.show && (
                      <a
                        key={i}
                        href={item.href}
                        target="_blank"
                        className="
                    grid grid-cols-[auto_1fr_auto] md:grid-cols-[150px_1fr_150px] gap-4 items-center
                    px-4 py-3 group transition-colors
                    hover:bg-slate-100 dark:hover:bg-[#161b22]
                    border-b border-slate-300/50 dark:border-[#30363d]/50
                  "
                      >
                        <div className="flex items-center gap-2 text-slate-900 dark:text-[#e6edf3]">
                          <item.Icon className="w-4 h-4 text-amber-500 dark:text-[#facc15]" />
                          <span className="font-bold">{item.label}</span>
                        </div>

                        <div className="text-sm truncate text-slate-600 dark:text-[#8b949e] group-hover:text-emerald-600 dark:group-hover:text-[#4ade80]">
                          {item.value}
                        </div>

                        <div className="text-right">
                          <span
                            className="
                        text-xs px-2 py-1 rounded
                        bg-white dark:bg-[#0d1117]
                        text-indigo-600 dark:text-[#79c0ff]
                        border border-slate-300 dark:border-[#30363d]
                        group-hover:border-indigo-500 dark:group-hover:border-[#79c0ff]
                      "
                          >
                            CONNECT
                          </span>
                        </div>
                      </a>
                    ),
                )}
              </div>

              <div
                className="
            mt-6 pt-4 flex justify-between items-center text-xs
            border-t border-slate-300 dark:border-[#30363d]
            text-slate-600 dark:text-[#8b949e]
          "
              >
                <div>
                  <span className="text-emerald-600 dark:text-[#4ade80]">
                    ✔
                  </span>{" "}
                  4 ports open
                </div>
                <div className="flex items-center gap-2">
                  <span>latency: 24ms</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-[#4ade80]" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default TNetworks;
