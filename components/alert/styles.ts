import { theme } from "@/constants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 10,
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  alertSucesso: {
    backgroundColor: theme.colors.greenPrimary,
  },
  alertAlerta: {
    backgroundColor: theme.colors.yellowPrimary,
  },
  alertErro: {
    backgroundColor: theme.colors.redPrimary,
  },
  mensagem: {
    fontSize: 16,
    fontFamily: theme.fontFamily.raleway.semiBold,
    color: theme.colors.white,
    paddingHorizontal: 5,
  },
});
