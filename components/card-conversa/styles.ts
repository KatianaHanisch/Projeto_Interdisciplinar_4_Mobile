import { theme } from "@/constants";

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    backgroundColor: theme.colors.orangeLight,
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 15,
  },
  status: {
    fontSize: 12,
    fontFamily: theme.fontFamily.montserrat.semiBold,
    color: theme.colors.redPrimary,
  },
  containerImage: {
    width: 50,
    height: 50,
    borderRadius: 99999,
  },
  imagem: {
    width: 50,
    height: 50,
    borderRadius: 99999,
  },
  containerTextos: {
    width: "77%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  containerMensagem: {
    maxWidth: 220,
  },
  nomeContato: {
    fontSize: 18,
    fontFamily: theme.fontFamily.montserrat.semiBold,
    color: theme.colors.grayDark,
  },
  mensagem: {
    fontSize: 14,
    fontFamily: theme.fontFamily.raleway.regular,
    color: theme.colors.grayMedium,
  },
  containerQuantidadeMensagens: {
    width: 30,
    height: 35,
    backgroundColor: theme.colors.orangePrimaryDark,
    alignItems: "center",
    justifyContent: "center",
    marginRight: -15,
    borderRadius: 10,
  },
  quantidadeMensagens: {
    fontSize: 16,
    fontFamily: theme.fontFamily.montserrat.semiBold,
    color: theme.colors.white,
  },
  containerIconLixeira: {
    position: "absolute",
    right: 20,
  },
  containerIconBlock: {
    position: "absolute",
    right: 60,
  },
  textoHeader: {
    fontSize: 22,
    fontFamily: theme.fontFamily.montserrat.semiBold,
    color: theme.colors.grayDark,
  },
  containerDados: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
    gap: 20,
  },
  containerInformaçoes: {
    width: "100%",
  },

  containerInformacoes: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  containerImagemCarregada: {
    width: "100%",
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    backgroundColor: theme.colors.orangeLight,
  },
  imagemCarregada: {
    flexDirection: "row",
  },
  buttonClose: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  containerButton: {
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  containerModal: {
    width: "90%",
    backgroundColor: theme.colors.white,
    padding: 20,
    borderRadius: 20,
  },
  containerHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container2: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 5,
  },
});
