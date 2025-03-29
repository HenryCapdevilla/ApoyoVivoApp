import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";
import LoadingScreen from "../components/LoadingScreen";
import StreakTracker from "./StreakTracker";
import EmotionJar from "../components/emotionJar";

const Home = () => {
  const { darkMode } = useContext(ThemeContext);
  const [loaded, setLoaded] = useState(false);

  return !loaded ? (
    <LoadingScreen onLoaded={() => setLoaded(true)} />
  ) : (
    <div className={`min-h-screen pt-4 px-4 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <StreakTracker />
      {/* Contenedor de emociones */}
      <EmotionJar />

      {/* Componente de cambio de tema */}
      <div className="absolute bottom-4 right-4">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Home;
