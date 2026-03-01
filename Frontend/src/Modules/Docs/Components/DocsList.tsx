import { useEffect, useState } from "react";
import Doc from "./Doc";
import Title from "@/Modules/Common/Components/Title";
import useI18n from "@/hooks/useI18n";
import { useDocs } from "@/Context/DocsContext";
import { SearchBar } from "@/Modules/SearchBar";
import { Button } from "@/Modules/Common";
import AddIcon from "@/assets/add.svg?react";
import { FileUploaderModal } from "@/Modules/Modal";
import Selector, { type SelectorOption } from "@/Modules/Common/Components/Selector";
import { useLanguage } from "@/Context/LanguageContext";

function Docs() {
  const { translate } = useI18n();
  const { locale, setLocale } = useLanguage();
  const { docs } = useDocs();
  const [showAddModal, setShowAddModal] = useState(false);

  const [filteredDocs, setFilteredDocs] = useState(docs);

  const languageOptions: SelectorOption[] = [
    { value: "es", label: translate("filter.language.es") },
    { value: "en", label: translate("filter.language.en") },
  ];

  const selectedLanguage = languageOptions.find((opt) => opt.value === locale);

  const onSearch = (fileName: string) => {
    setFilteredDocs(docs.filter((doc) => doc.name.toLocaleLowerCase().startsWith(fileName.toLocaleLowerCase())));
  };

  const onSearchNoQuery = () => {
    setFilteredDocs(docs);
  };

  const onAddDoc = () => {
    setShowAddModal((prev) => !prev);
  };

  useEffect(() => {
    setFilteredDocs(docs);
  }, [docs]);

  return (
    <>
      <div className="docs">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <Title style={{ margin: 0 }}>{translate("explorer")}</Title>
          <div style={{ width: "150px" }}>
            <Selector
              options={languageOptions}
              selectedOption={selectedLanguage}
              updateSelectedOption={(option) => setLocale(option.value as "en" | "es")}
              placeholder={translate("filter.language.placeholder")}
              showNoneOption={false}
            />
          </div>
        </div>
        <SearchBar
          placeholder={translate("searchbar.placeholder.file_name")}
          onSearch={onSearch}
          onSearchNoQuery={onSearchNoQuery}
        />
        <ul className="docs__list">
          {filteredDocs.map((doc) => (
            <Doc key={doc.id} doc={doc} />
          ))}
        </ul>
        <span className="docs__bottom">
          <Button className="docs__add-btn" onClick={onAddDoc}>
            <AddIcon />
          </Button>
        </span>
      </div>
      {showAddModal && <FileUploaderModal onClose={onAddDoc} />}
    </>
  );
}

export default Docs;
