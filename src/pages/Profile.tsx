import { useState } from "react";
import AvatarSelector from "../components/AvatarSelector";

const Profile = () => {
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Perfil</h1>
      
      <div className="mt-4">
        <img 
          src={selectedAvatar || "https://api.dicebear.com/7.x/adventurer/svg?seed=Default"} 
          alt="Avatar seleccionado" 
          className="w-24 h-24 rounded-full border-4 border-gray-300"
        />
      </div>

      <button 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" 
        onClick={() => setIsOpen(true)}
      >
        Elegir avatar
      </button>

      {isOpen && (
        <AvatarSelector 
          onSelect={(avatar) => {
            setSelectedAvatar(avatar);
            setIsOpen(false);
          }}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Profile;
