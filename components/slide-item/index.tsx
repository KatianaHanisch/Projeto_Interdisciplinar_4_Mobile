import React, { memo } from "react";

import { Image, View } from "react-native";

import { styles } from "./styles";

export const SlideItem = memo(({ item }: SlideItemProps) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.url }} style={styles.image} />
    </View>
  );
});
