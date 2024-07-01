export type ButtomSheetProps = {
  onClose: () => void;
  inputRef: React.RefObject<TextInput>;
  handleButtonRespostas?: () => void;
  abrirRespontas?: boolean;
  data: ComentariosProps[] | undefined;
  handleResposta?: (id: string) => void;
  handleInputValue: (value: string) => void;
  handleSubmit: () => void;
  handleSubmitResposta: (id: string) => void;
  flatListRef: React.RefObject<BottomSheetFlatListMethods>;
  inputValue: string;
  carregando: boolean;
  tipoRequisicao: string;
  idComentario: string;
  userImagem: string | null;
  nameResposta?: string | undefined;
};

interface SubCommentsProps {
  id: string;
  description: string;
  created_at: string;
  user: {
    id: string;
    name: string;
    imageUrl: string;
    username: string;
  };
}

interface ImagesProps {
  id: string;
  url: string;
  created_at: string;
}

interface ComentarioProps {
  id: string;
  description: string;
  created_at: string;
  user: {
    id: string;
    name: string;
    imageUrl: string;
    username: string;
  };
  sub_comments: SubCommentsProps[];
}

interface PostProps {
  id: string;
  name: string;
  age: string;
  description: string;
  city: string;
  type: string;
  race: string;
  sex: string;
  createdAt: string;
  uf: string;
  user: {
    id: string;
    email: string;
    name: string;
    imageUrl: string;
    username: string;
  };
  images: ImagesProps[];
  comments: ComentarioProps[];
}

interface Error {
  message: string[];
  statusCode: number;
}
