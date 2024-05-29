import { theme } from "@/constants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  containerVoltar: {
    zIndex: 5,
    left: 20,
    top: 40,
    position: "absolute",
  },
  headerTitulo: {
    fontSize: 24,
    fontFamily: theme.fontFamily.montserrat.semiBold,
    color: theme.colors.grayMedium,
    marginTop: 20,
  },
});
