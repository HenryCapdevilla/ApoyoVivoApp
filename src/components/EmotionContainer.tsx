import { useState } from "react";
import GradientSphere from "./GradientSphere";

interface Sphere {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  collisionCount: number;
}

const EmotionContainer = () => {
  const [spheres, setSpheres] = useState<Sphere[]>([]);

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

  return (
    <div>
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
    </div>
  );
};

export default EmotionContainer;
