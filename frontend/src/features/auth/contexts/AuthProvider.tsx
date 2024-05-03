"use client";

import { createContext, useContext } from "react";
import useLocalStorage from "~/hooks/useLocalStorage";
import type { UserSchemaOutput } from "../validation/userSchema";
import userSchema from "../validation/userSchema";
import * as v from "valibot";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type UserData = UserSchemaOutput;

export interface AuthContextType {
  user: UserData | null | undefined;
  invalidateUser: () => Promise<void> | void;

  token: string | null;
  setToken: (token: string | null) => void;

  logout: () => Promise<void> | void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  invalidateUser: () => {},
  token: null,
  setToken: () => {},
  logout: () => {},
});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useLocalStorage<string | null>("django-bet-auth-token", null);
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user", "me"],
    enabled: token !== null,
    queryFn: async () => {
      const response = await fetch("http://localhost:8000/api/me/", {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });

      if (!response.ok) throw new Error(`${response.status} - ${response.statusText}`);

      const data = v.parse(userSchema, await response.json());

      return data;
    },
  });

  async function invalidateUser() {
    return queryClient.invalidateQueries({
      queryKey: ["user", "me"],
    });
  }

  async function logout() {
    setToken(null);
    await invalidateUser();
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        invalidateUser,
        token,
        setToken,
        logout,
      }}
    >
      {!!isError && <pre>{JSON.stringify(error, null, 2)}</pre>}

      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
