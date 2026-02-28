import type { I18nTemplate } from "../template";

export const es: I18nTemplate = {
  explorer: "Explorador",
  error: {
    fetch: {
      all_docs: "Se ha producido un error al recuperar los documentos",
      filtered_docs: "Se ha producido un error al ejecutar la consulta",
    },
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
};
