import { DependencyList, RefObject, useEffect } from "react";

export default function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  handle: (e: MouseEvent) => void,
  dependencies?: DependencyList
) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) handle(e);
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
