import classNames from "classnames";
import { UIColor } from "../UIColor";

interface UITextProps {
  color?: UIColor;
  // The Text Typography variant
  variant: UITextVariant;
  // Optional: Any additional style classes to apply to the text
  className?: string;
  // Children that get placed inside the text
  children: React.ReactNode;
}

export enum UITextVariant {
  heading1 = "heading1",
  heading2 = "heading2",
  heading3 = "heading3",
  body1 = "body1",
  body2 = "body2",
  body3 = "body3"
}

const UIText: React.FC<UITextProps> = (props) => {
  const { color, variant, className, children } = props;

  const variantStyles = {
    [UITextVariant.heading1]: "text-[24px] font-bold",
    [UITextVariant.heading2]: "text-[20px] font-bold",
    [UITextVariant.heading3]: "text-[16px] font-bold",
    [UITextVariant.body1]: "text-[20px] font-normal",
    [UITextVariant.body2]: "text-[16px] font-normal",
    [UITextVariant.body3]: "text-[12px] font-normal"
  };

  return (
    <div
      className={classNames(
        "font-lato",
        variantStyles[variant],
        color,
        className
      )}
    >
      {children}
    </div>
  );
};

export default UIText;
