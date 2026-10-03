"use client";

import { useEffect } from "react";

const Cursor = () => {
  useEffect(() => {
    let cancelled = false;

    const initCursor = async () => {
      const isDesktop =
        window.matchMedia("(pointer: fine)").matches &&
        window.innerWidth >= 768;

      if (!isDesktop || cancelled) return;

      const { default: Kursor } = await import("kursor");

      if (cancelled) return;

      // Add hover class to headings once
      document.querySelectorAll("h1, h2").forEach((element) => {
        element.classList.add("k-hover");
      });

      // Initialize Kursor
      if (!document.querySelector(".kursor")) {
        new Kursor({
          type: 4,
          removeDefaultCursor: true,
          color: "#fff",
        });
      }
    };

    initCursor();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
};

export default Cursor;