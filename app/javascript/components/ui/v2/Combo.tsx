import { Input } from "@components/ui";
import { InputHTMLAttributes, useState } from "react";

interface ComboValue {
  value: string;
  label: string;
}

type ComboProps = InputHTMLAttributes<HTMLInputElement> & {
  values: ComboValue[];
  label: string;
  onSelectedValue?: (value: string) => void;
  onSearchValueChange?: (value: string) => void;
};

export default function Combo({
  values = [],
  onSelectedValue,
  onSearchValueChange,
  ...props
}: ComboProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchValueChange = (value: string) => {
    setSearchValue(value);
    onSearchValueChange && onSearchValueChange(value);
  };

  const handleSelectedValueChange = (value: string) => {
    onSelectedValue && onSelectedValue(value);
    setSearchValue(value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Input
        label={props.label}
        value={searchValue}
        onChange={(e) => handleSearchValueChange(e.target.value)}
        onClick={() => setIsOpen(true)}
        className={isOpen ? "border-b-0" : ""}
      />
      {isOpen && (
        <div className="border-primary-900 absolute z-10 max-h-60 w-full overflow-auto border-x-3 border-t-1 border-b-3 bg-white shadow-lg">
          {values.length > 0 ? (
            <ul>
              {values.map((value, index) => (
                <li
                  key={index}
                  className="hover:bg-primary-900 hover:text-background text-primary-900 cursor-pointer px-4 py-2 transition-all hover:font-bold"
                  onClick={() => handleSelectedValueChange(value.value)}
                >
                  {value.label}
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-2 text-center text-neutral-500">
              Aucun résultat
            </div>
          )}
        </div>
      )}
    </div>
  );
}
