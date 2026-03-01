import "@/styles/index.css";
import "@/App.css";
import Split from "react-split";
import { Panel } from "@/Modules/Panel";
import { Docs } from "@/Modules/Docs";
import { ToastProvider } from "@/Modules/ToastMsg";
import { getScriptSplitSizes, setScriptSplitSizes } from "@/utls/localStorage";
import { DeepSearch } from "@/Modules/DeepSearch";
import { useDocs } from "@/Context/DocsContext";

function Home() {
  const { currentDoc } = useDocs();
  const getSizes = (): number[] => {
    return getScriptSplitSizes() ?? [50, 50];
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
            <DeepSearch />
          </Panel>
        </Split>
      </div>
    </>
  );
}

export default Home;
