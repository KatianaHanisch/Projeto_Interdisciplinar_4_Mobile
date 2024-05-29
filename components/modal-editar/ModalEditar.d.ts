interface ModalEditarProps {
  handleFecharModal: () => void;
  handleFocusInput: (input: "input1" | "input2") => void;
  handleRemoverImagem: () => void;
  handleInputChange: (field: keyof UsuariosProps, value: string) => void;
  handleSubmit: () => void;
  uploadImage: () => void;
  formData: UsuariosProps;
  buttonVisivel: boolean;
  carregando: boolean;
  imageUrl: string | null;
  input1: React.RefObject<TextInput>;
  input2: React.RefObject<TextInput>;
}
interface UsuariosProps {
  id?: string | null;
  name: string | null;
  email?: string | null;
  image_url?: string | null;
  password?: string;
}
