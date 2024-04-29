interface RespostaComentarioProps {
  id: string;
  publicacao: string;
  nome_usuario: string;
  description: string;
  imagem: string;
  onPress?: () => void;
}
