import classNames from "classnames";
import ReactPortal from "components/ReactPortal";
import React from "react";
import UIButton from "../UIButton";
import UIIcon, { UIIconType } from "../UIIcon";
import UIText, { UITextVariant } from "../UIText";

interface UIModalProps {
  // Header Text of the modal
  headingText: string;
  // Height of Modal
  height?: number;
  // Width of Modal
  width: number;
  // Optional: On Close function that gets called when clicking on X button
  onClose?: () => void;
  footerButtons?: [JSX.Element];
  // Optional: className for the Modal children
  contentClassName?: string;
  // Body Content of Modal
  children: React.ReactNode;
}

const UIModal: React.FC<UIModalProps> = (props) => {
  // Props
  const {
    headingText,
    height,
    width,
    onClose,
    children,
    contentClassName,
    footerButtons
  } = props;

  // State
  const [modalVisible, setModalVisible] = React.useState<boolean>(true);

  //Hooks
  React.useEffect(() => {
    setModalVisible(true);

    return () => {
      setModalVisible(false);
    };
  }, []);

  // Methods
  const handleModalClose = () => {
    setModalVisible(false);
    onClose?.();
  };

  // Render
  if (!modalVisible) {
    return null;
  }

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <div className="absolute top-0 flex h-full w-full  items-center justify-center bg-gray-900 bg-opacity-50">
        <div
          className={`flex animate-enter flex-col justify-between rounded-xl bg-white`}
          style={{ height: `${height}px`, width: `${width}px` }}
        >
          {/* Header */}
          <div>
            <div className="flex flex-row items-center justify-between border-b p-6">
              <UIText variant={UITextVariant.heading1}>{headingText}</UIText>
              <UIIcon
                type={UIIconType.Close}
                onClick={handleModalClose}
                className="cursor-pointer text-2xl transition ease-in-out hover:scale-125"
              />
            </div>
          </div>
          {/* Content */}
          <div
            className={classNames("flex-1 overflow-auto p-6", contentClassName)}
          >
            {children}
          </div>
          {/* Footer */}
          <div className="flex flex-row items-center justify-end space-x-4 border-t p-6">
            {footerButtons?.map((button, index) => (
              <div key={index}>{button}</div>
            ))}
          </div>
        </div>
      </div>
    </ReactPortal>
  );
};

export default UIModal;
