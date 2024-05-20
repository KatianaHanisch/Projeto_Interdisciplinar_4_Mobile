import React, { useState } from "react";

import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import { ImagemDadosUsuario } from "@/assets/images/imagem-dados-usuario";

import { styles } from "./styles";
import { IconEdit } from "@/assets/icons/icon-edit";
import { ModalEditar } from "@/components/modal-editar";
import { IconVoltar } from "@/assets/icons/icon-voltar";
import { ProtectedRoute } from "../(routes)/protected-route";

export default function MeusDados() {
  const router = useRouter();
  const [abrirModal, setAbrirModal] = useState(false);

  const handleFecharModal = () => {
    setAbrirModal(false);
  };

  const handleButtonBack = () => {
    router.back();
  };

  return (
    <ProtectedRoute>
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
            source={require("../../assets/images/imagem-perfil-usuario.png")}
          />
          <Text style={styles.nome}>Mateus Oliveira</Text>
        </View>
        <View style={styles.containerDadosUsuario}>
          <View style={styles.containerDados}>
            <Text style={styles.tituloInformaçoes}>Email</Text>
            <View style={styles.containerInformacoes}>
              <Text style={styles.informacoes}>exemplo@gmail.com</Text>
              <TouchableOpacity
                style={styles.buttonEdit}
                onPress={() => setAbrirModal(true)}
              >
                <IconEdit />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.containerDados}>
            <Text style={styles.tituloInformaçoes}>Telefone</Text>
            <View style={styles.containerInformacoes}>
              <Text style={styles.informacoes}>(66) 98830-8389</Text>
              <TouchableOpacity
                style={styles.buttonEdit}
                onPress={() => setAbrirModal(true)}
              >
                <IconEdit />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.containerDados}>
            <Text style={styles.tituloInformaçoes}>Senha</Text>
            <View style={styles.containerInformacoes}>
              <Text style={styles.informacoes}>•••••••••</Text>
              <TouchableOpacity
                style={styles.buttonEdit}
                onPress={() => setAbrirModal(true)}
              >
                <IconEdit />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ProtectedRoute>
  );
}
