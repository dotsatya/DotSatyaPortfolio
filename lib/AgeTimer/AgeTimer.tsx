"use client";
import { useEffect, useState } from "react";

const AgeTimer = () => {
  const birthDate = new Date("2004-08-01T10:30:00");
  const [age, setAge] = useState<string>("");

  useEffect(() => {
    const updateAge = () => {
      const now = new Date();

      let diff = now.getTime() - birthDate.getTime();

      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
      diff -= years * (1000 * 60 * 60 * 24 * 365.25);

      const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.44));
      diff -= months * (1000 * 60 * 60 * 24 * 30.44);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      diff -= days * (1000 * 60 * 60 * 24);

      const hours = Math.floor(diff / (1000 * 60 * 60));
      diff -= hours * (1000 * 60 * 60);

      const minutes = Math.floor(diff / (1000 * 60));
      diff -= minutes * (1000 * 60);

      const seconds = Math.floor(diff / 1000);

      setAge(
        `${years}y : ${months}mon : ${days}d : ${hours}h : ${minutes}min : ${seconds}s`,
      );
    };

    updateAge();
    const interval = setInterval(updateAge, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <p className="text-sm opacity-80 font-mono text-gray-400 dark:text-gray-600 hidden sm:block">
      System Uptime- {age}
    </p>
  );
};

export default AgeTimer;
