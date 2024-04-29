import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";

import { styles } from "./styles";
import { IconVerMais } from "@/assets/icons/icon-ver-mais";
import { RespostaComentario } from "../resposta-comentario";

export const Comentario = ({
  id,
  nome_usuario,
  description,
  publicacao,
  imagem,
  onPress,
  quantidadeDeRespostas,
  comentarios,
}: ExibirComentariosProps) => {
  const [abrirRespontas, setAbrirRespostas] = useState<boolean>(false);

  const handleButtonRespostas = () => {
    setAbrirRespostas(!abrirRespontas);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerComentarioItem}>
        <View style={styles.containerImagem}>
          <Image
            source={require("../../assets/images/icon-user-comentar.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.containerComentario}>
          <View style={styles.containerHeaderComentario}>
            <Text style={styles.informacoesComentario}>{nome_usuario}</Text>
            <Text style={styles.informacoesComentario}>{publicacao}</Text>
          </View>
          <Text style={styles.textoComentario}>{description}</Text>
          <TouchableOpacity style={styles.buttonResponder} onPress={onPress}>
            <Text style={styles.textoResponder}>Responder</Text>
          </TouchableOpacity>
          {quantidadeDeRespostas > 0 && (
            <TouchableOpacity
              style={styles.buttonVerMais}
              onPress={handleButtonRespostas}
            >
              {abrirRespontas ? (
                <Text style={styles.textoVerMais}>Ver menos</Text>
              ) : (
                <Text style={styles.textoVerMais}>
                  Ver mais {quantidadeDeRespostas} respostas
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
            data={comentarios}
            renderItem={({ item }) => (
              <RespostaComentario {...item} onPress={onPress} />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </View>
  );
};
