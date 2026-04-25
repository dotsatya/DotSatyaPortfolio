import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import LayoutClient from "./layout-client";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Satya // Portfolio",
  description:
    "A developer and designer from India working with web development and UI/UX design.",
};

/*
  npm install next-themes
  npm install react-icons lucide-react
  npx shadcn@latest init
  npx shadcn@latest add button
  npx shadcn@latest add skeleton
  */
// npm install @radix-ui/react-slot
// npm install clsx tailwind-merge

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.className} ${mono.className} ${inter.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
