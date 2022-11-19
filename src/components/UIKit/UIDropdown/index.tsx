import classNames from "classnames";
import React from "react";
import { useOutsideClick } from "services/hooks/useOutsideClick";
import UIInput from "../UIInput";
import UIText, { UITextVariant } from "../UIText";

interface UIDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  // Placeholder Text for the Dropdown
  placeholder?: string;
  dropdownRows: any;
  defaultValue: any;
  // Function to be called when the input value changes
  onChange: (e: any) => void;
  // Optional: Any additional style classes to apply to the Input
  className?: string;
}

const UIDropdown: React.FC<UIDropdownProps> = (props) => {
  const {
    className,
    placeholder,
    onChange,
    dropdownRows,
    defaultValue,
    ...rest
  } = props;

  const [showDropdown, setShowDropdown] = React.useState<boolean>(false);
  const [localValue, setLocalValue] = React.useState<string>(
    defaultValue || ""
  );

  const handleClickOutside = () => {
    setShowDropdown(false);
  };

  const dropdownRef: any = useOutsideClick(handleClickOutside);

  return (
    <div ref={dropdownRef}>
      <UIInput
        className={classNames(
          "w-full cursor-pointer rounded-md border border-gray-300 p-2  text-[14px] hover:ring-2 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-700",
          className
        )}
        onClick={() => setShowDropdown((prev) => !prev)}
        type="text"
        placeholder={placeholder}
        value={localValue}
        readOnly
        {...rest}
      />
      {showDropdown && (
        <div className="absolute z-50 mt-2 min-w-[200px] divide-y rounded-md border bg-white shadow-lg">
          {dropdownRows.map((row: any) => (
            <div
              className="flex cursor-pointer py-2 px-4 hover:bg-slate-100"
              onClick={() => {
                onChange(row);
                setLocalValue(row);
                setShowDropdown(false);
              }}
            >
              <UIText variant={UITextVariant.body2}>{row}</UIText>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UIDropdown;
