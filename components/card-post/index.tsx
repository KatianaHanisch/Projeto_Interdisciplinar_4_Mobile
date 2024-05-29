import React from "react";

import { View, Text, Image, TouchableOpacity } from "react-native";

import { IconLocalidade } from "@/assets/icons/icon-localidade";
import { IconGeneroMasculino } from "@/assets/icons/icon-genero-masculino";
import { IconGeneroFeminino } from "@/assets/icons/icon-genero-feminino";

import { styles } from "./styles";
import { api, api_url } from "@/services/api";

export function CardPost({
  id,
  name,
  age,
  city,
  UF,
  sex,
  images,
  handleNavigate,
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
          {sex === "Macho" ? <IconGeneroMasculino /> : <IconGeneroFeminino />}
        </View>
        <Text style={styles.textoIdade}>{age} anos</Text>
        <View style={styles.containerLocalidade}>
          <IconLocalidade />
          <Text style={styles.textoCidade}>{`${city} - ${UF}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
