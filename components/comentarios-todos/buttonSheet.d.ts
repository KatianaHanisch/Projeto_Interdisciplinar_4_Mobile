import { Comentario } from "./../comentario/index";
export type ButtomSheetProps = {
  onClose: () => void;
  onPress: () => void;
  inputRef: React.RefObject<TextInput>;
  data: ComentariosProps[];
};

interface ComentariosProps {
  id: string;
  publicacao: string;
  nome_usuario: string;
  description: string;
  imagem: string;
  quantidadeDeRespostas: number;
}
