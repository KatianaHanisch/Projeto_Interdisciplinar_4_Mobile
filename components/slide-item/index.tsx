import React, { memo } from "react";

import { Image, View } from "react-native";

import { styles } from "./styles";
import { api_url } from "@/services/api";

export const SlideItem = memo(({ item }: SlideItemProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `${api_url}/uploads/posts/${item?.url}` }}
        style={styles.image}
      />
    </View>
  );
});
