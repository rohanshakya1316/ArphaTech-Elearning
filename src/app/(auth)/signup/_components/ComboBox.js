"use client";

import { useEffect, useRef, useState } from "react";
import { useWatch } from "react-hook-form";
import { ChevronDown, Check } from "lucide-react";

const ComboBox = ({ control, setValue, register, options = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const containerRef = useRef(null);

  const instituteName =
    useWatch({
      control,
      name: "instituteName",
    }) || "";

  const instituteId = useWatch({
    control,
    name: "instituteId",
  });

  const filteredInstitutes = options.filter((institute) =>
    institute.name.toLowerCase().includes(instituteName.toLowerCase()),
  );

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

  const handleSelect = (institute) => {
    setValue("instituteName", institute.name, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setValue("instituteId", institute.id, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleInputChange = () => {
    // User is typing instead of selecting
    setValue("instituteId", null, {
      shouldValidate: true,
      shouldDirty: true,
    });

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
        prev < filteredInstitutes.length - 1 ? prev + 1 : 0,
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredInstitutes.length - 1,
      );
    }

    if (event.key === "Enter") {
      event.preventDefault();

      if (highlightedIndex >= 0) {
        handleSelect(filteredInstitutes[highlightedIndex]);
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
          id="instituteName"
          autoComplete="off"
          placeholder="Select or type your institute"
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-10 outline-none transition-all duration-300
            focus:border-primary focus:ring-4 focus:ring-primary/20"
          {...register("instituteName", {
            required: "School or College name is required",
            onChange: handleInputChange,
          })}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
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
          {filteredInstitutes.length > 0 ? (
            filteredInstitutes.map((institute, index) => {
              const isHighlighted = index === highlightedIndex;

              const isSelected = institute.id === instituteId;

              return (
                <button
                  key={institute.id}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleSelect(institute)}
                  className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm transition ${
                    isHighlighted ? "bg-slate-100" : "hover:bg-slate-50"
                  }`}
                >
                  <span>{institute.name}</span>

                  {isSelected && <Check size={18} className="text-primary" />}
                </button>
              );
            })
          ) : (
            <div className="px-4 py-3 text-sm text-slate-500">
              No institute found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ComboBox;
