import React from "react";

import { View, Text, Image, TouchableOpacity } from "react-native";

import { styles } from "./styles";

export function CardConversa({
  id,
  chatId,
  senderId,
  recipientId,
  status,
  onPress,
}: CardConversaProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(recipientId)}
    >
      <View style={styles.containerImage}>
        <Image
          source={require("../../assets/images/user-conversas-image.png")}
        />
      </View>
      <View style={styles.containerTextos}>
        <View style={styles.containerMensagem}>
          <Text style={styles.nomeContato}>Nome aqui</Text>
          {/* <Text style={styles.mensagem}>{mensagem}</Text> */}
        </View>
        <View style={styles.containerQuantidadeMensagens}>
          <Text style={styles.quantidadeMensagens}>1</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
