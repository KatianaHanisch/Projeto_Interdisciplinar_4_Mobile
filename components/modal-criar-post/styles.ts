import { theme } from "@/constants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: theme.colors.orangeLight,
  },
  containerWhite: {
    backgroundColor: theme.colors.white,
    width: "90%",
    alignItems: "center",
    borderRadius: 30,
    paddingVertical: 50,
    marginTop: 90,
  },
  titulo: {
    fontSize: 22,
    fontFamily: theme.fontFamily.montserrat.bold,
    color: theme.colors.grayDark,
    marginBottom: 20,
  },
  containerForm: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  containerButtons: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonVoltar: {
    height: 40,
    paddingHorizontal: 25,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 30,
    backgroundColor: theme.colors.orangeLight,
    borderWidth: 1,
    borderColor: theme.colors.orangePrimaryDark,
  },
  iconButtonVoltar: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingVertical: 10,
  },
  iconButtonAvancar: {},
  textoButtonVoltar: {
    fontSize: 16,
    fontFamily: theme.fontFamily.raleway.bold,
    color: theme.colors.orangePrimaryDark,
  },
  buttonAvancar: {
    height: 40,
    paddingHorizontal: 25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    flexDirection: "row",
    backgroundColor: theme.colors.orangePrimaryDark,
  },
  textoButtonAvancar: {
    fontSize: 16,
    fontFamily: theme.fontFamily.raleway.bold,
    color: theme.colors.white,
  },
});
