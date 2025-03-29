import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BottleSVG from "../resources/Botellas.svg";
import TapaImg from "../resources/Tapax.png";

const EmotionJar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-64 top-3 -right-4.5 bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-9 space-y-3 relative overflow-hidden rounded-lg">
      {/* Decoración superior */}
      <div className="w-24 h-24 bg-violet-500 rounded-full absolute -right-5 -top-7 flex justify-center items-center">
        <p className="text-white text-2xl">💜</p>
      </div>

      {/* SVG del frasco */}
      <div className="flex justify-center items-center">
        <img src={BottleSVG} alt="Frasco de emociones" className="w-40 h-40" />
      </div>

      {/* Animación de la tapa */}
      <motion.img
        src={TapaImg}
        alt="Tapa del frasco"
        className="absolute top-6 left-1/2 w-16 h-8 transform -translate-x-1/2"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 0.3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Título */}
      <h1 className="font-bold text-xl text-center">Frasco de Emociones</h1>
      <p className="text-sm text-zinc-500 text-center leading-6">
        Guarda y visualiza tus emociones dentro de este frasco especial.
      </p>

      {/* Botón de ayuda */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => navigate("/ayuda")} // Ruta a donde redirige
          className="bg-blue-500 text-white w-10 h-10 rounded-full flex justify-center items-center text-lg hover:bg-blue-600 transition"
        >
          ?
        </button>
      </div>
    </div>
  );
};

export default EmotionJar;
