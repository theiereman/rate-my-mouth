import { Badge, Input } from "@components/ui";
import { useEffect, useRef, useState } from "react";
import { InputProps } from "./Input";

export interface ComboValue {
  value: any;
  label: string;
}

type ComboProps = InputProps & {
  selectedValue?: ComboValue[] | ComboValue; //multi select or single select
  values: ComboValue[];
  label: string;
  onSelectedValue?: (value: ComboValue | null) => void;
  onSearchValueChange?: (value: string) => void;
  onSelectedValueRemove?: (value: ComboValue) => void;
};

export default function Combo({
  selectedValue,
  values = [],
  onSelectedValue,
  onSearchValueChange,
  onSelectedValueRemove,
  ...props
}: ComboProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isUserTyping, setIsUserTyping] = useState(false);

  const divRef = useRef<HTMLDivElement>(null);

  const isMultiselect = Array.isArray(selectedValue);

  //update input value when selectedValue changes
  useEffect(() => {
    if (!isUserTyping && !isMultiselect && selectedValue) {
      setInputValue(selectedValue.label);
    }
  }, [selectedValue]);

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
    if (value.trim() === "" && !isMultiselect) {
      onSelectedValue && onSelectedValue(null);
    }
    onSearchValueChange && onSearchValueChange(value);
  };

  const handleSelectedValueChange = (value: ComboValue) => {
    onSelectedValue && onSelectedValue(value);
    if (!isMultiselect) setInputValue(value.label);
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
        onFocus={() => setIsUserTyping(true)}
        onBlur={() => setIsUserTyping(false)}
        rightIcon={props.rightIcon}
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
      {isMultiselect &&
        selectedValue.length > 0 &&
        selectedValue.map((cbVal) => {
          return (
            <Badge
              onClick={() => {
                onSelectedValueRemove && onSelectedValueRemove(cbVal);
              }}
              key={cbVal.value}
              className="group mt-2 mr-2 inline-block hover:border-red-600 hover:text-red-600"
            >
              <div className="flex gap-1">
                {cbVal.label}
                <span className="hidden group-hover:block">x</span>
              </div>
            </Badge>
          );
        })}
    </div>
  );
}
