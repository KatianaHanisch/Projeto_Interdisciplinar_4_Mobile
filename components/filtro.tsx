import { IconCachorro } from "@/assets/icons/icon-cachorro";
import { IconCachorroFiltroSelecionado } from "@/assets/icons/icon-cachorro-filtro-selecionado";
import { IconGato } from "@/assets/icons/icon-gato";
import { IconGatoFiltroSelecionado } from "@/assets/icons/icon-gato-filtro-selecionado";
import { theme } from "@/constants";
import { TouchableOpacity, View, StyleSheet } from "react-native";

interface FiltroProps {
  filtroSelecionado: string;
  handleSelecionarFiltro: (value: string) => void;
}

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

const styles = StyleSheet.create({
  containerFiltros: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },
  itemFiltro: {
    width: 60,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.white,
    borderRadius: 10,
  },
  itemFiltroSelecionado: {
    backgroundColor: theme.colors.orangePrimaryDark,
  },
});
