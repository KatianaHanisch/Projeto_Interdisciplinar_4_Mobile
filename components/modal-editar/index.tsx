import React, { useEffect, useRef, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";

import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { styles } from "./styles";
import { IconClose } from "@/assets/icons/icon-close";
import { StatusBar } from "expo-status-bar";
import { IconEdit } from "@/assets/icons/icon-edit";
import { Button } from "../button";

export function ModalEditar({
  handleFecharModal,
  handleFocusInput,
  handleRemoverImagem,
  handleSubmit,
  handleInputChange,
  formData,
  uploadImage,
  carregando,
  imageUrl,
  input1,
  input2,
}: ModalEditarProps) {
  const [modalHeight, setModalHeight] = useState(60);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setModalHeight(85);
        setIsKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setModalHeight(60);
        setIsKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={[styles.containerModal, { height: `${modalHeight}%` }]}>
          <View style={styles.containerHeader}>
            <Text style={styles.textoHeader}>Editar perfil</Text>
            <TouchableOpacity onPress={handleFecharModal}>
              <IconClose />
            </TouchableOpacity>
          </View>
          <View style={styles.containerDados}>
            <View style={styles.containerInformaçoes}>
              <Text style={styles.tituloInformaçoes}>Nome</Text>
              <View style={styles.containerInformacoes}>
                <TextInput
                  style={styles.informacoes}
                  value={formData.name!}
                  ref={input1}
                  placeholder="Digite seu nome"
                  onChangeText={(text) => handleInputChange("name", text)}
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
            <View style={styles.containerInformaçoes}>
              <Text style={styles.tituloInformaçoes}>Senha</Text>
              <View style={styles.containerInformacoes}>
                <TextInput
                  style={styles.informacoes}
                  value={formData.password}
                  ref={input2}
                  secureTextEntry
                  placeholder="********"
                  onChangeText={(text) => handleInputChange("password", text)}
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
            <View style={styles.containerInformaçoes}>
              {imageUrl ? (
                <View style={styles.containerImagemCarregada}>
                  <View style={styles.imagemCarregada}>
                    <Entypo name="image-inverted" size={24} color="#333333" />
                    <Text style={styles.textoImagemCarregada}>
                      Imagem carregada
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.buttonClose}
                    onPress={handleRemoverImagem}
                  >
                    <AntDesign name="close" size={24} color="#333333" />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.buttonUpload}
                  onPress={uploadImage}
                >
                  <Text style={styles.textoUpload}>Selecionar imagem</Text>
                </TouchableOpacity>
              )}
            </View>
            <Button
              titulo="Salvar alterações"
              carregando={carregando}
              disabled={carregando}
              onPress={handleSubmit}
            />
          </View>
        </View>
      </View>
    </>
  );
}
