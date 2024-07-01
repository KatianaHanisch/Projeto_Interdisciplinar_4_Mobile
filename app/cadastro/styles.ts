import { StyleSheet } from "react-native";
import { theme } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  containerLogin: {
    height: "60%",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    gap: 15,
  },
  containerLoginTecladoVisivel: {
    height: "90%",
    alignItems: "center",
    justifyContent: "flex-start",
    zIndex: 99,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#E3E5E5",
    borderRadius: 10,
    paddingLeft: 10,
    color: theme.colors.grayMedium,
    fontFamily: theme.fontFamily.montserrat.regular,
    fontSize: 16,
  },
  containerButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  textoCadastro: {
    fontSize: 15,
    fontFamily: theme.fontFamily.raleway.regular,
    color: theme.colors.grayMedium,
    marginTop: 10,
  },
  textoCadastroSublinhado: {
    fontSize: 15,
    fontFamily: theme.fontFamily.raleway.semiBold,
    color: theme.colors.grayMedium,
    textDecorationLine: "underline",
    marginTop: 5,
  },
  imagem: {
    position: "absolute",
    top: 0,
    zIndex: -99,
    marginBottom: 100,
  },
});
