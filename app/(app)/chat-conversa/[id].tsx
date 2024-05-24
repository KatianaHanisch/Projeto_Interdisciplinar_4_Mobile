import React, { useEffect, useState } from "react";

import { View, Text, Image, TouchableOpacity } from "react-native";

import { styles } from "./styles";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams, useRouter } from "expo-router";

import { conversas } from "../../../data.json";
import { IconVoltar } from "@/assets/icons/icon-voltar";

export default function ChatConversa() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [dadosConversa, setDadosConversa] = useState<ConversasProps>();

  useEffect(() => {
    const filtered = conversas.find((item) => item.id === id);
    if (filtered) {
      setDadosConversa(filtered);
    }
  }, [id]);

  const handleButtonBack = () => {
    router.back();
  };

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.containerVoltar}
          onPress={handleButtonBack}
        >
          <IconVoltar />
        </TouchableOpacity>
        <View style={styles.containerHeader}>
          <Image
            source={require("../../../assets/images/user-conversas-image.png")}
          />
          <Text style={styles.textoHeader}>{dadosConversa?.nome}</Text>
        </View>
        <View style={styles.containerMensagens}>
          <View style={styles.containerData}>
            <Text style={styles.dataMensagens}>{dadosConversa?.data}</Text>
          </View>
          <View style={styles.containerMensagemRecebida}>
            <View style={styles.containerMensagemRecebidaBox}>
              <Text style={styles.mensagem}>
                {dadosConversa?.mensagemRecebida}
              </Text>
            </View>
            <Text style={styles.horarioMensagem}>
              {dadosConversa?.mensagemRecebidaHorario}
            </Text>
          </View>
          <View style={styles.containerMensagemEnviada}>
            <View style={styles.containerMensagemEnviadaBox}>
              <Text style={styles.mensagem}>
                {dadosConversa?.mensagemEnviada}
              </Text>
            </View>
            <Text style={styles.horarioMensagem}>
              {dadosConversa?.mensagemEnviadaHorario}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}
