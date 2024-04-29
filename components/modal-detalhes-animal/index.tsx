import { useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import BottomSheet from "@gorhom/bottom-sheet";

import { Comentario } from "../comentario";
import { ComentariosTodos } from "../comentarios-todos";

import { IconLocalidade } from "@/assets/icons/icon-localidade";

import { styles } from "./styles";

const data = [
  {
    id: "1",
    publicacao: "7d",
    nome_usuario: "lucas_oliveira",
    description: "Comentário",
    imagem: "icon-user-comentar.png",
    quantidadeDeRespostas: 10,
    comentarios: [
      {
        id: "1",
        id_comentario: "1",
        publicacao: "7d",
        nome_usuario: "lucas_oliveira",
        description: "Novo comentário",
        imagem: "icon-user-comentar.png",
      },
      {
        id: "2",
        id_comentario: "1",
        publicacao: "7d",
        nome_usuario: "lucas_oliveira",
        description: "Novo comentário",
        imagem: "icon-user-comentar.png",
      },
      {
        id: "3",
        id_comentario: "1",
        publicacao: "7d",
        nome_usuario: "lucas_oliveira",
        description: "Novo comentário",
        imagem: "icon-user-comentar.png",
      },
    ],
  },
  {
    id: "2",
    publicacao: "7d",
    nome_usuario: "lucas_oliveira",
    description: "Comentário",
    imagem: "icon-user-comentar.png",
    quantidadeDeRespostas: 6,
    comentarios: [
      {
        id: "1",
        id_comentario: "1",
        publicacao: "7d",
        nome_usuario: "lucas_oliveira",
        description: "Novo comentário",
        imagem: "icon-user-comentar.png",
      },
      {
        id: "2",
        id_comentario: "1",
        publicacao: "7d",
        nome_usuario: "lucas_oliveira",
        description: "Novo comentário",
        imagem: "icon-user-comentar.png",
      },
      {
        id: "3",
        id_comentario: "1",
        publicacao: "7d",
        nome_usuario: "lucas_oliveira",
        description: "Novo comentário",
        imagem: "icon-user-comentar.png",
      },
    ],
  },
  {
    id: "3",
    publicacao: "7d",
    nome_usuario: "lucas_oliveira",
    description: "Comentário",
    imagem: "icon-user-comentar.png",
    quantidadeDeRespostas: 0,
  },
  {
    id: "4",
    publicacao: "7d",
    nome_usuario: "lucas_oliveira",
    description: "Comentário",
    imagem: "icon-user-comentar.png",
    quantidadeDeRespostas: 0,
  },
  {
    id: "5",
    publicacao: "7d",
    nome_usuario: "lucas_oliveira",
    description: "Comentário",
    imagem: "icon-user-comentar.png",
    quantidadeDeRespostas: 10,
    comentarios: [
      {
        id: "1",
        id_comentario: "1",
        publicacao: "7d",
        nome_usuario: "lucas_oliveira",
        description: "Novo comentário",
        imagem: "icon-user-comentar.png",
      },
      {
        id: "2",
        id_comentario: "1",
        publicacao: "7d",
        nome_usuario: "lucas_oliveira",
        description: "Novo comentário",
        imagem: "icon-user-comentar.png",
      },
      {
        id: "3",
        id_comentario: "1",
        publicacao: "7d",
        nome_usuario: "lucas_oliveira",
        description: "Novo comentário",
        imagem: "icon-user-comentar.png",
      },
    ],
  },
  {
    id: "6",
    publicacao: "7d",
    nome_usuario: "lucas_oliveira",
    description: "Comentário",
    imagem: "icon-user-comentar.png",
    quantidadeDeRespostas: 10,
  },
  {
    id: "7",
    publicacao: "7d",
    nome_usuario: "lucas_oliveira",
    description: "Comentário",
    imagem: "icon-user-comentar.png",
    quantidadeDeRespostas: 0,
  },
];

const comentariosDosComentarios = [
  {
    id: "1",
    id_comentario: "1",
    publicacao: "7d",
    nome_usuario: "lucas_oliveira",
    description: "Comentário",
    imagem: "icon-user-comentar.png",
  },
  {
    id: "2",
    id_comentario: "1",
    publicacao: "7d",
    nome_usuario: "lucas_oliveira",
    description: "Comentário",
    imagem: "icon-user-comentar.png",
  },
  {
    id: "3",
    id_comentario: "1",
    publicacao: "7d",
    nome_usuario: "lucas_oliveira",
    description: "Comentário",
    imagem: "icon-user-comentar.png",
  },
];

export const ModalDetalhesAnimal = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const inputResponderRef = useRef<TextInput | null>(null);

  const handleButtonSheetOpen = () => bottomSheetRef.current?.expand();
  const handleButtonSheetClose = () => bottomSheetRef.current?.snapToIndex(0);

  const handleButtonResponder = () => {
    bottomSheetRef.current?.expand();

    if (inputResponderRef.current) {
      inputResponderRef.current.focus();
    }
  };

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={styles.containerImagem}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1593270379182-fe1b1f6d67e5?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.containerItens}>
          <View style={styles.containerPublicacao}>
            <Text style={styles.dataPublicacao}>18/04/2024</Text>
            <Text style={styles.informacoesPublicacao}>
              publicado por mateus_oliveira
            </Text>
          </View>
          <View style={styles.containerInformacoes}>
            <View style={styles.containerTextos}>
              <Text style={styles.textoNome}>Nome</Text>
              <Text style={styles.descricao}>Descrição</Text>
              <View style={styles.containerLocalidade}>
                <IconLocalidade />
                <Text style={styles.localidade}>Sinop - MT</Text>
              </View>
            </View>
            <View style={styles.containerIdadeGenero}>
              <View style={styles.containerIdade}>
                <Text style={styles.idade}>5 anos</Text>
              </View>
              <View style={styles.containerGenero}>
                <Text style={styles.genero}>Macho</Text>
              </View>
            </View>
          </View>
          <View style={styles.containerComentarios}>
            <Text style={styles.tituloComentarios}>Comentários</Text>
            {data.length - 1 && (
              <Comentario
                {...data[data.length - 1]}
                onPress={handleButtonResponder}
              />
            )}
            <TouchableOpacity onPress={handleButtonSheetOpen}>
              <Text style={styles.buttonComentarios}>
                Ver todos os comentários
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ComentariosTodos
          ref={bottomSheetRef}
          onClose={handleButtonSheetClose}
          inputRef={inputResponderRef}
          onPress={handleButtonResponder}
          data={data}
        />
      </View>
    </>
  );
};
