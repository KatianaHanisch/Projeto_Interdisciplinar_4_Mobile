import { Link } from "expo-router";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";

import { theme } from "../constants";

import { IconArrowPaginaInicial } from "@/assets/icons/icon-arrow-pagina-inicial";

export default function PaginaInicial() {
  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Image
          source={require("../assets/images/circulo-pagina-inicial.png")}
        />
        <Text style={styles.tituloInicio}>
          Adote seu <Text style={styles.tituloInicioDestaque}>pet</Text>
        </Text>
        <View style={styles.containerButton}>
          <TouchableOpacity style={styles.Button}>
            <Link href={"/login/"}>
              <IconArrowPaginaInicial />
            </Link>
          </TouchableOpacity>
        </View>
        <View style={styles.containerImage}>
          <Image
            style={styles.imagem}
            source={require("../assets/images/imagem-pagina-inicial.png")}
          />
        </View>
      </View>
    </>
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
    height: "66%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  imagem: {
    width: "100%",
    height: "80%",
  },
});
