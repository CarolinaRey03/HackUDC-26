import type { I18nTemplate } from "../template";

export const en: I18nTemplate = {
  explorer: "Explorer",
  error: {
    fetch: {
      all_docs: "An error occurred while retrieving the documents",
      filtered_docs: "An error occurred while executing the query",
    },
    upload: {
      all_docs: "An error occurred while updating documents",
    },
    open: {
      doc: "An error ocurred while opening the document",
    },
    delete: "An error ocurred while deleting the document",
  },
  searchbar: {
    placeholder: {
      file_name: "File name",
      deep_search: "Give me...",
    },
  },
  modal: {
    upload: "Upload",
    uploadTitle: "Upload a document",
  },
  uploadFile: {
    info: "Uploading document...",
    success: "El documento se subió con éxito",
    error: "Error al subir el documento",
  },
  deepsearch: {
    lookleft: "Look at the result",
    welcome: "Do a search on your documents",
  },
  filter: {
    language: {
      placeholder: "Language",
      en: "English",
      es: "Spanish",
    },
    none: "None",
    type: {
      placeholder: "Type",
      pdf: "PDF",
      docx: "DOCX",
      odt: "ODT",
      csv: "CSV",
      txt: "TXT",
      xls: "XLS",
      ods: "ODS",
      xlsx: "XLSX",
    },
  },
};
