import { useState, useEffect, useRef, useMemo } from "react";
import { debounce } from "lodash";
import Input from "./Input";
import LoadingSpinner from "../shared/LoadingSpinner";

interface ComboProps {
  values: any[];
  onSelectedValue: (value: string) => void;
  placeholder?: string;
  label?: string;
  value: string;
  className?: string;
  disabled?: boolean;
  variant?: "default" | "filled" | "outlined";
}

export default function Combo({
  values,
  onSelectedValue,
  placeholder = "Sélectionner...",
  label = "",
  value = "",
  className = "",
  disabled = false,
  variant = "default",
}: ComboProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredValues, setFilteredValues] = useState<any[]>(values);
  const [isLoading, setIsLoading] = useState(false);
  const comboRef = useRef<HTMLDivElement>(null);

  // Filter values when search input changes
  const filterValues = useMemo(
    () =>
      debounce((query: string) => {
        setIsLoading(true);
        const filtered = values.filter((value) =>
          value.toString().toLowerCase().includes(query.toLowerCase())
        );
        setFilteredValues(filtered);
        setIsLoading(false);
      }, 300),
    [values]
  );

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    filterValues(value);
  };

  // Handle option selection
  const handleSelect = (value: any) => {
    setSearchValue("");
    setIsOpen(false);
    onSelectedValue(value);
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        comboRef.current &&
        !comboRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      filterValues.cancel();
    };
  }, [filterValues]);

  // Initialize filtered values
  useEffect(() => {
    setFilteredValues(values);
  }, [values]);

  // Toggle dropdown icon
  const dropdownIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={`w-5 h-5 transition-transform duration-200 ${
        isOpen ? "transform rotate-180" : ""
      }`}
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );

  // Loading icon
  const loadingIcon = isLoading ? <LoadingSpinner /> : dropdownIcon;

  return (
    <div className="flex items-end gap-1">
      <div className={`relative ${className}`} ref={comboRef}>
        {/* Input field with search functionality */}
        <Input
          label={label}
          placeholder={placeholder}
          value={isOpen ? searchValue : value}
          onChange={handleSearchChange}
          onClick={() => !disabled && setIsOpen(true)}
          rightIcon={loadingIcon}
          variant={variant}
          disabled={disabled}
          className="cursor-pointer"
        />
        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-neutral-200 rounded-md shadow-lg max-h-60 overflow-auto animate-fade-in">
            {filteredValues.length > 0 ? (
              <ul className="py-1">
                {filteredValues.map((value, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-primary-50 cursor-pointer text-neutral-700 hover:text-primary-700 transition-colors duration-150"
                    onClick={() => handleSelect(value)}
                  >
                    {value}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-2 text-neutral-500 text-center">
                Aucun résultat
              </div>
            )}
          </div>
        )}
      </div>

      {value && (
        <button
          className="text-red-500 text-xl cursor-pointer mb-2"
          onClick={() => {
            handleSelect(null);
          }}
        >
          ❌
        </button>
      )}
    </div>
  );
}
