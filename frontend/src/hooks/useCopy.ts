import { useCallback, useEffect } from "react";
import useToggle from "./useToggle";

export default function useCopy(delay = 2000) {
  const [isCopied, toggleIsCopied] = useToggle();

  const copy = useCallback(
    async (text: string | null | undefined) => {
      if (isCopied || text === "" || text === null || text === undefined) return;
      toggleIsCopied(true);
      return navigator.clipboard.writeText(text);
    },
    [isCopied, toggleIsCopied],
  );

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => {
        toggleIsCopied(false);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [isCopied, toggleIsCopied, delay]);

  return [isCopied, copy] as const;
}
