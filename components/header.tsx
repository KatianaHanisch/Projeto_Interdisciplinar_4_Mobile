import { View, StyleSheet, TouchableOpacity } from "react-native";

import { theme } from "@/constants";
import { IconChat } from "@/assets/icons/icon-chat";
import { IconCriarPost } from "@/assets/icons/icon-criar-post";
import { IconUser } from "@/assets/icons/icon-user";

export function Header() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.containerIcone}>
        <IconChat />
      </TouchableOpacity>
      <TouchableOpacity style={styles.containerIcone}>
        <IconCriarPost />
      </TouchableOpacity>
      <TouchableOpacity style={styles.containerIcone}>
        <IconUser />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    backgroundColor: theme.colors.white,
    flexDirection: "row",
    alignItems: "flex-end",

    justifyContent: "flex-end",
    gap: 15,
    padding: 15,
  },
  containerIcone: {
    width: 55,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(184, 184, 184, 0.1)",
    borderRadius: 100,
  },
});
