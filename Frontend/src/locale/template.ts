export interface I18nTemplate {
  explorer: string;
  modal: {
    uploadTitle: string;
    upload: string;
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
  };
}
