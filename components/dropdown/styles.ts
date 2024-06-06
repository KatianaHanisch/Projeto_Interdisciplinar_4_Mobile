import { theme } from "@/constants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: "100%",
    height: 45,
    backgroundColor: theme.colors.orangeLight,
    borderRadius: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: theme.fontFamily.raleway.regular,
    fontSize: 16,
    color: theme.colors.grayMedium,
    borderWidth: 0.4,
    borderColor: "#c4c4c4",
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 16,
    fontFamily: theme.fontFamily.raleway.regular,
    color: theme.colors.grayMedium,
  },
  dropdownButtonArrowStyle: {
    fontSize: 24,
    color: "#606060",
  },

  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 16,
    fontFamily: theme.fontFamily.raleway.semiBold,
    color: theme.colors.grayMedium,
  },
});
