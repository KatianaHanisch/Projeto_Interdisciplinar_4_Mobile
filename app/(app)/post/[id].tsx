import React from "react";

import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import BottomSheet, { BottomSheetFlatListMethods } from "@gorhom/bottom-sheet";

import { useEffect, useRef, useState } from "react";
import {
  Animated,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Keyboard,
} from "react-native";

import { ComentariosTodos } from "@/components/comentarios-todos";
import { Comentario } from "@/components/comentario";
import { SlideItem } from "@/components/slide-item";

import { IconVoltar } from "@/assets/icons/icon-voltar";
import { IconLocalidade } from "@/assets/icons/icon-localidade";

import { styles } from "./styles";
import { Pagination } from "@/components/pagination";
import { api } from "@/services/api";
import { theme } from "@/constants";
import { formatarData } from "@/utils/formatarData";
import { AxiosError } from "axios";
import { useAuth } from "@/context/AuthContext";

export default function ModalDetalhesAnimal() {
  const router = useRouter();

  const { authState } = useAuth();

  const [carregando, setCarregando] = useState<boolean>(false);
  const [carregandoPosts, setCarregandoPosts] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [idComentario, setIdComentario] = useState<string>("");
  const [tipoRequisicao, setTipoRequisicao] =
    useState<string>("novoComentario");

  const bottomSheetRef = useRef<BottomSheet>(null);
  const [dadosPost, setDadosPost] = useState<PostDetalhesProps>();
  const [index, setIndex] = useState<number>(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const { id } = useLocalSearchParams();

  const inputResponderRef = useRef<TextInput | null>(null);
  const flatListRef = useRef<BottomSheetFlatListMethods>(null);

  const handleButtonSheetOpen = () => bottomSheetRef.current?.expand();

  const handleCloseButton = () => {
    Keyboard.dismiss();

    bottomSheetRef.current?.snapToIndex(0);
  };

  const handleButtonAdicionarComentario = () => {
    bottomSheetRef.current?.expand();

    if (inputResponderRef.current) {
      inputResponderRef.current.focus();
    }

    setTipoRequisicao("novoComentario");
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
    setIndex(viewableItems[0].index);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const handleButtonBack = () => {
    router.back();
  };

  const handleInputValue = (value: string) => {
    setInputValue(value);
  };

  const adicionarComentarioNoEstado = (
    novoComentario: ComentarioProps,
    id?: string
  ) => {
    if (dadosPost) {
      setDadosPost((prevDadosPost) => {
        if (!prevDadosPost) return prevDadosPost;

        if (id) {
          return {
            ...prevDadosPost,
            comments: prevDadosPost.comments.map((comentario) => {
              if (comentario.id === id) {
                return {
                  ...comentario,
                  sub_comments: [...comentario.sub_comments, novoComentario],
                };
              }
              return comentario;
            }),
          };
        } else {
          return {
            ...prevDadosPost,
            comments: [...prevDadosPost.comments, novoComentario],
          };
        }
      });
    }
  };

  const fetcherPost = async (id: string | string[] | undefined) => {
    try {
      setCarregandoPosts(true);

      const response = await api.get(`/posts/post/${id}`, {
        headers: {
          Authorization: authState?.token,
        },
      });

      if (response.status === 200) {
        setDadosPost(response.data);
      }

      setCarregandoPosts(false);
    } catch (err) {
      setCarregandoPosts(false);

      const error = err as AxiosError<Error>;
      console.error(error.response?.data.message);
    }
  };

  const handleSubmit = async () => {
    if (inputValue === "") return;

    try {
      setCarregando(true);

      const response = await api.post(
        `/comments/comment/${id}`,
        {
          description: inputValue,
        },
        {
          headers: {
            Authorization: authState?.token,
          },
        }
      );

      if (response.status === 200) {
        adicionarComentarioNoEstado(response.data);

        setInputValue("");
        setCarregando(false);

        flatListRef.current?.scrollToEnd({ animated: true });
      }
    } catch (err) {
      setCarregando(false);

      const error = err as AxiosError<Error>;
      console.error(error.response?.data.message);
    }
  };

  const handleResposta = (id: string) => {
    bottomSheetRef.current?.expand();

    if (inputResponderRef.current) {
      inputResponderRef.current.focus();
    }

    setIdComentario(id);

    setTipoRequisicao("subComentario");
  };

  const handleSubmitResposta = async (id: string) => {
    if (id === "" || inputValue === "") return;

    try {
      setCarregando(true);

      const response = await api.post(
        `/comments/sub_comment/${id}`,
        {
          description: inputValue,
        },
        {
          headers: {
            Authorization: authState?.token,
          },
        }
      );

      if (response.status === 200) {
        adicionarComentarioNoEstado(response.data, id);

        setInputValue("");

        setCarregando(false);
      }
    } catch (err) {
      setCarregando(false);

      const error = err as AxiosError<Error>;
      console.error(error.response?.data.message);
    }
  };

  useEffect(() => {
    if (id !== undefined) {
      fetcherPost(id);
    }
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        {carregandoPosts ? (
          <View style={styles.containerCarregamento}>
            <ActivityIndicator
              size={50}
              color={theme.colors.orangePrimaryDark}
            />
          </View>
        ) : (
          <>
            <SafeAreaView style={styles.containerSlide}>
              <FlatList
                data={dadosPost?.images}
                renderItem={({ item }) => <SlideItem item={item} />}
                horizontal
                pagingEnabled
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
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
                      {dadosPost.comments ? (
                        <FlatList
                          renderItem={({ item }) => (
                            <Comentario
                              {...item}
                              handleResposta={handleResposta}
                            />
                          )}
                          data={dadosPost?.comments}
                          keyExtractor={(item) => item.id}
                          initialNumToRender={5}
                          maxToRenderPerBatch={10}
                        />
                      ) : (
                        <ActivityIndicator
                          size={"large"}
                          color={theme.colors.orangePrimaryDark}
                        />
                      )}
                    </SafeAreaView>
                  </>
                )}
                {dadosPost?.comments && dadosPost?.comments.length > 0 && (
                  <TouchableOpacity onPress={handleButtonSheetOpen}>
                    <Text style={styles.buttonComentariosTodos}>
                      Ver todos os comentários
                    </Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={handleButtonAdicionarComentario}>
                  <Text style={styles.buttonComentarios}>
                    Adicionar comentário
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <ComentariosTodos
              ref={bottomSheetRef}
              onClose={handleCloseButton}
              inputRef={inputResponderRef}
              handleResposta={handleButtonAdicionarComentario}
              data={dadosPost?.comments}
              handleSubmit={handleSubmit}
              handleSubmitResposta={handleSubmitResposta}
              handleInputValue={handleInputValue}
              inputValue={inputValue}
              carregando={carregando}
              flatListRef={flatListRef}
              tipoRequisicao={tipoRequisicao}
              idComentario={idComentario}
            />
          </>
        )}
      </View>
    </>
  );
}
