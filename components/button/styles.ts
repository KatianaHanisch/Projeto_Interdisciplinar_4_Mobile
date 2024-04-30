import { StyleSheet } from "react-native";
import { theme } from "@/constants";

export const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.orangePrimaryDark,
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  textButton: {
    color: theme.colors.white,
    fontFamily: theme.fontFamily.montserrat.semiBold,
    fontSize: 16,
  },
});
