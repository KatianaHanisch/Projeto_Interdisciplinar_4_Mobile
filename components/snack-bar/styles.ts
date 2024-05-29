import { theme } from "@/constants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    position: "absolute",
    top: 35,
    zIndex: 99,
  },
  containerInterno: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    height: 45,
    width: "90%",
    borderRadius: 10,
  },
  snackBarSucesso: {
    backgroundColor: theme.colors.greenPrimary,
  },
  snackBarErro: {
    backgroundColor: theme.colors.redPrimary,
  },
  textoSnackBar: {
    fontSize: 16,
    color: theme.colors.white,
    fontFamily: theme.fontFamily.raleway.semiBold,
    marginLeft: 5,
  },
});
