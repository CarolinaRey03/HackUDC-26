import "@/styles/index.css";
import "@/App.css";
import Split from "react-split";
import { Panel } from "@/Modules/Panel";
import { SearchBar } from "@/Modules/SearchBar";
import { Docs } from "@/Modules/Docs";
import { ToastProvider } from "@/Modules/ToastMsg";

function Home() {
  return (
    <>
      <ToastProvider />
      <div className="home bg">
        <Split className="split">
          <Panel>
            <Docs />
          </Panel>
          <Panel>
            <SearchBar />
          </Panel>
        </Split>
      </div>
    </>
  );
}

export default Home;
