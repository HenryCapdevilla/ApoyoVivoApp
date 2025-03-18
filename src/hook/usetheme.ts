import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export const useTheme = () => {
  const context = useContext(ThemeContext);

  console.log("useTheme context:", context); // Verifica si el contexto existe y qué valores tiene

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
