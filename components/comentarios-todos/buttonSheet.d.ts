export type ButtomSheetProps = {
  onClose: () => void;
  onPress: () => void;
  inputRef: React.RefObject<TextInput>;
  data: ComentariosProps[];
  handleButtonRespostas?: () => void;
  abrirRespontas?: boolean;
};

interface ComentarioProps {
  id: string;
  publicacao: string;
  nome_usuario: string;
  description: string;
  imagem: string;
}

interface ComentariosProps {
  id: string;
  nome: string;
  idade: number;
  cidade: string;
  uf: string;
  genero: string;
  responsavelPublicacao: string;
  dataPublicacao: string;
  descricao: string;
  imagens: string[];
  comentariosDoPost?: {
    publicacao: string;
    nome_usuario: string;
    description: string;
    imagem: string;
    quantidadeDeRespostas: number;
    comentarios: ComentarioProps[];
  };
}
