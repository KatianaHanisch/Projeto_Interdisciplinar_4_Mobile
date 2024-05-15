import { StyleSheet } from "react-native";
import { theme } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 30,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 3,
    backgroundColor: "#f5f5f5",
  },
  dotActive: {
    backgroundColor: theme.colors.orangePrimaryDark,
  },
});
