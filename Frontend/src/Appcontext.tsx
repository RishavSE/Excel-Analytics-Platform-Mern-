import {
  createContext,
  useContext,
  useState,
} from "react";
import type { ReactNode } from "react";

type AuthContextType = {
  token: string | null;
  role: string | null;
  email: string | null;
  login: (token: string, role: string, email: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [role, setRole] = useState<string | null>(localStorage.getItem("role"));
  const [email, setEmail] = useState<string | null>(localStorage.getItem("email"));

  const login = (tokenValue: string, roleValue: string, emailValue: string) => {
    localStorage.setItem("token", tokenValue);
    localStorage.setItem("role", roleValue);
    localStorage.setItem("email", emailValue);
    setToken(tokenValue);
    setRole(roleValue);
    setEmail(emailValue);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setRole(null);
    setEmail(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
