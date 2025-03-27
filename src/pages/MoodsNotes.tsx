import { useState } from "react";
import { Plus, MessageSquare, Move } from "lucide-react";

const colors = ["bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-red-500", "bg-purple-500"];
const rotations = [-5, 0, 5]; // Ángulos de rotación

const MoodsNotes = () => {
  const [notes, setNotes] = useState<{ text: string; color: string; rotation: number }[]>([]);
  const [input, setInput] = useState("");

  const addNote = () => {
    if (input.trim() !== "") {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const randomRotation = rotations[notes.length % rotations.length]; // Alterna rotaciones
      setNotes([{ text: input, color: randomColor, rotation: randomRotation }, ...notes]);
      setInput("");
    }
  };

  const cycleNotes = () => {
    if (notes.length > 1) {
      const firstNote = notes[0];
      setNotes([...notes.slice(1), firstNote]); // Mueve la primera nota al final
    }
  };

  return (
    <div className="min-h-screen bg-beige p-6 flex flex-col items-center relative">
      {/* Botón fijo para agregar nota */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={addNote}
          className="flex items-center gap-2 bg-brown text-black px-6 py-3 rounded-full shadow-lg"
        >
          <Plus size={20} /> Add Story
        </button>
      </div>

      {/* Input de texto */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Algo que resuma el día..."
        className="w-full max-w-lg px-4 py-2 border rounded-lg shadow-md mb-6 mt-16"
      />

      {/* Contenedor de notas */}
      <div className="relative w-full max-w-lg h-[600px] flex items-center justify-center">
        {notes.map((note, index) => (
          <div
            key={index}
            className={`${note.color} text-white p-6 rounded-2xl shadow-lg absolute w-full min-h-[400px] flex items-center justify-center transition-all duration-300`}
            style={{
              transform: `translateY(${index * 8}px) scale(${1 - index * 0.05}) rotate(${note.rotation}deg)`,
              zIndex: notes.length - index,
              opacity: index > 2 ? 0 : 1, // Oculta las notas más profundas
            }}
          >
            <p className="text-lg font-medium text-center">{note.text}</p>
            <MessageSquare size={24} className="absolute bottom-4 right-4 text-white" />
          </div>
        ))}
      </div>

      {/* Botón para deslizar la nota superior */}
      {notes.length > 1 && (
        <button
          onClick={cycleNotes}
          className="mt-4 flex items-center gap-2 bg-gray-700 text-white px-6 py-3 rounded-full shadow-lg"
        >
          <Move size={20} /> Deslizar Nota
        </button>
      )}
    </div>
  );
};

export default MoodsNotes;
