import React from "react";
import { View, Text } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

import { Feather } from "@expo/vector-icons";
import { styles } from "./styles";

export function DropDown<T>({
  data,
  value,
  name,
  textoDropdown,
  handleInputChange,
  renderItem,
  renderButtonLabel,
  getValue,
}: DropdownProps<T>) {
  return (
    <>
      <SelectDropdown
        data={data}
        defaultValue={data.find((item) => getValue(item) === value)}
        onSelect={(selectedItem: T) => {
          handleInputChange(name, getValue(selectedItem));
        }}
        renderButton={(selectedItem: T, isOpened: boolean) => {
          return (
            <View style={styles.dropdownButtonStyle}>
              <Text style={styles.dropdownButtonTxtStyle}>
                {selectedItem ? renderButtonLabel(selectedItem) : textoDropdown}
              </Text>
              <Feather
                name={isOpened ? "chevron-up" : "chevron-down"}
                style={styles.dropdownButtonArrowStyle}
              />
            </View>
          );
        }}
        renderItem={(item: T, index: number, isSelected: boolean) => {
          return (
            <View
              style={{
                ...styles.dropdownItemStyle,
                ...(isSelected && { backgroundColor: "#D2D9DF" }),
              }}
            >
              {renderItem(item, isSelected)}
            </View>
          );
        }}
        statusBarTranslucent={true}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      />
    </>
  );
}
