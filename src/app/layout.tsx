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

const title = `${site.wordmark} — ${site.name}, ${site.role}`;

export const metadata: Metadata = {
  /**
   * Everything relative — the canonical link, the Open Graph image — resolves
   * against this, so a page shared from a preview deployment still points
   * people at the real site.
   */
  metadataBase: new URL(site.url),
  title,
  description: site.hero.lead,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.wordmark,
    title,
    description: site.hero.lead,
    url: "/",
  },
  twitter: { card: "summary_large_image", title, description: site.hero.lead },
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
