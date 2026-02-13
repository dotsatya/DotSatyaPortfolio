import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import {
  Inter,
  Playfair_Display,
  Cormorant_Garamond,
  Instrument_Serif,
  IBM_Plex_Mono,
} from "next/font/google";
import "kursor/dist/kursor.css";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";
import Cursor from "@/components/ui/Cursor";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument",
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /*
  npm install next-themes
  npm install react-icons lucide-react
  npx shadcn@latest init
  npx shadcn@latest add button
  npx shadcn@latest add skeleton
  */
  // npm install @radix-ui/react-slot
  // npm install clsx tailwind-merge

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.className} ${mono.className} ${inter.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
          <Cursor />
          <Toaster position="top-center" richColors />
          <div className="min-h-screen flex flex-col bg-[#F5F5F5] dark:bg-[#080808]">
            <Header />
            <main className=" flex-1 ">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
