import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { EyeIcon, EyeOffIcon } from "lucide-react"; // Iconos para mostrar/ocultar contraseña

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // Limpiar errores en tiempo real cuando el usuario escribe
    if (errors[e.target.name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccess(null);
  
    try {
      const res = await axios.post(`${process.env.VITE_AXIOS_BACKED}/auth/register`, form, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
  
      if (res.data) {
        setSuccess("Registro exitoso");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data) {
        console.log("Errores del backend:", error.response.data);
  
        if (Array.isArray(error.response.data)) {
          // Si el backend devuelve un array de errores, los mapeamos a su campo correspondiente
          const fieldErrors: { [key: string]: string } = {};
  
          error.response.data.forEach((msg: string) => {
            if (msg.toLowerCase().includes("username")) fieldErrors.username = msg;
            if (msg.toLowerCase().includes("email")) fieldErrors.email = msg;
            if (msg.toLowerCase().includes("password")) fieldErrors.password = msg;
          });
  
          setErrors(fieldErrors);
        } else if (typeof error.response.data === "object") {
          setErrors(error.response.data);
        } else {
          setErrors({ general: "Error en el registro" });
        }
      } else {
        setErrors({ general: "Error en el registro" });
      }
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-center text-2xl font-bold mb-4">Registro</h2>

        {errors.general && (
          <p className="text-red-500 text-sm text-center">{errors.general}</p>
        )}
        {success && (
          <p className="text-green-500 text-sm text-center">{success}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="username"
              placeholder="Nombre"
              value={form.username}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 border rounded-lg ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={form.email}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 border rounded-lg ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 pr-10 border rounded-lg ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            <button
              type="button"
              className={`absolute inset-y-0 right-3 flex items-center ${
                errors.password ? "h-1/2" : "h-full"
              }`}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600"
          >
            Registrarse
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-teal-500 underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
