interface ModalFiltroProps {
  handleDropdownChange: (name: string, value: string) => void;
  handleCloseFiltro: () => void;
  estados: { id: number; sigla: string; nome: string }[];
  fetcherPostsPorRegiao: (uf: string) => void;
  formData: { uf: string };
  carregando: boolean;
}

interface EstadoProps {
  id: number;
  sigla: string;
  nome: string;
}

interface FormProps {
  uf: string;
}
