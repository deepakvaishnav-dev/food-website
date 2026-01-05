import { createContext } from "react";

interface AuthContextType {
  token: string | null;
  login: (newToken: string) => void;
  googleLogin: (credential: string) => Promise<void>;
  logout: () => void;
  isLoggedIn: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
