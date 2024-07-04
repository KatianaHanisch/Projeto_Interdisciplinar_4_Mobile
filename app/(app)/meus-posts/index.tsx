import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";

import { IconVoltar } from "@/assets/icons/icon-voltar";

import { styles } from "./styles";
import { ImagemMeusPosts } from "@/assets/images/image-meus-posts";
import { api } from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/context/AuthContext";
import { ImagemButtonPosts } from "@/assets/images/imagem-bottom-posts";
import { AxiosError } from "axios";
import { CardPost } from "@/components/card-post";
import { SnackBar } from "@/components/snack-bar";
import { theme } from "@/constants";

export default function MeusPosts() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [mensagemSnackBar, setMensagemSnackbar] = useState<string>("");
  const [tipoSnackBar, setTipoSnackBar] = useState<string>("");
  const [abrirSnackBar, setAbrirSnackBar] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const { authState } = useAuth();
  const router = useRouter();

  const handleButtonBack = () => {
    router.back();
  };

  const handleDetalhes = (id: string) => {
    router.navigate(`/post/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await api.delete(`/posts/post/${id}`, {
        headers: {
          Authorization: `Bearer ${authState?.token}`,
        },
      });

      if (response.status === 200) {
        setMensagemSnackbar("Post excluido com sucesso");
        setTipoSnackBar("sucesso");
        setAbrirSnackBar(true);

        fecthPostAtualizado(0);

        setTimeout(() => {
          setAbrirSnackBar(false);
        }, 4000);
      }
    } catch (error) {
      const err = error as AxiosError<Error>;
      console.error(err.response?.data.message);

      setMensagemSnackbar("Não foi possível excluir o post");
      setTipoSnackBar("erro");
      setAbrirSnackBar(true);

      setTimeout(() => {
        setAbrirSnackBar(false);
      }, 4000);
    }
  };

  const fecthPostAtualizado = async (pageNumber: number = 0) => {
    setLoading(true);

    const id = await AsyncStorage.getItem("id");

    try {
      const response = await api.get(`/posts/user/${id}?page=${pageNumber}`, {
        headers: {
          Authorization: `Bearer ${authState?.token}`,
        },
      });

      if (response.status === 200) {
        setPosts(response.data.posts);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fecthPostUsuario = async (pageNumber: number = 0) => {
    if (loading || !hasMore) return;

    setLoading(true);
    const id = await AsyncStorage.getItem("id");

    try {
      const response = await api.get(`/posts/user/${id}?page=${pageNumber}`, {
        headers: {
          Authorization: `Bearer ${authState?.token}`,
        },
      });

      if (response.status === 200) {
        const newPosts = response.data.posts;
        if (newPosts.length === 0) {
          setHasMore(false);
        } else {
          setPosts((prevPosts) =>
            pageNumber === 0 ? newPosts : [...prevPosts, ...newPosts]
          );
        }
      }
    } catch (err) {
      const error = err as AxiosError<Error>;
      console.error(error.response?.data.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMorePosts = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    fecthPostUsuario(page);
  }, [page]);

  return (
    <View style={styles.container}>
      <ImagemMeusPosts />
      <TouchableOpacity
        style={styles.containerVoltar}
        onPress={handleButtonBack}
      >
        <IconVoltar />
      </TouchableOpacity>
      {abrirSnackBar && (
        <SnackBar
          mensagem={mensagemSnackBar}
          tipo={tipoSnackBar}
          onClose={() => setAbrirSnackBar(false)}
        />
      )}
      <Text style={styles.headerTitulo}>Meus Posts</Text>
      <SafeAreaView style={styles.containerPosts}>
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <CardPost
              {...item}
              handleNavigate={handleDetalhes}
              tipoPost="meusPosts"
              handleDelete={handleDelete}
            />
          )}
          keyExtractor={(post) => post.id}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMorePosts}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading ? (
              <ActivityIndicator
                color={theme.colors.orangePrimaryDark}
                size={25}
              />
            ) : null
          }
        />
      </SafeAreaView>
      <View style={styles.containerImagem}>
        <ImagemButtonPosts />
      </View>
    </View>
  );
}
