"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { observeElementVisibility } from "@/components/utils/visualPerformance";

type LoadedVisual = ComponentType<Record<string, unknown>>;
type VisualLoader = () => Promise<{ default: LoadedVisual }>;

function requestIdleWork(callback: () => void) {
  const win = window as Window & {
    requestIdleCallback?: (
      callback: () => void,
      options?: { timeout: number }
    ) => number;
    cancelIdleCallback?: (handle: number) => void;
  };

  if (win.requestIdleCallback) {
    const handle = win.requestIdleCallback(callback, { timeout: 700 });
    return () => win.cancelIdleCallback?.(handle);
  }

  const handle = window.setTimeout(callback, 0);
  return () => window.clearTimeout(handle);
}

function createLazyVisual(loader: VisualLoader) {
  return function LazyVisual(props: Record<string, unknown>) {
    const containerRef = useRef<HTMLDivElement>(null);
    const loadingRef = useRef(false);
    const [Component, setComponent] = useState<LoadedVisual | null>(null);

    useEffect(() => {
      const container = containerRef.current;
      if (!container || Component) return;

      let cleanupIdle: (() => void) | undefined;
      let cancelled = false;

      const load = () => {
        if (loadingRef.current) return;
        loadingRef.current = true;
        cleanupIdle = requestIdleWork(() => {
          loader().then((module) => {
            if (!cancelled) {
              setComponent(() => module.default);
            }
          });
        });
      };

      const cleanupVisibility = observeElementVisibility(
        container,
        (visible) => {
          if (visible) load();
        },
        "240px"
      );

      return () => {
        cancelled = true;
        cleanupIdle?.();
        cleanupVisibility();
      };
    }, [Component]);

    return (
      <div
        ref={containerRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          pointerEvents: "none",
          willChange: "transform",
          contain: "strict",
        }}
      >
        {Component ? <Component {...props} /> : null}
      </div>
    );
  };
}

export const ShapeGrid = createLazyVisual(() => import("@/components/effects/ShapeGrid"));
export const LetterGlitch = createLazyVisual(() => import("@/components/effects/LetterGlitch"));


