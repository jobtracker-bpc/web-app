import classNames from "classnames";
import { UIColor } from "../UIColor";

interface UIInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Placeholder text for the input
  placeholder?: string;
  // Value of the input
  value: string;
  // Function to be called when the input value changes
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // Optional: Any additional style classes to apply to the Input
  className?: string;
}

const UIInput: React.FC<UIInputProps> = (props) => {
  const { className, placeholder, value, onChange, ...rest } = props;

  return (
    <input
      className={classNames(
        "rounded-md border border-gray-300 p-2 text-[14px]  hover:ring-2 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-700",
        className
      )}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
};

export default UIInput;
