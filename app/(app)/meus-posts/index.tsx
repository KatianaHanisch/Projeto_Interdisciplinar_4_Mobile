import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
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

export default function MeusPosts() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [mensagemSnackBar, setMensagemSnackbar] = useState<string>("");
  const [tipoSnackBar, setTipoSnackBar] = useState<string>("");
  const [abrirSnackBar, setAbrirSnackBar] = useState<boolean>(false);

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

        fecthPostUsuario();

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

  const fecthPostUsuario = async () => {
    const id = await AsyncStorage.getItem("id");

    try {
      const response = await api.get(`/posts/user/${id}?page=0`, {
        headers: {
          Authorization: `Bearer ${authState?.token}`,
        },
      });

      if (response.status === 200) {
        setPosts(response.data);
      }
    } catch (err) {
      const error = err as AxiosError<Error>;
      console.error(error.response?.data.message);
    }
  };

  useEffect(() => {
    fecthPostUsuario();
  }, []);

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
        />
      </SafeAreaView>
      <View style={styles.containerImagem}>
        <ImagemButtonPosts />
      </View>
    </View>
  );
}
