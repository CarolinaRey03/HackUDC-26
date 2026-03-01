export interface I18nTemplate {
  explorer: string;
  deepsearch: {
    lookleft: string;
    welcome: string;
  };
  modal: {
    uploadTitle: string;
    upload: string;
  };
  uploadFile: {
    info: string;
    success: string;
    error: string;
  };
  searchbar: {
    placeholder: {
      file_name: string;
      deep_search: string;
    };
  };
  error: {
    fetch: {
      all_docs: string;
      filtered_docs: string;
    };
    delete: string;
    open: {
      doc: string;
    };
    upload: {
      all_docs: string;
    };
  };
  filter: {
    none: string;
    language: {
      placeholder: string;
      en: string;
      es: string;
    };
    type: {
      placeholder: string;
      pdf: string;
      docx: string;
      odt: string;
      csv: string;
      txt: string;
      xls: string;
      ods: string;
      xlsx: string;
    };
  };
}
