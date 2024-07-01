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
  containerVoltar: {
    zIndex: 1,
    left: 20,
    top: 40,
    position: "absolute",
  },
  containerNome: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
  },
  containerIcone: {
    height: 30,
    alignItems: "center",
    justifyContent: "flex-end",
    marginLeft: 4,
  },
  imagem: {
    width: 130,
    height: 130,
    borderRadius: 100,
  },
  nome: {
    fontSize: 25,
    fontFamily: theme.fontFamily.montserrat.semiBold,
    color: theme.colors.grayMedium,
    marginTop: 10,
  },
  containerDadosUsuario: {
    width: "100%",
    alignItems: "center",
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
  containerButton: {
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  load: {
    display: "flex",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  imagemLoading: {
    width: 130,
    height: 130,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
