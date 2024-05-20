import React, { useContext, useEffect, useState } from "react";
import { View, TextInput, SafeAreaView, FlatList } from "react-native";

import { Header } from "@/components/header";
import { Filtro } from "@/components/filtro";
import { CardPost } from "@/components/card-post";

import { IconBusca } from "@/assets/icons/icon-busca";

import { data } from "../../data.json";
import { useNavigate } from "@/hooks/useNavigate";
import { ProtectedRoute } from "../(routes)/protected-route";

import { styles } from "./styles";
import { api } from "@/services/api";
import { AuthContext } from "@/context/AuthContext";

export default function Home() {
  const navigate = useNavigate();
  const [filtroSelecionado, setFiltroSelecionado] = useState<string>("");
  const [posts, setPosts] = useState<PostProps[]>([]);

  const { token } = useContext(AuthContext);

  const handleSelecionarFiltro = (filtro: string) => {
    setFiltroSelecionado(filtro);
  };

  const handleDetalhes = (id: string) => {
    navigate(`/post/${id}`);
  };

  const handleNavigate = (value: string) => {
    navigate(`/about/${value}`);
  };

  const fetcherPost = async () => {
    try {
      const response = await api.get("/posts?page=0", {
        headers: {
          Authorization: token,
        },
      });

      setPosts(response.data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetcherPost();
  }, []);

  if (posts?.length !== 0) {
    console.log(posts![0]);
  }

  return (
    <ProtectedRoute>
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
    </ProtectedRoute>
  );
}
