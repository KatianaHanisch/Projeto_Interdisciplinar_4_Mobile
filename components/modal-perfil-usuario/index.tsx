import React from "react";
import { useRouter } from "expo-router";

import { View, Text, Image, TouchableOpacity } from "react-native";

import { IconArrowRigth } from "@/assets/icons/icon-arrow-rigth";

import { styles } from "./styles";
import { useAuth } from "@/context/AuthContext";

export function ModalPerfilUsuario() {
  const router = useRouter();

  const { onLogout } = useAuth();

  const handleNavigation = (value: string) => {
    router.navigate(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Image
          source={require("../../assets/images/imagem-perfil-usuario.png")}
        />
        <Text style={styles.nomeHeader}>Mateus Oliveira</Text>
      </View>
      <View style={styles.containerButtons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNavigation("meus-dados")}
        >
          <Text style={styles.textButton}>Acessar meus dados</Text>
          <IconArrowRigth />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNavigation("meus-posts")}
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
