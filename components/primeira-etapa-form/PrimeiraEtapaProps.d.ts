interface PrimeiraEtapaFormProps {
  data: FormDataProps;
  handleInputChange: (field: string, value: string) => void;
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
