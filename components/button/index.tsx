import { TouchableOpacity, Text } from "react-native";

import { styles } from "./styles";

export function Button({ titulo, handleNavigation }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={handleNavigation}>
      <Text style={styles.textButton}>{titulo}</Text>
    </TouchableOpacity>
  );
}
