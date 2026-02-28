import type { DocInfo } from "@/api";
import type { ChildrenProp } from "@/interfaces";
import { createContext, useContext, useState } from "react";

interface CurrentFileContextType {
  docs: DocInfo[];
  updateDocs: (docs: DocInfo[]) => void;
}

export const DocsContext = createContext<CurrentFileContextType | undefined>(undefined);

export function DocsProvider({ children }: ChildrenProp) {
  const [docs, setDocs] = useState<DocInfo[]>([]);

  const updateDocs = (docs: DocInfo[]) => {
    setDocs(docs);
  };

  return <DocsContext.Provider value={{ docs, updateDocs }}>{children}</DocsContext.Provider>;
}

export function useDocs() {
  const context = useContext(DocsContext);
  if (context === undefined) {
    throw new Error("useCurrentFileContext must be used within a CurrentFileProvider");
  }
  return context;
}
