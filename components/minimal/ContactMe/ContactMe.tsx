"use client";
import { motion } from "framer-motion";
import { toast } from "sonner";
import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FiSend } from "react-icons/fi";
import { Github } from "lucide-react";
import { Portfolio } from "@/lib/Portfolio";
import { MdMarkEmailRead } from "react-icons/md";
import { LiaLinkedin } from "react-icons/lia";

// ENV VARIABLES
const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

const ContactMe = () => {
  const form = useRef<HTMLFormElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    const promise = emailjs.sendForm(
      serviceId,
      templateId,
      form.current,
      publicKey,
    );

    toast.promise(promise, {
      loading: "Sending your message...",
      success: () => {
        form.current?.reset();
        return "Message sent successfully!";
      },
      error: (err) => {
        console.error("EmailJS Error:", err);
        return "Failed to send message. Please try again.";
      },
    });
  };
  return (
    <section className="section pt-16" id="contact">
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
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            🛜 Let’s Connect...
          </h2>
        </div>
      </motion.div>

      {/* Main Grid */}
      <div
        className="container mx-auto grid grid-cols-2 gap-x-6 
                  max-[992px]:gap-x-6
                  max-[768px]:grid-cols-1 max-[768px]:gap-y-8"
      >
        {/* Left Content */}
        <motion.div
          initial={{
            opacity: 0,
            x: +60,
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
          <h3 className="text-lg font-medium text-center mb-4 text-gray-800 dark:text-gray-200">
            Let’s talk! 🚀
          </h3>

          <div
            className="grid gap-4 w-[300px] mx-auto
                      max-[576px]:w-full"
          >
            {/* Email */}
            <div
              className="bg-black/10 dark:bg-white/10
                        border border-gray-400/30 dark:border-white/20
                        p-4 py-6 rounded-xl text-center"
            >
              <i className="bx bx-mail-send text-2xl mb-1 text-gray-900 dark:text-white"></i>
              <h3 className="text-sm font-bold">Email</h3>
              <span className="block text-sm mb-3">
                satyasundardey4@gmail.com
              </span>

              <a
                href="mailto:satyasundardey4@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 text-sm cursor-pointer"
              >
                <MdMarkEmailRead size={16} />
                <span className="opacity-50 hover:opacity-80 transition">
                  Write me
                </span>
                <i className="bx bx-right-arrow-alt text-base opacity-40 transition"></i>
              </a>
            </div>

            {/* LinkedIn */}
            <div
              className="bg-black/10 dark:bg-white/10
                        border border-gray-400/30 dark:border-white/20
                        p-4 py-6 rounded-xl text-center"
            >
              <i className="bx bxl-linkedin text-2xl mb-1 text-gray-900 dark:text-white"></i>
              <h3 className="text-sm font-bold">LinkedIn</h3>
              <span className="block text-sm mb-3">satya-sundar-dey</span>

              <a
                href={Portfolio.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 text-sm cursor-pointer"
              >
                <LiaLinkedin size={20} />
                <span className="opacity-50 hover:opacity-80 transition">
                  Write me
                </span>
                <i className="bx bx-right-arrow-alt text-base opacity-40 transition"></i>
              </a>
            </div>
            <div
              className="bg-black/10 dark:bg-white/10
                        border border-gray-400/30 dark:border-white/20
                        p-4 py-6 rounded-xl text-center"
            >
              <i className="bx bxl-whatsapp text-2xl mb-1 text-gray-900 dark:text-white"></i>
              <h3 className="text-sm font-bold">Github</h3>
              <span className="block text-sm mb-3">@dotsatya</span>

              <a
                href={Portfolio.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 text-sm cursor-pointer"
              >
                {" "}
                <Github size={16} />
                <span className="opacity-50 hover:opacity-80 transition">
                  Write me
                </span>
                <i
                  className="bx bx-right-arrow-alt text-base opacity-40
                          group-hover:translate-x-1 transition"
                ></i>
              </a>
            </div>
          </div>

          {/* WhatsApp */}
        </motion.div>

        {/* Right Content */}
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
          <h3 className="text-lg font-medium text-center mb-4 text-gray-800 dark:text-gray-200">
            💬 Have questions or ideas?
          </h3>

          <form
            ref={form}
            onSubmit={sendEmail}
            className=" mt-6 mx-auto max-[800px]:w-full"
          >
            {/* Name */}
            <div className="relative mb-8 h-16">
              <label
                className="absolute -top-3 left-5 text-xs px-3 py-1
                            backdrop-blur-md rounded z-10"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Insert your name"
                className="absolute inset-0 w-full h-full p-6 rounded-xl
                       border border-gray-400/20 bg-transparent
                       text-gray-900 dark:text-white outline-none"
              />
            </div>

            {/* Email */}
            <div className="relative mb-8 h-16">
              <label
                className="absolute -top-3 left-5 text-xs px-3 py-1
                            backdrop-blur-md rounded z-10"
              >
                Mail
              </label>
              <input
                type="email"
                name="email"
                placeholder="Insert your email"
                className="absolute inset-0 w-full h-full p-6 rounded-xl
                       border border-gray-400/20 bg-transparent
                       text-gray-900 dark:text-white outline-none"
              />
            </div>

            {/* Message */}
            <div className="relative mb-8 h-48">
              <label
                className="absolute -top-3 left-5 text-xs px-3 py-1
                            backdrop-blur-md rounded z-10"
              >
                Project
              </label>
              <textarea
                name="project"
                rows={10}
                placeholder="Write your message"
                className="absolute inset-0 w-full h-full p-6 rounded-xl
                       border border-gray-400/20 bg-transparent
                       text-gray-900 dark:text-white outline-none
                       resize-none overflow-y-auto scrollbar-none"
              ></textarea>
            </div>

            {/* Button */}
            <button
              className="inline-flex items-center gap-2 px-6 py-3
                     bg-[#363636] hover:bg-[#4f4f4f]
                     text-white font-semibold rounded-full
                     transition-transform hover:scale-[1.03]"
            >
              <span>Send Message</span>
              <FiSend size={20} />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactMe;
