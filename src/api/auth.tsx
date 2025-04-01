import axios from "./axios";

// Definimos una interfaz para los datos del usuario
interface User {
  email: string;
  password: string;
  name?: string; // Opcional en caso de registro
}

// Interfaz para la respuesta de autenticación
interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

// Registro de usuario
export const registerRequest = (user: User) => axios.post<AuthResponse>("/register", user);

// Inicio de sesión
export const loginRequest = (user: User) => axios.post<AuthResponse>("/login", user);

// Verificación del token
export const verifyTokenRequest = (token: string) =>
  axios.get<AuthResponse>("/verify", {
    headers: { Authorization: `Bearer ${token}` },
  });

// Cierre de sesión
export const logoutRequest = () => axios.post("/logout");
