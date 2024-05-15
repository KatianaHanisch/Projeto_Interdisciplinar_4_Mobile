import React from "react";

import { Animated, View, Dimensions } from "react-native";

import { styles } from "./styles";

const { width } = Dimensions.get("screen");

export function Pagination({ data, scrollX, index }: PaginationProps) {
  return (
    <View style={styles.container}>
      {data.map((_, idx) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [12, 30, 12],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.2, 1, 0.1],
          extrapolate: "clamp",
        });

        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: ["#f5f5f5", "#F99C64", "#f5f5f5"],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={idx.toString()}
            style={[
              styles.dot,
              { width: dotWidth, backgroundColor },
              // idx === index && styles.dotActive,
            ]}
          />
        );
      })}
    </View>
  );
}
