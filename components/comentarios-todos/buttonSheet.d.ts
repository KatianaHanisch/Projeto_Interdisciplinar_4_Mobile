export type ButtomSheetProps = {
  onClose: () => void;
  onPress: () => void;
  inputRef: React.RefObject<TextInput>;
  handleButtonRespostas?: () => void;
  abrirRespontas?: boolean;
  data: ComentariosProps[];
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
