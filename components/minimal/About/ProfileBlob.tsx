"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type ProfileBlobProps = {
  profilePic: {
    src: string;
  };
};

export default function ProfileBlob({ profilePic }: ProfileBlobProps) {
  return (
    <>
      <style>{`
        @keyframes profile-blob-morph {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
        .animate-profile-morph {
          animation: profile-blob-morph 8s ease-in-out infinite;
        }
        .animate-profile-morph:hover {
          animation-play-state: paused;
        }
      `}</style>
      <motion.div
        className="relative w-55 h-55 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 
        justify-self-center animate-profile-morph overflow-hidden"
        whileHover={{ scale: 1.05 }}
      >
        <Image
          src={profilePic.src}
          alt="Profile photo"
          fill
          priority
          sizes="(max-width: 640px) 220px, (max-width: 768px) 240px, (max-width: 1024px) 288px, 320px"
          className="object-cover pointer-events-none z-0"
        />
        {/* Overlay for the inset shadow, inheriting the morphed border-radius */}
        <div 
          className="absolute inset-0 shadow-[inset_0_0_0_8px_rgba(255,255,255,0.3)] pointer-events-none z-10" 
          style={{ borderRadius: "inherit" }}
        />
      </motion.div>
    </>
  );
}
