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
    open: {
      doc: string;
    };
    upload: {
      all_docs: string;
    };
  };
}
