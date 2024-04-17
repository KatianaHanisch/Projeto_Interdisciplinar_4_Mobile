import { useRef } from "react";

import { Text, View, StyleSheet, TextInput } from "react-native";

import { ImagemTelaLogin } from "@/assets/images/imagem-tela-login";
import { Button } from "@/components/button";

import { theme } from "@/constants";

export default function VerificarEmail() {
  const inputRef1 = useRef<TextInput | null>(null);
  const inputRef2 = useRef<TextInput | null>(null);
  const inputRef3 = useRef<TextInput | null>(null);
  const inputRef4 = useRef<TextInput | null>(null);

  return (
    <View style={styles.container}>
      <ImagemTelaLogin />
      <View style={styles.containerItens}>
        <View style={styles.containerTextos}>
          <Text style={styles.textoTitulo}>
            Digite seu código de verificação
          </Text>
          <Text style={styles.textoSubtitulo}>
            Enviamos um código de verificação para seu email. Verifique sua
            caixa de entrada
          </Text>
        </View>
        <View style={styles.containerInputs}>
          <TextInput
            ref={inputRef1}
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={(text) => {
              if (text.length === 1) {
                inputRef2.current?.focus();
              }
            }}
          />
          <TextInput
            ref={inputRef2}
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={(text) => {
              if (text.length === 1) {
                inputRef3?.current?.focus();
              } else if (text.length === 0) {
                inputRef1.current?.focus();
              }
            }}
          />
          <TextInput
            ref={inputRef3}
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={(text) => {
              if (text.length === 1) {
                inputRef4?.current?.focus();
              } else if (text.length === 0) {
                inputRef2.current?.focus();
              }
            }}
          />
          <TextInput
            ref={inputRef4}
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={(text) => {
              if (text.length === 0) {
                inputRef3.current?.focus();
              }
            }}
          />
        </View>
        <Button titulo="Verificar código" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: theme.colors.orangeLight,
  },
  containerItens: {
    backgroundColor: theme.colors.white,
    width: "95%",
    height: "65%",
    borderRadius: 30,
    marginTop: -60,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    gap: 20,
  },
  containerTextos: {
    width: "100%",
    gap: 5,
  },
  textoTitulo: {
    fontSize: 22,
    fontFamily: theme.fontFamily.montserrat.semiBold,
    color: theme.colors.grayMedium,
    width: "100%",
    textAlign: "left",
  },
  textoSubtitulo: {
    fontSize: 16,
    fontFamily: theme.fontFamily.raleway.regular,
    color: theme.colors.grayMedium,
    textAlign: "left",
  },
  containerInputs: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
  input: {
    width: 50,
    height: 50,
    backgroundColor: theme.colors.grayLight,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 35,
    color: theme.colors.grayDark,
  },
});
