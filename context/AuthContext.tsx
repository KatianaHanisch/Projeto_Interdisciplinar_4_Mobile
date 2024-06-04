import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import axios from "axios";

import { api } from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  // onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
  isLoanding?: boolean;
}

const TOKEN_KEY = "token";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const router = useRouter();

  const [isLoanding, setIsLoanding] = useState<boolean>(false);

  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      setAuthState({
        token: token,
        authenticated: true,
      });
    };

    loadToken();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoanding(true);

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      if (response && response.status === 200 && response.data) {
        setAuthState({
          token: response.data?.body?.token,
          authenticated: true,
        });

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data?.body?.token}`;

        const token = response.data?.body?.token;

        if (token) {
          await SecureStore.setItemAsync(TOKEN_KEY, token);
        }

        router.navigate("/home");

        setIsLoanding(false);

        return response;
      }
    } catch (e) {
      setIsLoanding(false);
      return { error: true, msg: (e as any).response.data?.message };
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);

    await AsyncStorage.removeItem("id");
    await AsyncStorage.removeItem("name");
    await AsyncStorage.removeItem("email");
    await AsyncStorage.removeItem("image_url");

    // console.log("chamou");

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
