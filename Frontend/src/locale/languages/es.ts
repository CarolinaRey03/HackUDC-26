import type { I18nTemplate } from "../template";

export const es: I18nTemplate = {
  explorer: "Explorador",
  error: {
    fetch: {
      all_docs: "Se ha producido un error al recuperar los documentos",
      filtered_docs: "Se ha producido un error al ejecutar la consulta",
    },
    upload: {
      all_docs: "Se produjo un error al actualizar los documentos",
    },
    open: {
      doc: "Se produjo un error al abrir el documento",
    },
    delete: "Se produjo un error al borrar el documento",
  },
  searchbar: {
    placeholder: {
      file_name: "Nombre del documento",
      deep_search: "Dame...",
    },
  },
  modal: {
    upload: "Subir",
    uploadTitle: "Sube un documento",
  },
  uploadFile: {
    info: "Subiendo documento...",
    success: "El documento se subió con éxito",
    error: "Error al subir el documento",
  },
  deepsearch: {
    lookleft: "Mira el resultado",
    welcome: "Haz una búqueda sobre tus documentos",
  },
  filter: {
    language: {
      placeholder: "Idioma",
      en: "Inglés",
      es: "Castellano",
    },
    none: "Ninguno",
    type: {
      placeholder: "Tipo",
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
