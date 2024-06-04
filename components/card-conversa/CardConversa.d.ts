interface CardConversaProps {
  id: string;
  chatId: string;
  senderId: string;
  recipientId: string;
  status: boolean;
  nome: string;
  imagem: string;
  ultimaMensagem: string;
  idConversa: string;
  setIdConversa: State;
  abrirModal: State;
  idBloquear: State;
  onPress: (id: string, nome: string, imagem: string) => void;
  fetch: () => void;
  bloquearUsuario: (id: string) => void;
}
