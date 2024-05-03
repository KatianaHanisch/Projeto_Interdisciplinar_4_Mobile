import { View, Text, SafeAreaView } from "react-native";
import { styles } from "./styles";
import { IconBusca } from "@/assets/icons/icon-busca";
import { CardConversa } from "../card-conversa";

import { mensagens } from "../../data.json";
import { FlatList } from "react-native";
import { useRouter } from "expo-router";

export function ModalChat() {
  const router = useRouter();

  const handleConversa = (id: string) => {
    router.navigate(`/chat-conversa/${id}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHeaderModal}>
        <Text style={styles.tituloHeader}>Conversas</Text>
        <View style={styles.containerIcone}>
          <IconBusca />
        </View>
      </View>
      <SafeAreaView style={styles.containerLista}>
        <FlatList
          data={mensagens}
          renderItem={({ item }) => (
            <CardConversa {...item} onPress={handleConversa} />
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </View>
  );
}
