"use client";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ImArrowUpRight2 } from "react-icons/im";
import { Portfolio } from "@/lib/Portfolio";
import Image from "next/image";
import { Github } from "lucide-react";
import { createPortal } from "react-dom";

type OverlayRef = HTMLDivElement | null;

const Works: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const overlayRefs = useRef<OverlayRef[]>([]);
  const previewRef = useRef<HTMLDivElement | null>(null);

  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  // const text = `Featured projects that have been meticulously
  //   crafted with passion to drive
  //   results and impact.`;

  const mouse = useRef({ x: 0, y: 0 });
  const moveX = useRef<((value: number) => void) | null>(null);
  const moveY = useRef<((value: number) => void) | null>(null);

  useGSAP(() => {
    if (!previewRef.current) return;

    // ✅ PREVENT WHITE FLASH
    gsap.set(previewRef.current, {
      opacity: 0,
      scale: 0.95,
    });

    overlayRefs.current.forEach((el) => {
      if (!el) return;
      gsap.set(el, {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      });
    });

    moveX.current = gsap.quickTo(previewRef.current, "x", {
      duration: 1.5,
      ease: "power3.out",
    });

    moveY.current = gsap.quickTo(previewRef.current, "y", {
      duration: 2,
      ease: "power3.out",
    });

    gsap.from("#project", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: "#project",
      },
    });
  }, [mounted]);

  const handleMouseEnter = (index: number) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(index);

    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.fromTo(
      el,
      {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        duration: 0.15,
        ease: "power2.out",
      },
    );

    gsap.to(previewRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (index: number) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(null);

    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.to(el, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      duration: 0.2,
      ease: "power2.in",
    });

    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return;

    mouse.current.x = e.clientX + 24;
    mouse.current.y = e.clientY + 24;

    moveX.current?.(mouse.current.x);
    moveY.current?.(mouse.current.y);
  };

  const projects = Portfolio.projects;

  return (
    <section
      className="container section mx-auto  hidden lg:block " //hidden lg:block for large screen
    >
      <div className="relative flex flex-col" onMouseMove={handleMouseMove}>
        {projects.map((project, index) => (
          <div
            key={project.id}
            id="project"
            className="relative flex flex-col gap-1 py-5 cursor-pointer group md:gap-0"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            {/* overlay */}
            <div
              ref={(el) => {
                overlayRefs.current[index] = el;
              }}
              className="absolute inset-0 hidden md:block duration-200 bg-black dark:bg-white -z-10 clip-path"
            />

            {/* title */}
            <div className="flex justify-between px-10 transition-all duration-500 text-black dark:text-white md:group-hover:px-12 md:group-hover:text-white dark:md:group-hover:text-black">
              <h2 className="lg:text-[32px] text-[26px] leading-none">
                {project.title}
              </h2>
              <div className="flex flex-wrap gap-4">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={22} />
                </a>
                <a
                  href={project.liveUrl || project.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ImArrowUpRight2 className="size-6" />
                </a>
              </div>
            </div>

            {/* divider */}
            <div className="w-full h-0.5 bg-black/80 dark:bg-white/80" />

            {/* framework */}
            <div className="flex px-10 text-xs leading-loose uppercase transtion-all duration-500 md:text-sm gap-x-5 md:group-hover:px-12">
              {project.tags.map((tag, idx) => (
                <p
                  key={idx}
                  className="text-black dark:text-white transition-colors duration-500 md:group-hover:text-white dark:md:group-hover:text-black"
                >
                  {tag}
                </p>
              ))}
            </div>
          </div>
        ))}

        {/* desktop floating preview image */}
        {mounted &&
          createPortal(
            <div
              ref={previewRef}
              className="fixed -top-2/6 left-0 z-50 overflow-hidden border-6 border-black rounded-xl dark:border-white pointer-events-none w-[680px] md:block hidden opacity-0"
            >
              {currentIndex !== null && (
                <Image
                  src={projects[currentIndex].imageUrl}
                  alt="preview"
                  className="object-cover w-full h-full"
                />
              )}
            </div>,
            document.body,
          )}
      </div>
    </section>
  );
};

export default Works;
