import React, { useState } from "react";

import { useRouter } from "expo-router";

import {
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
  FlatList,
} from "react-native";

import { Header } from "@/components/header";
import { theme } from "@/constants";

import { Filtro } from "@/components/filtro";

import { IconBusca } from "@/assets/icons/icon-busca";
import { CardPost } from "@/components/card-post";
import { styles } from "./styles";

import { data } from "../../data.json";

export default function Home() {
  const [filtroSelecionado, setFiltroSelecionado] = useState<string>("");
  const [abrirModal, setAbrirModal] = useState<boolean>(false);

  const router = useRouter();

  const handleSelecionarFiltro = (filtro: string) => {
    setFiltroSelecionado(filtro);
  };

  const handleDetalhes = (id: string) => {
    router.navigate(`/post/${id}`);
  };

  return (
    <View style={styles.container}>
      <Header />
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
  );
}
