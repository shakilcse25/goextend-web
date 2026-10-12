import { useCallback, useEffect, useSyncExternalStore } from "react";

function getSnapshot(breakpoint: number) {
  return window.innerWidth < breakpoint;
}

function getServerSnapshot() {
  return true;
}

export function useScreenBreakpoint(breakpoint: number) {
  const subscribe = useCallback((callback: () => void) => {
    window.addEventListener("resize", callback);
    return () => window.removeEventListener("resize", callback);
  }, []);

  return useSyncExternalStore(
    subscribe,
    () => getSnapshot(breakpoint),
    () => getServerSnapshot(),
  );
}
