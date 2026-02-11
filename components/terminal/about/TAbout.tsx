import { TypeAnimation } from "react-type-animation";
import { CommandPrompt } from "../CommandPrompt";
import { Portfolio } from "@/lib/Portfolio";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  ExternalLink,
  Globe,
} from "lucide-react";
import { motion } from "framer-motion";

const TAbout = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    "about",
    "projects",
    "skills",
    "experience",
    "network",
    "feedback",
  ];

  const { fullName, bio, socialLinks } = Portfolio;

  return (
    <>
      <section
        id="Tabout"
        className="   border-l  border-slate-300 dark:border-slate-00  max-w-5xl mx-auto pl-10 mt-6 dark:bg-transparent"
      >
        <CommandPrompt command="./init.sh" delay={500} />

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
          <h1 className=" text-4xl font-bold mt-6 text-slate-900 dark:text-[#e6edf3] ">
            {"Hello, I'm "}
            <span className="text-emerald-600 dark:text-[#4ade80]">
              {fullName}
            </span>
          </h1>

          <p className="text-2xl my-4 text-slate-600 dark:text-[#8b949e]">
            {">"}{" "}
            <TypeAnimation
              sequence={[
                "Web Developer",
                1000,
                "Software Developer",
                1000,
                "UI/UX Designer",
                1000,
                "Graphic Designer",
                1000,
              ]}
              wrapper="span"
              speed={60}
              className="text-2xl font-medium"
              repeat={Infinity}
            />
          </p>

          {bio && (
            <p className=" max-w-2xl leading text-slate-700 dark:text-[#c9d1d9]">
              <span className="text-indigo-500 dark:text-[#79c0ff] opacity-60">
                {"//"}
              </span>{" "}
              {bio}
            </p>
          )}

          {/* Social Links */}
          <div className="flex flex-wrap gap-4 mt-8 pt-4">
            {Object.entries(socialLinks || {}).map(([key, value]) => {
              if (!value) return null;

              const Icon = key.includes("github")
                ? Github
                : key.includes("linkedin")
                  ? Linkedin
                  : key.includes("twitter")
                    ? Twitter
                    : key.includes("email")
                      ? Mail
                      : key.includes("website")
                        ? Globe
                        : ExternalLink;

              return (
                <a
                  key={key}
                  href={
                    key === "email"
                      ? `https://mail.google.com/mail/?view=cm&fs=1&to=${value}`
                      : value
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="  flex items-center gap-2 px-3 py-1.5 rounded text-sm  bg-white dark:bg-[#21262d]  border border-slate-300 dark:border-[#30363d]  text-slate-700 dark:text-[#c9d1d9]  hover:border-emerald-500 hover:text-emerald-600  dark:hover:border-[#4ade80] dark:hover:text-[#4ade80]  transition-colors shadow-sm dark:shadow-none"
                >
                  <Icon className="w-4 h-4" />
                  <span>{key}</span>
                </a>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="  flex flex-wrap gap-4 mt-8 text-sm border-t border-slate-300 dark:border-[#30363d]  pt-6">
            <div className="italic w-full mb-2 text-slate-500 dark:text-[#8b949e]">
              # Navigation
            </div>

            {navItems.map((item, i) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="  text-slate-600 dark:text-[#8b949e]  hover:text-indigo-600 dark:hover:text-[#facc15]  hover:underline decoration-dashed underline-offset-4"
              >
                {`[${i + 1}] jump_to_${item}`}
              </button>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default TAbout;
