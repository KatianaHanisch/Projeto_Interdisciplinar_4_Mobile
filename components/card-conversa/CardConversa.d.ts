interface CardConversaProps {
  id: string;
  chatId: string;
  senderId: string;
  recipientId: string;
  status: boolean;
  name: string;

  idConversa: string;
  setIdConversa: State;
  onPress: (id: string, nome: string) => void;
  fetch: () => void;
}
