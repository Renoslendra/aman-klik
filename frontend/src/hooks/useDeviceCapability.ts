"use client";

import { useSyncExternalStore } from "react";

type DeviceCapability = {
  isLowEnd: boolean;
  canRunWebGL: boolean;
};

type NavigatorWithDeviceMemory = Navigator & {
  deviceMemory?: number;
};

const defaultCapability: DeviceCapability = {
  isLowEnd: true,
  canRunWebGL: false,
};
let cachedCapability: DeviceCapability | null = null;

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

function detectDeviceCapability(): DeviceCapability {
  const navigatorInfo = navigator as NavigatorWithDeviceMemory;
  const cores = navigatorInfo.hardwareConcurrency;
  const memory = navigatorInfo.deviceMemory;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigatorInfo.userAgent
  );

  const isLowEnd =
    (typeof cores === "number" && cores <= 2) ||
    (typeof memory === "number" && memory <= 2) ||
    isMobile;

  return {
    isLowEnd,
    canRunWebGL: !isLowEnd && supportsWebGL(),
  };
}

function subscribeDeviceCapability() {
  return () => undefined;
}

function getDeviceCapabilitySnapshot() {
  if (typeof window === "undefined") return defaultCapability;

  cachedCapability ??= detectDeviceCapability();
  return cachedCapability;
}

export function useDeviceCapability() {
  return useSyncExternalStore(
    subscribeDeviceCapability,
    getDeviceCapabilitySnapshot,
    () => defaultCapability
  );
}

