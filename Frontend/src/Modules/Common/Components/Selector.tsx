import useI18n from "@/hooks/useI18n";
import Select from "react-select";

export interface SelectorOption {
  value: string;
  label: string;
}

interface SelectorProps {
  options: SelectorOption[];
  selectedOption: SelectorOption | undefined;
  updateSelectedOption: (option: SelectorOption) => void;
  placeholder: string;
}

const customStyles = {
  // 1. El contenedor principal (input)
  control: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: "var(--color-bg-dark)",
    // Si está en foco, usamos un gris más claro (text-muted), si no, el borde normal
    borderColor: isFocused ? "var(--color-text-muted)" : "var(--color-border)",
    color: "var(--color-text)",
    boxShadow: "none", // Quitamos el brillo azul por defecto
    minHeight: "40px",
    "&:hover": {
      borderColor: "var(--color-text-muted)", // Al pasar el mouse
    },
    borderRadius: "8px",
  }),

  // 2. El menú desplegable
  menu: (styles) => ({
    ...styles,
    backgroundColor: "var(--color-bg-dark)",
    border: "1px solid var(--color-border)",
    boxShadow: "var(--shadow)", // Usamos tu variable de sombra
    zIndex: 9999, // Asegura que flote sobre otros elementos
    borderRadius: "8px", // <--- Para redondear el desplegable
    overflow: "hidden",
  }),

  // 3. Las opciones de la lista
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    // Lógica de fondo:
    // - Seleccionado: bg-light (el gris más claro de tu paleta de fondos)
    // - Hover (Focused): bg (el gris medio)
    // - Normal: Transparente
    backgroundColor: isSelected ? "var(--color-bg-light)" : isFocused ? "var(--color-bg)" : undefined,

    color: "var(--color-text)", // Texto siempre claro
    cursor: "pointer",

    ":active": {
      ...styles[":active"],
      backgroundColor: "var(--color-bg-light)",
    },
  }),

  // 4. El texto del valor seleccionado
  singleValue: (styles) => ({
    ...styles,
    color: "var(--color-text)",
  }),

  // 5. El texto mientras escribes
  input: (styles) => ({
    ...styles,
    color: "var(--color-text)",
  }),

  // 6. El texto de ayuda (Placeholder)
  placeholder: (styles) => ({
    ...styles,
    color: "var(--color-text-muted)",
  }),

  // 7. La flechita de la derecha y la X de limpiar
  dropdownIndicator: (styles, { isFocused }) => ({
    ...styles,
    color: isFocused ? "var(--color-text)" : "var(--color-text-muted)",
    "&:hover": {
      color: "var(--color-text)",
    },
  }),

  clearIndicator: (styles) => ({
    ...styles,
    color: "var(--color-text-muted)",
    "&:hover": {
      color: "var(--color-text)", // Se ilumina al pasar el mouse
    },
  }),

  // 8. La línea separadora entre la X y la flecha
  indicatorSeparator: (styles) => ({
    ...styles,
    backgroundColor: "var(--color-border)",
  }),
};

function Selector({ options, selectedOption, updateSelectedOption, placeholder }: SelectorProps) {
  const { translate } = useI18n();
  const noneOption: SelectorOption = { value: "", label: translate("filter.none") };

  const allOptions = [noneOption, ...options];

  return (
    <Select
      placeholder={placeholder}
      styles={customStyles}
      menuPlacement="top"
      value={selectedOption}
      onChange={(newValue) => {
        if (newValue) updateSelectedOption(newValue as SelectorOption);
      }}
      options={allOptions}
    />
  );
}

export default Selector;
