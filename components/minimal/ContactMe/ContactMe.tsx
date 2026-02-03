"use client";
import { toast } from "sonner";
import React, { useEffect, useRef, useState } from "react";
import emailjs from "emailjs-com";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend } from "react-icons/fi";

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
    <section className="section py-16" id="contact">
      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          🛜 Let’s Connect...
        </h2>
      </div>

      {/* Main Grid */}
      <div
        className="container mx-auto grid grid-cols-2 gap-x-6 pb-12
                  max-[992px]:gap-x-6
                  max-[768px]:grid-cols-1 max-[768px]:gap-y-8"
      >
        {/* Left Content */}
        <div>
          <h3 className="text-lg font-medium text-center mb-4 text-gray-800 dark:text-gray-200">
            Let’s talk! 🚀
          </h3>

          <div
            className="grid gap-4 w-[300px] mx-auto
                      max-[576px]:w-full"
          >
            {/* WhatsApp */}
            <div
              className="bg-black/10 dark:bg-white/10
                        border border-gray-400/30 dark:border-white/20
                        p-4 rounded-xl text-center"
            >
              <i className="bx bxl-whatsapp text-2xl mb-1 text-gray-900 dark:text-white"></i>
              <h3 className="text-sm font-medium">Whatsapp</h3>
              <span className="block text-sm mb-3">+91 9830751252</span>

              <a
                href="https://api.whatsapp.com/send?phone=9830751252"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 text-sm cursor-pointer"
              >
                <span className="opacity-50 hover:opacity-80 transition">
                  Write me
                </span>
                <i
                  className="bx bx-right-arrow-alt text-base opacity-40
                          group-hover:translate-x-1 transition"
                ></i>
              </a>
            </div>

            {/* Email */}
            <div
              className="bg-black/10 dark:bg-white/10
                        border border-gray-400/30 dark:border-white/20
                        p-4 rounded-xl text-center"
            >
              <i className="bx bx-mail-send text-2xl mb-1 text-gray-900 dark:text-white"></i>
              <h3 className="text-sm font-medium">Email</h3>
              <span className="block text-sm mb-3">
                satyasundardey4@gmail.com
              </span>

              <a
                href="mailto:satyasundardey4@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 text-sm cursor-pointer"
              >
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
                        p-4 rounded-xl text-center"
            >
              <i className="bx bxl-linkedin text-2xl mb-1 text-gray-900 dark:text-white"></i>
              <h3 className="text-sm font-medium">LinkedIn</h3>
              <span className="block text-sm mb-3">satya-sundar-dey</span>

              <a
                href="https://www.linkedin.com/in/satya-sundar-dey/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 text-sm cursor-pointer"
              >
                <span className="opacity-50 hover:opacity-80 transition">
                  Write me
                </span>
                <i className="bx bx-right-arrow-alt text-base opacity-40 transition"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div>
          <h3 className="text-lg font-medium text-center mb-4 text-gray-800 dark:text-gray-200">
            💬 Have questions or ideas?
          </h3>

          <form
            ref={form}
            onSubmit={sendEmail}
            className="w-[360px] mt-6 mx-auto max-[576px]:w-full"
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
              <FiSend />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactMe;
