"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const Cursor = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Dynamically import kursor
    import("kursor").then((KursorModule) => {
      const Kursor = KursorModule.default;

      // Check if kursor is already initialized to avoid duplicates
      if (!document.querySelector(".kursor")) {
        new Kursor({
          type: 4,
          removeDefaultCursor: true,
          color: "#fff",
        });
      }
    });

    // Function to add hover classes
    const addHoverClasses = () => {
      const hoverTargets = document.querySelectorAll(
        // "h1, a, button, .hover-target, input, textarea, select, [role='button']",
        "h1 , h2 ",
      );
      hoverTargets.forEach((el) => {
        el.classList.add("k-hover");
      });
    };

    // Initial run
    addHoverClasses();

    // Observer for dynamic content changes
    const observer = new MutationObserver((mutations) => {
      addHoverClasses();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      // We don't remove the cursor instance itself because it's global,
      // but we ensure we don't create duplicates.
    };
  }, [pathname]); // Re-run on route change

  return null;
};

export default Cursor;
