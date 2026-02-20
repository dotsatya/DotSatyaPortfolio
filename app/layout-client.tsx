"use client";

import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";
import ReactLenis from "lenis/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TFooter from "./terminal/TFooter";
import Cursor from "@/components/ui/Cursor";
import { Toaster } from "sonner";
import "kursor/dist/kursor.css";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isTerminal = pathname.startsWith("/terminal");

  return (
    <ThemeProvider attribute="class" enableSystem defaultTheme="system">
      <ReactLenis
        root
        options={{
          lerp: 0.1,
          duration: 1.2,
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 1.2,
        }}
      >
        <Cursor />
        <Toaster position="top-center" richColors />

        <div className="min-h-screen flex flex-col bg-[#F5F5F5] dark:bg-[#080808]">
          <Header />
          <main className="flex-1">{children}</main>
          {isTerminal ? <TFooter /> : <Footer />}
        </div>
      </ReactLenis>
    </ThemeProvider>
  );
}