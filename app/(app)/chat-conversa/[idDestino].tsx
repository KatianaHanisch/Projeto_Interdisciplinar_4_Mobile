import React, { useEffect, useRef, useState } from "react";

import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";

import { styles } from "./styles";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams, useRouter } from "expo-router";

import { Client } from "@stomp/stompjs";

import { IconVoltar } from "@/assets/icons/icon-voltar";
import { useAuth } from "@/context/AuthContext";
import { api, api_chat, api_url } from "@/services/api";
import { AxiosError } from "axios";
import { TextInput } from "react-native-gesture-handler";
import { IconEnviar } from "@/assets/icons/icon-enviar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatarDataEHora } from "@/utils/formatarData";
import { IconLixeira } from "@/assets/icons/icon-lixeira";
import { SnackBar } from "@/components/snack-bar";

export default function ChatConversa() {
  const router = useRouter();
  const { authState } = useAuth();

  const { idDestino, nome, imagem } = useLocalSearchParams();

  const [dadosConversa, setDadosConversa] = useState<ConversasProps[]>([]);
  const [mensagem, setMensagem] = useState<string>();
  const [idUser, setIdUser] = useState<string>();

  const [selectedMessageId, setSelectedMessageId] = useState<string>("");
  const [abrirSnackBar, setAbrirSnackBar] = useState<boolean>(false);

  const client = useRef<Client | null>(null);
  const flatListRef = useRef<FlatList>(null);

  const handleLongPress = (messageId: string) => {
    if (messageId === undefined) {
      getMensagens();
      setTimeout(() => {
        setSelectedMessageId(messageId);
      }, 50);
    } else {
      setSelectedMessageId(messageId);
    }
  };

  const removerMensagem = async () => {
    const idUser = await AsyncStorage.getItem("id");
    setAbrirSnackBar(false);
    if (idUser && selectedMessageId) {
      try {
        const response = await api.delete(
          `/messages/${idUser}/${selectedMessageId}`,
          {
            headers: {
              Authorization: authState?.token,
            },
          }
        );

        if (response.status === 200) {
          getMensagens();
          setAbrirSnackBar(false);
        } else {
          setAbrirSnackBar(true);
          setTimeout(() => {
            setAbrirSnackBar(false);
          }, 5000);
        }
      } catch (err) {
        const error = err as AxiosError<Error>;
        setAbrirSnackBar(true);
        setTimeout(() => {
          setAbrirSnackBar(false);
        }, 5000);
        console.error(error.response?.data.message);
      }
    }
  };

  const getMensagens = async () => {
    const id = await AsyncStorage.getItem("id");
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

  const enviarMensagem = async () => {
    const id = await AsyncStorage.getItem("id");

    if (mensagem !== undefined && mensagem !== "" && client && idDestino) {
      const chatMensagemAmostra = {
        senderId: id,
        recipientId: idDestino,
        content: mensagem,
        timestamp: Date.now(),
      };
      setDadosConversa((prev: any) => [...prev, chatMensagemAmostra]);

      const chatMensagem = {
        senderId: id,
        recipientId: idDestino,
        content: mensagem,
      };

      client.current?.publish({
        destination: "/app/chat",
        body: JSON.stringify(chatMensagem),
      });

      setMensagem("");
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  };

  const handleButtonBack = () => {
    router.back();
  };

  useEffect(() => {
    const connect = async () => {
      const id = await AsyncStorage.getItem("id");
      setIdUser(id!);

      client.current = new Client({
        brokerURL: `${api_chat}/wss?id=${id}`,
        onConnect: () => {
          // console.log("Conectado");
          client.current?.subscribe(`/user/${id}/queue/messages`, (message) => {
            const mensagemRecebida = JSON.parse(message.body);
            setDadosConversa((prev: any) => [...prev, mensagemRecebida]);
            flatListRef.current?.scrollToEnd({ animated: true });
          });
        },
        onStompError: (frame) => {
          // console.log("Broker reported error: " + frame.headers["message"]);
          // console.log("Additional details: " + frame.body);
        },
        onWebSocketError: (error) => {
          // console.log("WebSocket error: ", error);
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
            style={styles.imagem}
            source={
              imagem && imagem !== "null"
                ? { uri: `${api_url}/uploads/users/${imagem}` }
                : require("../../../assets/images/user-conversas-image.png")
            }
          />

          <Text style={styles.textoHeader}>{nome}</Text>
        </View>
        <FlatList
          ref={flatListRef}
          showsVerticalScrollIndicator={false}
          style={styles.containerMensagens}
          data={dadosConversa}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
          renderItem={({ item }) => (
            <>
              {item.senderId === idUser ? (
                <View style={styles.containerMensagemEnviada}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.containerMensagemEnviadaBox}
                    onLongPress={() => handleLongPress(item.id)}
                    onPress={() => setSelectedMessageId("")}
                  >
                    <Text style={styles.mensagem}>{item?.content}</Text>
                    {selectedMessageId === item.id && (
                      <TouchableOpacity
                        onPress={() => removerMensagem()}
                        style={styles.iconLixeira}
                      >
                        <IconLixeira />
                      </TouchableOpacity>
                    )}
                  </TouchableOpacity>

                  <Text style={styles.horarioMensagem}>
                    {formatarDataEHora(item?.timestamp)}
                  </Text>
                </View>
              ) : (
                <View style={styles.containerMensagemRecebida}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.containerMensagemRecebidaBox}
                  >
                    <Text style={styles.mensagem}>{item?.content}</Text>
                  </TouchableOpacity>
                  <Text style={styles.horarioMensagem}>
                    {" "}
                    {formatarDataEHora(item?.timestamp)}
                  </Text>
                </View>
              )}
            </>
          )}
        />

        {abrirSnackBar && (
          <SnackBar
            mensagem="Erro ao apagar mensagem"
            tipo="erro"
            onClose={() => setAbrirSnackBar(false)}
          />
        )}
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
