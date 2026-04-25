"use client";
import Lottie from "lottie-react";
import NotFoundAnimation from "../components/NotFoundAnimation/NotFoundAnimation.json";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="w-[600px] max-w-full">
        <Lottie animationData={NotFoundAnimation} loop />
      </div>
    </div>
  );
};

export default NotFound;