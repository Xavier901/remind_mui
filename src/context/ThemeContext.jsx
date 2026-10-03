/** @format */
import * as React from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeModeContext = React.createContext({
  mode: "light",
  toggleMode: () => {},
});

export function useThemeMode() {
  return React.useContext(ThemeModeContext);
}

// Build a theme for a given mode
function buildTheme(mode) {
  return createTheme({
    palette: {
      mode,
      primary: { main: "#3B82F6" },
      secondary: { main: "#8B5CF6" },
      background:
        mode === "dark" ?
          { default: "#0f172a", paper: "#1e293b" }
        : { default: "#ffffff", paper: "#ffffff" },
    },
    typography: {
      fontFamily:
        'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    shape: { borderRadius: 10 },
  });
}

export function ThemeProvider({ children }) {
  const [mode, setMode] = React.useState(() => {
    // 1. Check localStorage
    const saved = localStorage.getItem("theme_mode");
    if (saved === "light" || saved === "dark") return saved;

    // 2. Fall back to OS preference
    if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  const theme = React.useMemo(() => buildTheme(mode), [mode]);

  const toggleMode = () => {
    setMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme_mode", next);
      return next;
    });
  };

  const ctxValue = React.useMemo(() => ({ mode, toggleMode }), [mode]);

  return (
    <ThemeModeContext.Provider value={ctxValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeModeContext.Provider>
  );
}
