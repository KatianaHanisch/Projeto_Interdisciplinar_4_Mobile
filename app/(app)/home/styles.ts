import { StyleSheet } from "react-native";

import { theme } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  containerItens: {
    backgroundColor: theme.colors.orangeLight,
    width: "100%",
    flex: 1,
    alignItems: "center",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
    paddingTop: 20,
    marginTop: 12,
  },
  containerInput: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: theme.colors.white,
    borderRadius: 10,
    paddingLeft: 15,
    padding: 5,
  },
  input: {
    width: "100%",
    height: 50,
    fontSize: 16,
    fontFamily: theme.fontFamily.raleway.regular,
    color: theme.colors.grayMedium,
    marginLeft: 8,
  },
  containerLista: {
    width: "100%",
    height: 510,
    alignItems: "center",
    marginTop: 15,
  },
});
