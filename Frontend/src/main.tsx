import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Home } from "./Modules/Home";
import { LanguageProvider } from "@/Context/LanguageContext";
import { DocsProvider } from "@/Context/DocsContext";

// async function enableMocking() {
//   if (!import.meta.env.DEV) {
//     return;
//   }

//   const { worker } = await import("./mocks/browser");

//   return worker.start();
// }

// enableMocking().then(() => {
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageProvider>
      <DocsProvider>
        <Home />
      </DocsProvider>
    </LanguageProvider>
  </StrictMode>,
);
// });
