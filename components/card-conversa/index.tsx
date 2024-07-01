import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "./styles";
import { IconLixeiraConversa } from "@/assets/icons/icon-lixeira-conversa";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api, api_url } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { AxiosError } from "axios";
import { SnackBar } from "../snack-bar";
import { IconBlock } from "@/assets/icons/icon-block";

export function CardConversa({
  recipientId,
  nome,
  id,
  imagem,
  setIdConversa,
  idConversa,
  ultimaMensagem,
  abrirModal,
  idBloquear,
  isBlocked,
  setBloqueado,
  read,
  fetch,
  onPress,
}: CardConversaProps) {
  const { authState } = useAuth();
  const [abrirSnackBar, setAbrirSnackBar] = useState<boolean>(false);

  const handleLongPress = (id: string) => {
    setIdConversa(id);
  };

  const handleSubmit = () => {
    onPress(recipientId, nome!, imagem!);
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

  const bloquearUsuario = () => {
    abrirModal(true);
    idBloquear(recipientId);
    setBloqueado(isBlocked);
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
            {isBlocked && <Text style={styles.status}>Usuário Bloqueado</Text>}
            <Text style={styles.nomeContato}>
              {nome ? nome : "Nome indisponível"}
            </Text>
            <Text
              style={styles.mensagem}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {ultimaMensagem}
            </Text>
          </View>
          {!read && (
            <View style={styles.containerQuantidadeMensagens}>
              <Text style={styles.quantidadeMensagens}></Text>
            </View>
          )}
        </View>

        {idConversa === id && (
          <>
            <TouchableOpacity
              onPress={() => removerConversa()}
              style={styles.containerIconLixeira}
            >
              <IconLixeiraConversa />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={bloquearUsuario}
              style={styles.containerIconBlock}
            >
              <IconBlock />
            </TouchableOpacity>
          </>
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
