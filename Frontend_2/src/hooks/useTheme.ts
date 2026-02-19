import { useEffect, useState } from "react";

export function useTheme() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  // Set dark on mount
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return { isDark, toggle: () => setIsDark((d) => !d) };
}
