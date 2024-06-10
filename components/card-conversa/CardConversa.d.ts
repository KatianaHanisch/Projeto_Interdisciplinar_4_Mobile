interface CardConversaProps {
  id: string;
  chatId: string;
  senderId: string;
  recipientId: string;
  // status: boolean;
  isBlocked: boolean;
  nome?: string;
  imagem?: string | undefined;
  ultimaMensagem: string;
  idConversa: string;
  setBloqueado: State;
  setIdConversa: State;
  abrirModal: State;
  idBloquear: State;
  onPress: (id: string, nome: string, imagem: string) => void;
  fetch: () => void;
}
