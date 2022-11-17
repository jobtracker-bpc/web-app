import UIText, { UITextVariant } from "components/UIKit/UIText";
import toast from "react-hot-toast";

export const showToast = (title: string, description?: string) => {
  return toast(
    <div className="flex w-[250px] max-w-[250px] flex-col justify-center space-y-2">
      <UIText variant={UITextVariant.heading3}>{title}</UIText>
      {description ? (
        <UIText variant={UITextVariant.body2}>{description}</UIText>
      ) : null}
    </div>,
    {
      position: "top-right",
      style: {
        border: "1px solid #1AB7FF",
        background: "#CDEFFF"
      }
    }
  );
};
