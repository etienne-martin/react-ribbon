import { RefObject, useEffect } from "react";
import ResizeObserver from "resize-observer-polyfill";

export const useResizeObserver = (
  elemRef: RefObject<HTMLElement | null>,
  handler: ResizeObserverCallback
) => {
  useEffect(() => {
    if (!elemRef.current) return;

    const resizeObserver = new ResizeObserver(
      (...args: Parameters<ResizeObserverCallback>) => {
        requestAnimationFrame(() => handler(...args));
      }
    );

    resizeObserver.observe(elemRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [elemRef]);
};
