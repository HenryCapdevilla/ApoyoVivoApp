import { Sun, Moon } from "lucide-react";
import { useTheme } from "../hook/usetheme";

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-20 right-4 bg-gray-200 dark:bg-gray-800 p-3 rounded-full shadow-lg transition"
    >
      {darkMode ? <Sun size={24} className="text-yellow-500" /> : <Moon size={24} className="text-gray-700 dark:text-gray-200" />}
    </button>
  );
};

export default ThemeToggle;
