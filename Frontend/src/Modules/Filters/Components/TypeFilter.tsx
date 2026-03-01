import { useDocs } from "@/Context/DocsContext";
import useI18n from "@/hooks/useI18n";
import { Selector } from "@/Modules/Common";
import type { SelectorOption } from "@/Modules/Common/Components/Selector";

function TypeFilter() {
  const { translate } = useI18n();
  const { currentFilters, updateFilters } = useDocs();

  const options: SelectorOption[] = [
    { value: ".pdf", label: translate("filter.type.pdf") || "PDF" },
    { value: ".docx", label: translate("filter.type.docx") || "DOCX" },
    { value: ".odt", label: translate("filter.type.odt") || "ODT" },
    { value: ".csv", label: translate("filter.type.csv") || "CSV" },
    { value: ".txt", label: translate("filter.type.txt") || "TXT" },
    { value: ".xls", label: translate("filter.type.xls") || "XLS" },
    { value: ".ods", label: translate("filter.type.ods") || "ODS" },
    { value: ".xlsx", label: translate("filter.type.xlsx") || "XLSX" },
  ];

  const updateOption = (option: SelectorOption) => {
    const newFilters = { ...currentFilters };

    if (option.value === "") {
      delete newFilters.type;
      updateFilters(newFilters);
    } else {
      updateFilters({ ...newFilters, type: option.value });
    }
  };

  const getCurrentOption = (): SelectorOption | undefined => {
    return options.find((option) => option.value === currentFilters.type);
  };

  return (
    <Selector
      options={options}
      selectedOption={getCurrentOption()}
      updateSelectedOption={updateOption}
      placeholder={translate("filter.type.placeholder")}
    />
  );
}

export default TypeFilter;
