interface CardConversaProps {
  id: string;
  chatId: string;
  senderId: string;
  recipientId: string;
  status: boolean;
  nome: string;
  imagem: string;

  idConversa: string;
  setIdConversa: State;
  onPress: (id: string, nome: string, imagem: string) => void;
  fetch: () => void;
}
