import { useLocalSearchParams, useRouter } from "expo-router";

import { useEffect, useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import BottomSheet from "@gorhom/bottom-sheet";

import { IconLocalidade } from "@/assets/icons/icon-localidade";

import { styles } from "./styles";
import { ComentariosTodos } from "@/components/comentarios-todos";
import { Comentario } from "@/components/comentario";

import { data } from "../../data.json";
import { FlatList } from "react-native-gesture-handler";
import { IconVoltar } from "@/assets/icons/icon-voltar";

export default function ModalDetalhesAnimal() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const router = useRouter();
  const [dadosPost, setDadosPost] = useState<PostDetalhesProps>();

  const { id } = useLocalSearchParams();

  useEffect(() => {
    const filtered = data.find((item) => item.id === id);
    if (filtered) {
      setDadosPost(filtered);
    }
  }, [id]);

  const inputResponderRef = useRef<TextInput | null>(null);

  const handleButtonSheetOpen = () => bottomSheetRef.current?.expand();
  const handleButtonSheetClose = () => bottomSheetRef.current?.snapToIndex(0);

  const handleButtonResponder = () => {
    bottomSheetRef.current?.expand();

    if (inputResponderRef.current) {
      inputResponderRef.current.focus();
    }
  };

  const handleButtonBack = () => {
    router.back();
  };

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={styles.containerImagem}>
          <Image
            source={{
              uri: dadosPost?.imagem,
            }}
            style={styles.image}
          />
          <TouchableOpacity
            style={styles.buttonVoltar}
            onPress={handleButtonBack}
          >
            <IconVoltar />
          </TouchableOpacity>
        </View>
        <View style={styles.containerItens}>
          <View style={styles.containerPublicacao}>
            <Text style={styles.dataPublicacao}>18/04/2024</Text>
            <Text style={styles.informacoesPublicacao}>
              publicado por {dadosPost?.responsavelPublicacao}
            </Text>
          </View>
          <View style={styles.containerInformacoes}>
            <View style={styles.containerTextos}>
              <Text style={styles.textoNome}>{dadosPost?.nome}</Text>
              <Text style={styles.descricao}>{dadosPost?.descricao}</Text>
              <View style={styles.containerLocalidade}>
                <IconLocalidade />
                <Text style={styles.localidade}>
                  {dadosPost?.cidade} - {dadosPost?.uf}
                </Text>
              </View>
            </View>
            <View style={styles.containerIdadeGenero}>
              <View style={styles.containerIdade}>
                <Text style={styles.idade}>{dadosPost?.idade} anos</Text>
              </View>
              <View style={styles.containerGenero}>
                <Text style={styles.genero}>
                  {dadosPost?.genero === "masculino" ? "Macho" : "Fêmea"}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.containerComentarios}>
            <Text style={styles.tituloComentarios}>Comentários</Text>
            <FlatList
              style={styles.listaComentarios}
              renderItem={({ item }) => (
                <Comentario {...item} onPress={handleButtonSheetOpen} />
              )}
              data={data}
            />
            <TouchableOpacity onPress={handleButtonSheetOpen}>
              <Text style={styles.buttonComentarios}>
                Ver todos os comentários
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ComentariosTodos
          ref={bottomSheetRef}
          onClose={handleButtonSheetClose}
          inputRef={inputResponderRef}
          onPress={handleButtonResponder}
          data={data}
        />
      </View>
    </>
  );
}
