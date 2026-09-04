import PersonSchema from "../components/person-schema";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
// import LayoutClient from "./layout-client";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const autography = localFont({
  src: "../fonts/Autography.otf",
  variable: "--font-autography",
});

const photographSignature = localFont({
  src: "../fonts/Photograph Signature.ttf",
  variable: "--font-photograph-signature",
});

export const metadata: Metadata = {
  title: {
    default: "Satya Sundar Dey // Portfolio",
    template: "%s | Satya Sundar Dey | dotsatya",
  },

  description:
    "Official portfolio of Satya Sundar Dey, also known as DotSatya — Software Engineer, Full-Stack Developer, and UI/UX Designer specializing in modern web applications and digital experiences.",

  keywords: [
    "Satya Sundar Dey",
    "dotsatya",
    "Dot Satya",
    "Satya Dey",
    "Satya Sundar",
    "Software Engineer",
    "Full Stack Developer",
    "Frontend Developer",
    "UI UX Designer",
    "Web Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript Developer",
  ],

  authors: [
    {
      name: "Satya Sundar Dey",
      url: "https://dotsatya.vercel.app",
    },
  ],

  creator: "Satya Sundar Dey (@dotsatya)",

  metadataBase: new URL("https://dotsatya.vercel.app"),

  openGraph: {
    title: "Satya Sundar Dey (dotsatya) | Software Engineer & UI/UX Designer",

    description:
      "Official portfolio of Satya Sundar Dey, also known as dotsatya — Software Engineer, Full-Stack Developer, and UI/UX Designer.",

    url: "https://dotsatya.vercel.app",

    siteName: "dotsatya | Satya Sundar Dey Portfolio",

    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
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
        className={`${poppins.className} ${mono.className} ${inter.variable} ${autography.variable}  ${photographSignature.variable} font-sans antialiased`}
      >
        <PersonSchema />
        {children}
      </body>
    </html>
  );
}
