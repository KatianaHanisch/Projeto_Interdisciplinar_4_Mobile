import { View, Text, Image, TouchableOpacity } from "react-native";

import { IconLocalidade } from "@/assets/icons/icon-localidade";
import { IconGeneroMasculino } from "@/assets/icons/icon-genero-masculino";
import { IconGeneroFeminino } from "@/assets/icons/icon-genero-feminino";

import { styles } from "./styles";

export function CardPost({
  nome,
  idade,
  cidade,
  uf,
  genero,
  imagem,
  onPress,
}: CardPostProps) {
  return (
    <TouchableOpacity style={styles.containerPost} onPress={onPress}>
      <View style={styles.containerImage}>
        <Image source={{ uri: imagem }} style={styles.image} />
      </View>
      <View style={styles.containerTextos}>
        <View style={styles.containerTitulo}>
          <Text style={styles.tituloNome}>{nome}</Text>
          {genero === "masculino" ? (
            <IconGeneroMasculino />
          ) : (
            <IconGeneroFeminino />
          )}
        </View>
        <Text style={styles.textoIdade}>{idade} anos</Text>
        <View style={styles.containerLocalidade}>
          <IconLocalidade />
          <Text style={styles.textoCidade}>{`${cidade} - ${uf}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
