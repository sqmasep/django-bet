"use client";

import { createContext, useContext, useState } from "react";
import useLocalStorage from "~/hooks/useLocalStorage";

interface UserData {
  email: string;
  name: string;
}

export interface AuthContextType {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<AuthContextType["user"]>>;

  token: string | null;
  setToken: (token: string | null) => void;

  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  token: null,
  setToken: () => {},
  logout: () => {},
});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ email: string; name: string } | null>({
    email: "jar",
    name: "jarname",
  });
  const [token, setToken] = useLocalStorage<string | null>("auth-token", null);

  function logout() {
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
