import "../styles/globals.css";

import { Analytics } from "@vercel/analytics/react";
import {
  Inter,
  Playfair_Display,
  Source_Sans_Pro,
  Work_Sans,
} from "next/font/google";

import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
});

const sourceSans = Source_Sans_Pro({
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

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <ScrollToTop>
        <Component {...pageProps} />
      </ScrollToTop>
      <Analytics />
    </>
  );
}
