import { Badge, Input } from "@components/ui";
import { InputHTMLAttributes, useEffect, useRef, useState } from "react";

interface ComboValue {
  value: any;
  label: string;
}

type ComboProps = InputHTMLAttributes<HTMLInputElement> & {
  selectedValues?: ComboValue[]; //multi select
  values: ComboValue[];
  label: string;
  onSelectedValue?: (value: ComboValue | null) => void;
  onSearchValueChange?: (value: string) => void;
  onSelectedValueRemove?: (value: ComboValue) => void;
};

export default function Combo({
  selectedValues,
  values = [],
  onSelectedValue,
  onSearchValueChange,
  onSelectedValueRemove,
  ...props
}: ComboProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const divRef = useRef<HTMLDivElement>(null);

  console.log(selectedValues);

  //update input value on value change
  useEffect(() => {
    if (!selectedValues || selectedValues?.length > 1) return;
    const found = values.find((v) => v.value === selectedValues[0]);
    if (!inputValue) setInputValue(found ? found.label : "");
  }, [selectedValues, values]);

  //handle click outside the div
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!divRef.current) return;

      if (!divRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        return;
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleSearchValueChange = (value: string) => {
    setInputValue(value);
    onSearchValueChange && onSearchValueChange(value);
  };

  const handleSelectedValueChange = (value: ComboValue) => {
    onSelectedValue && onSelectedValue(value);
    setInputValue(value.label);
    setIsOpen(false);
  };

  return (
    <div ref={divRef} className="relative">
      <Input
        label={props.label}
        value={inputValue}
        onChange={(e) => handleSearchValueChange(e.target.value)}
        onClick={() => setIsOpen(true)}
        className={isOpen ? "border-b-0" : undefined}
      />
      {isOpen && (
        <div className="border-primary-900 absolute z-10 max-h-60 w-full overflow-auto border-x-3 border-b-3 bg-white shadow-lg">
          {values.length > 0 ? (
            <ul>
              {values.map((value, index) => (
                <li
                  key={index}
                  className="hover:bg-primary-900 hover:text-background text-primary-900 cursor-pointer px-4 py-2 transition-all hover:font-bold"
                  onClick={() => handleSelectedValueChange(value)}
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
      {selectedValues &&
        selectedValues.length > 1 &&
        selectedValues.map((cbVal) => {
          return (
            <Badge
              onClick={() => {
                onSelectedValueRemove && onSelectedValueRemove(cbVal);
              }}
              key={cbVal.value}
              text={cbVal.label}
              className="mt-2 mr-2 inline-block"
            />
          );
        })}
    </div>
  );
}
