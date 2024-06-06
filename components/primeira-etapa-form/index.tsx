import React from "react";

import { View, Text, TextInput } from "react-native";

import { styles } from "./styles";

export function PrimeiraEtapaForm({
  data,
  handleInputChange,
}: PrimeiraEtapaFormProps) {
  return (
    <>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do animal"
          value={data.name}
          onChangeText={(text) => handleInputChange("name", text)}
        />
        <Text style={styles.inputMensagem}>*Este campos é opcional</Text>
      </View>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          placeholder="Digite a idade do animal"
          value={data.age}
          onChangeText={(text) => handleInputChange("age", text)}
        />
        <Text style={styles.inputMensagem}>*Este campos é opcional</Text>
      </View>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma breve descrição do animal"
          value={data.description}
          onChangeText={(text) => handleInputChange("description", text)}
        />
        <Text style={styles.inputMensagem}>*Este campos é obrigatório</Text>
      </View>
    </>
  );
}
