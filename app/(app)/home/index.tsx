import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TextInput,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";
import { useNavigate } from "@/hooks/useNavigate";
import { AxiosError } from "axios";

import { Client } from "@stomp/stompjs";

import { Header } from "@/components/header";
import { Filtro } from "@/components/filtro";
import { CardPost } from "@/components/card-post";

import { IconBusca } from "@/assets/icons/icon-busca";

import { styles } from "./styles";
import { api, api_chat } from "@/services/api";
import { useAuth } from "@/context/AuthContext";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const navigate = useNavigate();

  const { authState, onLogout } = useAuth();

  const [filtroSelecionado, setFiltroSelecionado] = useState<string>("");
  const [posts, setPosts] = useState<PostProps[]>([]);

  const handleSelecionarFiltro = (filtro: string) => {
    setFiltroSelecionado(filtro);
  };

  const handleDetalhes = (id: string) => {
    navigate(`/post/${id}`);
  };

  const handleNavigate = (value: string) => {
    navigate(`/about/${value}`);
  };

  const fetcherPosts = async () => {
    try {
      const response = await api.get("/posts?page=0", {
        headers: {
          Authorization: authState?.token,
        },
      });

      setPosts(response.data.posts);
    } catch (err) {
      const error = err as AxiosError<Error>;
      console.error(error.response?.data.message);
    }
  };

  const connect = async () => {
    const id = await AsyncStorage.getItem("id");

    const client = new Client({
      brokerURL: `${api_chat}/wss?id=${id}`,
      onConnect: () => {
        // console.log("Conectado");
        // client.subscribe(`/user/${id}/queue/messages`, (message) => {
        //   const mensagemRecebida = JSON.parse(message.body);
        //   setMensagensRecebidas((prev: any) => [...prev, mensagemRecebida]);
        // });
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

  const fetcherDados = async () => {
    try {
      const response = await api.get("/auth/token", {
        headers: {
          Authorization: `Bearer ${authState?.token}`,
        },
      });

      if (response.status === 200) {
        await AsyncStorage.setItem("id", response.data.id);
        await AsyncStorage.setItem("nome", response.data.name);
        await AsyncStorage.setItem("email", response.data.email);
        await AsyncStorage.setItem(
          "image_url",
          response.data.image_url !== null ? response.data.image_url : ""
        );
      } else {
        onLogout!();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    connect();
    fetcherPosts();
    fetcherDados();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Header handleNavigate={handleNavigate} />
        <View style={styles.containerItens}>
          <View style={styles.containerInput}>
            <IconBusca />
            <TextInput
              style={styles.input}
              placeholder="Procure por palavras-chaves"
            />
          </View>
          <Filtro
            filtroSelecionado={filtroSelecionado}
            handleSelecionarFiltro={handleSelecionarFiltro}
          />
          <SafeAreaView style={styles.containerLista}>
            <FlatList
              data={posts}
              renderItem={({ item }) => (
                <CardPost
                  {...item}
                  handleNavigate={handleDetalhes}
                  tipoPost="home"
                />
              )}
              keyExtractor={(post) => post.id}
              showsVerticalScrollIndicator={false}
            />
          </SafeAreaView>
        </View>
      </View>
    </>
  );
}
