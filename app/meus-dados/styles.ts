import { theme } from "@/constants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerImagem: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginBottom: 20,
    marginTop: -45,
  },
  imagem: {
    width: 80,
    height: 75,
  },
  nome: {
    fontSize: 25,
    fontFamily: theme.fontFamily.montserrat.semiBold,
    color: theme.colors.grayMedium,
    marginTop: 10,
  },
  containerDadosUsuario: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  containerDados: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    height: 70,
    paddingHorizontal: 12,
  },
  tituloInformaçoes: {
    fontSize: 16,
    fontFamily: theme.fontFamily.raleway.light,
    color: theme.colors.grayMedium,
  },
  containerInformacoes: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  informacoes: {
    fontSize: 20,
    fontFamily: theme.fontFamily.raleway.medium,
    color: theme.colors.grayPrimary,
  },
  buttonEdit: {
    padding: 5,
  },
});
