import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";

import Cursor from "@/components/Cursor";
import MotionProvider from "@/components/MotionProvider";
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { site } from "@/data/site";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-oswald",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.wordmark} — ${site.name}, ${site.role}`,
  description: site.hero.lead,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={oswald.variable}>
      <body className="font-body">
        <MotionProvider>
          <SmoothScroll />
          <Cursor />

          <Header />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
