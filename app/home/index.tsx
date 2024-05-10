import React, { useState } from "react";
import { useRouter } from "expo-router";
import { View, TextInput, SafeAreaView, FlatList } from "react-native";

import { Header } from "@/components/header";
import { Filtro } from "@/components/filtro";

import { CardPost } from "@/components/card-post";
import { ModalChat } from "@/components/modal-chat";

import { IconBusca } from "@/assets/icons/icon-busca";

import { styles } from "./styles";

import { data } from "../../data.json";
import { ModalCriarPost } from "@/components/modal-criar-post";
import { ModalPerfilUsuario } from "@/components/modal-perfil-usuario";

export default function Home() {
  const [filtroSelecionado, setFiltroSelecionado] = useState<string>("");
  const [tipoModal, setTipoModal] = useState<string>("");
  const [abrirModal, setAbrirModal] = useState<boolean>(false);

  const router = useRouter();

  const handleSelecionarFiltro = (filtro: string) => {
    setFiltroSelecionado(filtro);
  };

  const handleDetalhes = (id: string) => {
    router.navigate(`/post/${id}`);
  };

  const handleAbrirModal = (value: string) => {
    setTipoModal(value);
    setAbrirModal(true);
  };

  const renderModalContent = () => {
    switch (tipoModal) {
      case "chat":
        return <ModalChat />;
      case "post":
        return <ModalCriarPost />;
      case "perfil-usuario":
        return <ModalPerfilUsuario />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Header handleAbrirModal={handleAbrirModal} />
      {abrirModal ? (
        renderModalContent()
      ) : (
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
      )}
    </View>
  );
}
