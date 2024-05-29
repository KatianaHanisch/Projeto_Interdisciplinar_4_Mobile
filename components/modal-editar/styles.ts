import { theme } from "@/constants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    zIndex: 5,
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
  textoHeader: {
    fontSize: 22,
    fontFamily: theme.fontFamily.montserrat.semiBold,
    color: theme.colors.grayDark,
  },
  containerDados: {
    width: "100%",
    marginTop: 30,
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
    gap: 15,
  },
  containerInformaçoes: {
    width: "100%",
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
  containerImagemCarregada: {
    width: "100%",
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  imagemCarregada: {
    flexDirection: "row",
  },
  buttonClose: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  textoImagemCarregada: {
    fontFamily: theme.fontFamily.raleway.semiBold,
    color: theme.colors.grayMedium,
    marginLeft: 5,
    fontSize: 16,
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
  buttonUpload: {
    width: "100%",
    height: 45,
    backgroundColor: theme.colors.orangeLight,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  textoUpload: {
    fontSize: 14,
    fontFamily: theme.fontFamily.raleway.semiBold,
    color: theme.colors.black,
  },
});
