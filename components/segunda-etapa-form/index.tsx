import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
import { DropDown } from "../dropdown";

export function SegundaEtapaForm({
  estados,
  municipios,
  data,
  generos,
  tipoAnimal,
  handleInputChange,
}: SegundaEtapaFormProps) {
  return (
    <>
      <View style={styles.containerInput}>
        <DropDown
          data={estados}
          name="uf"
          textoDropdown="Selecione o Estado em que se localiza"
          handleInputChange={(field, value) => {
            handleInputChange(field, value);
          }}
          renderItem={(item, isSelected) => (
            <Text style={styles.dropdownItemTxtStyle}>{item.nome}</Text>
          )}
          renderButtonLabel={(item) => item.nome}
          value={data.uf}
          getValue={(item) => item.sigla}
        />
        <Text style={styles.inputMensagem}>*Este campo é obrigatório</Text>
      </View>
      {data.uf === "" ? null : (
        <View style={styles.containerInput}>
          <DropDown
            data={municipios}
            name="city"
            textoDropdown="Selecione a cidade em que se localiza"
            handleInputChange={handleInputChange}
            renderItem={(item, isSelected) => (
              <Text style={styles.dropdownItemTxtStyle}>{item.nome}</Text>
            )}
            renderButtonLabel={(item) => item.nome}
            getValue={(item) => item.nome}
            value={data.city}
          />
          <Text style={styles.inputMensagem}>*Este campo é obrigatório</Text>
        </View>
      )}
      <View style={styles.containerInput}>
        <DropDown
          data={tipoAnimal}
          name="type"
          textoDropdown="Selecione o tipo do animal"
          handleInputChange={handleInputChange}
          renderItem={(item, isSelected) => (
            <Text style={styles.dropdownItemTxtStyle}>{item.nome}</Text>
          )}
          renderButtonLabel={(item) => item.nome}
          getValue={(item) => item.nome}
          value={data.type}
        />
        <Text style={styles.inputMensagem}>*Este campo é obrigatório</Text>
      </View>
      <View style={styles.containerInput}>
        <DropDown
          data={generos}
          name="sex"
          textoDropdown="Selecione o gênero do animal"
          handleInputChange={handleInputChange}
          renderItem={(item, isSelected) => (
            <Text style={styles.dropdownItemTxtStyle}>{item.nome}</Text>
          )}
          renderButtonLabel={(item) => item.nome}
          getValue={(item) => item.nome}
          value={data.sex}
        />
        <Text style={styles.inputMensagem}>*Este campo é obrigatório</Text>
      </View>
    </>
  );
}
