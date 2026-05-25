import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";
const Ctx = createContext<{ theme: Theme; toggle: () => void } | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme] = useState<Theme>("light");

  useEffect(() => {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("sb_theme", "light");
  }, []);

  return (
    <Ctx.Provider
      value={{
        theme,
        toggle: () => {},
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useTheme = () => {
  const c = useContext(Ctx);
  if (!c) return { theme: "light" as Theme, toggle: () => {} };
  return c;
};
