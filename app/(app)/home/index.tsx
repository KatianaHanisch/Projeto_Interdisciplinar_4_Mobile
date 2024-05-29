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

import * as encoding from "text-encoding";

export default function Home() {
  const navigate = useNavigate();

  const { authState } = useAuth();

  const [filtroSelecionado, setFiltroSelecionado] = useState<string>("");
  const [mensagensRecebidas, setMensagensRecebidas] = useState<any>([]);
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);

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

  const id = "3884289a-1116-4d41-a112-195ef081bab5";
  const client = new Client({
    brokerURL: `${api_chat}/wss?id=${id}`,
    onConnect: () => {
      setIsConnected(true);
      client.subscribe(`/user/${id}/queue/messages`, (message) => {
        const mensagemRecebida = JSON.parse(message.body);
        setMensagensRecebidas((prev: any) => [...prev, mensagemRecebida]);
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

  useEffect(() => {
    client.activate();
    fetcherPosts();
  }, []);

  useEffect(() => {
    console.log("Client connected: " + isConnected);
  }, [isConnected]);

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
                <CardPost {...item} handleNavigate={handleDetalhes} />
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
