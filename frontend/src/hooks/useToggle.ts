import { useCallback, useState } from "react";

export default function useToggle(defaultValue = false) {
  const [isToggled, setIsToggled] = useState(defaultValue);

  const toggle = useCallback((force?: boolean) => {
    setIsToggled(prev => force ?? !prev);
  }, []);

  return [isToggled, toggle] as const;
}
