import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";
import GradientSphere from "../components/GradientSphere";
import LoadingScreen from "../components/LoadingScreen";

interface Sphere {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  collisionCount: number;
}

const Home = () => {
  const { darkMode } = useContext(ThemeContext);
  const [spheres, setSpheres] = useState<Sphere[]>([]);
  const [loaded, setLoaded] = useState(false);

  const addSphere = () => {
    const container = document.getElementById("sphere-container");
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const sphereSize = 42;

    const newSphere: Sphere = {
      id: Date.now(),
      x: Math.random() * (containerRect.width - sphereSize),
      y: containerRect.height * 0.05,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      collisionCount: 0,
    };

    setSpheres((prev) => [...prev, newSphere]);
  };

  return !loaded ? (
    <LoadingScreen onLoaded={() => setLoaded(true)} />
  ) : (
    <div className={`min-h-screen pt-16 px-4 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <h1 className="text-3xl text-center mt-8">Bienvenido a Apoyo Vivo</h1>
      <p className="text-gray-600 text-center">Tu plataforma de apoyo emocional</p>

      {/* Contenedor de las esferas */}
      <div id="sphere-container" className="relative w-full h-[50vh] flex justify-center items-center border border-gray-300 overflow-hidden">
        <GradientSphere spheres={spheres} setSpheres={setSpheres} />
      </div>

      {/* Botón para agregar esferas */}
      <div className="flex justify-center mt-4">
        <button
          onClick={addSphere}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Agregar Esfera
        </button>
      </div>

      {/* Componente de cambio de tema */}
      <div className="absolute bottom-4 right-4">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Home;
