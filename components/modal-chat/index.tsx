import React, { useEffect, useRef, useState } from "react";

import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { styles } from "./styles";
import { IconBusca } from "@/assets/icons/icon-busca";
import { CardConversa } from "../card-conversa";

import { FlatList } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/context/AuthContext";
import { api, api_chat } from "@/services/api";
import { theme } from "@/constants";

import { Client } from "@stomp/stompjs";

interface Props {
  id: string;
  chatId: string;
  senderId: string;
  recipientId: string;
  status: boolean;
  sender: {
    name: string;
    imageUrl: string;
  };
  mensagem: string;
}

interface Mensagem {
  content: string;
  senderId: string;
  recipientId: string;
}

export function ModalChat() {
  const router = useRouter();
  const { authState } = useAuth();

  const [carregando, setCarregando] = useState<boolean>();
  const [conversas, setConversas] = useState<Props[]>([]);
  // const [mensagem, setMensagem] = useState<Mensagem>();

  const [idConversa, setIdConversa] = useState<string>("");

  const client = useRef<Client | null>(null);

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
        setConversas(response.data.reverse());

        setCarregando(false);
      }
    } catch (error) {
      setCarregando(false);

      console.log(error);
    }
  };

  const handleConversa = (id: string, nome: string, imagem: string) => {
    router.navigate(
      `/chat-conversa/${id}?nome=${encodeURIComponent(
        nome
      )}&imagem=${encodeURIComponent(imagem)}`
    );
  };

  useEffect(() => {
    const connect = async () => {
      const id = await AsyncStorage.getItem("id");

      client.current = new Client({
        brokerURL: `${api_chat}/wss?id=${id}`,
        onConnect: () => {
          client.current?.subscribe(`/user/${id}/queue/messages`, () => {
            fetcherDados();
          });
        },
        onStompError: (frame) => {
          console.log("Broker reported error: " + frame.headers["message"]);
          console.log("Additional details: " + frame.body);
        },
        onWebSocketError: (error) => {
          console.log("WebSocket error: ", error);
        },
        forceBinaryWSFrames: true,
        appendMissingNULLonIncoming: true,
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        beforeConnect: () => {},
      });

      client.current.activate();
    };

    connect();
    fetcherDados();

    return () => {
      if (client.current) {
        client.current.deactivate();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setIdConversa("")} activeOpacity={1}>
        <View style={styles.containerHeaderModal}>
          <Text style={styles.tituloHeader}>Conversas</Text>
          <View style={styles.containerIcone}>
            <IconBusca />
          </View>
        </View>

        {carregando ? (
          <View style={styles.containerCarregamento}>
            <ActivityIndicator
              size={50}
              color={theme.colors.orangePrimaryDark}
            />
          </View>
        ) : (
          <SafeAreaView style={styles.containerLista}>
            <FlatList
              data={conversas}
              renderItem={({ item }) => (
                <CardConversa
                  imagem={item.sender.imageUrl}
                  idConversa={idConversa}
                  setIdConversa={setIdConversa}
                  nome={item.sender.name}
                  {...item}
                  onPress={handleConversa}
                  id={item.id}
                  fetch={fetcherDados}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          </SafeAreaView>
        )}
      </TouchableOpacity>
    </View>
  );
}
