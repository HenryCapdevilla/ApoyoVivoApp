import { useState } from "react";
import { Mood, moods } from "../types/moodtypes";

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

  const handleMoodSelection = (mood: Mood) => setSelectedMood(mood);
  const handleCancelSelection = () => setSelectedMood(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-100 p-4 relative">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">
        How Do You Feel Today?
      </h1>
      <div className="relative w-[300px] h-[300px] flex items-center justify-center">
        {moods.map((mood, index) => {
          const angle = (index / moods.length) * (2 * Math.PI);
          const x = Math.cos(angle) * 100;
          const y = Math.sin(angle) * 100;
          const isSelected = selectedMood === mood.value;

          return (
            <button
              key={mood.value}
              className={`absolute w-20 h-20 flex items-center justify-center rounded-full transition-all duration-500 ${
                isSelected ? "scale-110" : "grayscale translate-y-4"
              }`}
              style={{ transform: `translate(${x}px, ${y}px)` }}
              onClick={() => handleMoodSelection(mood.value)}
            >
              <img
                src={mood.src}
                alt={mood.value}
                className="w-auto h-auto max-w-full max-h-full object-contain"
              />
            </button>
          );
        })}
        {selectedMood && (
          <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/30 backdrop-blur-md p-6 rounded-lg shadow-lg">
            {/* Imagen del emoji */}
            <img
              src={moods.find((m) => m.value === selectedMood)?.src}
              alt={selectedMood}
              className="w-40 h-40"
            />

            {/* Texto */}
            <p className="text-lg font-bold mt-2">{selectedMood}</p>
            <p className="text-sm text-gray-600">Te sentiste así hoy</p>

            {/* Botones */}
            <div className="mt-4 flex flex-row items-center gap-4">
              <button
                className="bg-green-400 text-white px-4 py-2 rounded-lg shadow-md"
                onClick={() => alert("Mood saved!")}
              >
                Aceptar
              </button>
              <button
                className="bg-red-400 text-white px-4 py-2 rounded-lg shadow-md"
                onClick={handleCancelSelection}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodTracker;
