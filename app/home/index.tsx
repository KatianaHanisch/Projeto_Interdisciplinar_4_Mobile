import React, { useState } from "react";

import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { Header } from "@/components/header";
import { theme } from "@/constants";

import { Filtro } from "@/components/filtro";

import { IconBusca } from "@/assets/icons/icon-busca";

export default function Home() {
  const [filtroSelecionado, setFiltroSelecionado] = useState<string>("");

  const handleSelecionarFiltro = (filtro: string) => {
    setFiltroSelecionado(filtro);
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
      </View>
    </View>
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
    height: "100%",
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
});
