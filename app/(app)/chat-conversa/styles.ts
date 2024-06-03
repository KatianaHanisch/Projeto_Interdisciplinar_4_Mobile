import { theme } from "@/constants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: theme.colors.orangePrimaryDark,
  },
  containerVoltar: {
    zIndex: 5,
    left: 20,
    top: 40,
    position: "absolute",
  },
  containerHeader: {
    height: 130,
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  textoHeader: {
    fontSize: 20,
    fontFamily: theme.fontFamily.montserrat.semiBold,
    color: theme.colors.grayDark,
    marginTop: 5,
  },
  containerMensagens: {
    width: "100%",
    flexDirection: "column",
    backgroundColor: theme.colors.white,
    height: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  containerData: {
    flexDirection: "row",
    width: "100%",
    // height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  dataMensagens: {
    borderRadius: 20,
    fontSize: 12,
    fontFamily: theme.fontFamily.raleway.light,
    color: theme.colors.grayMedium,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.orangeLight,
  },
  containerMensagemRecebida: {
    flexDirection: "column",
    alignItems: "flex-start",
    // marginBottom: 10,
    width: "100%",
    padding: 10,
  },
  containerMensagemRecebidaBox: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 5,
    width: "80%",
    backgroundColor: theme.colors.orangeLight,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    padding: 15,
  },
  mensagem: {
    fontFamily: theme.fontFamily.raleway.regular,
    fontSize: 16,
    color: theme.colors.grayDark,
  },
  containerMensagemEnviada: {
    flexDirection: "column",
    alignItems: "flex-end",
    width: "100%",
    // marginBottom: 10,
    padding: 10,
  },
  containerMensagemEnviadaBox: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: 5,
    width: "80%",
    backgroundColor: theme.colors.orangeSecundary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    padding: 15,
  },
  horarioMensagem: {
    fontFamily: theme.fontFamily.raleway.regular,
    fontSize: 12,
    color: theme.colors.grayMedium,
  },
  containerInput: {
    backgroundColor: theme.colors.white,
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 10,
    // paddingBottom: 20,
  },
  input: {
    width: "80%",
    height: 50,
    borderRadius: 10,
    backgroundColor: theme.colors.orangeLight,
    padding: 10,
    fontSize: 16,
    fontFamily: theme.fontFamily.raleway.regular,
    color: theme.colors.grayMedium,
    marginLeft: 8,
  },
  button: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 50,
    backgroundColor: theme.colors.orangePrimaryDark,
    marginRight: 5,
  },
  iconLixeira: {
    position: "absolute",
    right: 10,
  },
});
