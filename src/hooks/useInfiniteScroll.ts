import { useEffect, useRef } from 'react';

interface InfiniteScrollOptions {
  delay?: number;
  threshold?: number;
}

export function useInfiniteScroll(
  callback: () => void,
  enabled: boolean,
  options: InfiniteScrollOptions = {},
) {
  const { delay = 2000, threshold = 0.1 } = options;
  const lastFetchTimeRef = useRef(0);
  // holds the timeout ID in case a fetch is scheduled
  const scheduledTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!enabled) return;
        if (!entries.length) return;
        const entry = entries[0];
        if (entry.isIntersecting) {
          const now = Date.now();
          const timeSinceLastFetch = now - lastFetchTimeRef.current;
          if (timeSinceLastFetch >= delay) {
            // if a scheduled fetch exists, clear it.
            if (scheduledTimeoutRef.current) {
              clearTimeout(scheduledTimeoutRef.current);
              scheduledTimeoutRef.current = null;
            }
            // update the last fetch timestamp and call the callback.
            lastFetchTimeRef.current = now;
            callback();
          } else {
            // schadule a callback after the remaining delay.
            if (!scheduledTimeoutRef.current) {
              scheduledTimeoutRef.current = setTimeout(() => {
                lastFetchTimeRef.current = Date.now();
                callback();
                scheduledTimeoutRef.current = null;
              }, delay - timeSinceLastFetch);
            }
          }
        } else if (scheduledTimeoutRef.current) {
          // if the sentinel goes out of view, cancel any pending fetch.
          clearTimeout(scheduledTimeoutRef.current);
          scheduledTimeoutRef.current = null;
        }
      },
      { root: null, rootMargin: '0px', threshold },
    );

    // start observing the sentinel element.
    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    // cleanup observer and any scheduled timeout on unmount.
    return () => {
      if (sentinelRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(sentinelRef.current);
      }
      if (scheduledTimeoutRef.current) {
        clearTimeout(scheduledTimeoutRef.current);
      }
    };
  }, [callback, delay, enabled, threshold]);

  return sentinelRef;
}
