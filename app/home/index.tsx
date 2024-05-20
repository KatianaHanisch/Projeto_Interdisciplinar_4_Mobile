import React, { useState } from "react";
import { View, TextInput, SafeAreaView, FlatList } from "react-native";

import { Header } from "@/components/header";
import { Filtro } from "@/components/filtro";
import { CardPost } from "@/components/card-post";

import { IconBusca } from "@/assets/icons/icon-busca";

import { data } from "../../data.json";
import { useNavigate } from "@/hooks/useNavigate";
import { ProtectedRoute } from "../(routes)/protected-route";

import { styles } from "./styles";

export default function Home() {
  const navigate = useNavigate();
  const [filtroSelecionado, setFiltroSelecionado] = useState<string>("");

  const handleSelecionarFiltro = (filtro: string) => {
    setFiltroSelecionado(filtro);
  };

  const handleDetalhes = (id: string) => {
    navigate(`/post/${id}`);
  };

  const handleNavigate = (value: string) => {
    navigate(`/about/${value}`);
  };

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
              data={data}
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
