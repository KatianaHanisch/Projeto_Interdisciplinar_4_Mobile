interface ExibirComentariosProps {
  onPress: () => void;
  handleButtonRespostas?: () => void;
  id: string;
  publicacao: string;
  nome_usuario: string;
  description: string;
  imagem: string;
  quantidadeDeRespostas: number;
  abrirRespontas?: boolean;
  comentarios?: Comentario[];
}
