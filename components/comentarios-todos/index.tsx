import React, { useState, useEffect, forwardRef } from "react";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  ActivityIndicator,
  ScrollView,
} from "react-native";

import { IconEnviar } from "@/assets/icons/icon-enviar";
import { Comentario } from "../comentario";
import { ButtomSheetProps } from "./buttonSheet";

import { styles } from "./styles";
import { IconClose } from "@/assets/icons/icon-close";
import { api_url } from "@/services/api";

export const ComentariosTodos = forwardRef<BottomSheet, ButtomSheetProps>(
  (
    {
      data,
      userImagem,
      onClose,
      inputRef,
      abrirRespontas,
      handleResposta,
      handleSubmit,
      handleSubmitResposta,
      handleInputValue,
      inputValue,
      carregando,
      flatListRef,
      tipoRequisicao,
      idComentario,
    },
    ref
  ) => {
    const [nameResposta, setNameResposta] = useState<string>("");
    const [keyboardSpace, setKeyboardSpace] = useState(0);
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

    const handleRequisicao = async (tipoRequisicao: string) => {
      if (tipoRequisicao === "novoComentario") {
        handleSubmit();
      } else {
        handleSubmitResposta(idComentario);
      }
    };
    const handleNameResposta = (id: string, name: string) => {
      handleResposta!(id);

      setNameResposta(name);
    };
    const clearNameResposta = () => {
      setNameResposta("");
    };
    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        "keyboardDidShow",
        (frames) => {
          if (!frames.endCoordinates) return;
          setKeyboardSpace(frames.endCoordinates.height);
          setIsKeyboardOpen(true);
        }
      );
      const keyboardDidHideListener = Keyboard.addListener(
        "keyboardDidHide",
        () => {
          setKeyboardSpace(0);
          setIsKeyboardOpen(false);
        }
      );

      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }, []);

    return (
      <BottomSheet
        backgroundStyle={styles.background}
        ref={ref}
        index={0}
        snapPoints={[0.01, "95%"]}
      >
        <KeyboardAvoidingView
          behavior={"height"}
          style={isKeyboardOpen ? { height: "95%" } : { height: "95%" }}
        >
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={clearNameResposta}
          >
            <View
              style={[
                styles.container,
                isKeyboardOpen ? { paddingBottom: 25 } : { height: 5 },
              ]}
            >
              <View style={styles.containerInterno}>
                <View style={styles.containerHeader}>
                  <Text style={styles.titulo}>Comentários</Text>
                  <TouchableOpacity style={styles.titulo} onPress={onClose}>
                    <IconClose />
                  </TouchableOpacity>
                </View>
                <View style={styles.containerComentarios}>
                  <BottomSheetFlatList
                    ref={flatListRef}
                    data={data}
                    renderItem={({ item }) => (
                      <Comentario
                        {...item}
                        abrirRespontas={abrirRespontas}
                        handleResposta={handleNameResposta}
                      />
                    )}
                    keyExtractor={(item) => item.id}
                  />
                </View>
              </View>
              <View style={styles.containerInputComentar}>
                <View
                  style={[
                    styles.containerComentar,
                    { marginBottom: keyboardSpace },
                  ]}
                >
                  <View style={styles.containerInput}>
                    <View style={styles.containerImagem}>
                      <Image
                        source={
                          userImagem && userImagem !== "null"
                            ? { uri: `${api_url}/uploads/users/${userImagem}` }
                            : require("../../assets/images/user-conversas-image.png")
                        }
                        style={styles.imagem}
                      />
                    </View>
                    <TextInput
                      style={styles.input}
                      ref={inputRef}
                      placeholder={
                        nameResposta
                          ? `Responda ${nameResposta} `
                          : "Adicione um comentário"
                      }
                      value={inputValue}
                      onChange={(text) =>
                        handleInputValue(text.nativeEvent.text)
                      }
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleRequisicao(tipoRequisicao)}
                  >
                    {carregando ? (
                      <ActivityIndicator color={"#fff"} size={25} />
                    ) : (
                      <IconEnviar />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </BottomSheet>
    );
  }
);
