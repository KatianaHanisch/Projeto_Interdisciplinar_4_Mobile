import { theme } from "@/constants";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface ButtonProps {
  titulo: string;
  handleNavigation?: () => void;
}

export function Button({ titulo, handleNavigation }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={handleNavigation}>
      <Text style={styles.textButton}>{titulo}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.orangePrimaryDark,
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  textButton: {
    color: theme.colors.white,
    fontFamily: theme.fontFamily.montserrat.semiBold,
    fontSize: 16,
  },
});
