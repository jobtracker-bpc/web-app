interface UIButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // Function to call when button is clicked
  onClick: () => void;
  // Optional: Any additional style classes to apply to the button
  className?: string;
  // Children that get placed inside the button
  children: React.ReactNode;
}

const UIButton: React.FC<UIButtonProps> = (props) => {
  const { children, onClick } = props;

  return (
    <button
      className="active:[#0582ca] inline-block rounded border border-[#0582ca] bg-[#0582ca] px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-[#0582ca] focus:outline-none focus:ring"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default UIButton;
