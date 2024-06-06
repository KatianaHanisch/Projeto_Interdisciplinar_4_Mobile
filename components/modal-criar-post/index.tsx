import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Keyboard } from "react-native";
import axios, { AxiosError } from "axios";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";

import { EtapasForm } from "../etapas-form";
import { PrimeiraEtapaForm } from "../primeira-etapa-form";
import { SegundaEtapaForm } from "../segunda-etapa-form";
import { TerceiraEtapaForm } from "../terceira-etapa-form";

import { useForm } from "@/hooks/useForm";

import { Entypo } from "@expo/vector-icons";
import { styles } from "./styles";
import { api } from "@/services/api";
import { useAuth } from "@/context/AuthContext";

const formTemplate = {
  name: "",
  age: "",
  description: "",
  city: "",
  uf: "",
  sex: "",
  race: "indefinido",
  type: "",
  images: [],
};

const generos = [
  {
    id: 1,
    nome: "Macho",
  },
  {
    id: 2,
    nome: "Femea",
  },
];

const tipoAnimal = [
  {
    id: 1,
    nome: "Cachorro",
  },
  {
    id: 2,
    nome: "Gato",
  },
];

export function ModalCriarPost() {
  const [estados, setEstados] = useState<EstadoProps[]>([]);
  const [municipios, setMunicipios] = useState<MunicipioProps[]>([]);
  const [imagens, setImagens] = useState<ImagemProps[]>([]);
  const [formData, setFormData] = useState<FormDataProps>(formTemplate);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const { authState } = useAuth();

  const selecionarImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 4,
    });

    if (!result.canceled) {
      const novasImagens = result.assets.map((asset) => ({
        uri: asset.uri,
        nome: asset.fileName || asset.uri.split("/").pop(),
      }));
      setImagens([...imagens, ...novasImagens].slice(0, 4));
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleRemoverImagem = (index: number) => {
    const novasImagens = imagens.filter((_, i) => i !== index);
    setImagens(novasImagens);
  };

  const handleSubmit = async () => {
    const form: any = new FormData();

    console.log(formData);

    form.append("name", formData.name);
    form.append("age", formData.age);
    form.append("description", formData.description);
    form.append("city", formData.city);
    form.append("uf", formData.uf);
    form.append("sex", formData.sex);
    form.append("race", formData.race);
    form.append("type", formData.type);

    // form.append("image", {
    //   uri: imagens[0].uri,
    //   type: mime.getType(imagens[0]),
    //   name: image.split("/").pop(),
    // });

    // imagens.forEach((imagem) => {
    //   form.append("images", {
    //     uri: imagem.uri,
    //     type: mime.getType(imagem.uri!),
    //     name: imagem.nome,
    //   });
    // });

    // // Append other form data
    // for (const key in formData) {
    //   if (key !== "images") {
    //     form.append(key, formData[key]);
    //   }
    // }

    if (imagens.length > 0) {
      for (const image of imagens) {
        console.log(image);
        form.append("images", {
          uri: image.uri,
          type: mime.getType(image.uri!),
          name: image.nome,
        });
      }
    }

    try {
      const response = await api.post("/posts/post", form, {
        headers: {
          Authorization: authState?.token,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        alert("Post criado com sucesso!");
      }
    } catch (err) {
      const error = err as AxiosError<Error>;
      console.error(error.response?.data.message);
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const formComponentes = [
    <PrimeiraEtapaForm data={formData} handleInputChange={handleInputChange} />,
    <SegundaEtapaForm
      data={formData}
      handleInputChange={handleInputChange}
      estados={estados}
      municipios={municipios}
      generos={generos}
      tipoAnimal={tipoAnimal}
    />,
    <TerceiraEtapaForm
      handleSelecionaImagem={selecionarImage}
      handleRemoverImagem={handleRemoverImagem}
      imagens={imagens}
    />,
  ];

  const {
    currentComponent,
    changeEtapa,
    currentEtapa,
    ultimaEtapa,
    primeiraEtapa,
  } = useForm({ etapas: formComponentes });

  const fetcherEstados = async () => {
    try {
      const response = await axios.get(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      );

      if (response.status === 200) {
        setEstados(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetcherMunicipios = async (uf: string) => {
    try {
      const response = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
      );

      if (response.status === 200) {
        setMunicipios(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetcherEstados();
  }, []);

  useEffect(() => {
    if (formData.uf) {
      fetcherMunicipios(formData.uf);
    }
  }, [formData.uf]);

  return (
    <View style={styles.container}>
      <View
        style={[styles.containerWhite, isKeyboardVisible && { marginTop: 20 }]}
      >
        <Text style={styles.titulo}>Criar Post</Text>
        <EtapasForm currentEtapa={currentEtapa} />
        <View style={styles.containerForm}>{currentComponent}</View>
        <View style={styles.containerButtons}>
          {!primeiraEtapa ? (
            <TouchableOpacity
              style={styles.buttonVoltar}
              onPress={() => changeEtapa(currentEtapa - 1)}
            >
              <View style={styles.iconButtonVoltar}>
                <Entypo name="chevron-left" size={21} color="#F99C64" />
              </View>
              <Text style={styles.textoButtonVoltar}>Anterior</Text>
            </TouchableOpacity>
          ) : (
            <View></View>
          )}
          {ultimaEtapa ? (
            <TouchableOpacity
              style={styles.buttonAvancar}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.textoButtonAvancar}>Criar Post</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.buttonAvancar}
              onPress={() => changeEtapa(currentEtapa + 1)}
            >
              <Text style={styles.textoButtonAvancar}>Próximo</Text>
              <View style={styles.iconButtonAvancar}>
                <Entypo name="chevron-right" size={20} color="#ffffff" />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
