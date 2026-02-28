import "@/styles/index.css";
import "@/App.css";
import Split from "react-split";
import { Panel } from "@/Modules/Panel";
import { SearchBar } from "@/Modules/SearchBar";

function Home() {
  return (
    <div className="home bg">
      <Split className="split">
        <Panel>hola</Panel>
        <Panel>
          <SearchBar />
        </Panel>
      </Split>
    </div>
  );
}

export default Home;
