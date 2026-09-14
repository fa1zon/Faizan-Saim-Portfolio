import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

import Cursor from "@/components/Cursor";
import MotionProvider from "@/components/MotionProvider";
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import ProfileBadge from "@/components/ProfileBadge";
import SmoothScroll from "@/components/SmoothScroll";
import { site } from "@/data/site";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: site.about.body[0],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={figtree.variable}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f%5B%5D=switzer@200,300,400,500&display=swap"
        />
      </head>
      <body className="font-body">
        <MotionProvider>
          <SmoothScroll />
          <Cursor />

          <PageTransition>{children}</PageTransition>

          <Header />
          <ProfileBadge />
        </MotionProvider>
      </body>
    </html>
  );
}
