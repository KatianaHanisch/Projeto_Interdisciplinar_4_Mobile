import { View, Text, Image, TouchableOpacity } from "react-native";

import { styles } from "./styles";

export function CardConversa({
  id,
  nome,
  imagem,
  mensagem,
  onPress,
}: CardConversaProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(id)}>
      <View style={styles.containerImage}>
        <Image
          source={require("../../assets/images/user-conversas-image.png")}
        />
      </View>
      <View style={styles.containerTextos}>
        <View style={styles.containerMensagem}>
          <Text style={styles.nomeContato}>{nome}</Text>
          <Text style={styles.mensagem}>{mensagem}</Text>
        </View>
        <View style={styles.containerQuantidadeMensagens}>
          <Text style={styles.quantidadeMensagens}>1</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
