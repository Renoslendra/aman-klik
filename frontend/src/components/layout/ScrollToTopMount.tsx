"use client";

import dynamic from "next/dynamic";

const ScrollToTop = dynamic(() => import("@/components/layout/ScrollToTop"), {
  ssr: false,
});

export default function ScrollToTopMount() {
  return <ScrollToTop />;
}

