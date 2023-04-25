import "@/styles/globals.css";
import ScrollToTop from "@/components/ScrollToTop";
import Navbar from "@/components/Navbar";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <ScrollToTop>
        <Component {...pageProps} />
      </ScrollToTop>
    </>
  );
}
