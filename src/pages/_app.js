import "@/styles/globals.css";
import ScrollToTop from "./ScrollToTop";

export default function App({ Component, pageProps }) {
  return (
    <ScrollToTop>
      <Component {...pageProps} />
    </ScrollToTop>
  );
}
