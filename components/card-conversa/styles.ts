import { theme } from "@/constants";

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    backgroundColor: theme.colors.orangeLight,
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 15,
  },
  containerImage: {
    width: 50,
    height: 50,
    borderRadius: 99999,
  },
  imagem: {
    width: 50,
    height: 50,
    borderRadius: 99999,
  },
  containerTextos: {
    width: "77%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  containerMensagem: {
    maxWidth: 220,
  },
  nomeContato: {
    fontSize: 18,
    fontFamily: theme.fontFamily.montserrat.semiBold,
    color: theme.colors.grayDark,
  },
  mensagem: {
    fontSize: 14,
    fontFamily: theme.fontFamily.raleway.regular,
    color: theme.colors.grayMedium,
  },
  containerQuantidadeMensagens: {
    width: 30,
    height: 35,
    backgroundColor: theme.colors.orangePrimaryDark,
    alignItems: "center",
    justifyContent: "center",
    marginRight: -15,
    borderRadius: 10,
  },
  quantidadeMensagens: {
    fontSize: 16,
    fontFamily: theme.fontFamily.montserrat.semiBold,
    color: theme.colors.white,
  },
  containerIconLixeira: {
    position: "absolute",
    right: 10,
  },
});
