import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";

import { IconVoltar } from "@/assets/icons/icon-voltar";

import { styles } from "./styles";
import { ImagemMeusPosts } from "@/assets/images/image-meus-posts";
import { api } from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MeusPosts() {
  const router = useRouter();

  const handleButtonBack = () => {
    router.back();
  };

  const fecthPostUsuario = async () => {
    const id = await AsyncStorage.getItem("id");
    try {
      const response = api.get(`/posts/user/${id}`);
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <ImagemMeusPosts />
      <TouchableOpacity
        style={styles.containerVoltar}
        onPress={handleButtonBack}
      >
        <IconVoltar />
      </TouchableOpacity>
      <Text style={styles.headerTitulo}>Meus Posts</Text>
      <SafeAreaView></SafeAreaView>
    </View>
  );
}
