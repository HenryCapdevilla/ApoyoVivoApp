import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";

const Home = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className={`h-screen flex justify-center items-center ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-3xl">Bienvenido a Apoyo Vivo</h1>
      <ThemeToggle />
    </div>
  );
};

export default Home;
