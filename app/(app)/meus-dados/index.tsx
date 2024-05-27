import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { ImagemDadosUsuario } from "@/assets/images/imagem-dados-usuario";
import { styles } from "./styles";
import { IconEdit } from "@/assets/icons/icon-edit";
import { ModalEditar } from "@/components/modal-editar";
import { IconVoltar } from "@/assets/icons/icon-voltar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "@/components/button";
import { api } from "@/services/api";
import { useAuth } from "@/context/AuthContext";

export default function MeusDados() {
  const router = useRouter();
  const { authState } = useAuth();

  const [carregando, setCarregando] = useState<boolean>(false);
  const [abrirModal, setAbrirModal] = useState<boolean>(false);
  const [buttonVisivel, setButtonVisivel] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserDataProps>({
    id: "",
    name: "",
    email: "",
    image_url: "",
  });

  const input1 = useRef<TextInput | null>(null);
  const input2 = useRef<TextInput | null>(null);

  const handleFecharModal = () => {
    setAbrirModal(false);
  };

  const handleButtonBack = () => {
    router.back();
  };

  const handleFocusInput = (input: "input1" | "input2") => {
    if (input == "input1") {
      input1.current?.focus();
    } else {
      input2.current?.focus();
    }

    setButtonVisivel(true);
  };

  const handleDados = async () => {
    const id = await AsyncStorage.getItem("id");
    const name = await AsyncStorage.getItem("name");
    const email = await AsyncStorage.getItem("email");
    const image_url = await AsyncStorage.getItem("image_url");

    setUserData({ name, email, id, image_url });
  };

  const handleSubmit = async () => {
    if (userData.name === "" || userData.password === "") return;

    setCarregando(true);

    try {
      const response = await api.patch(
        "/users/user",
        {
          name: userData.name,
          password: userData.password,
        },
        {
          headers: {
            Authorization: `Bearer ${authState?.token}`,
          },
        }
      );

      if (response.status === 200) {
        await AsyncStorage.setItem("name", userData.name!);

        setCarregando(false);
        setButtonVisivel(false);
        console.log("Dados atualizados com sucesso");
      }
    } catch (error) {
      setCarregando(false);

      console.log(error);
    }
  };

  useEffect(() => {
    handleDados();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.containerVoltar}
        onPress={handleButtonBack}
      >
        <IconVoltar />
      </TouchableOpacity>
      {abrirModal && <ModalEditar handleFecharModal={handleFecharModal} />}
      <ImagemDadosUsuario />
      <View style={styles.containerImagem}>
        <Image
          style={styles.imagem}
          source={require("../../../assets/images/imagem-perfil-usuario.png")}
        />
      </View>
      <View style={styles.containerDadosUsuario}>
        <View style={styles.containerDados}>
          <Text style={styles.tituloInformaçoes}>Nome</Text>
          <View style={styles.containerInformacoes}>
            <TextInput
              style={styles.informacoes}
              value={userData.name!}
              ref={input1}
              onChange={(value) =>
                setUserData({ ...userData, name: value.nativeEvent.text })
              }
            />
            <TouchableOpacity
              style={styles.buttonEdit}
              onPress={() => {
                handleFocusInput("input1");
              }}
            >
              <IconEdit />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.containerDados}>
          <Text style={styles.tituloInformaçoes}>Senha</Text>
          <View style={styles.containerInformacoes}>
            <TextInput
              style={styles.informacoes}
              value={userData.password!}
              placeholder="*********"
              ref={input2}
              secureTextEntry
              onChange={(value) =>
                setUserData({ ...userData, password: value.nativeEvent.text })
              }
            />
            <TouchableOpacity
              style={styles.buttonEdit}
              onPress={() => {
                handleFocusInput("input2");
              }}
            >
              <IconEdit />
            </TouchableOpacity>
          </View>
        </View>
        {buttonVisivel && (
          <View style={styles.containerButton}>
            <Button
              carregando={carregando}
              titulo="Alterar dados"
              onPress={() => handleSubmit()}
            />
          </View>
        )}
      </View>
    </View>
  );
}
