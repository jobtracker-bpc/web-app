import React from "react";
import classNames from "classnames";
import { UIColor } from "components/UIKit/UIColor";
import UIText, { UITextVariant } from "components/UIKit/UIText";
import { BiArrowFromRight } from "react-icons/bi";
import { MdDashboard, MdPermContactCalendar } from "react-icons/md";
import { HiBriefcase } from "react-icons/hi";
import { GiSkills } from "react-icons/gi";
import { RiSettings3Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import LogoFull from "../../assets/logo-full.svg";
import LogoShort from "../../assets/logo-short.svg";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = (props) => {
  const [isCollapsed, setIsCollapsed] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const menuItems = [
    { index: 1, text: "Dashboard", path: "/", icon: <MdDashboard /> },
    { index: 2, text: "Jobs", path: "/jobs", icon: <HiBriefcase /> },
    { index: 3, text: "Skills", path: "/skills", icon: <GiSkills /> },
    {
      index: 4,
      text: "Contacts",
      path: "/contacts",
      icon: <MdPermContactCalendar />
    }
  ];

  return (
    <div
      className={classNames(
        "flex h-screen  flex-col justify-between bg-[#101C24]",
        { "w-24": isCollapsed },
        { "min-w-[200px]": !isCollapsed }
      )}
    >
      <div>
        <div
          className={classNames("flex flex-row items-center", {
            "flex-col": isCollapsed
          })}
        >
          <BiArrowFromRight
            className={classNames(
              "mt-6 mr-4 cursor-pointer rounded-md text-[20px] text-slate-300 hover:text-white",
              {
                "ml-4 mb-2 rotate-180": isCollapsed
              },
              {
                "ml-5": !isCollapsed
              }
            )}
            onClick={() => setIsCollapsed(!isCollapsed)}
          />
          {isCollapsed ? (
            <img src={LogoShort} className="mt-4 inline-block " alt="logo" />
          ) : (
            <img src={LogoFull} className="mt-6 inline-block w-24" alt="logo" />
          )}
        </div>
        <div className="mt-6">
          {menuItems.map((item) => (
            <div
              onClick={() => navigate(item.path)}
              className={classNames(
                "group flex cursor-pointer flex-row items-center py-2 hover:bg-slate-800",
                { "py-4 pl-2 text-[20px]": isCollapsed }
              )}
            >
              <div className="pl-6 text-slate-300 group-hover:text-white">
                {item.icon}
              </div>
              {!isCollapsed && (
                <UIText
                  key={item.index}
                  variant={UITextVariant.body3}
                  className="ml-4 text-slate-300 group-hover:text-white"
                >
                  {item.text}
                </UIText>
              )}
            </div>
          ))}
        </div>
      </div>
      <div>
        <div
          onClick={() => navigate("/settings")}
          className={classNames(
            "group flex cursor-pointer flex-row items-center py-4 hover:bg-slate-800",
            { "px-2 py-4": isCollapsed }
          )}
        >
          <div className="pl-6 text-slate-300  group-hover:text-white">
            <RiSettings3Fill />
          </div>
          {!isCollapsed && (
            <UIText
              variant={UITextVariant.body3}
              className="ml-4 text-slate-300 group-hover:text-white"
            >
              Settings
            </UIText>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
