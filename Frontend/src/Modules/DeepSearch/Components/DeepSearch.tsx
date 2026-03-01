import { useState, useEffect } from "react";
import { SearchBar } from "@/Modules/SearchBar";
import BodyText from "@/Modules/Common/Components/BodyText";
import useI18n from "@/hooks/useI18n";
import { getAllDocs, getFilteredDocs } from "@/api";
import { useDocs } from "@/Context/DocsContext";
import { toastMsg } from "@/utls/toastMsg";
import { RESULTS_LIMIT } from "@/utls/constants";
import PerrilloIcon from "@/assets/icon.svg?react";
import TurnLeftIcon from "@/assets/turn-left.svg?react";
import { DocViewer } from "@/Modules/DocViewer";

export default function DeepSearch() {
  const { updateDocs, currentDoc } = useDocs();
  const { translate } = useI18n();

  const [queryWritten, setQueryWritten] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Efecto para inicializar el Welcome con la clase --show al cargar
  useEffect(() => {
    if (!queryWritten) {
      const timer = setTimeout(() => {
        const el = document.querySelector(".deepsearch__welcome");
        if (el) el.classList.add("deepsearch__welcome--show");
      }, 50);
      return () => clearTimeout(timer);
    }
  }, []); // Se ejecuta solo al montar

  const onSearch = (query: string) => {
    setQueryWritten(true);
    setIsExiting(false);

    getFilteredDocs(query, RESULTS_LIMIT)
      .then(updateDocs)
      .catch(() => toastMsg.error(translate("error.fetch.filtered_docs")));
  };

  const onSearchNoQuery = () => {
    setIsExiting(true);

    // Esperamos a que termine la animación (350ms según CSS)
    setTimeout(() => {
      setIsExiting(false);
      setQueryWritten(false);

      getAllDocs(RESULTS_LIMIT)
        .then(updateDocs)
        .catch(() => toastMsg.error(translate("error.fetch.all_docs")));
    }, 350);
  };

  const getLookLeftClasses = () => {
    if (isExiting) return "deepsearch__look-left deepsearch__look-left--hide";
    if (queryWritten) return "deepsearch__look-left deepsearch__look-left--show";
    return "deepsearch__look-left";
  };

  const getWelcomeClasses = () => {
    if (!queryWritten && !isExiting) return "deepsearch__welcome deepsearch__welcome--show";
    return "deepsearch__welcome";
  };

  return (
    <div className="deepsearch">
      {currentDoc ? (
        <DocViewer file={currentDoc} />
      ) : (
        <>
          <div className={getLookLeftClasses()}>
            <TurnLeftIcon />
            <BodyText>{translate("deepsearch.lookleft")}</BodyText>
          </div>

          <div className={getWelcomeClasses()}>
            <PerrilloIcon />
            <BodyText>{translate("deepsearch.welcome")}</BodyText>
          </div>
        </>
      )}

      <SearchBar
        onSearch={onSearch}
        onSearchNoQuery={onSearchNoQuery}
        placeholder={translate("searchbar.placeholder.deep_search")}
      />
    </div>
  );
}
