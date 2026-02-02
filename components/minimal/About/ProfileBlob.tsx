"use client";

import { motion, useAnimation } from "framer-motion";

type ProfileBlobProps = {
  profilePic: {
    src: string;
  };
};



export default function ProfileBlob({ profilePic }: ProfileBlobProps) {
  const controls = useAnimation();

  return (
    <motion.div
      className="w-75 h-75 bg-cover bg-center justify-self-center order-1
        shadow-[inset_0_0_0_8px_rgba(255,255,255,0.3)]"
      style={{ backgroundImage: `url(${profilePic.src})` }}
      animate={{
        borderRadius: [
          "60% 40% 30% 70% / 60% 30% 70% 40%",
          "30% 60% 70% 40% / 50% 60% 30% 60%",
          "60% 40% 30% 70% / 60% 30% 70% 40%",
        ],
        transition: {
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      initial="animate"
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => {
        controls.stop();
      }}
      onHoverEnd={() => {
        controls.start("animate");
      }}
    />
  );
}
