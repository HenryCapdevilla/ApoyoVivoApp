import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
const BottleSVG = "/resources/Botellas.svg";

const mouthExpressions = [
  "M0,10 Q10,20 20,10", // 😀 Feliz
  "M0,10 Q10,10 20,10", // 😐 Neutro
  "M0,10 Q10,0 20,10",  // ☹️ Triste
  "M0,10 Q10,15 20,10", // 😠 Enojado
];

const EmotionJar = () => {
  const navigate = useNavigate();
  const [expressionIndex, setExpressionIndex] = useState(0);
  const [name, setName] = useState("Frasquito de emociones");
  const [isEditing, setIsEditing] = useState(false);
  const [nameChanged, setNameChanged] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setExpressionIndex((prev) => (prev + 1) % mouthExpressions.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 20) {
      setName(e.target.value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && name.trim() !== "") {
      setIsEditing(false);
      setNameChanged(true);
    }
  };

  return (
    <div className="w-87 top-3 -right-4.5 bg-white shadow-[0px_0px_15px_rgba(0,0,0,0.09)] p-6 space-y-3 relative overflow-hidden rounded-lg flex items-center">
      {/* Frasco */}
      <div className="relative w-40 h-48 flex-shrink-0">
        <img src={BottleSVG} alt="Frasco de emociones" className="w-full h-full" />

        {/* Ojos */}
        <div className="absolute top-1/3 left-1/4 w-10 h-10 bg-white rounded-full flex justify-center items-center shadow-md">
          <div className="w-5 h-5 bg-black rounded-full relative">
            <div className="w-2 h-2 bg-white rounded-full absolute top-1 left-1"></div>
          </div>
        </div>
        <div className="absolute top-1/3 right-1/4 w-10 h-10 bg-white rounded-full flex justify-center items-center shadow-md">
          <div className="w-5 h-5 bg-black rounded-full relative">
            <div className="w-2 h-2 bg-white rounded-full absolute top-1 left-1"></div>
          </div>
        </div>

        {/* Boca animada */}
        <motion.svg
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          width="40"
          height="30"
          viewBox="0 0 20 20"
        >
          <motion.path
            d={mouthExpressions[expressionIndex]}
            stroke="black"
            strokeWidth="2"
            fill="transparent"
            animate={{ d: mouthExpressions[expressionIndex] }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </motion.svg>
      </div>

      {/* Contenedor de texto y botón */}
      <div className="flex flex-col justify-center flex-1">
        {isEditing ? (
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            onKeyDown={handleKeyDown}
            onBlur={() => setIsEditing(false)}
            className="font-bold text-xl text-black bg-transparent border-b border-gray-400 focus:outline-none text-center w-full"
            autoFocus
          />
        ) : (
          <h1
            className="font-bold text-xl text-black text-center break-words cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            {name}
          </h1>
        )}

        <p className="text-sm text-zinc-500 leading-6 text-center">
          Guarda y visualiza tus emociones dentro de este frasco especial.
        </p>

        {/* Botón de ayuda con emojis animados */}
        {nameChanged && (
          <div className="flex justify-center items-center mt-4 gap-2">
            {/* Emoji animado 👈 */}
            <motion.span
              className="text-2xl"
              initial={{ x: -5 }}
              animate={{ x: 5 }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              👉
            </motion.span>

            {/* Botón de ayuda */}
            <button
              onClick={() => navigate("/emotions")}
              className="bg-blue-500 text-white w-10 h-10 rounded-full flex justify-center items-center text-lg hover:bg-blue-600 transition"
            >
              ?
            </button>

            {/* Emoji animado 👉 */}
            <motion.span
              className="text-2xl"
              initial={{ x: 5 }}
              animate={{ x: -5 }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              👈
            </motion.span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmotionJar;
