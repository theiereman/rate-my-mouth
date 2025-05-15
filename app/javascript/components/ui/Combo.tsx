import { useState, useEffect, useRef, useMemo } from "react";
import { debounce } from "lodash";
import { Input } from "@components/ui";

interface ComboProps {
  value?: number | null;
  values: ComboValue[];
  onSelectedValue: (value: ComboValue | null) => void;
  onSearchValueChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  disabled?: boolean;
  variant?: "default" | "filled" | "outlined";
  erasable?: boolean;
  mandatory?: boolean;
}

export interface ComboValue {
  value: number;
  label: string;
}

export function Combo({
  values,
  value = null,
  onSelectedValue,
  onSearchValueChange,
  placeholder = "Sélectionner...",
  label = "",
  className = "",
  disabled = false,
  erasable = false,
  variant = "default",
  mandatory = false,
}: ComboProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredValues, setFilteredValues] = useState<ComboValue[]>(values);
  const [isLoading, setIsLoading] = useState(false);
  const comboRef = useRef<HTMLDivElement>(null);

  // Filter values when search input changes
  const filterValues = useMemo(
    () =>
      debounce((query: string) => {
        setIsLoading(true);
        const filtered = values.filter((value) =>
          value.label.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredValues(filtered);
        setIsLoading(false);
      }, 300),
    [values]
  );

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onSearchValueChange && onSearchValueChange(value);
    setSearchValue(value);
    filterValues(value);
  };

  // Handle option selection
  const handleSelect = (value: ComboValue | null) => {
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
    <span className="material-symbols-outlined">keyboard_arrow_down</span>
  );

  // Loading icon
  const loadingIcon = isLoading ? (
    <span className="material-symbols-outlined text-primary-600 animate-spin">
      progress_activity
    </span>
  ) : (
    dropdownIcon
  );

  return (
    <div className="flex items-end gap-1">
      <div className={`relative ${className}`} ref={comboRef}>
        {/* Input field with search functionality */}
        <Input
          mandatory={mandatory}
          label={label}
          placeholder={placeholder}
          value={
            isOpen
              ? searchValue
              : value !== null
              ? values.find((v) => v.value === value)?.label || ""
              : ""
          }
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
                    {value.label}
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

      {erasable && value && (
        <button
          className="text-red-500 text-xl cursor-pointer mb-2 flex items-center"
          onClick={() => {
            handleSelect(null);
          }}
        >
          <span className="material-symbols-outlined text-primary-600">
            close
          </span>
        </button>
      )}
    </div>
  );
}

export default Combo;
