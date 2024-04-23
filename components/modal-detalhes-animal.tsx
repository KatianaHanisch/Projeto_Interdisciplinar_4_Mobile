import { View, Text, StyleSheet } from "react-native";

import { ComentarioItem } from "./comentario-item";

import { theme } from "@/constants";

import { IconLocalidade } from "@/assets/icons/icon-localidade";

export function ModalDetalhesAnimal() {
  return (
    <View style={styles.container}>
      <View style={styles.containerImagem}>
        <Text>Imagem</Text>
      </View>
      <View style={styles.containerItens}>
        <View style={styles.containerInformacoes}>
          <View style={styles.containerTextos}>
            <Text style={styles.textoNome}>Nome</Text>
            <Text style={styles.descricao}>Descrição</Text>
            <View style={styles.containerLocalidade}>
              <IconLocalidade />
              <Text style={styles.localidade}>Sinop - MT</Text>
            </View>
          </View>
          <View style={styles.containerIdadeGenero}>
            <View style={styles.containerIdade}>
              <Text style={styles.idade}>5 anos</Text>
            </View>
            <View style={styles.containerGenero}>
              <Text style={styles.genero}>Macho</Text>
            </View>
          </View>
        </View>
        <View style={styles.containerComentarios}>
          <Text style={styles.tituloComentarios}>Comentários</Text>
          <ComentarioItem />
          <ComentarioItem />
        </View>
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
  containerImagem: {
    width: "100%",
    height: 260,
    alignItems: "center",
    justifyContent: "center",
  },
  containerItens: {
    width: "100%",
    alignItems: "center",
  },
  containerInformacoes: {
    width: "95%",
    flexDirection: "row",
    backgroundColor: theme.colors.orangeLight,
    height: 135,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  containerIdadeGenero: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: -70,
    height: "100%",
  },
  containerIdade: {
    backgroundColor: theme.colors.orangePrimaryDark,
    width: 50,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  idade: {
    fontSize: 12,
    fontFamily: theme.fontFamily.raleway.medium,
    color: theme.colors.white,
  },
  containerGenero: {
    backgroundColor: theme.colors.orangePrimaryDark,
    width: 50,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  genero: {
    fontSize: 12,
    fontFamily: theme.fontFamily.raleway.medium,
    color: theme.colors.white,
  },
  containerTextos: {
    gap: 5,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  textoNome: {
    fontSize: 18,
    fontFamily: theme.fontFamily.montserrat.bold,
    color: theme.colors.grayDark,
  },
  descricao: {
    fontFamily: theme.fontFamily.raleway.regular,
    color: theme.colors.grayMedium,
    fontSize: 14,
  },
  containerLocalidade: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 3,
    marginTop: 5,
  },
  localidade: {
    fontFamily: theme.fontFamily.raleway.light,
    color: theme.colors.grayMedium,
    fontSize: 12,
  },
  containerComentarios: {
    width: "95%",
    marginTop: 15,
    alignItems: "center",
    padding: 15,
    backgroundColor: theme.colors.orangeLight,
    height: 270,
    borderRadius: 20,
  },
  tituloComentarios: {
    fontSize: 18,
    fontFamily: theme.fontFamily.montserrat.bold,
    color: theme.colors.grayDark,
    marginBottom: 15,
  },
});
