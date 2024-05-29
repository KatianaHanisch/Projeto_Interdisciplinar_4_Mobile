import React, { useEffect, useState } from "react";

import { View, Text, SafeAreaView, ActivityIndicator } from "react-native";
import { styles } from "./styles";
import { IconBusca } from "@/assets/icons/icon-busca";
import { CardConversa } from "../card-conversa";

import { FlatList } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/services/api";
import { theme } from "@/constants";

interface Props {
  id: string;
  chatId: string;
  senderId: string;
  recipientId: string;
  status: boolean;
}

export function ModalChat() {
  const router = useRouter();
  const { authState } = useAuth();

  const [carregando, setCarregando] = useState<boolean>();
  const [conversas, setConversas] = useState<Props[]>([]);

  const fetcherDados = async () => {
    const idUser = await AsyncStorage.getItem("id");
    setCarregando(true);

    try {
      const response = await api.get(`/messages/${idUser}`, {
        headers: {
          Authorization: `Bearer ${authState?.token}`,
        },
      });

      if (response.status === 200) {
        setConversas(response.data);

        setCarregando(false);
      }
    } catch (error) {
      setCarregando(false);

      console.log(error);
    }
  };

  const handleConversa = (id: string) => {
    router.navigate(`/chat-conversa/${id}`);
  };

  useEffect(() => {
    fetcherDados();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.containerHeaderModal}>
        <Text style={styles.tituloHeader}>Conversas</Text>
        <View style={styles.containerIcone}>
          <IconBusca />
        </View>
      </View>

      {carregando ? (
        <View style={styles.containerCarregamento}>
          <ActivityIndicator size={50} color={theme.colors.orangePrimaryDark} />
        </View>
      ) : (
        <SafeAreaView style={styles.containerLista}>
          <FlatList
            data={conversas}
            renderItem={({ item }) => (
              <CardConversa {...item} onPress={handleConversa} />
            )}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      )}
    </View>
  );
}
