"use client";
import { motion } from "framer-motion";
import { toast } from "sonner";
import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FiSend } from "react-icons/fi";

// ENV VARIABLES
const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

const MessageBox = () => {
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
      <h3 className="text-2xl font-medium text-center mb-4 text-gray-800 dark:text-gray-200">
        💬 Have questions or ideas?
      </h3>

      <form
        ref={form}
        onSubmit={sendEmail}
        className="mt-6 w-full"
      >
        {/* Name */}
        <div className="relative mb-8 h-16">
          <label
            className="absolute -top-3 left-5 text-xs px-3 py-1
                            bg-[#F5F5F5] dark:bg-[#080808]
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
            required
          />
        </div>

        {/* Email */}
        <div className="relative mb-8 h-16">
          <label
            className="absolute -top-3 left-5 text-xs px-3 py-1
                            bg-[#F5F5F5] dark:bg-[#080808]
                            backdrop-blur-md rounded z-10"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Insert your email"
            className="absolute inset-0 w-full h-full p-6 rounded-xl
                       border border-gray-400/20 bg-transparent
                       text-gray-900 dark:text-white outline-none"
            required
          />
        </div>

        {/* Message */}
        <div className="relative mb-8 h-48">
          <label
            className="absolute -top-3 left-5 text-xs px-3 py-1
                            bg-[#F5F5F5] dark:bg-[#080808]
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
                      resize-none scrollbar-none"
            required
          ></textarea>
        </div>

        {/* Button */}
        <button
          className="inline-flex items-center gap-2 px-6 py-3
                     bg-[#363636] hover:bg-[#4f4f4f]
                     text-white font-semibold rounded-full
                     transition-all duration-300 ease-in-out 
                     hover:brightness-125 active:scale-[0.98]"
        >
          <span>Send Message</span>
          <FiSend size={20} />
        </button>
      </form>
    </motion.div>
  );
};

export default MessageBox;
