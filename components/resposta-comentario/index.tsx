import React from "react";

import { View, Text, Image, TouchableOpacity } from "react-native";

import { styles } from "./styles";

export function RespostaComentario({
  id,
  description,
  user,
  created_at,
  onPress,
}: RespostaComentarioProps) {
  return (
    <View style={styles.containerRespontasComentarios}>
      <View style={styles.containerImagem}>
        <Image
          source={require("../../assets/images/icon-user-comentar.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.containerComentario}>
        <View style={styles.containerHeaderComentario}>
          <Text style={styles.informacoesComentario}>{user.username}</Text>
          <Text style={styles.informacoesComentario}>{created_at}</Text>
        </View>
        <Text style={styles.textoComentario}>{description}</Text>
        <TouchableOpacity style={styles.buttonResponder} onPress={onPress}>
          <Text style={styles.textoResponder}>Responder</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
