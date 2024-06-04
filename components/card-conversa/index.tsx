import React, { useState } from "react";

import { View, Text, Image, TouchableOpacity } from "react-native";

import { styles } from "./styles";
import { IconLixeiraConversa } from "@/assets/icons/icon-lixeira-conversa";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api, api_url } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { AxiosError } from "axios";
import { SnackBar } from "../snack-bar";

export function CardConversa({
  recipientId,
  status,
  nome,
  id,
  imagem,
  setIdConversa,
  idConversa,
  fetch,
  onPress,
}: CardConversaProps) {
  const { authState } = useAuth();

  const [abrirSnackBar, setAbrirSnackBar] = useState<boolean>(false);

  const handleLongPress = (id: string) => {
    setIdConversa(id);
  };

  const handleSubmit = () => {
    onPress(recipientId, nome, imagem);
  };

  const removerConversa = async () => {
    const idUser = await AsyncStorage.getItem("id");
    setAbrirSnackBar(false);

    if (idConversa == null || idUser == null) {
      return;
    }

    if (idUser && idConversa) {
      try {
        const response = await api.patch(`/messages/${idUser}/${id}`, {
          headers: {
            Authorization: authState?.token,
          },
        });

        if (response.status === 200) {
          fetch();
          setAbrirSnackBar(false);
        } else {
          setAbrirSnackBar(true);
          setTimeout(() => {
            setAbrirSnackBar(false);
          }, 5000);
        }
      } catch (err) {
        const error = err as AxiosError<Error>;
        setAbrirSnackBar(true);
        setTimeout(() => {
          setAbrirSnackBar(false);
        }, 5000);
        console.error(error.response?.data.message);
      }
    }
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.container}
        onPress={handleSubmit}
        onLongPress={() => handleLongPress(id)}
      >
        <View style={styles.containerImage}>
          <Image
            style={styles.imagem}
            source={
              imagem
                ? { uri: `${api_url}/uploads/users/${imagem}` }
                : require("../../assets/images/user-conversas-image.png")
            }
          />
        </View>
        <View style={styles.containerTextos}>
          <View style={styles.containerMensagem}>
            <Text style={styles.nomeContato}>{nome}</Text>
            <Text style={styles.mensagem}>Ultima mensagem do user aqui</Text>
          </View>
          {/* <View style={styles.containerQuantidadeMensagens}>
          <Text style={styles.quantidadeMensagens}>1</Text>
        </View> */}
        </View>
        {idConversa === id && (
          <TouchableOpacity
            onPress={() => removerConversa()}
            style={styles.containerIconLixeira}
          >
            <IconLixeiraConversa />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      {abrirSnackBar && (
        <SnackBar
          mensagem="Erro ao apagar conversa"
          tipo="erro"
          onClose={() => setAbrirSnackBar(false)}
        />
      )}
    </>
  );
}
