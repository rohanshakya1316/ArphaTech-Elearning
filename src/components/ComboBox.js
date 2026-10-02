"use client";

import { useEffect, useRef, useState } from "react";
import { useWatch } from "react-hook-form";
import { ChevronDown, Check } from "lucide-react";

const ComboBox = ({
  control,
  setValue,
  register,
  options = [],
  nameField, // e.g., "instituteName" or "facultyName"
  idField, // e.g., "instituteId" or "facultyId"
  placeholder = "Select or type...",
  validationRules = {},
  labelKey = "name", // allows flexibility if your API uses different keys
  valueKey = "id",
  mode = "combo",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef(null);

  // Watch the dynamic field names
  const textValue = useWatch({ control, name: nameField }) || "";
  const idValue = useWatch({ control, name: idField });

  // Determine wheather user can search/type
  const isSearchable = mode == "combo";

  const filteredOptions = isSearchable
    ? options.filter((option) =>
        option[labelKey].toLowerCase().includes(textValue.toLowerCase()),
      )
    : options;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    setValue(nameField, option[labelKey], {
      shouldValidate: true,
      shouldDirty: true,
    });

    if (idField) {
      setValue(idField, option[valueKey], {
        shouldValidate: true,
        shouldDirty: true,
      });
    }

    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleInputChange = () => {
    if (!isSearchable) {
      return;
    }
    // User is typing instead of selecting, so clear the ID
    if (idField) {
      setValue(idField, null, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }

    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (event) => {
    if (!isOpen) {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        setIsOpen(true);
      }
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredOptions.length - 1 ? prev + 1 : 0,
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredOptions.length - 1,
      );
    }

    if (event.key === "Enter") {
      event.preventDefault();
      if (highlightedIndex >= 0) {
        handleSelect(filteredOptions[highlightedIndex]);
      } else {
        setIsOpen(false);
      }
    }

    if (event.key === "Escape") {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Input */}
      <div className="relative">
        <input
          type="text"
          id={idField}
          autoComplete="off"
          readOnly={!isSearchable}
          placeholder={placeholder}
          className={`w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 outline-none transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/20 ${!isSearchable ? "cursor-pointer" : ""}`}
          {...register(nameField, {
            ...validationRules,
            onChange: handleInputChange,
          })}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          required
        />

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
        >
          <ChevronDown
            size={20}
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => {
              const isHighlighted = index === highlightedIndex;
              const isSelected = option[valueKey] === idValue;

              return (
                <button
                  key={option[valueKey]}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleSelect(option)}
                  className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm transition ${
                    isHighlighted ? "bg-slate-100" : "hover:bg-slate-50"
                  }`}
                >
                  <span>{option[labelKey]}</span>
                  {isSelected && <Check size={18} className="text-primary" />}
                </button>
              );
            })
          ) : (
            <div className="px-4 py-3 text-sm text-slate-500">
              No results found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ComboBox;
