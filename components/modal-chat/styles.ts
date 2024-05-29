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
});
