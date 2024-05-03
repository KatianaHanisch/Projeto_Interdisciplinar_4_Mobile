interface CardConversaProps {
  id: string;
  nome: string;
  mensagem: string;
  imagem: string;
  onPress: (id: string) => void;
}
