"use client"
import { useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const ScrollToTop = () => {
  const pathname  = usePathname();
  // console.log(pathname)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};

export default ScrollToTop;