import Selector, { type SelectorOption } from "@/Modules/Common/Components/Selector";
import useI18n from "@/hooks/useI18n";

interface SortSelectorProps {
  sortOrder: "asc" | "desc" | "none";
  setSortOrder: (order: "asc" | "desc" | "none") => void;
}

const SortSelector = ({ sortOrder, setSortOrder }: SortSelectorProps) => {
  const { translate } = useI18n();

  const options: SelectorOption[] = [
    { value: "asc", label: translate("filter.sort.asc") },
    { value: "desc", label: translate("filter.sort.desc") },
  ];

  const selectedOption = options.find((opt) => opt.value === sortOrder);

  return (
    <Selector
      options={options}
      selectedOption={selectedOption}
      updateSelectedOption={(option) => setSortOrder((option.value as "asc" | "desc" | "") || "none")}
      placeholder={translate("filter.sort.placeholder")}
      showNoneOption={true}
    />
  );
};

export default SortSelector;
