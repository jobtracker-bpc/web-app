import React from "react";
import UIText, { UITextVariant } from "components/UIKit/UIText";
import { useAuth0 } from "@auth0/auth0-react";
import UIIcon, { UIIconType } from "components/UIKit/UIIcon";
import { useOutsideClick } from "services/hooks/useOutsideClick";
import { UIColor } from "components/UIKit/UIColor";
import { useNavigate } from "react-router-dom";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = (props) => {
  // State
  const [openDropdown, setOpenDropdown] = React.useState(false);

  // Hooks
  const { user, logout } = useAuth0();
  const navigate = useNavigate();

  const handleClickOutside = () => {
    setOpenDropdown(false);
  };

  const dropdownRef: any = useOutsideClick(handleClickOutside);

  // Methods
  const handleClick = (event) => {
    setOpenDropdown(!openDropdown);
    event.stopPropagation();
  };

  return (
    <div className="flex flex-row items-center border-b-2 bg-[#F8F9F8] px-6 py-4">
      <div className="flex w-full justify-between">
        <UIText
          variant={UITextVariant.heading1}
          className="flex items-center justify-center"
        >
          Jobs
        </UIText>
        <div
          onClick={handleClick}
          className="relative flex cursor-pointer items-center justify-center space-x-2 rounded-md p-3 hover:bg-slate-200"
        >
          <img
            src={user?.picture}
            alt={user?.name}
            className="h-[48px] rounded-full"
          />
          <UIIcon type={UIIconType.ChevronDown} />
        </div>
        {openDropdown && (
          <div
            className="absolute top-24 right-6 w-48 rounded-md border bg-white shadow-lg"
            ref={dropdownRef}
          >
            <div className="flex flex-col space-y-2 p-4">
              <div className="space-y-2">
                <UIText variant={UITextVariant.heading3} className="px-2">
                  {user?.name}
                </UIText>
                <UIText
                  variant={UITextVariant.body3}
                  className="px-2"
                  color={UIColor.gray1}
                >
                  {user?.email}
                </UIText>
              </div>
              <div
                onClick={() => {
                  setOpenDropdown(false);
                  navigate("/profile");
                }}
                className="cursor-pointer rounded p-2 hover:bg-slate-200"
              >
                <UIText variant={UITextVariant.heading3}>Profile</UIText>
              </div>
              <div
                onClick={() => {
                  setOpenDropdown(false);
                  logout();
                }}
                className="cursor-pointer rounded p-2 hover:bg-slate-200"
              >
                <UIText variant={UITextVariant.heading3}>Sign Out</UIText>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
