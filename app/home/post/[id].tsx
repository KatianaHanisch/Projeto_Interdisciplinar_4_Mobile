import { useLocalSearchParams } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export function Post() {
  const { id } = useLocalSearchParams();

  console.log(id);

  return <Text>Post do blog: </Text>;
}
