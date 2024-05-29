import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import mime from "mime";

import * as ImagePicker from "expo-image-picker";

import { ImagemDadosUsuario } from "@/assets/images/imagem-dados-usuario";
import { ModalEditar } from "@/components/modal-editar";
import { IconVoltar } from "@/assets/icons/icon-voltar";
import { IconEdit } from "@/assets/icons/icon-edit";

import { useAuth } from "@/context/AuthContext";
import { api } from "@/services/api";

import { styles } from "./styles";
import { useForm } from "@/hooks/useForm";

export default function MeusDados() {
  const { authState } = useAuth();

  const { formData, setFormData, handleInputChange } = useForm<UserDataProps>({
    initialValues: {
      name: "",
      password: "",
      image_url: "",
    },
  });

  const router = useRouter();

  const [carregando, setCarregando] = useState<boolean>(false);
  const [abrirModal, setAbrirModal] = useState<boolean>(false);
  const [buttonVisivel, setButtonVisivel] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);

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
    const image_url = await AsyncStorage.getItem("image_url");

    setFormData({ name, image_url });
  };

  const handleSubmit = async () => {
    if (formData.name === "" || formData.password === "") return;

    setCarregando(true);

    try {
      const response = await api.patch(
        "/users/user",
        {
          name: formData.name,
          password: formData.password,
        },
        {
          headers: {
            Authorization: `Bearer ${authState?.token}`,
          },
        }
      );

      if (response.status === 200) {
        await AsyncStorage.setItem("name", formData.name!);

        setCarregando(false);
        setButtonVisivel(false);
        setAbrirModal(false);

        await handleDados();
      }
    } catch (error) {
      setCarregando(false);

      console.log(error);
    }
  };

  const uploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const { uri, fileName, type } = result.assets[0];
      setImage(uri);

      const formData: any = new FormData();

      formData.append("image", {
        uri: result.assets[0].uri,
        type: mime.getType(result.assets[0].uri),
        name: result.assets[0].uri.split("/").pop(),
      });
      try {
        const response = await api.patch("/users/user/image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authState?.token}`,
          },
        });

        if (response.status === 200) {
          console.log("Imagem enviada com sucesso");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleRemoverImagem = () => {
    setImage(null);
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
      {abrirModal && (
        <ModalEditar
          handleFecharModal={handleFecharModal}
          handleFocusInput={handleFocusInput}
          handleRemoverImagem={handleRemoverImagem}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          formData={formData}
          uploadImage={uploadImage}
          carregando={carregando}
          buttonVisivel={buttonVisivel}
          imageUrl={image}
          input1={input1}
          input2={input2}
        />
      )}
      <ImagemDadosUsuario />
      <TouchableOpacity
        style={styles.containerImagem}
        onPress={() => setAbrirModal(true)}
      >
        <Image
          style={styles.imagem}
          source={{
            uri: `${api.defaults.baseURL}/uploads/users/${formData.image_url}`,
          }}
        />
      </TouchableOpacity>
      <View style={styles.containerDadosUsuario}>
        <View style={styles.containerDados}>
          <Text style={styles.tituloInformaçoes}>Nome</Text>
          <View style={styles.containerInformacoes}>
            <Text style={styles.informacoes}>{formData.name}</Text>
            <TouchableOpacity
              style={styles.buttonEdit}
              onPress={() => {
                setAbrirModal(true);
              }}
            >
              <IconEdit />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.containerDados}>
          <Text style={styles.tituloInformaçoes}>Senha</Text>
          <View style={styles.containerInformacoes}>
            <Text style={styles.informacoes}>********</Text>
            <TouchableOpacity
              style={styles.buttonEdit}
              onPress={() => {
                setAbrirModal(true);
              }}
            >
              <IconEdit />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
