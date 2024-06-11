import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { AntDesign } from "@expo/vector-icons";

import { Button } from "../button";
import { DropDown } from "../dropdown";

import { theme } from "@/constants";
import { styles } from "./styles";

export function ModalFiltro({
  handleDropdownChange,
  handleCloseFiltro,
  estados,
  formData,
  carregando,
  fetcherPostsPorRegiao,
}: ModalFiltroProps) {
  return (
    <View style={styles.container} key={"modal-filtro"}>
      <View style={styles.containerFiltro}>
        <View style={styles.containerFecharModal}>
          <TouchableOpacity onPress={handleCloseFiltro}>
            <AntDesign name="close" size={24} color={theme.colors.grayMedium} />
          </TouchableOpacity>
        </View>
        <View style={styles.containerInterno}>
          <View style={styles.containerSelectRegiao}>
            <Text style={styles.textoSelectRegiao}>Filtrar por região</Text>
            <DropDown
              data={estados}
              name="uf"
              textoDropdown="Filtre por estado"
              handleInputChange={handleDropdownChange}
              renderItem={(item, isSelected) => (
                <Text style={styles.dropdownItemTxtStyle}>{item.nome}</Text>
              )}
              renderButtonLabel={(item) => item.nome}
              getValue={(item) => item.sigla}
              value={formData.uf}
            />
          </View>
          <Button
            titulo="Filtrar posts"
            onPress={() => fetcherPostsPorRegiao(formData.uf)}
            carregando={carregando}
          />
        </View>
      </View>
    </View>
  );
}
