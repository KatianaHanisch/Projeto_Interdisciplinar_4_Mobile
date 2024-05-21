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

interface ExibirComentariosProps {
  onPress?: () => void;
  handleButtonRespostas?: () => void;
  abrirRespontas?: boolean;
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
