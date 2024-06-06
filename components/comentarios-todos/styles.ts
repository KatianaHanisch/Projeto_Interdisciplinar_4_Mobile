import { theme } from "@/constants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  background: {
    backgroundColor: theme.colors.orangeLight,
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: "column",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
  },
  containerInterno: {
    height: "94%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  containerHeader: {
    width: "100%",
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  containerComentarios: {
    height: "90%",
    width: "95%",
  },
  titulo: {
    fontSize: 22,
    fontFamily: theme.fontFamily.montserrat.bold,
    color: theme.colors.grayDark,
    marginBottom: 15,
  },
  containerInputComentar: {
    width: "100%",
    backgroundColor: theme.colors.orangeLight,
    alignItems: "center",
    height: "100%",
    paddingTop: 5,
  },
  containerComentar: {
    flexDirection: "row",
    width: "95%",
    alignItems: "center",
    justifyContent: "space-between",
    height: 55,
    backgroundColor: theme.colors.white,
    borderRadius: 10,
    padding: 10,
    marginBottom: 5,
  },
  containerInput: {
    alignItems: "center",
    flexDirection: "row",
    width: "80%",
  },
  input: {
    height: 50,
    fontSize: 14,
    width: "100%",
    fontFamily: theme.fontFamily.raleway.medium,
  },
  containerImagem: {
    width: 30,
    height: 30,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(184, 184, 184, 0.1)",
    marginRight: 5,
  },
  button: {
    backgroundColor: theme.colors.orangePrimaryDark,
    height: 45,
    width: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  imagem: {
    width: 30,
    height: 30,
    borderRadius: 9999,
  },
});
