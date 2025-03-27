import { useState } from "react";
import { Mood, moods } from "../types/moodtypes"; // Importa desde el nuevo archivo

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

  const handleMoodSelection = (mood: Mood) => {
    setSelectedMood(mood);
  };

  const handleSaveMood = () => {
    if (!selectedMood) return;
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem("mood-" + today, selectedMood);
    alert("Mood saved!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-100 p-4">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">How Do You Feel Today?</h1>
      <div className="flex space-x-4 mb-6">
        {moods.map((mood) => (
          <button
            key={mood.value}
            className={`w-12 h-12 flex items-center justify-center text-2xl rounded-full cursor-pointer transition-all duration-300 ${mood.color} ${
              selectedMood === mood.value ? "ring-4 ring-black" : ""
            }`}
            onClick={() => handleMoodSelection(mood.value)}
          >
            {mood.emoji}
          </button>
        ))}
      </div>
      <button
        className="bg-green-300 text-gray-800 px-6 py-3 rounded-lg shadow-md hover:bg-green-400 transition"
        onClick={handleSaveMood}
        disabled={!selectedMood}
      >
        Note Mood
      </button>
    </div>
  );
};

export default MoodTracker;
