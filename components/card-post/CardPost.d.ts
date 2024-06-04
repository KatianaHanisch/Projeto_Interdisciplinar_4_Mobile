interface ImagesProps {
  id: string;
  url: string;
  created_at: string;
}

interface CardPostProps {
  id: string;
  name: string;
  age: string;
  description: string;
  uf: string;
  city: string;
  sex: string;
  race: string;
  createdAt: string;
  user: {
    id: string;
    email: string;
    name: string;
    imageUrl: string;
    username: string;
  };
  images: ImagesProps[];
  handleNavigate: (id: string) => void;
  handleDelete?: (id: string) => void;
  tipoPost: string;
}

interface PostProps {
  id: string;
  name: string;
  description: string;
  UF: string;
  city: string;
  sex: string;
  race: string;
  createdAt: string;
  user: {
    id: string;
    email: string;
    name: string;
    imageUrl: string;
    username: string;
  };
  images: ImagesProps[];
}
