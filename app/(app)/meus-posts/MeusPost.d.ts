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
