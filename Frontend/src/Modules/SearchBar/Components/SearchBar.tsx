import { Input, Button } from "@/Modules/Common";
import SearchIcon from "@/assets/search.svg?react";

function SearchBar() {
  const onSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const value = formData.get("searchbar-input");

    console.log(value);
  };

  return (
    <form className="searchbar" onSubmit={onSubmit}>
      <Input name="searchbar-input" />
      <Button className="searchbar__search-btn">
        <SearchIcon />
      </Button>
    </form>
  );
}

export default SearchBar;
