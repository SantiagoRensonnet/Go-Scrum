import { useEffect, useState } from "react";
export const useResize = () => {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 900 ? true : false
  );
  //Events
  const handleResize = () => {
    if (window.innerWidth < 900) setIsMobile(true);
    else setIsMobile(false);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });
  return isMobile;
};
