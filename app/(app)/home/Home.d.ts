interface ImagesProps {
  id: string;
  url: string;
  created_at: string;
}

interface PostProps {
  id: string;
  name: string;
  age: string;
  description: string;
  uf: string;
  city: string;
  sex: string;
  type: string;
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

interface Error {
  message: string[];
  statusCode: number;
}

interface EstadoProps {
  id: number;
  sigla: string;
  nome: string;
}

interface FormProps {
  uf: string;
}
