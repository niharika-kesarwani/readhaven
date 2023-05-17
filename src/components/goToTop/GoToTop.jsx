import { useEffect, useState } from "react";
import "./GoToTop.css";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";

export const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const goToTopBtnHandler = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const listenToScroll = () => {
    const heightToBeHidden = 150;
    const winHeight =
      document.body.scrollTop || document.documentElement.scrollTop;
    setIsVisible(winHeight > heightToBeHidden);
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  return (
    <>
      {isVisible && (
        <div className="go_to_top" onClick={goToTopBtnHandler}>
          <ArrowCircleUpIcon />
        </div>
      )}
    </>
  );
};
