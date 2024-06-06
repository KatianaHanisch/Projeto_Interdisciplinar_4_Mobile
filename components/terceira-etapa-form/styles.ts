import { StyleSheet } from "react-native";
import { theme } from "@/constants";

export const styles = StyleSheet.create({
  containerUploadImagem: {
    width: "90%",
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
  },
  imagemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textoImagem: {
    fontFamily: theme.fontFamily.raleway.medium,
    fontSize: 16,
    color: theme.colors.grayDark,
    marginLeft: 5,
  },
  imagem: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  buttonUpload: {
    width: "100%",
    height: 45,
    backgroundColor: theme.colors.orangeLight,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderRadius: 5,
    paddingHorizontal: 10,
    borderWidth: 0.4,
    borderColor: "#c4c4c4",
  },
  textoButtonUpload: {
    fontFamily: theme.fontFamily.raleway.regular,
    fontSize: 16,
    color: theme.colors.grayMedium,
  },
  mensagem: {
    color: "#868686",
    fontFamily: theme.fontFamily.raleway.light,
    fontSize: 14,
  },
  containerImagem: {
    width: "100%",
    height: 65,
    backgroundColor: theme.colors.orangeLight,
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 10,
  },
  containerIcones: {
    flexDirection: "row",
  },
});
