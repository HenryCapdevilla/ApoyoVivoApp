import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const FireGif = "/resources/fire-flame.gif";

const FireCard: React.FC<{ streak: number; increaseStreak: () => void; isDisabled: boolean; timeLeft: number }> = ({
  streak,
  increaseStreak,
  isDisabled,
  timeLeft,
}) => {
  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="relative flex items-center w-[350px] h-[120px] p-4 rounded-xl bg-gradient-to-l from-[#f7ba2b] to-[#ea5358] text-white">
      <motion.img src={FireGif} alt="Fuego" className="w-20 h-20 relative z-10" />
      <div className="ml-4 flex flex-col">
        <p className="text-lg font-bold" style={{ textShadow: "1px 1px 3px black" }}>
          Racha Actual: {streak}🔥
        </p>
        <p className="text-sm">Tiempo restante: {timeLeft > 0 ? formatTime(timeLeft) : "¡Listo para confirmar!"}</p>
        <button
          onClick={increaseStreak}
          disabled={isDisabled}
          className={`mt-2 px-3 py-1 rounded-lg shadow-md transition ${
            isDisabled ? "bg-gray-500 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          Confirmar Racha
        </button>
      </div>
    </div>
  );
};

const StreakTracker = () => {
  const [streak, setStreak] = useState<number>(() => {
    return parseInt(localStorage.getItem("streak") || "1");
  });
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  useEffect(() => {
    const storedTime = localStorage.getItem("streakTimer");
    if (storedTime) {
      const remaining = parseInt(storedTime) - Date.now();
      if (remaining > 0) {
        setTimeLeft(remaining);
        setIsDisabled(true);
      }
    }
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1000;
          if (newTime <= 0) {
            setIsDisabled(false);
            localStorage.removeItem("streakTimer");
            clearInterval(interval);
          }
          return newTime;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timeLeft]);

  const increaseStreak = () => {
    if (!isDisabled) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      localStorage.setItem("streak", newStreak.toString());
      localStorage.setItem("streakTimer", (Date.now() + 86400000).toString());
      setTimeLeft(86400000);
      setIsDisabled(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-30 bg-gray-900 text-white">
      <FireCard streak={streak} increaseStreak={increaseStreak} isDisabled={isDisabled} timeLeft={timeLeft} />
    </div>
  );
};

export default StreakTracker;
