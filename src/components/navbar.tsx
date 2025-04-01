import { Link } from "react-router-dom";
import { Home, User, Info, Smile, Notebook } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md fixed bottom-0 w-full flex justify-around py-3 z-50">
      <Link to="/" className="flex flex-col items-center text-gray-600 hover:text-blue-500">
        <Home size={24} />
        <span className="text-xs">Inicio</span>
      </Link>

      <Link to="/about" className="flex flex-col items-center text-gray-600 hover:text-blue-500">
        <Info size={24} />
        <span className="text-xs">Acerca</span>
      </Link>

      <Link to="/profile" className="flex flex-col items-center text-gray-600 hover:text-blue-500">
        <User size={24} />
        <span className="text-xs">Perfil</span>
      </Link>

      <Link to="/emotions" className="flex flex-col items-center text-gray-600 hover:text-blue-500">
        <Smile size={24} />
        <span className="text-xs">Emoción</span>
      </Link>

      <Link to="/moods-notes" className="flex flex-col items-center text-gray-600 hover:text-blue-500">
        <Notebook size={24} />
        <span className="text-xs">Notas</span>
      </Link>

    </nav>
  );
};

export default Navbar;
