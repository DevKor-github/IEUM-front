import { useRef } from 'react';

interface UseIntersectionObserverHookProp {
  onIntersection: (entry: IntersectionObserverEntry) => void;
  onNoIntersection?: (entry: IntersectionObserverEntry) => void;
}

export const useIntersectionObserver = ({
  onIntersection,
  onNoIntersection,
}: UseIntersectionObserverHookProp) => {
  const IOOptions = { threshold: 0.5 };
  const handleIOCallback: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        onIntersection(entry);
      } else {
        onNoIntersection && onNoIntersection(entry);
      }
    });
  };

  const IO = useRef(new IntersectionObserver(handleIOCallback, IOOptions));

  const observe = (element: Element) => IO.current.observe(element);
  const unobserve = (element: Element) => IO.current.unobserve(element);

  return { observe, unobserve };
};
