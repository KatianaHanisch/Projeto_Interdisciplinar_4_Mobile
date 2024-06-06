import { StyleSheet } from "react-native";

import { theme } from "@/constants";

export const styles = StyleSheet.create({
  containerInput: {
    width: "90%",
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
  },
  input: {
    width: "100%",
    height: 45,
    backgroundColor: theme.colors.orangeLight,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontFamily: theme.fontFamily.raleway.regular,
    fontSize: 16,
    color: theme.colors.grayMedium,
    borderWidth: 0.4,
    borderColor: "#c4c4c4",
  },
  inputMensagem: {
    color: "#868686",
    fontFamily: theme.fontFamily.raleway.light,
    fontSize: 14,
  },
  dropdownItemTxtStyle: {
    color: theme.colors.grayMedium,
  },
});
