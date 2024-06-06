interface EstadoProps {
  id: number;
  sigla: string;
  nome: string;
}

interface MunicipioProps {
  id: number;
  nome: string;
}

interface ImagemProps {
  uri: string | undefined;
  nome: string | undefined;
}

interface FormDataProps {
  name: string;
  age: string;
  description: string;
  city: string;
  uf: string;
  sex: string;
  race: string;
  type: string;
  images: ImagemProps[];
}
