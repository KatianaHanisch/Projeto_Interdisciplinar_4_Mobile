interface ComentarioProps {
  id: string;
  publicacao: string;
  nome_usuario: string;
  description: string;
  imagem: string;
}

interface ExibirComentariosProps {
  onPress: () => void;
  handleButtonRespostas?: () => void;
  abrirRespontas?: boolean;
  id: string;
  nome: string;
  idade: number;
  cidade: string;
  uf: string;
  genero: string;
  responsavelPublicacao: string;
  dataPublicacao: string;
  descricao: string;
  imagem: string;
  comentariosDoPost?: {
    publicacao: string;
    nome_usuario: string;
    description: string;
    imagem: string;
    quantidadeDeRespostas: number;
    comentarios: ComentarioProps[];
  };
}