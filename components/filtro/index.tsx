import React from "react";

import { TouchableOpacity, View, Text } from "react-native";

import { IconCachorro } from "@/assets/icons/icon-cachorro";
import { IconCachorroFiltroSelecionado } from "@/assets/icons/icon-cachorro-filtro-selecionado";
import { IconGato } from "@/assets/icons/icon-gato";
import { IconGatoFiltroSelecionado } from "@/assets/icons/icon-gato-filtro-selecionado";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "./styles";
import { theme } from "@/constants";

export function Filtro({
  filtroSelecionado,
  handleSelecionarFiltro,
  handleAbrirFiltro,
}: FiltroProps) {
  return (
    <View style={styles.containerFiltros}>
      <View style={styles.containerButtons}>
        <TouchableOpacity
          style={[
            styles.itemFiltro,
            filtroSelecionado === "gato" && styles.itemFiltroSelecionado,
          ]}
          onPress={() => handleSelecionarFiltro("gato")}
        >
          {filtroSelecionado === "gato" ? (
            <IconGatoFiltroSelecionado />
          ) : (
            <IconGato />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.itemFiltro,
            filtroSelecionado === "cachorro" && styles.itemFiltroSelecionado,
          ]}
          onPress={() => handleSelecionarFiltro("cachorro")}
        >
          {filtroSelecionado === "cachorro" ? (
            <IconCachorroFiltroSelecionado />
          ) : (
            <IconCachorro />
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.containerIcon}
        onPress={handleAbrirFiltro}
      >
        <Ionicons name="filter" size={25} color={theme.colors.grayMedium} />
      </TouchableOpacity>
    </View>
  );
}
