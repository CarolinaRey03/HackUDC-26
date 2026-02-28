import "@/styles/index.css";
import "@/App.css";
import Split from "react-split";
import { Panel } from "@/Modules/Panel";
import { SearchBar } from "@/Modules/SearchBar";
import { Docs } from "@/Modules/Docs";
import { ToastProvider } from "@/Modules/ToastMsg";
import { getScriptSplitSizes, setScriptSplitSizes } from "@/utls/localStorage";
import { getAllDocs, getFilteredDocs } from "@/api";
import { RESULTS_LIMIT } from "@/utls/constants";
import { useDocs } from "@/Context/DocsContext";
import { toastMsg } from "@/utls/toastMsg";
import useI18n from "@/hooks/useI18n";

function Home() {
  const { updateDocs } = useDocs();
  const { translate } = useI18n();

  const getSizes = (): number[] => {
    return getScriptSplitSizes() ?? [50, 50];
  };

  const onSearch = (query: string) => {
    getFilteredDocs(query, RESULTS_LIMIT)
      .then(updateDocs)
      .catch(() => toastMsg.error(translate("error.fetch.filtered_docs")));
  };

  const onSearchNoQuery = () => {
    getAllDocs(RESULTS_LIMIT)
      .then(updateDocs)
      .catch(() => toastMsg.error(translate("error.fetch.all_docs")));
  };

  return (
    <>
      <ToastProvider />
      <div className="home bg">
        <Split className="split" sizes={getSizes()} onDragEnd={setScriptSplitSizes}>
          <Panel>
            <Docs />
          </Panel>
          <Panel>
            <SearchBar
              onSearch={onSearch}
              onSearchNoQuery={onSearchNoQuery}
              placeholder={translate("searchbar.placeholder.deep_search")}
            />
          </Panel>
        </Split>
      </div>
    </>
  );
}

export default Home;
