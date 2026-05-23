"use client";

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function hasFinePointer() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
}

export function observeElementVisibility(
  element: Element,
  onChange: (isVisible: boolean) => void,
  rootMargin = "160px"
) {
  if (typeof IntersectionObserver === "undefined") {
    onChange(true);
    return () => undefined;
  }

  const observer = new IntersectionObserver(
    ([entry]) => onChange(Boolean(entry?.isIntersecting)),
    { rootMargin }
  );

  observer.observe(element);
  return () => observer.disconnect();
}

