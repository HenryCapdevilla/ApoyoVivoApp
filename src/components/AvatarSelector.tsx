import React, { useState } from "react";

const AvatarSelector = ({ onSelect, onClose }: { onSelect: (avatar: string) => void; onClose: () => void }) => {
  const [page, setPage] = useState(1);
  
  // Generar 9 avatares por página usando DiceBear
  const generateAvatars = (page: number) => {
    return Array.from({ length: 9 }, (_, i) => 
      `https://api.dicebear.com/7.x/adventurer/svg?seed=User${(page - 1) * 9 + i + 1}`
    );
  };

  const avatars = generateAvatars(page);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-lg font-bold text-center mb-4">Elige tu avatar</h2>
        
        <div className="grid grid-cols-3 gap-4">
          {avatars.map((avatar, index) => (
            <img
              key={index}
              src={avatar}
              alt="Avatar"
              className="w-20 h-20 cursor-pointer rounded-full border-2 border-transparent hover:border-blue-500"
              onClick={() => onSelect(avatar)}
            />
          ))}
        </div>

        <div className="flex justify-between mt-4">
          <button 
            className="bg-gray-300 px-3 py-1 rounded" 
            onClick={() => setPage(page > 1 ? page - 1 : 1)}
          >
            Anterior
          </button>
          <button 
            className="bg-blue-500 text-white px-3 py-1 rounded" 
            onClick={() => setPage(page + 1)}
          >
            Más avatares
          </button>
        </div>

        <button className="mt-4 text-red-500 w-full" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default AvatarSelector;
