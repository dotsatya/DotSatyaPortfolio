"use client";
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Portfolio } from "@/lib/Portfolio";
import { Github } from "lucide-react";
import { ActivityCalendar } from "react-activity-calendar";

type GitHubContribution = {
  date: string;
  count: number;
  level: number;
};

const RealHeatmap = ({ username }: { username?: string }) => {
  const [data, setData] = useState<GitHubContribution[]>([]);
  const [loading, setLoading] = useState(false);

  // Extract pure username from github url if needed
  const cleanUsername = useMemo(() => {
    if (!username) return null;
    if (username.includes("github.com/")) {
      const parts = username.split("github.com/");
      return parts[1].replace(/\/?$/, ""); // remove trailing slash
    }
    return username;
  }, [username]);

  useEffect(() => {
    if (!cleanUsername) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${cleanUsername}?y=last`,
        );
        const json = await res.json();
        if (json.contributions) {
          setData(json.contributions);
        }
      } catch (e) {
        console.error("Failed to fetch GitHub data", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cleanUsername]);

  if (!cleanUsername) {
    return (
      <div className="rounded-xl border border-white/5 bg-[#0a0a0a] p-8 text-center text-neutral-500">
        No GitHub username linked.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className=" w-full overflow-hidden rounded-xl border p-6 lg:p-8 border-neutral-300 bg-white dark:border-white/5 dark:bg-[#0a0a0a]"
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Github className="h-5 w-5 text-neutral-900 dark:text-white" />
          <h3 className="font-sans text-sm font-medium text-neutral-900 dark:text-neutral-200">
            @{cleanUsername}
          </h3>
        </div>
        <span className="text-xs text-neutral-500 dark:text-neutral-500">
          Last Year Activity
        </span>
      </div>

      <div className="flex w-full justify-center overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] lg:thin-scrollbar">
        {loading ? (
          <div className="flex h-[108px] w-full items-center justify-center text-sm text-neutral-500 dark:text-neutral-600 animate-pulse">
            Loading contributions...
          </div>
        ) : data.length > 0 ? (
          <ActivityCalendar
            data={data}
            theme={{
              light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
              dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
            }}
            blockSize={15}
            blockRadius={3}
            blockMargin={4}
            fontSize={14}
            style={{ color: "currentColor" }}
          />
        ) : (
          <div className="text-sm text-neutral-500 dark:text-neutral-600">
            No public contribution data found.
          </div>
        )}
      </div>
    </motion.div>
  );
};

const GitHubActivities = () => {
  return (
    <>
      <section className="pt-20">
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
          <div className="mx-auto max-w-6xl w-full px-6 md:px-10 mb-6">
            <h2 className="font-mono text-center font-semibold text-4xl uppercase text-neutral-900 dark:text-white">
              GitHub Contributions
            </h2>
          </div>

          <div className="mx-auto max-w-6xl w-full md:px-10 overflow-x-auto md:overflow-visible ">
              <RealHeatmap username={Portfolio.socialLinks.github} />
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default GitHubActivities;
