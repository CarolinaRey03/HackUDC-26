import LanguageFilter from "./LanguageFilter";
import TypeFilter from "./TypeFilter";

function Filters() {
  return (
    <div className="filters">
      <LanguageFilter />
      <TypeFilter />
    </div>
  );
}

export default Filters;
