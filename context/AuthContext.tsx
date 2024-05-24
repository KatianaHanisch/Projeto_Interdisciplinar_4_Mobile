import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { api } from "@/services/api";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  // onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
  isLoanding?: boolean;
}

const TOKEN_KEY = "";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [isLoanding, setIsLoanding] = useState<boolean>(false);

  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadTOken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
      setAuthState({
        token: token,
        authenticated: true,
      });
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoanding(true);

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      setAuthState({
        token: response.data.body.token,
        authenticated: true,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.body.token}`;

      await SecureStore.setItemAsync(TOKEN_KEY, response.data.body.token);

      setIsLoanding(false);

      return response;
    } catch (e) {
      setIsLoanding(false);
      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);

    axios.defaults.headers.common["Authorization"] = "";

    setAuthState({
      token: null,
      authenticated: false,
    });
  };
  const value = {
    onLogin: login,
    onLogout: logout,
    authState,
    isLoanding,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
