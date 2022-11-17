import classNames from "classnames";
import UIIcon, { UIIconType } from "../UIIcon";
import UILoadingIndicator from "../UILoadingIndicator";

interface UIButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Function to call when button is clicked */
  onClick: () => void;
  /** Children that get placed inside the button */
  children: React.ReactNode;
  /** Optional:  Will place Icon to left of text */
  iconType?: UIIconType;
  /** Optional: Any additional style classes to apply to the button */
  className?: string;
  /** Optional: Shows a loading indiciator in the center of the button */
  loading?: boolean;
  /** Optional: Disables the button and its action */
  disabled?: boolean;
}

const UIButton: React.FC<UIButtonProps> = (props) => {
  const { className, onClick, children, loading, disabled, iconType } = props;

  return (
    <button
      className={classNames(
        "flex min-h-[50px] min-w-[100px] items-center justify-center rounded-lg border border-gray-600 bg-slate-700 px-5 py-3 text-sm font-medium text-white hover:border-gray-700 hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-300",
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? (
        <UILoadingIndicator className="text-3xl" />
      ) : (
        <div className="flex flex-row items-center">
          {iconType && <UIIcon type={iconType} className="mr-2 text-xl" />}
          {children}
        </div>
      )}
    </button>
  );
};

export default UIButton;
