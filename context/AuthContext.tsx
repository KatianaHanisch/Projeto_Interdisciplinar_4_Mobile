import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  PropsWithChildren,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigate } from "@/hooks/useNavigate";
import { api } from "@/services/api";

interface LoginProps {
  email: string;
  password: string;
}

interface AuthContextProps {
  signIn: (props: LoginProps) => Promise<void>;
  signOut: () => Promise<void>;
  carregando: boolean;
  abrirAlerta: boolean;
  tipoAlerta: string;
  mensagemAlerta: string;
  isLoggedIn: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  signIn: async () => {},
  signOut: async () => {},
  carregando: false,
  abrirAlerta: false,
  tipoAlerta: "",
  mensagemAlerta: "",
  isLoggedIn: false,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({
  children,
}: PropsWithChildren<AuthProviderProps>) => {
  const navigate = useNavigate();

  const [abrirAlerta, setAbrirAlerta] = useState(false);
  const [tipoAlerta, setTipoAlerta] = useState("");
  const [mensagemAlerta, setMensagemAlerta] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      setCarregando(true);
      const token = await AsyncStorage.getItem("token");
      const loginTime = await AsyncStorage.getItem("loginTime");

      if (token && loginTime) {
        const sessionDuration = 3600 * 1000; // 1 hour in milliseconds
        const currentTime = new Date().getTime();
        const loginTimeMs = new Date(loginTime).getTime();

        if (currentTime - loginTimeMs < sessionDuration) {
          setIsLoggedIn(true);
          navigate("home");
        } else {
          await AsyncStorage.removeItem("token");
          await AsyncStorage.removeItem("loginTime");
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
      setCarregando(false);
    };

    checkAuthStatus();
  }, []);

  const signIn = async ({ email, password }: LoginProps) => {
    setCarregando(true);
    setAbrirAlerta(false);

    try {
      const response = await api.post("/auth/login", { email, password });
      const { token } = response.data.body;

      const loginTime = new Date().toISOString();
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("loginTime", loginTime);

      setIsLoggedIn(true);
      setCarregando(false);
      navigate("home");
    } catch (error) {
      setTipoAlerta("erro");
      setMensagemAlerta("Email ou senha inválidos");
      setAbrirAlerta(true);

      setCarregando(false);
      console.log(error);
    }
  };

  const signOut = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("loginTime");
    setIsLoggedIn(false);
    navigate("login");
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        carregando,
        abrirAlerta,
        tipoAlerta,
        mensagemAlerta,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
