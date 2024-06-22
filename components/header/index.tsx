import React, { useEffect, useState } from "react";

import { View, TouchableOpacity, Text } from "react-native";

import { IconChat } from "@/assets/icons/icon-chat";
import { IconCriarPost } from "@/assets/icons/icon-criar-post";
import { IconUser } from "@/assets/icons/icon-user";
import { IconClose } from "@/assets/icons/icon-close";
import { IconChatSelecionado } from "@/assets/icons/icon-chat-selecionado";
import { IconCriarPostSelecionado } from "@/assets/icons/icon-criar-post-selecionado";
import { IconUserSelecionado } from "@/assets/icons/icon-user-selecionado";

import { Client } from "@stomp/stompjs";

import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api, api_chat } from "@/services/api";
import { useAuth } from "@/context/AuthContext";

export function Header({
  handleNavigate,
  pagina,
  handleFecharModal,
}: HeaderProps) {
  const backgroundOrange = pagina === "post" || pagina === "perfil-usuario";
  const { authState } = useAuth();

  const [notificacao, setNotificacao] = useState<boolean>(false);
  console.log(notificacao);

  const notification = async () => {
    try {
      const response = await api.get(`/messages/notification`, {
        headers: {
          Authorization: authState?.token,
        },
      });

      if (response.status === 200) {
        setNotificacao(response.data);
      }
    } catch (err) {
      setNotificacao(true);
    }
  };
  const connect = async () => {
    const id = await AsyncStorage.getItem("id");

    const client = new Client({
      brokerURL: `${api_chat}/wss?id=${id}`,
      onConnect: () => {
        // console.log("Conectado");
        client.subscribe(`/user/${id}/queue/messages`, (message) => {
          notification();
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
    client.activate();
  };
  useEffect(() => {
    notification();
    connect();
  }, []);

  return (
    <>
      <View
        style={[
          styles.container,
          backgroundOrange && styles.containerPerfilUsuario,
        ]}
      >
        <TouchableOpacity
          style={styles.containerIconeClose}
          onPress={handleFecharModal}
        >
          {pagina === undefined ? null : <IconClose />}
        </TouchableOpacity>

        <View style={styles.containerIcones}>
          <TouchableOpacity
            style={[
              styles.containerIcone,
              pagina === "chat" && styles.paginaSelecionada,
            ]}
            onPress={() => handleNavigate!("chat")}
          >
            {pagina === "chat" ? <IconChatSelecionado /> : <IconChat />}
            {notificacao && (
              <View
                style={[
                  styles.containerMensagens,
                  pagina === "chat" && styles.containerMensagensSelecionado,
                ]}
              >
                <Text style={styles.quantidadeMensagens}></Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.containerIcone,
              pagina === "post" && styles.paginaSelecionada,
            ]}
            onPress={() => handleNavigate!("post")}
          >
            {pagina === "post" ? (
              <IconCriarPostSelecionado />
            ) : (
              <IconCriarPost />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.containerIcone,
              pagina === "perfil-usuario" && styles.paginaSelecionada,
            ]}
            onPress={() => handleNavigate!("perfil-usuario")}
          >
            {pagina === "perfil-usuario" ? (
              <IconUserSelecionado />
            ) : (
              <IconUser />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
