import { StyleSheet } from "react-native";

import { theme } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 90,
    backgroundColor: theme.colors.white,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  containerPerfilUsuario: {
    backgroundColor: theme.colors.orangeLight,
  },
  containerIcones: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 15,
  },
  containerIcone: {
    width: 55,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(184, 184, 184, 0.1)",
    borderRadius: 100,
  },
  paginaSelecionada: {
    backgroundColor: theme.colors.orangePrimaryDark,
  },
  containerIconeClose: {
    width: 55,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  containerMensagens: {
    backgroundColor: theme.colors.orangePrimaryDark,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    position: "absolute",
    bottom: -2,
    right: -2,
  },
  containerMensagensSelecionado: {
    backgroundColor: "#EBEBEB",
  },
  quantidadeMensagens: {
    fontSize: 12,
    color: theme.colors.grayDark,
    fontFamily: theme.fontFamily.raleway.semiBold,
    textAlign: "center",
    marginTop: -7,
  },
});
