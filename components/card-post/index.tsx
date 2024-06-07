import React from "react";

import { View, Text, Image, TouchableOpacity } from "react-native";

import { IconLocalidade } from "@/assets/icons/icon-localidade";
import { IconGeneroMasculino } from "@/assets/icons/icon-genero-masculino";
import { IconGeneroFeminino } from "@/assets/icons/icon-genero-feminino";

import { styles } from "./styles";
import { api_url } from "@/services/api";

export function CardPost({
  id,
  name,
  age,
  city,
  uf,
  sex,
  images,
  tipoPost,
  handleNavigate,
  handleDelete,
}: CardPostProps) {
  return (
    <TouchableOpacity
      style={styles.containerPost}
      onPress={() => handleNavigate(id)}
    >
      <View style={styles.containerImage}>
        <Image
          source={{
            uri: `${api_url}/uploads/posts/${images[0]?.url}`,
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.containerTextos}>
        <View style={styles.containerTitulo}>
          <Text style={styles.tituloNome}>{name}</Text>
          {sex.toLocaleLowerCase() === "macho" ? (
            <IconGeneroMasculino />
          ) : (
            <IconGeneroFeminino />
          )}
        </View>
        <Text style={styles.textoIdade}>{age} anos</Text>
        <View style={styles.containerLocalidade}>
          <IconLocalidade />
          <Text style={styles.textoCidade}>{`${city} - ${uf}`}</Text>
        </View>
        {tipoPost === "meusPosts" && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleDelete!(id)}
          >
            <Text style={styles.buttonText}>Remover post</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}
