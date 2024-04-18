import { View, Text, StyleSheet, Image } from "react-native";

import { theme } from "@/constants";

import { IconLocalidade } from "@/assets/icons/icon-localidade";
import { IconGeneroMasculino } from "@/assets/icons/icon-genero-masculino";
import { IconGeneroFeminino } from "@/assets/icons/icon-genero-feminino";

interface PostProps {
  nome: string;
  idade: number;
  cidade: string;
  uf: string;
  genero: string;
  imagem: string;
}

export function Post({ nome, idade, cidade, uf, genero, imagem }: PostProps) {
  return (
    <View style={styles.containerPost}>
      <View style={styles.containerImage}>
        <Image source={{ uri: imagem }} style={styles.image} />
      </View>
      <View style={styles.containerTextos}>
        <View style={styles.containerTitulo}>
          <Text style={styles.tituloNome}>{nome}</Text>
          {genero === "masculino" ? (
            <IconGeneroMasculino />
          ) : (
            <IconGeneroFeminino />
          )}
        </View>
        <Text style={styles.textoIdade}>{idade} anos</Text>
        <View style={styles.containerLocalidade}>
          <IconLocalidade />
          <Text style={styles.textoCidade}>{`${cidade} - ${uf}`}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerPost: {
    alignItems: "center",
    flexDirection: "row",
    width: "95%",
    height: 135,
    marginBottom: 20,
    borderRadius: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: { width: 8, height: 10 },
  },
  containerImage: {
    width: 125,
    height: 135,
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  containerTextos: {
    width: "67%",
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 15,
    paddingLeft: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: theme.colors.white,
    marginLeft: -10,
    zIndex: -1,
  },
  containerTitulo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingRight: 5,
  },
  tituloNome: {
    fontSize: 20,
    fontFamily: theme.fontFamily.montserrat.semiBold,
    color: theme.colors.grayMedium,
  },
  textoIdade: {
    fontSize: 14,
    fontFamily: theme.fontFamily.raleway.regular,
    color: theme.colors.grayMedium,
  },
  containerLocalidade: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 3,
    marginTop: 5,
  },
  textoCidade: {
    fontFamily: theme.fontFamily.raleway.light,
    color: theme.colors.grayMedium,
    fontSize: 12,
  },
});
