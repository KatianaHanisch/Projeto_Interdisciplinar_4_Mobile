import { theme } from "@/constants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: theme.colors.white,
  },
  containerHeaderModal: {
    width: "95%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    // paddingHorizontal: 10,
  },
  tituloHeader: {
    fontSize: 26,
    fontFamily: theme.fontFamily.montserrat.bold,
    color: theme.colors.grayDark,
  },
  containerIcone: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    // backgroundColor: "rgba(184, 184, 184, 0.1)",
    borderRadius: 100,
  },
  containerLista: {
    flex: 1,
    alignItems: "center",
  },
  containerCarregamento: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.white,
  },
  textoHeader: {
    fontSize: 22,
    fontFamily: theme.fontFamily.montserrat.semiBold,
    color: theme.colors.grayDark,
  },
  containerDados: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
    gap: 20,
  },
  containerInformaçoes: {
    width: "100%",
  },

  containerInformacoes: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  containerImagemCarregada: {
    width: "100%",
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    backgroundColor: theme.colors.orangeLight,
  },
  imagemCarregada: {
    flexDirection: "row",
  },
  buttonClose: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  containerButton: {
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  containerModal: {
    width: "90%",
    backgroundColor: theme.colors.white,
    padding: 20,
    borderRadius: 20,
  },
  containerHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container2: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    zIndex: 5,
  },
});
