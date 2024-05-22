import React, { useContext } from "react";

import { Link, useLocalSearchParams, useRouter } from "expo-router";
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
  ActivityIndicator,
} from "react-native";

import { ComentariosTodos } from "@/components/comentarios-todos";
import { Comentario } from "@/components/comentario";
import { SlideItem } from "@/components/slide-item";

import { IconVoltar } from "@/assets/icons/icon-voltar";
import { IconLocalidade } from "@/assets/icons/icon-localidade";

import { styles } from "./styles";
import { Pagination } from "@/components/pagination";
import { api } from "@/services/api";
import { AuthContext } from "@/context/AuthContext";
import { theme } from "@/constants";
import { formatarData } from "@/utils/formatarData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError } from "axios";

export default function ModalDetalhesAnimal() {
  const router = useRouter();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const [dadosPost, setDadosPost] = useState<PostDetalhesProps>();
  const [index, setIndex] = useState<number>(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const { id } = useLocalSearchParams();

  const fetcherPost = async (id: string | string[]) => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        const response = await api.get(`/posts/post/${id}`, {
          headers: {
            Authorization: token,
          },
        });

        setDadosPost(response.data);
      } else {
        console.error("Token não encontrado");
      }
    } catch (err) {
      const error = err as AxiosError<Error>;
      console.error(error.response?.data.message);
    }
  };

  useEffect(() => {
    if (id !== undefined) {
      fetcherPost(id);
    }
  }, []);

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
        {dadosPost ? (
          <>
            <SafeAreaView style={styles.containerSlide}>
              <FlatList
                data={dadosPost?.images}
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
              {dadosPost?.images && dadosPost?.images.length > 1 && (
                <Pagination
                  data={dadosPost.images}
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
                <Text style={styles.dataPublicacao}>
                  {formatarData(dadosPost?.createdAt)}
                </Text>
                <Link href={""} style={styles.informacoesPublicacao}>
                  publicado por {dadosPost?.user?.name.toLowerCase()}
                </Link>
              </View>
              <View style={styles.containerInformacoes}>
                <View style={styles.containerTextos}>
                  <Text style={styles.textoNome}>{dadosPost?.name}</Text>
                  <Text style={styles.descricao}>{dadosPost?.description}</Text>
                  <View style={styles.containerLocalidade}>
                    <IconLocalidade />
                    <Text style={styles.localidade}>
                      {dadosPost?.city} - {dadosPost?.uf}
                    </Text>
                  </View>
                </View>
                <View style={styles.containerIdadeGenero}>
                  <View style={styles.containerIdade}>
                    <Text style={styles.idade}>{dadosPost?.age} anos</Text>
                  </View>
                  <View style={styles.containerGenero}>
                    <Text style={styles.genero}>
                      {dadosPost?.sex === "Macho" ? "Macho" : "Fêmea"}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.containerComentarios,
                  dadosPost?.comments.length === 0
                    ? styles.containerComentariosSemComentarios
                    : null,
                ]}
              >
                {dadosPost?.comments && dadosPost?.comments.length > 0 && (
                  <>
                    <Text style={styles.tituloComentarios}>Comentários</Text>
                    <SafeAreaView style={styles.listaComentarios}>
                      <FlatList
                        renderItem={({ item }) => (
                          <Comentario
                            {...item}
                            onPress={handleButtonSheetOpen}
                          />
                        )}
                        data={dadosPost?.comments}
                        keyExtractor={(item) => item.id}
                      />
                    </SafeAreaView>
                  </>
                )}
                <TouchableOpacity onPress={handleButtonSheetOpen}>
                  <Text style={styles.buttonComentarios}>
                    {dadosPost?.comments && dadosPost?.comments.length > 0
                      ? "Ver todos os comentários"
                      : "Adicionar comentário"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <ComentariosTodos
              ref={bottomSheetRef}
              onClose={handleButtonSheetClose}
              inputRef={inputResponderRef}
              onPress={handleButtonResponder}
              data={dadosPost?.comments}
            />
          </>
        ) : (
          <ActivityIndicator
            size="large"
            color={theme.colors.orangePrimaryDark}
          />
        )}
      </View>
    </>
  );
}
