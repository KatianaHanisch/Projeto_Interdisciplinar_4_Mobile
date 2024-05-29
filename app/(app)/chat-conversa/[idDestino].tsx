import React, { useEffect, useRef, useState } from "react";

import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";

import { styles } from "./styles";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams, useRouter } from "expo-router";

import { Client } from "@stomp/stompjs";

import { IconVoltar } from "@/assets/icons/icon-voltar";
import { useAuth } from "@/context/AuthContext";
import { api, api_chat } from "@/services/api";
import { AxiosError } from "axios";
import { TextInput } from "react-native-gesture-handler";
import { IconEnviar } from "@/assets/icons/icon-enviar";

export default function ChatConversa() {
  const router = useRouter();
  const { authState } = useAuth();

  const { idDestino } = useLocalSearchParams();

  const [dadosConversa, setDadosConversa] = useState<ConversasProps[]>([]);
  const [mensagem, setMensagem] = useState<string>();

  const id = "3884289a-1116-4d41-a112-195ef081bab5";
  const client = useRef<Client | null>(null);

  const getMensagens = async () => {
    if (id && idDestino) {
      try {
        const response = await api.get(`/messages/${id}/${idDestino}`, {
          headers: {
            Authorization: authState?.token,
          },
        });

        if (response.status === 200) {
          setDadosConversa(response.data);
        }
      } catch (err) {
        const error = err as AxiosError<Error>;
        console.error(error.response?.data.message);
      }
    }
  };

  const enviarMensagem = () => {
    if (mensagem !== undefined && mensagem !== "" && client && idDestino) {
      const chatMensagem = {
        senderId: id,
        recipientId: idDestino,
        content: mensagem,
      };

      setDadosConversa((prev: any) => [...prev, chatMensagem]);
      client.current?.publish({
        destination: "/app/chat",
        body: JSON.stringify(chatMensagem),
      });

      setMensagem("");
    }
  };

  const handleButtonBack = () => {
    router.back();
  };

  useEffect(() => {
    client.current = new Client({
      brokerURL: `${api_chat}/wss?id=${id}`,
      onConnect: () => {
        // console.log("Conectado");
        client.current?.subscribe(`/user/${id}/queue/messages`, (message) => {
          const mensagemRecebida = JSON.parse(message.body);
          setDadosConversa((prev: any) => [...prev, mensagemRecebida]);
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
      beforeConnect: () => {
        // console.log("Before connect");
      },
    });

    client.current.activate();
    getMensagens();

    return () => {
      if (client.current) {
        client.current.deactivate();
      }
    };
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.containerVoltar}
          onPress={handleButtonBack}
        >
          <IconVoltar />
        </TouchableOpacity>
        <View style={styles.containerHeader}>
          <Image
            source={require("../../../assets/images/user-conversas-image.png")}
          />
          <Text style={styles.textoHeader}>Nome aqui</Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.containerMensagens}
          data={dadosConversa}
          renderItem={({ item }) => (
            <>
              {item.senderId === id ? (
                <View style={styles.containerMensagemRecebida}>
                  <View style={styles.containerMensagemRecebidaBox}>
                    <Text style={styles.mensagem}>{item?.content}</Text>
                  </View>
                  <Text style={styles.horarioMensagem}>{item?.timestamp}</Text>
                </View>
              ) : (
                <View style={styles.containerMensagemEnviada}>
                  <View style={styles.containerMensagemEnviadaBox}>
                    <Text style={styles.mensagem}>{item?.content}</Text>
                  </View>
                  <Text style={styles.horarioMensagem}>{item?.timestamp}</Text>
                </View>
              )}
            </>
          )}
        />
        <View style={styles.containerInput}>
          <TextInput
            style={styles.input}
            placeholder="Digite sua mensagem"
            value={mensagem}
            onChangeText={setMensagem}
          />

          <TouchableOpacity style={styles.button} onPress={enviarMensagem}>
            <IconEnviar />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
