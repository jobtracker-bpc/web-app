import classNames from "classnames";
import UIText, { UITextVariant } from "components/UIKit/UIText";
import toast from "react-hot-toast";

export enum ToastType {
  Success = "Success",
  Error = "Error"
}

interface ToastProps {
  title: string;
  description?: string;
  toastType: ToastType;
}

export const showToast = ({ title, description, toastType }: ToastProps) => {
  return toast.custom(
    (t) => (
      <div
        className={classNames(
          `flex w-[350px] max-w-[300px] flex-col justify-center space-y-2 rounded-lg border p-4 ${
            t.visible ? "animate-enter" : "animate-leave"
          }`,
          { "border-green-600 bg-green-200": toastType === ToastType.Success },
          { "border-red-600 bg-red-200": toastType === ToastType.Error }
        )}
      >
        <UIText variant={UITextVariant.body2}>{title}</UIText>
        {description ? (
          <UIText variant={UITextVariant.body3}>{description}</UIText>
        ) : null}
      </div>
    ),
    {
      position: "top-right"
    }
  );
};
