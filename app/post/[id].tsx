import React from "react";

import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import BottomSheet from "@gorhom/bottom-sheet";

import { useEffect, useRef, useState } from "react";
import {
  Animated,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  FlatList,
} from "react-native";

import { ComentariosTodos } from "@/components/comentarios-todos";
import { Comentario } from "@/components/comentario";
import { SlideItem } from "@/components/slide-item";

import { IconVoltar } from "@/assets/icons/icon-voltar";
import { IconLocalidade } from "@/assets/icons/icon-localidade";

import { data } from "../../data.json";
import { styles } from "./styles";
import { Pagination } from "@/components/pagination";

export default function ModalDetalhesAnimal() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const router = useRouter();
  const [dadosPost, setDadosPost] = useState<PostDetalhesProps>();
  const [index, setIndex] = useState<number>(0);
  const scrollX = useRef(new Animated.Value(0)).current;

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

  const handleOnScroll = (event: any) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      }
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(({ viewableItems }: any) => {
    // console.log('viewableItems', viewableItems);
    setIndex(viewableItems[0].index);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const handleButtonBack = () => {
    router.back();
  };

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <SafeAreaView style={styles.containerSlide}>
          <FlatList
            data={dadosPost?.imagens}
            renderItem={({ item }) => <SlideItem item={item} />}
            horizontal
            pagingEnabled
            snapToAlignment="center"
            showsHorizontalScrollIndicator={false}
            key={dadosPost?.id}
            onScroll={handleOnScroll}
            onViewableItemsChanged={handleOnViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
          />
          {dadosPost?.imagens && dadosPost?.imagens.length > 1 && (
            <Pagination
              data={dadosPost.imagens}
              scrollX={scrollX}
              index={index}
            />
          )}
        </SafeAreaView>
        <TouchableOpacity
          style={styles.buttonVoltar}
          onPress={handleButtonBack}
        >
          <IconVoltar />
        </TouchableOpacity>
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
            <SafeAreaView style={styles.listaComentarios}>
              <FlatList
                data={data}
                renderItem={({ item }) => (
                  <Comentario {...item} onPress={handleButtonSheetOpen} />
                )}
              />
            </SafeAreaView>
            <FlatList
              renderItem={({ item }) => (
                <Comentario {...item} onPress={handleButtonSheetOpen} />
              )}
              data={data}
              keyExtractor={(item) => item.id}
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
