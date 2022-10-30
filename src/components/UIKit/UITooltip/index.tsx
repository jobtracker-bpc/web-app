import { useSpring } from "@react-spring/web";
import classNames from "classnames";
import React from "react";
import { usePopper } from "react-popper";

export enum UITooltipPosition {
  top = "top",
  bottom = "bottom",
  left = "left",
  right = "right"
}

interface UITooltipProps {
  // Tooltip Text
  text?: string;
  // Disable the Tooltip from render
  disabled?: boolean;
  // Position
  position: UITooltipPosition;
  // Tooltip should be wrapped around this children
  children: React.ReactNode;
}

const UITooltip: React.FC<UITooltipProps> = (props) => {
  // Props
  const {
    text,
    disabled = false,
    position = UITooltipPosition.top,
    children
  } = props;

  // State
  const [isHovered, setIsHovered] = React.useState<boolean>(false);
  const [referenceElement, setReferenceElement] = React.useState(null);
  const [popperElement, setPopperElement] = React.useState(null);
  const [arrowElement, setArrowElement] = React.useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: position,
    modifiers: [
      { name: "arrow", options: { element: arrowElement } },
      { name: "offset", options: { offset: [0, 8] } }
    ]
  });

  // Render
  return (
    <>
      <div
        ref={setReferenceElement}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </div>
      {!disabled && isHovered && (
        <div
          ref={setPopperElement}
          style={styles.popper}
          className="z-10 rounded-md bg-slate-900 p-2 shadow-md"
          {...attributes.popper}
        >
          <div className="text-[12px] text-white">{text}</div>
          <div ref={setArrowElement} style={styles.arrow} />
        </div>
      )}
    </>
  );
};

export default UITooltip;
