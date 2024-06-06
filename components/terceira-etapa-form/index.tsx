import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "./styles";

export function TerceiraEtapaForm({
  handleSelecionaImagem,
  handleRemoverImagem,
  imagens,
}: TerceiraEtapaProps) {
  console.log(imagens);
  return (
    <View style={styles.containerUploadImagem}>
      {imagens!.length > 0 ? (
        imagens!.map((imagem, index) => (
          <View key={index} style={styles.containerImagem}>
            <View style={styles.imagemContainer}>
              <Image source={{ uri: imagem.uri }} style={styles.imagem} />
              <Text style={styles.textoImagem}>{imagem.nome}</Text>
            </View>
            <TouchableOpacity onPress={() => handleRemoverImagem(index)}>
              <Ionicons name="close" size={24} color="#333333" />
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <>
          <TouchableOpacity
            style={styles.buttonUpload}
            onPress={handleSelecionaImagem}
          >
            <Text style={styles.textoButtonUpload}>Adicione uma imagem</Text>
            <MaterialIcons
              name="add-photo-alternate"
              size={26}
              color="#555555"
            />
          </TouchableOpacity>
          <Text style={styles.mensagem}>
            *Este campo é opcional (limite de 4 imagens)
          </Text>
        </>
      )}
    </View>
  );
}
