import { theme } from "@/constants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  containerLogin: {
    height: "50%",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    gap: 15,
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
    fontSize: 20,
    fontFamily: theme.fontFamily.raleway.regular,
    color: theme.colors.grayMedium,
    marginTop: 10,
    marginBottom: 5,
  },
  textoCadastroSublinhado: {
    fontSize: 15,
    fontFamily: theme.fontFamily.raleway.semiBold,
    color: theme.colors.grayMedium,
    textDecorationLine: "underline",
  },
  imagem: {
    position: "absolute",
    top: 0,
    zIndex: -99,
    marginBottom: 100,
  },
});
