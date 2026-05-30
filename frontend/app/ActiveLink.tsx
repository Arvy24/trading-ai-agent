"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ActiveLink() {
  const path = usePathname();

  useEffect(() => {
    document.querySelectorAll(".nav-link").forEach((link) => {
      if (link.getAttribute("href") === path) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }, [path]);

  return null;
}
