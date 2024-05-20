import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";

import { View, Text } from "react-native";

import { styles } from "./styles";
import { Header } from "@/components/header";
import { ModalChat } from "@/components/modal-chat";
import { ModalCriarPost } from "@/components/modal-criar-post";
import { ModalPerfilUsuario } from "@/components/modal-perfil-usuario";

export default function About() {
  const { slug } = useLocalSearchParams();

  const router = useRouter();

  const handleNavigate = (value: string) => {
    router.navigate(`/about/${value}`);
  };

  const handleFecharModal = () => {
    router.replace("/home");
  };

  const renderModalContent = () => {
    switch (slug) {
      case "chat":
        return <ModalChat />;
      case "post":
        return <ModalCriarPost />;
      case "perfil-usuario":
        return <ModalPerfilUsuario />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Header
        handleNavigate={handleNavigate}
        handleFecharModal={handleFecharModal}
        pagina={slug}
      />
      {renderModalContent()}
    </View>
  );
}
