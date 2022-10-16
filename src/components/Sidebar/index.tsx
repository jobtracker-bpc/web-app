import React from "react";
import classNames from "classnames";
import { UIColor } from "components/UIKit/UIColor";
import UIText, { UITextVariant } from "components/UIKit/UIText";
import { BiArrowFromRight } from "react-icons/bi";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = (props) => {
  const [isCollapsed, setIsCollapsed] = React.useState<boolean>(false);

  const menuItems = [
    { index: 1, text: "Dashboard", path: "/" },
    { index: 2, text: "Jobs", path: "/jobs" },
    { index: 3, text: "Skills", path: "/skills" },
    { index: 4, text: "Contacts", path: "/contacts" }
  ];

  return (
    <div
      className={classNames(
        "flex h-screen w-[350px] flex-col justify-between bg-[#101C24]"
      )}
    >
      <div>
        <div className="flex flex-row items-center">
          <UIText
            variant={UITextVariant.heading1}
            color={UIColor.lightGray1}
            className="mb-6 pl-6 pt-6 pr-3"
          >
            Hire Me <span className={UIColor.blue3}>Pls.</span>
          </UIText>
          <BiArrowFromRight
            className={classNames("text-[24px] text-white", {
              "rotate-180": isCollapsed
            })}
            onClick={() => setIsCollapsed(!isCollapsed)}
          />
        </div>
        <div>
          {menuItems.map((item) => (
            <div className={"group cursor-pointer p-2 hover:bg-slate-800 "}>
              <UIText
                key={item.index}
                variant={UITextVariant.body3}
                className=" px-6 text-slate-300 group-hover:text-white"
              >
                {item.text}
              </UIText>
            </div>
          ))}
        </div>
      </div>
      <div className="">
        <div className={"group cursor-pointer p-6 hover:bg-slate-800"}>
          <UIText
            variant={UITextVariant.body3}
            className=" text-slate-300 group-hover:text-white"
          >
            Settings
          </UIText>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
