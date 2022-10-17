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
            "flex-col-reverse": isCollapsed
          })}
        >
          <UIText
            variant={UITextVariant.heading1}
            color={UIColor.lightGray1}
            className={classNames("mb-6 pl-6 pt-6 pr-3")}
          >
            {!isCollapsed ? "Hire Me" : "HMP."}
            <div className={UIColor.blue3}>{!isCollapsed ? " Pls." : ""}</div>
          </UIText>
          <BiArrowFromRight
            className={classNames(
              "cursor-pointer rounded-md text-[24px] text-slate-300 hover:text-white",
              {
                "mt-4 rotate-180": isCollapsed
              },
              {
                "ml-6": !isCollapsed
              }
            )}
            onClick={() => setIsCollapsed(!isCollapsed)}
          />
        </div>
        <div>
          {menuItems.map((item) => (
            <div
              onClick={() => navigate(item.path)}
              className={classNames(
                "group flex cursor-pointer flex-row items-center py-2 hover:bg-slate-800",
                { "pl-2": isCollapsed }
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
