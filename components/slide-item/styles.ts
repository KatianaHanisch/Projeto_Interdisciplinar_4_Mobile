import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("screen");

export const styles = StyleSheet.create({
  container: {
    width: width,
    flex: 1,
  },
  image: {
    flex: 1,
  },
});
