import * as React from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { MultiSelectItem } from "./multi-select";

interface MultiSelectDropdownProps {
  options: MultiSelectItem[];
  selectedItems: MultiSelectItem[];
  onSelectionChange: (item: MultiSelectItem, isSelected: boolean) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
  className?: string;
}

const MultiSelectDropdown = React.forwardRef<
  HTMLDivElement,
  MultiSelectDropdownProps
>(
  (
    {
      options,
      selectedItems,
      onSelectionChange,
      searchValue,
      onSearchChange,
      className,
      ...props
    },
    ref,
  ) => {
    const selectedIds = React.useMemo(
      () => new Set(selectedItems.map((item) => item.id)),
      [selectedItems],
    );

    const filteredOptions = React.useMemo(() => {
      if (!searchValue) return options;
      return options.filter((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase()),
      );
    }, [options, searchValue]);

    return (
      <div
        ref={ref}
        className={cn("flex w-[411px] flex-col bg-white shadow-lg", className)}
        {...props}
      >
        {/* Search Box */}
        <div className="flex min-h-[32px] items-center border-t border-r border-l border-[#008BC9] bg-white rounded-t">
          <div className="flex flex-1 items-center px-2 py-1.5">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search tags"
              className="flex-1 bg-transparent text-xs font-poppins text-[#4C5564] placeholder:text-[#BABABA] tracking-[0.429px] border-none outline-none"
            />
            {!searchValue && (
              <div className="w-px h-[15px] bg-[#545454] ml-2" />
            )}
          </div>
          <div className="flex items-center justify-center px-2 py-1">
            <ChevronDown className="h-4 w-4 text-[#545454]" />
          </div>
        </div>

        {/* Separator */}
        <div className="h-px bg-[#E6E6E6]" />

        {/* Options List */}
        <div className="flex flex-col border-r border-b border-l border-[#008BC9] bg-white rounded-b-lg py-1 max-h-[200px] overflow-y-auto">
          {filteredOptions.length === 0 ? (
            <div className="px-2 py-2 text-xs text-[#BABABA] font-poppins">
              No options found
            </div>
          ) : (
            filteredOptions.map((option) => {
              const isSelected = selectedIds.has(option.id);
              return (
                <div
                  key={option.id}
                  className="flex items-center gap-2 px-2 py-2 hover:bg-gray-50 cursor-pointer"
                  onClick={() => onSelectionChange(option, !isSelected)}
                >
                  {/* Custom Checkbox */}
                  <div className="flex w-5 items-center justify-center">
                    <div
                      className={cn(
                        "relative h-[18px] w-[18px] rounded-sm border flex items-center justify-center",
                        isSelected
                          ? "bg-[#545454] border-[#545454]"
                          : "bg-white border-[#BABABA]",
                      )}
                    >
                      {isSelected && (
                        <Check className="h-3 w-3 text-white" strokeWidth={3} />
                      )}
                    </div>
                  </div>

                  {/* Label */}
                  <span className="flex-1 text-xs font-medium text-[#4C5564] font-poppins tracking-[0.429px]">
                    {option.label}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  },
);

MultiSelectDropdown.displayName = "MultiSelectDropdown";

export { MultiSelectDropdown };
