import classNames from "classnames";
import { UIColor } from "../UIColor";
import { CgSpinner } from "react-icons/cg";

// Icons

interface UILoadingIndicatorProps {
  color?: UIColor;
  // Optional: Any additional style classes to apply to the icon
  className?: string;
}

const UILoadingIndicator: React.FC<UILoadingIndicatorProps> = (props) => {
  const { color, className } = props;

  return (
    <div className={classNames(color, className)}>
      <CgSpinner className="animate-spin" />
    </div>
  );
};

export default UILoadingIndicator;
