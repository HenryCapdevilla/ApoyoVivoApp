import { useState } from "react";

const attributes = [
  "Creativo", "Empático", "Resiliente", "Optimista", "Líder", "Colaborador", 
  "Paciente", "Responsable", "Curioso", "Comunicativo"
];

const SelfAwareness = () => {
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);
  const [customAttribute, setCustomAttribute] = useState("");

  const handleSelectAttribute = (attribute: string) => {
    setSelectedAttributes((prev) =>
      prev.includes(attribute) ? prev.filter((attr) => attr !== attribute) : [...prev, attribute]
    );
  };

  const handleSave = () => {
    if (customAttribute) {
      setSelectedAttributes([...selectedAttributes, customAttribute]);
      setCustomAttribute("");
    }
    localStorage.setItem("userAttributes", JSON.stringify(selectedAttributes));
    alert("¡Tus fortalezas han sido guardadas!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-6">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Descubre tus fortalezas</h1>
      <p className="text-gray-600 mb-4 text-center">Selecciona o escribe las cualidades que mejor te representan</p>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        {attributes.map((attr) => (
          <button
            key={attr}
            className={`px-4 py-2 border rounded-lg ${
              selectedAttributes.includes(attr) ? "bg-blue-500 text-white" : "bg-white text-gray-700"
            }`}
            onClick={() => handleSelectAttribute(attr)}
          >
            {attr}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Escribe otra cualidad..."
        className="p-2 border rounded mb-3 w-full"
        value={customAttribute}
        onChange={(e) => setCustomAttribute(e.target.value)}
      />

      <button
        className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
        onClick={handleSave}
      >
        Guardar Fortalezas
      </button>

      {selectedAttributes.length > 0 && (
        <div className="mt-6 p-4 bg-white shadow-md rounded-md text-center">
          <h2 className="font-bold text-gray-700">Tus fortalezas seleccionadas:</h2>
          <p className="text-blue-600">{selectedAttributes.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export default SelfAwareness;
