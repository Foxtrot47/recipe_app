import "@/styles/globals.css";
import ScrollToTop from "@/components/ScrollToTop";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/react";

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
