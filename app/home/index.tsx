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
import { ModalDetalhesAnimal } from "@/components/modal-detalhes-animal";

const data = [
  {
    id: "1",
    nome: "Thor",
    idade: 5,
    cidade: "Sinop",
    uf: "MT",
    genero: "masculino",
    imagem:
      "https://images.unsplash.com/photo-1560525821-d5615ef80c69?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "2",
    nome: "Atena",
    idade: 3,
    cidade: "Sinop",
    uf: "MT",
    genero: "feminino",
    imagem:
      "https://images.unsplash.com/photo-1612940960267-4549a58fb257?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "3",
    nome: "Jade",
    idade: 2,
    cidade: "Sinop",
    uf: "MT",
    genero: "feminino",
    imagem:
      "https://images.unsplash.com/photo-1560807707-8cc77767d783?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "4",
    nome: "Rayla",
    idade: 2,
    cidade: "Sinop",
    uf: "MT",
    genero: "feminino",
    imagem:
      "https://images.unsplash.com/photo-1593270379182-fe1b1f6d67e5?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function Home() {
  const [filtroSelecionado, setFiltroSelecionado] = useState<string>("");
  const [abrirModal, setAbrirModal] = useState<boolean>(false);

  const router = useRouter();

  const handleSelecionarFiltro = (filtro: string) => {
    setFiltroSelecionado(filtro);
  };

  const handleDetalhes = () => {
    // router.navigate({
    //   pathname: "/post/123",
    //   params: {
    //     _id: "123",
    //   },
    // });
    setAbrirModal(true);
  };

  return (
    <>
      {abrirModal ? (
        <ModalDetalhesAnimal />
      ) : (
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
                  <CardPost {...item} onPress={handleDetalhes} />
                )}
                keyExtractor={(post) => post.id}
                showsVerticalScrollIndicator={false}
              />
            </SafeAreaView>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  containerItens: {
    backgroundColor: theme.colors.orangeLight,
    width: "100%",
    flex: 1,
    alignItems: "center",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
    paddingTop: 30,
  },
  containerInput: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: theme.colors.white,
    borderRadius: 10,
    paddingLeft: 15,
    padding: 5,
  },
  input: {
    width: "100%",
    height: 50,
    fontSize: 16,
    fontFamily: theme.fontFamily.raleway.regular,
    color: theme.colors.grayMedium,
    marginLeft: 8,
  },
  containerLista: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
});
