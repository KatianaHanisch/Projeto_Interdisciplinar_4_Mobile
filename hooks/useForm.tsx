import { useState } from "react";

type UseFormProps<T> = {
  initialValues: T;
};

export const useForm = <T extends {}>({ initialValues }: UseFormProps<T>) => {
  const [formData, setFormData] = useState<T>(initialValues);

  const handleInputChange = (field: keyof T, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return {
    formData,
    handleInputChange,
    setFormData,
  };
};
