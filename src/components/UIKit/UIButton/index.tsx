import classNames from "classnames";
import UILoadingIndicator from "../UILoadingIndicator";

interface UIButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // Function to call when button is clicked
  onClick: () => void;
  // Optional: Any additional style classes to apply to the button
  className?: string;
  // Children that get placed inside the button
  children: React.ReactNode;
  /** Optional: Shows a loading indiciator in the center of the button */
  loading?: boolean;
  /** Optional: Disables the button and its action */
  disabled?: boolean;
}

const UIButton: React.FC<UIButtonProps> = (props) => {
  const { className, onClick, children, loading, disabled } = props;

  return (
    <button
      className={classNames(
        "active:[#0582ca] flex items-center justify-center rounded border border-[#0582ca] bg-[#0582ca] px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-[#0582ca] focus:outline-none focus:ring",
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? <UILoadingIndicator className="text-3xl" /> : children}
    </button>
  );
};

export default UIButton;
