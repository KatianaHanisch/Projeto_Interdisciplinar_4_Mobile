import React, { useEffect, useState } from "react";

import { View, Text, Image, TouchableOpacity } from "react-native";

import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "@/hooks/useNavigate";

import { IconArrowRigth } from "@/assets/icons/icon-arrow-rigth";

import { styles } from "./styles";
import { api } from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function ModalPerfilUsuario() {
  const { authState, onLogout } = useAuth();

  const navigate = useNavigate();

  const [carregando, setCarregando] = useState<boolean>(false);
  const [dadosUsuario, setDadosUsuario] = useState<DadosUsuarioProps>({
    id: "",
    name: "",
    email: "",
    image_url: null,
  });

  const fetcherDados = async () => {
    setCarregando(true);

    try {
      const response = await api.get("/auth/token", {
        headers: {
          Authorization: `Bearer ${authState?.token}`,
        },
      });

      if (response.status === 200) {
        setDadosUsuario(response.data);

        await AsyncStorage.setItem("id", response.data.id);
        await AsyncStorage.setItem("name", response.data.name);
        await AsyncStorage.setItem("email", response.data.email);
        await AsyncStorage.setItem("image_url", response.data.image_url);

        setCarregando(false);
      }
    } catch (error) {
      setCarregando(false);

      console.log(error);
    }
  };

  useEffect(() => {
    fetcherDados();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Image
          style={styles.imagem}
          source={{
            uri: `${api.defaults.baseURL}/uploads/users/${dadosUsuario.image_url}`,
          }}
        />
        <Text style={styles.nomeHeader}>{dadosUsuario.name}</Text>
      </View>
      <View style={styles.containerButtons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigate("meus-dados")}
        >
          <Text style={styles.textButton}>Acessar meus dados</Text>
          <IconArrowRigth />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigate("meus-posts")}
        >
          <Text style={styles.textButton}>Meus Posts</Text>
          <IconArrowRigth />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onLogout!()}>
          <Text style={styles.textButton}>Sair</Text>
          <IconArrowRigth />
        </TouchableOpacity>
      </View>
    </View>
  );
}
