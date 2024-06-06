import React from "react";

import { View, Text, Image } from "react-native";

import { styles } from "./styles";
import { formatarData } from "@/utils/formatarData";
import { api_url } from "@/services/api";

export function RespostaComentario({
  id,
  description,
  user,
  created_at,
}: RespostaComentarioProps) {
  return (
    <View style={styles.containerRespontasComentarios}>
      <View style={styles.containerImagem}>
        <Image
          source={
            user.imageUrl && user.imageUrl !== "null"
              ? { uri: `${api_url}/uploads/users/${user.imageUrl}` }
              : require("../../assets/images/user-conversas-image.png")
          }
          style={styles.image}
        />
      </View>
      <View style={styles.containerComentario}>
        <View style={styles.containerHeaderComentario}>
          <Text style={styles.informacoesComentario}>
            {user.name.toLowerCase()}
          </Text>
          <Text style={styles.informacoesComentario}>
            {formatarData(created_at)}
          </Text>
        </View>
        <Text style={styles.textoComentario}>{description}</Text>
      </View>
    </View>
  );
}
