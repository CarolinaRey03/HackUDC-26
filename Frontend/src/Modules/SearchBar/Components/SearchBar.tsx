import { Input, Button } from "@/Modules/Common";
import SearchIcon from "@/assets/search.svg?react";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { SEARCH_DEBOUNCE } from "@/utls/constants";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  onSearchNoQuery: () => void;
}

function SearchBar({ placeholder, onSearch, onSearchNoQuery }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      if (searchTerm) {
        onSearch(searchTerm);
      } else {
        onSearchNoQuery();
      }
    }, SEARCH_DEBOUNCE),
    [onSearch, onSearchNoQuery],
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const onSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    debouncedSearch.flush(); // Execute immediately if user presses enter
  };

  return (
    <form className="searchbar" onSubmit={onSubmit}>
      <Input name="searchbar-input" placeholder={placeholder} value={query} onChange={handleChange} />
      <Button className="searchbar__search-btn" type="submit">
        <SearchIcon />
      </Button>
    </form>
  );
}

export default SearchBar;
