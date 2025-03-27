import React, {
  useEffect,
  useRef,
  useState,
  ChangeEvent,
  MouseEvent,
  useMemo,
} from "react";
import { twMerge } from "tailwind-merge";

import { MdDone } from "react-icons/md";
import { SlArrowDown } from "react-icons/sl";
import { IoCloseOutline } from "react-icons/io5";
import { VscChromeClose } from "react-icons/vsc";

import useClickOutside from "@/hook/useClickOutside";
import { filterByNormalizedText, normalizeText } from "./_component";

export type OptionType = {
  value: string | number;
  label: string;
};

interface SelectProps {
  all?: boolean;
  placeHolder: string;
  options: OptionType[];
  isMulti?: boolean;
  isSearchable?: boolean;
  onChange: (selected: OptionType | OptionType[]) => void;
}

export default function Select({
  all,
  options,
  placeHolder,
  isMulti = false,
  isSearchable = false,
  onChange,
}: SelectProps) {
  const inputRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const showMenuRef = useRef<HTMLDivElement>(null);

  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<OptionType | OptionType[]>(
    isMulti ? [] : (null as unknown as OptionType)
  );

  useEffect(() => {
    setSearchValue("");
    if (showMenu && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showMenu]);

  useClickOutside(
    inputRef,
    (e) => {
      if (
        showMenu &&
        showMenuRef.current &&
        !showMenuRef.current.contains(e.target as Node)
      ) {
        setShowMenu(false);
      }
    },
    [showMenu]
  );

  const filteredOptions = useMemo(() => {
    if (!options?.length) return [];
    if (!searchValue) return options ?? [];
    const _options = options?.filter((option) =>
      normalizeText(option.label?.toString() ?? "").includes(
        normalizeText(searchValue)
      )
    );

    if (!_options?.length) return [];
    return _options ?? [];
  }, [options, searchValue]);

  const handleInputClick = () => {
    setShowMenu((prev) => !prev);
  };

  const getDisplay = () => {
    if (
      !selectedValue ||
      (Array.isArray(selectedValue) && selectedValue.length === 0)
    ) {
      return <p className="text-gray-400">{placeHolder}</p>;
    }
    if (isMulti && Array.isArray(selectedValue)) {
      return (
        <div className="flex flex-nowrap gap-1">
          {selectedValue
            .filter((item) => item.value !== "all")
            .map((option, index) => (
              <div
                key={`${option.value}-${index}`}
                className="flex items-center whitespace-nowrap border border-gray-400 py-[2px] px-1 rounded-[6px] "
              >
                {option.label}
                <IoCloseOutline onClick={(e) => onTagRemove(e, option)} />
              </div>
            ))}
        </div>
      );
    }
    return (selectedValue as OptionType).label;
  };

  const removeOption = (option: OptionType) => {
    return (selectedValue as OptionType[]).filter(
      (o) => o.value !== option.value
    );
  };

  const onTagRemove = (e: MouseEvent, option: OptionType) => {
    e.stopPropagation();
    const newValue = removeOption(option);
    setSelectedValue(newValue);
    onChange(newValue);
  };

  const onItemClick = (option: OptionType) => {
    let newValue: OptionType | OptionType[];
    if (isMulti) {
      if (option.value === "all") {
        newValue = [{ value: "all", label: "All" }, ...(filteredOptions ?? [])];
      } else {
        if (
          (selectedValue as OptionType[])?.some((o) => o.value === option.value)
        ) {
          newValue = removeOption(option);
        } else {
          newValue = [...(selectedValue as OptionType[]), option];
        }
      }
    } else {
      newValue = option;
    }
    setSelectedValue(newValue);
    onChange(newValue);
  };

  const isSelected = (option: OptionType) => {
    if (isMulti) {
      return (selectedValue as OptionType[])?.some(
        (o) => o.value === option.value
      );
    }
    return (selectedValue as OptionType)?.value === option.value;
  };

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const getOptions = () => {
    const comPareOption = all
      ? [{ value: "all", label: "All" }, ...filteredOptions]
      : options;

    if (!searchValue) {
      return comPareOption;
    }
    return comPareOption.filter((option) =>
      filterByNormalizedText(searchValue, option, options)
    );
  };

  return (
    <div
      className={twMerge(
        "text-left relative rounded-lg w-full cursor-pointer border border-gray-400",
        (selectedValue as OptionType[])?.length && "group"
      )}
    >
      <div
        ref={inputRef}
        onClick={handleInputClick}
        className="px-3 py-2 h-[46px] flex items-center justify-between gap-2"
      >
        <div className="text-sm overflow-x-auto">{getDisplay()}</div>
        <div className="max-w-3 max-h-3">
          <SlArrowDown size={12} className="group-hover:hidden" />
          <VscChromeClose
            size={14}
            className="hidden group-hover:block"
            onClick={() => setSelectedValue([])}
          />
        </div>
      </div>
      {showMenu && (
        <div
          ref={showMenuRef}
          className="absolute mt-0.5 w-full p-1.5 border border-gray-400 rounded-lg bg-white z-20"
        >
          {isSearchable && (
            <div className="border border-gray-400 rounded-[6px] px-2 py-1 mb-1.5">
              <input
                className="w-full outline-0 text-sm"
                placeholder="Search"
                onChange={onSearch}
                value={searchValue}
                ref={searchRef}
              />
            </div>
          )}
          {getOptions().length ? (
            getOptions().map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  onItemClick(option);
                }}
                className={`py-[7px] px-[10px] text-sm hover:bg-amber-50 flex justify-between items-center ${
                  isSelected(option) ? "bg-amber-50" : ""
                }`}
              >
                {option.label}
                {isSelected(option) && <MdDone size={16} />}
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-14 text-sm">
              No data
            </div>
          )}
        </div>
      )}
    </div>
  );
}
