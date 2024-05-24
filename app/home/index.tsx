import React, { useContext, useEffect, useState } from "react";
import { View, TextInput, SafeAreaView, FlatList } from "react-native";

import { Header } from "@/components/header";
import { Filtro } from "@/components/filtro";
import { CardPost } from "@/components/card-post";

import { IconBusca } from "@/assets/icons/icon-busca";

import { useNavigate } from "@/hooks/useNavigate";

import { styles } from "./styles";
import { api } from "@/services/api";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "@/context/AuthContext";

export default function Home() {
  const navigate = useNavigate();
  const { refresh } = useLocalSearchParams();
  const router = useRouter();

  const { isLoggedIn } = useContext(AuthContext);

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
  }, []);

  return (
    <>
      {isLoggedIn ? (
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
      ) : (
        router.replace("/login")
      )}
    </>
  );
}
