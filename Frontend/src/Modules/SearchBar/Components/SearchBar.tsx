import { Input, Button } from "@/Modules/Common";
import SearchIcon from "@/assets/search.svg?react";

function SearchBar() {
  return (
    <div className="searchbar">
      <Input />
      <Button className="searchbar__search-btn">
        <SearchIcon />
      </Button>
    </div>
  );
}

export default SearchBar;
