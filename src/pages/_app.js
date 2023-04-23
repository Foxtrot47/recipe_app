import "@/styles/globals.css";
import ScrollToTop from "@/components/ScrollToTop";

export default function App({ Component, pageProps }) {
  return (
    <ScrollToTop>
      <Component {...pageProps} />
    </ScrollToTop>
  );
}
