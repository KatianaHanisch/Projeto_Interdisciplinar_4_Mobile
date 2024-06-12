import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { styles } from "./styles";
import { IconBusca } from "@/assets/icons/icon-busca";
import { CardConversa } from "../card-conversa";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/context/AuthContext";
import { api, api_chat } from "@/services/api";
import { theme } from "@/constants";
import { Client } from "@stomp/stompjs";
import { Button } from "../button";
import { IconClose } from "@/assets/icons/icon-close";
import { SnackBar } from "../snack-bar";

interface Props {
  id: string;
  chatId: string;
  isBlocked: boolean;
  senderId: string;
  recipientId: string;
  status: boolean;
  sender: {
    name?: string;
    imageUrl?: string | undefined;
  };
  lastMessage: string;
}

export function ModalChat() {
  const router = useRouter();
  const { authState } = useAuth();
  const [carregando, setCarregando] = useState<boolean>();
  const [conversas, setConversas] = useState<Props[]>([]);
  const [idConversa, setIdConversa] = useState<string>("");
  const [abrirModal, setAbrirModal] = useState<boolean>(false);
  const [abrirSnack, setAbrirSnack] = useState<boolean>(false);
  const [tipoSnack, setTipoSnack] = useState<string>("");
  const [mensagemSnack, setMensagemSnack] = useState<string>("");
  const [idBloquear, setIdBloquear] = useState<string>("");
  const [bloqueado, setBloqueado] = useState<boolean>(false);
  const client = useRef<Client | null>(null);

  const fetcherDados = async () => {
    const idUser = await AsyncStorage.getItem("id");
    setCarregando(true);

    try {
      const response = await api.get(`/messages/${idUser}`, {
        headers: {
          Authorization: `Bearer ${authState?.token}`,
        },
      });

      if (response.status === 200) {
        setConversas(response.data.reverse());
        setTimeout(() => {
          setCarregando(false);
        }, 300);
      }
    } catch (error) {
      setCarregando(false);
      console.log(error);
    }
  };

  const bloquearUsuario = async () => {
    setCarregando(true);

    try {
      const response = await api.post(
        `/messages/block?id=${idBloquear}`,
        {},
        {
          headers: {
            Authorization: authState?.token,
          },
        }
      );

      if (response.status === 200) {
        setCarregando(false);
        setAbrirModal(false);
        setAbrirSnack(true);
        fetcherDados();

        setMensagemSnack(
          bloqueado
            ? "Usuário desbloqueado com sucesso!"
            : "Usuário bloqueado com sucesso!"
        );
        setTipoSnack("sucesso");
        setTimeout(() => {
          setAbrirSnack(false);
        }, 4000);
      }
    } catch (error) {
      setCarregando(false);
      setAbrirModal(false);
      setAbrirSnack(true);
      setMensagemSnack("Erro ao bloquear usuário!");
      setTipoSnack("falha");
      setTimeout(() => {
        setAbrirSnack(false);
      }, 4000);
      console.log(error);
    }
  };

  const handleConversa = (id: string, nome: string, imagem: string) => {
    router.navigate(
      `/chat-conversa/${id}?nome=${encodeURIComponent(
        nome
      )}&imagem=${encodeURIComponent(imagem)}`
    );
  };

  useEffect(() => {
    const connect = async () => {
      const id = await AsyncStorage.getItem("id");
      client.current = new Client({
        brokerURL: `${api_chat}/wss?id=${id}`,
        onConnect: () => {
          client.current?.subscribe(`/user/${id}/queue/messages`, () => {
            fetcherDados();
          });
        },
        onStompError: (frame) => {
          console.log("Broker reported error: " + frame.headers["message"]);
          console.log("Additional details: " + frame.body);
        },
        onWebSocketError: (error) => {
          console.log("WebSocket error: ", error);
        },
        forceBinaryWSFrames: true,
        appendMissingNULLonIncoming: true,
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });
      client.current.activate();
    };

    connect();
    fetcherDados();

    return () => {
      if (client.current) {
        client.current.deactivate();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      {abrirSnack && (
        <View style={{ width: "100%", top: 10, zIndex: 5 }}>
          <SnackBar
            mensagem={mensagemSnack}
            tipo={tipoSnack}
            onClose={() => setAbrirSnack(false)}
          />
        </View>
      )}
      {abrirModal && (
        <View style={styles.container2}>
          <View style={styles.containerModal}>
            <View style={styles.containerHeader}>
              <Text style={styles.textoHeader}>
                {bloqueado
                  ? "Deseja desbloquear esse usuário?"
                  : "Deseja bloquear esse usuário?"}
              </Text>
              <TouchableOpacity onPress={() => setAbrirModal(false)}>
                <IconClose />
              </TouchableOpacity>
            </View>
            <View style={styles.containerDados}>
              <View style={styles.containerInformaçoes}></View>
              <Button
                titulo="Confirmar"
                carregando={carregando}
                disabled={carregando}
                onPress={bloquearUsuario}
              />
            </View>
          </View>
        </View>
      )}
      <TouchableOpacity onPress={() => setIdConversa("")} activeOpacity={1}>
        <View style={styles.containerHeaderModal}>
          <Text style={styles.tituloHeader}>Conversas</Text>
          <View style={styles.containerIcone}>
            <IconBusca />
          </View>
        </View>

        {carregando ? (
          <View style={styles.containerCarregamento}>
            <ActivityIndicator
              size={50}
              color={theme.colors.orangePrimaryDark}
            />
          </View>
        ) : (
          <>
            <SafeAreaView style={styles.containerLista}>
              <FlatList
                data={conversas}
                renderItem={({ item }) => (
                  <CardConversa
                    {...item}
                    setBloqueado={setBloqueado}
                    idBloquear={setIdBloquear}
                    abrirModal={setAbrirModal}
                    ultimaMensagem={item.lastMessage}
                    imagem={item.sender?.imageUrl}
                    idConversa={idConversa}
                    setIdConversa={setIdConversa}
                    nome={item.sender?.name}
                    onPress={handleConversa}
                    isBlocked={item.isBlocked}
                    id={item.id}
                    fetch={fetcherDados}
                  />
                )}
                keyExtractor={(item) => item.id}
              />
            </SafeAreaView>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}
