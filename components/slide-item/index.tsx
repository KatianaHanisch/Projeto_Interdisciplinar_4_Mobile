import React from "react";

import { Image, View, Text } from "react-native";

import { styles } from "./styles";

export function SlideItem({ item }: SlideItemProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.url }} style={styles.image} />
    </View>
  );
}
