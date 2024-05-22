import React, { useContext, useEffect, useState } from "react";
import { View, TextInput, SafeAreaView, FlatList } from "react-native";

import { Client } from "@stomp/stompjs";

import { Header } from "@/components/header";
import { Filtro } from "@/components/filtro";
import { CardPost } from "@/components/card-post";

import { IconBusca } from "@/assets/icons/icon-busca";

import { useNavigate } from "@/hooks/useNavigate";

import { styles } from "./styles";
import { api } from "@/services/api";
import { useLocalSearchParams } from "expo-router";
import { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const client = new Client();
  const navigate = useNavigate();
  const { refresh } = useLocalSearchParams();

  const [filtroSelecionado, setFiltroSelecionado] = useState<string>("");
  const [posts, setPosts] = useState<PostProps[]>([]);

  const [mensagensRecebidas, setMensagensRecebidas] = useState<any>([]);
  const [novaMensagem, setNovaMensagem] = useState<String>();

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
      const token = await AsyncStorage.getItem("token");

      if (token) {
        const response = await api.get("/posts?page=0", {
          headers: {
            Authorization: token,
          },
        });

        setPosts(response.data.posts);
      } else {
        console.error("Token não encontrado");
      }
    } catch (err) {
      const error = err as AxiosError<Error>;
      console.error(error.response?.data.message);
    }
  };

  console.log(mensagensRecebidas);

  const connect = async () => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      client.configure({
        brokerURL: `ws://10.0.0.103:8081/api/wss?id=${token}`,
        onConnect: () => {
          client.subscribe(`/user/${token}/queue/messages`, (menssagem) => {
            const mensagemRecebida = JSON.parse(menssagem.body);
            setMensagensRecebidas((prev: any) => [...prev, mensagemRecebida]);
          });
          console.log("Conectado");
        },
        onStompError: (frame) => {
          console.log("Broker reported error: " + frame.headers["message"]);
          console.log("Additional details: " + frame.body);
        },
        onWebSocketError: (error) => {
          console.log(error);
        },
        forceBinaryWSFrames: true,
        appendMissingNULLonIncoming: true,
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        beforeConnect: () => {},
      });
      client.activate();
    }
  };

  // const fetchMessages = async () => {
  //   if (id && userRecebe) {
  //     const response = await api.get(
  //       `http://10.0.0.103:8081/api/messages/${id}/${userRecebe}`
  //     );
  //     setMensagensRecebidas(response.data);
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      if (refresh === "true") {
        await fetcherPosts();
      }
    };

    fetchData();
  }, [refresh]);

  useEffect(() => {
    const fetchData = async () => {
      await fetcherPosts();
    };

    fetchData();
    connect();
  }, []);

  return (
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
  );
}
