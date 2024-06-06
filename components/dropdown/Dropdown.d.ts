interface DropdownProps<T> {
  data: T[];
  value: string;
  name: string;
  textoDropdown: string;
  handleInputChange: (field: string, value: string) => void;
  renderItem: (item: T, isSelected: boolean) => React.ReactNode;
  renderButtonLabel: (item: T) => string;
  getValue: (item: T) => string;
}
