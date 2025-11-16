import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import Button from "../Button";

const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
  debounce = 0,
  className = "",
  setSubmit,
  disabled,
}) => {
  const [searchTerm, setSearchTerm] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(searchTerm);
    }, debounce);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  return (
    <div className={`flex items-center w-max`}>
      <input
        type="text"
        className={`text-fluid-sm border h-10 border-r-0 rounded-l-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        disabled={disabled}
      />

      <Button
        className="rounded-l-0 rounded-r-md px-4 py-2 h-10 flex items-center justify-center"
        aria-label="Search"
        type="submit"
        onClick={() => setSubmit(true)}
        disabled={disabled}
      >
        <FiSearch size={16} />
      </Button>
    </div>
  );
};

export default SearchInput;
