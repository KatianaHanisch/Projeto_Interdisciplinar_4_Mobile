interface TerceiraEtapaProps {
  handleSelecionaImagem: () => void;
  handleRemoverImagem: (index: number) => void;
  imagens: ImagemProps[];
}

interface ImagemProps {
  uri: string | undefined;
  nome: string | undefined;
}
