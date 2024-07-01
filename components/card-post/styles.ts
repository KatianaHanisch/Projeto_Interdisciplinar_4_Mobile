import { Dimensions, StyleSheet } from "react-native";

import { theme } from "@/constants";
const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
  },
  containerPost: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    height: 135,
    marginBottom: 12,
    borderRadius: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 2,
    shadowOffset: { width: 8, height: 10 },
  },
  containerImage: {
    width: 125,
    height: 135,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  containerTextos: {
    width: width - 168,
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 15,
    paddingLeft: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: theme.colors.white,
    // marginLeft: -10,
    zIndex: -1,
  },
  containerTitulo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingRight: 5,
  },
  tituloNome: {
    fontSize: 20,
    fontFamily: theme.fontFamily.montserrat.semiBold,
    color: theme.colors.grayMedium,
  },
  textoIdade: {
    fontSize: 14,
    fontFamily: theme.fontFamily.raleway.regular,
    color: theme.colors.grayMedium,
  },
  containerLocalidade: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 3,
    marginTop: 5,
  },
  textoCidade: {
    fontFamily: theme.fontFamily.raleway.light,
    color: theme.colors.grayMedium,
    fontSize: 12,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: theme.colors.redPrimary,
    paddingHorizontal: 20,
    height: 35,
    marginTop: 7,
  },
  buttonText: {
    color: theme.colors.white,
    fontFamily: theme.fontFamily.raleway.bold,
    fontSize: 12,
  },
});
