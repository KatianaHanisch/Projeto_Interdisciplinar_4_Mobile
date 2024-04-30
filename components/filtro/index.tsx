import { TouchableOpacity, View } from "react-native";

import { IconCachorro } from "@/assets/icons/icon-cachorro";
import { IconCachorroFiltroSelecionado } from "@/assets/icons/icon-cachorro-filtro-selecionado";
import { IconGato } from "@/assets/icons/icon-gato";
import { IconGatoFiltroSelecionado } from "@/assets/icons/icon-gato-filtro-selecionado";

import { styles } from "./styles";

export function Filtro({
  filtroSelecionado,
  handleSelecionarFiltro,
}: FiltroProps) {
  return (
    <View style={styles.containerFiltros}>
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
  );
}
