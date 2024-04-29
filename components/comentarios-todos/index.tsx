import React, { useState, useEffect } from "react";
import { forwardRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { styles } from "./styles";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { ButtomSheetProps } from "./buttonSheet";
import { Comentario } from "../comentario";
import { IconEnviar } from "@/assets/icons/icon-enviar";

export const ComentariosTodos = forwardRef<BottomSheet, ButtomSheetProps>(
  (
    { onClose, onPress, inputRef, data, abrirRespontas, handleButtonRespostas },
    ref
  ) => {
    const [keyboardSpace, setKeyboardSpace] = useState(0);
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

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
          style={isKeyboardOpen ? { height: "90%" } : { height: "99%" }}
        >
          <View style={styles.container}>
            <View style={styles.containerInterno}>
              <Text style={styles.titulo}>Comentários</Text>
              <View style={styles.containerComentarios}>
                <BottomSheetFlatList
                  data={data}
                  renderItem={({ item }) => (
                    <Comentario
                      {...item}
                      onPress={onPress}
                      abrirRespontas={abrirRespontas}
                      handleButtonRespostas={handleButtonRespostas}
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
                      source={require("../../assets/images/icon-user-comentar.png")}
                    />
                  </View>
                  <TextInput
                    style={styles.input}
                    ref={inputRef}
                    placeholder="Adicione um comentário"
                  />
                </View>
                <TouchableOpacity style={styles.button}>
                  <IconEnviar />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </BottomSheet>
    );
  }
);
