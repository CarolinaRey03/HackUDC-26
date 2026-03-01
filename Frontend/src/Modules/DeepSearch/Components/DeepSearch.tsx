import { useState, useEffect, useRef } from "react";
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
import { Filters } from "@/Modules/Filters";
import banner from "@/assets/banner.png";

export default function DeepSearch() {
  const { updateDocs, currentDoc, currentFilters, updateFilters } = useDocs();
  const { translate } = useI18n();

  const [queryWritten, setQueryWritten] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const isFirstRender = useRef(true);

  useEffect(() => {
    const hasActiveFilters =
      (currentFilters.query && currentFilters.query.trim() !== "") ||
      currentFilters.date ||
      currentFilters.language ||
      currentFilters.limit ||
      currentFilters.type;

    if (!queryWritten && !hasActiveFilters) {
      const timer = setTimeout(() => {
        const el = document.querySelector(".deepsearch__welcome");
        if (el) el.classList.add("deepsearch__welcome--show");
      }, 50);
      return () => clearTimeout(timer);
    }
  }, []);

  const onSearch = (query: string) => {
    updateFilters({ ...currentFilters, query });
  };

  const onSearchNoQuery = () => {
    setIsExiting(true);

    if (currentFilters.query && currentFilters.query !== "") {
      updateFilters({ ...currentFilters, query: "" });
    }

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

  // Efecto principal: Carga de datos y control de animaciones
  useEffect(() => {
    const hasActiveFilters =
      (currentFilters.query && currentFilters.query.trim() !== "") ||
      currentFilters.date ||
      currentFilters.language ||
      currentFilters.limit ||
      currentFilters.type;

    // --- LÓGICA DE MONTAJE INICIAL ---
    if (isFirstRender.current) {
      isFirstRender.current = false;

      if (hasActiveFilters) {
        // Caso A: Recarga de página con filtros persistidos -> Buscamos y mostramos look-left
        setQueryWritten(true);
        getFilteredDocs(currentFilters)
          .then(updateDocs)
          .catch(() => toastMsg.error(translate("error.fetch.filtered_docs")));
      } else {
        // Caso B: Carga limpia -> Cargamos todos los docs PERO mantenemos Welcome visualmente
        getAllDocs(RESULTS_LIMIT)
          .then(updateDocs)
          .catch(() => toastMsg.error(translate("error.fetch.all_docs")));
      }
      return; // Salimos para no ejecutar la lógica de actualización estándar
    }

    // --- LÓGICA DE ACTUALIZACIÓN (cuando cambian los filtros después del inicio) ---
    if (hasActiveFilters) {
      setQueryWritten(true);
      setIsExiting(false);

      getFilteredDocs(currentFilters)
        .then(updateDocs)
        .catch(() => toastMsg.error(translate("error.fetch.filtered_docs")));
    } else {
      // Solo ejecutamos la animación de salida si realmente estábamos en modo búsqueda
      if (queryWritten) {
        onSearchNoQuery();
      } else {
        // Caso borde: si se limpiaron filtros sin haber buscado (raro, pero posible)
        // aseguramos que se carguen todos los docs
        getAllDocs(RESULTS_LIMIT)
          .then(updateDocs)
          .catch(() => toastMsg.error(translate("error.fetch.all_docs")));
      }
    }
  }, [currentFilters]);

  return (
    <div className="deepsearch">
      {currentDoc ? (
        <DocViewer file={currentDoc} />
      ) : (
        <>
          <img src={banner} className="deepsearch__banner" alt="Banner" />
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
      <Filters />
      <SearchBar
        onSearch={onSearch}
        onSearchNoQuery={onSearchNoQuery}
        placeholder={translate("searchbar.placeholder.deep_search")}
      />
    </div>
  );
}
