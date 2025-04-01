import { createContext, useContext, useEffect, useState } from "react";
import { registerRequest, loginRequest, verifyTokenRequest, logoutRequest } from '../api/auth';
import Cookies from 'js-cookie';

interface User {
  id: string;
  role: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  errors: string[];
  signup: (user: any) => Promise<void>;
  signin: (user: any) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const signup = async (userData: any) => {
    try {
      const res = await registerRequest(userData);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error: any) {
      setErrors(Array.isArray(error.response.data) ? error.response.data : [error.response.data]);
    }
  };

  const signin = async (userData: any) => {
    try {
      const res = await loginRequest(userData);
      setIsAuthenticated(true);
      setUser(res.data);
      return true;
    } catch (error: any) {
      setErrors(Array.isArray(error.response.data) ? error.response.data : [error.response.data]);
      return false;
    }
  };

  const logout = async () => {
    try {
      const res = await logoutRequest();
      if (res.status === 200) {
        Cookies.remove("token");
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log("Error al cerrar sesión:", error);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => setErrors([]), 8000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function checkLogin() {
      const token = Cookies.get("token");
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      try {
        const res = await verifyTokenRequest(token);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }
        setIsAuthenticated(true);
        setUser(res.data);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      }
      setLoading(false);
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ signup, signin, logout, loading, user, isAuthenticated, errors }}>
      {children}
    </AuthContext.Provider>
  );
};
