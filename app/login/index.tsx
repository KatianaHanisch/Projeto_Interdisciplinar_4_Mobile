import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function login() {
  return (
    <View>
      <Text>test</Text>
      <Link href={"/home/"}>Ir para a Home</Link>
    </View>
  );
}
