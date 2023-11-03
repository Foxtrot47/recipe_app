import "../styles/globals.css";

import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import {
  Inter,
  Playfair_Display,
  Source_Sans_3,
  Work_Sans,
} from "next/font/google";

import Navbar from "../components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
});

const sourceSans = Source_Sans_3({
  display: "swap",
  weight: ["200", "300", "400", "600", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-source-sans",
});

const workSans = Work_Sans({
  display: "swap",
  weight: ["200", "300", "400", "600", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: "Recipes",
  description: "A simple recipe website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark:bg-gray-800 dark:text-gray-300`}>
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
