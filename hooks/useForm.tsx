import { useState } from "react";

type UseFormProps<T> = {
  initialValues?: T;
  etapas?: React.ReactNode[];
};

export const useForm = <T extends {}>({
  initialValues,
  etapas,
}: UseFormProps<T>) => {
  const [formData, setFormData] = useState<T>(initialValues!);
  const [currentEtapa, setCurrentEtapa] = useState<number>(0);

  const handleInputChange = (field: keyof T, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const changeEtapa = (i: number) => {
    if (etapas && (i < 0 || i >= etapas.length)) return;

    setCurrentEtapa(i);
  };

  return {
    formData,
    handleInputChange,
    setFormData,
    currentEtapa,
    currentComponent: etapas ? etapas[currentEtapa] : null,
    changeEtapa,
    ultimaEtapa: etapas ? currentEtapa + 1 === etapas.length : false,
    primeiraEtapa: etapas ? currentEtapa === 0 : false,
  };
};
