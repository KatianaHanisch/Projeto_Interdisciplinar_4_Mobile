import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Text,
} from "react-native";
import { useNavigate } from "@/hooks/useNavigate";
import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Client } from "@stomp/stompjs";

import { Header } from "@/components/header";
import { Filtro } from "@/components/filtro";
import { CardPost } from "@/components/card-post";
import { ModalFiltro } from "@/components/modal-filtro";

import { api, api_chat } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "@/hooks/useForm";

import { MaterialIcons } from "@expo/vector-icons";

import { theme } from "@/constants";
import { styles } from "./styles";

export default function Home() {
  const navigate = useNavigate();
  const { authState, onLogout } = useAuth();

  const [filtroSelecionado, setFiltroSelecionado] = useState<string>("");
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostProps[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [abrirModalFiltro, setAbrirModalFiltro] = useState<boolean>(false);
  const [estados, setEstados] = useState<EstadoProps[]>([]);

  const { formData, setFormData, handleInputChange } = useForm<FormProps>({
    initialValues: {
      uf: "",
    },
  });

  const handleSelecionarFiltro = (filtro: string) => {
    setFiltroSelecionado(filtro);
    if (filtro === "") {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(
        (post) => post.type.toLowerCase() === filtro
      );
      setFilteredPosts(filtered);
    }
  };

  const handleDetalhes = (id: string) => {
    navigate(`/post/${id}`);
  };

  const handleNavigate = (value: string) => {
    navigate(`/about/${value}`);
  };

  const handleCloseFiltro = () => {
    setAbrirModalFiltro(false);
  };

  const fetchEstados = async () => {
    try {
      const response = await axios.get(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      );

      if (response.status === 200) {
        setEstados(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetcherPostsPorRegiao = async (uf: string) => {
    setLoading(true);
    try {
      const response = await api.get(`/posts/${uf}?page=0`, {
        headers: {
          Authorization: authState?.token,
        },
      });

      if (response.status === 200) {
        setFilteredPosts(response.data.posts);
        setAbrirModalFiltro(false);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const fetcherPosts = async (pageNumber: number = 0) => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await api.get(`/posts?page=${pageNumber}`, {
        headers: {
          Authorization: authState?.token,
        },
      });

      const newPosts = response.data.posts;
      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        setFilteredPosts((prevFilteredPosts) => [
          ...prevFilteredPosts,
          ...newPosts,
        ]);
      }
    } catch (err) {
      const error = err as AxiosError<Error>;
      console.error(error.response?.data.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMorePosts = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
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

  const handleDropdownChange = (name: string, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    connect();
    fetcherPosts(page);
    fetcherDados();
    fetchEstados();
  }, [page]);

  return (
    <>
      <View style={styles.container}>
        <Header handleNavigate={handleNavigate} />
        {abrirModalFiltro && (
          <ModalFiltro
            estados={estados}
            formData={formData}
            fetcherPostsPorRegiao={fetcherPostsPorRegiao}
            handleCloseFiltro={handleCloseFiltro}
            handleDropdownChange={handleDropdownChange}
            carregando={loading}
          />
        )}
        <View style={styles.containerItens}>
          <Filtro
            filtroSelecionado={filtroSelecionado}
            handleSelecionarFiltro={handleSelecionarFiltro}
            handleAbrirFiltro={() => setAbrirModalFiltro(true)}
          />
          {filteredPosts.length === 0 ? (
            <View style={styles.containerListaVazia}>
              <MaterialIcons name="not-interested" size={30} color="#555555" />
              <Text style={styles.textoListaVazia}>
                Nenhum post foi encontrado
              </Text>
            </View>
          ) : (
            <SafeAreaView style={styles.containerLista}>
              <FlatList
                data={filteredPosts}
                renderItem={({ item }) => (
                  <CardPost
                    {...item}
                    handleNavigate={handleDetalhes}
                    tipoPost="home"
                  />
                )}
                keyExtractor={(post) => post.id}
                showsVerticalScrollIndicator={false}
                onEndReached={loadMorePosts}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                  loading ? (
                    <ActivityIndicator
                      color={theme.colors.orangePrimaryDark}
                      size={25}
                    />
                  ) : null
                }
              />
            </SafeAreaView>
          )}
        </View>
      </View>
    </>
  );
}
