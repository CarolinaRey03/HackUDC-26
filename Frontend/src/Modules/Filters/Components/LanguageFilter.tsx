import { useDocs } from "@/Context/DocsContext";
import useI18n from "@/hooks/useI18n";
import { Selector } from "@/Modules/Common";
import type { SelectorOption } from "@/Modules/Common/Components/Selector";

function LanguageFilter() {
  const { translate } = useI18n();
  const { currentFilters, updateFilters } = useDocs();

  const options: SelectorOption[] = [
    { value: "en", label: translate("filter.language.en") },
    { value: "es", label: translate("filter.language.es") },
  ];

  const updateOption = (option: SelectorOption) => {
    if (option.value === "") {
      delete currentFilters.language;
      updateFilters({ ...currentFilters });
    } else {
      updateFilters({ ...currentFilters, language: option.value });
    }
  };

  const getCurrentOption = (): SelectorOption | undefined => {
    return options.find((option) => option.value === currentFilters.language);
  };

  return (
    <Selector
      options={options}
      selectedOption={getCurrentOption()}
      updateSelectedOption={updateOption}
      placeholder={translate("filter.language.placeholder")}
    />
  );
}

export default LanguageFilter;
