export type ButtomSheetProps = {
  onClose: () => void;
  onPress: () => void;
  inputRef: React.RefObject<TextInput>;
  data: ComentariosProps[];
  handleButtonRespostas?: () => void;
  abrirRespontas?: boolean;
};

interface ComentariosProps {
  id: string;
  publicacao: string;
  nome_usuario: string;
  description: string;
  imagem: string;
  quantidadeDeRespostas: number;
  comentarios?: Comentario[];
}
