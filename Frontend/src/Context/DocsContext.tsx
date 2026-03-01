import { getDocById, type DocInfo } from "@/api";
import useI18n from "@/hooks/useI18n";
import type { ChildrenProp } from "@/interfaces";
import { toastMsg } from "@/utls/toastMsg";
import { createContext, useContext, useState } from "react";

export interface SearchFilters {
  query?: string;
  limit?: string;
  language?: string;
  type?: string;
  date?: number;
}

interface CurrentFileContextType {
  docs: DocInfo[];
  updateDocs: (docs: DocInfo[]) => void;
  currentDoc: File | undefined;
  openDoc: (docId: string, docName: string) => void;
  currentFilters: SearchFilters;
  updateFilters: (filters: SearchFilters) => void;
}

export const DocsContext = createContext<CurrentFileContextType | undefined>(undefined);

export function DocsProvider({ children }: ChildrenProp) {
  const { translate } = useI18n();
  const [docs, setDocs] = useState<DocInfo[]>([]);
  const [currentDoc, setCurrentDoc] = useState<File>();
  const [currentFilters, setCurrentFilters] = useState<SearchFilters>({});

  const updateDocs = (docs: DocInfo[]) => {
    setDocs(docs);
  };

  const updateFilters = setCurrentFilters;

  const openDoc = (docId: string, docName: string) => {
    getDocById(docId, docName)
      .then(setCurrentDoc)
      .catch((error) => {
        console.error(error);
        toastMsg.error(translate("error.open.doc"));
      });
  };

  return (
    <DocsContext.Provider value={{ docs, updateDocs, currentDoc, openDoc, currentFilters, updateFilters }}>
      {children}
    </DocsContext.Provider>
  );
}

export function useDocs() {
  const context = useContext(DocsContext);
  if (context === undefined) {
    throw new Error("useCurrentFileContext must be used within a CurrentFileProvider");
  }
  return context;
}
