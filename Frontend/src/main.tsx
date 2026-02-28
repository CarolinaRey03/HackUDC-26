import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Home } from "./Modules/Home";
import { IntlProvider } from "react-intl";
import { messages } from "./locale/messages";
import { DocsProvider } from "@/Context/DocsContext";

async function enableMocking() {
  if (!import.meta.env.DEV) {
    return;
  }

  const { worker } = await import("./mocks/browser");

  return worker.start();
}

// TODO: language selector
const locale = "es"; // "en" or "es"

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <DocsProvider>
          <Home />
        </DocsProvider>
      </IntlProvider>
    </StrictMode>,
  );
});
