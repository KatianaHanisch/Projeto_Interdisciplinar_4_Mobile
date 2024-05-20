import { theme } from "@/constants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: theme.colors.orangeLight,
    paddingVertical: 10,
  },
  containerHeader: {
    width: "100%",
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  nomeHeader: {
    fontSize: 25,
    fontFamily: theme.fontFamily.montserrat.semiBold,
    color: theme.colors.grayDark,
    marginTop: 5,
  },
  containerButtons: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "100%",
    height: 60,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    paddingHorizontal: 15,
    backgroundColor: theme.colors.white,
  },
  textButton: {
    fontSize: 17,
    fontFamily: theme.fontFamily.montserrat.medium,
    color: theme.colors.grayMedium,
  },
});