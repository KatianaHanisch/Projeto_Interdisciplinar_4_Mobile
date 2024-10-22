import React from "react";

import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

import "text-encoding-polyfill";

import { theme } from "../constants";

import { IconArrowPaginaInicial } from "@/assets/icons/icon-arrow-pagina-inicial";
import { ImagemCirculoPaginaInicial } from "@/assets/images/imagem-circulo-pagina-inicial";

import { useNavigate } from "@/hooks/useNavigate";

export default function PaginaInicial() {
  const navigate = useNavigate();

  return (
    <View style={styles.container}>
      <ImagemCirculoPaginaInicial />

      <Text style={styles.tituloInicio}>
        Adote seu <Text style={styles.tituloInicioDestaque}>pet</Text>
      </Text>

      <View style={styles.containerButton}>
        <TouchableOpacity
          onPress={() => navigate("/login")}
          style={styles.Button}
        >
          <IconArrowPaginaInicial />
        </TouchableOpacity>
      </View>
      <View style={styles.containerImage}>
        <Image
          style={styles.imagem}
          source={require("../assets/images/imagem-pagina-inicial.png")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: theme.colors.white,
  },
  tituloInicio: {
    fontSize: 38,
    fontFamily: theme.fontFamily.montserrat.medium,
    color: theme.colors.grayDark,
    marginTop: 18,
  },
  tituloInicioDestaque: {
    fontSize: 38,
    fontFamily: theme.fontFamily.montserrat.bold,
    color: theme.colors.orangePrimaryDark,
  },
  containerButton: {
    backgroundColor: "rgba(255, 185, 120, 0.1)",
    width: 145,
    height: 140,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    marginTop: 20,
  },
  Button: {
    backgroundColor: theme.colors.orangePrimaryDark,
    width: 80,
    height: 80,
    opacity: 1,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 5,
  },
  containerImage: {
    width: "100%",
    height: "75%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  imagem: {
    width: "100%",
    height: "80%",
  },
});
