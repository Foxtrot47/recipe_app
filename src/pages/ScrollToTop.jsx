// ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = (props) => {
  const location = useLocation();

  const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, c - c / 8);
    }
  };

  useEffect(() => {
    scrollToTop();
  }, [location]);

  // eslint-disable-next-line react/prop-types
  return <>{props.children}</>;
};

export default ScrollToTop;
