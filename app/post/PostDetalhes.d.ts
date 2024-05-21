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

interface PostDetalhesProps {
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
