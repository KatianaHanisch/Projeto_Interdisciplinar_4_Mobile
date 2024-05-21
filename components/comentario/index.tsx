import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";

import { IconVerMais } from "@/assets/icons/icon-ver-mais";

import { RespostaComentario } from "../resposta-comentario";

import { styles } from "./styles";
import { formatarData } from "@/utils/formatarData";

export const Comentario = ({
  id,
  description,
  created_at,
  user,
  sub_comments,
  onPress,
}: ExibirComentariosProps) => {
  const [abrirRespontas, setAbrirRespostas] = useState<boolean>(false);

  const handleButtonRespostas = () => {
    setAbrirRespostas(!abrirRespontas);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerComentarioItem}>
        <View style={styles.containerInterno}>
          <View style={styles.containerImagem}>
            <Image
              source={require("../../assets/images/icon-user-comentar.png")}
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
            <TouchableOpacity style={styles.buttonResponder} onPress={onPress}>
              <Text style={styles.textoResponder}>Responder</Text>
            </TouchableOpacity>
            {sub_comments.length > 0 && (
              <TouchableOpacity
                style={styles.buttonVerMais}
                onPress={handleButtonRespostas}
              >
                {abrirRespontas ? (
                  <Text style={styles.textoVerMais}>Ver menos</Text>
                ) : (
                  <Text style={styles.textoVerMais}>Ver mais 4 respostas</Text>
                )}

                <View style={styles.containerIconeVerMais}>
                  <IconVerMais />
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
        {abrirRespontas && (
          <View style={styles.containerLista}>
            <FlatList
              data={sub_comments}
              renderItem={({ item }) => (
                <RespostaComentario {...item} onPress={onPress} />
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        )}
      </View>
    </View>
  );
};
