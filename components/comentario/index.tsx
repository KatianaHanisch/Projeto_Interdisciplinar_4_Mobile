import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";

import { IconVerMais } from "@/assets/icons/icon-ver-mais";

import { RespostaComentario } from "../resposta-comentario";

import { styles } from "./styles";

export const Comentario = ({
  comentariosDoPost,
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
                {comentariosDoPost?.nome_usuario}
              </Text>
              <Text style={styles.informacoesComentario}>
                {comentariosDoPost?.publicacao}
              </Text>
            </View>
            <Text style={styles.textoComentario}>
              {comentariosDoPost?.description}
            </Text>
            <TouchableOpacity style={styles.buttonResponder} onPress={onPress}>
              <Text style={styles.textoResponder}>Responder</Text>
            </TouchableOpacity>
            {comentariosDoPost?.quantidadeDeRespostas! > 0 && (
              <TouchableOpacity
                style={styles.buttonVerMais}
                onPress={handleButtonRespostas}
              >
                {abrirRespontas ? (
                  <Text style={styles.textoVerMais}>Ver menos</Text>
                ) : (
                  <Text style={styles.textoVerMais}>
                    Ver mais {comentariosDoPost?.quantidadeDeRespostas}{" "}
                    respostas
                  </Text>
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
              data={comentariosDoPost?.comentarios}
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
