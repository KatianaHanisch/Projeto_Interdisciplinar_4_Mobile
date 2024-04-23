import { View, Text, TouchableOpacity, Image } from "react-native";

import { styles } from "./styles";
import { IconVerMais } from "@/assets/icons/icon-ver-mais";

export const Comentario = ({
  id,
  nome_usuario,
  description,
  publicacao,
  imagem,
  onPress,
  quantidadeDeRespostas,
  handleButtonRespostas,
  abrirRespontas,
}: ComentarioProps) => {
  return (
    <View style={styles.container}>
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
            <Text style={styles.textoVerMais}>
              Ver mais {quantidadeDeRespostas} respostas
            </Text>
            <View style={styles.containerIconeVerMais}>
              <IconVerMais />
            </View>
          </TouchableOpacity>
        )}
      </View>
      {abrirRespontas && (
        <>
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
          </View>
        </>
      )}
    </View>
  );
};
