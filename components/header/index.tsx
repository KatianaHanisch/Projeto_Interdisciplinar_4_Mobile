import { View, TouchableOpacity, Text } from "react-native";

import { IconChat } from "@/assets/icons/icon-chat";
import { IconCriarPost } from "@/assets/icons/icon-criar-post";
import { IconUser } from "@/assets/icons/icon-user";

import { styles } from "./styles";

export function Header({ handleAbrirModal }: HeaderProps) {
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.containerIcone}
          onPress={() => handleAbrirModal("chat")}
        >
          <IconChat />
          <View style={styles.containerMensagens}>
            <Text style={styles.quantidadeMensagens}>5</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.containerIcone}
          onPress={() => handleAbrirModal("post")}
        >
          <IconCriarPost />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.containerIcone}
          onPress={() => handleAbrirModal("usuario")}
        >
          <IconUser />
        </TouchableOpacity>
      </View>
    </>
  );
}
