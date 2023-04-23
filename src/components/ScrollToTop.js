// ScrollToTop.jsx
import { useEffect } from "react";
import {useRouter} from 'next/router';

const ScrollToTop = (props) => {
  const router = useRouter()

  const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, c - c / 8);
    }
  };

  useEffect(() => {
    scrollToTop();
  }, [router]);

  // eslint-disable-next-line react/prop-types
  return <>{props.children}</>;
};

export default ScrollToTop;
