import React from "react";
import classNames from "classnames";
import UIText, { UITextVariant } from "components/UIKit/UIText";
import { BiArrowFromRight } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import LogoFull from "../../assets/logo-full.svg";
import LogoShort from "../../assets/logo-short.svg";
import { animated, useSpring } from "@react-spring/web";
import UITooltip, { UITooltipPosition } from "components/UIKit/UITooltip";
import UIIcon, { UIIconType } from "components/UIKit/UIIcon";

interface SidebarProps {
  setHeaderText: (headerText: string) => void;
}

const menuItems = [
  // {
  //   index: 1,
  //   text: "Dashboard",
  //   path: "/",
  //   icon: <UIIcon type={UIIconType.dashboard} />
  // },
  {
    index: 0,
    text: "Jobs",
    path: "/jobs",
    icon: <UIIcon type={UIIconType.Briefcase} />
  },
  {
    index: 1,
    text: "Skills",
    path: "/skills",
    icon: <UIIcon type={UIIconType.Skills} />
  },
  {
    index: 2,
    text: "Contacts",
    path: "/contacts",
    icon: <UIIcon type={UIIconType.Contacts} />
  },
  {
    index: 3,
    text: "Developer Settings",
    path: "/developer-settings",
    icon: <UIIcon type={UIIconType.Settings} />
  }
];

const Sidebar: React.FC<SidebarProps> = (props) => {
  // Props
  const { setHeaderText } = props;

  // State
  const [isCollapsed, setIsCollapsed] = React.useState<boolean>(false);
  const [currentTab, setCurrentTab] = React.useState<any>(menuItems[0]);

  // Hooks
  const navigate = useNavigate();

  React.useEffect(() => {
    setHeaderText(currentTab.text);
  }, [currentTab]);

  // Animations
  const springs = useSpring({
    width: isCollapsed ? "96px" : "200px",
    config: {
      duration: 100
    }
  });

  const handleMenuItemClick = (item: any) => {
    setHeaderText(item.text);
    setCurrentTab(item);
    navigate(item.path);
  };

  return (
    <animated.div
      className={classNames(
        "flex h-full flex-col justify-between bg-[#101C24]",
        { "w-24": isCollapsed },
        { "w-[200px]": !isCollapsed }
      )}
      style={{ ...springs }}
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
            onClick={() => setIsCollapsed((prev) => !prev)}
          />
          {isCollapsed ? (
            <img src={LogoShort} className="mt-4 inline-block " alt="logo" />
          ) : (
            <img src={LogoFull} className="mt-6 inline-block w-24" alt="logo" />
          )}
        </div>
        <div className="mt-6">
          {menuItems.map((item) => (
            <UITooltip
              key={item.index}
              text={item.text}
              disabled={!isCollapsed}
              position={UITooltipPosition.right}
            >
              <div
                onClick={() => handleMenuItemClick(item)}
                className={classNames(
                  "group flex cursor-pointer flex-row items-center py-2 hover:bg-slate-700",
                  { "bg-slate-800": currentTab.index === item.index },
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
            </UITooltip>
          ))}
        </div>
      </div>
      <div>
        <UITooltip
          text="Settings"
          disabled={!isCollapsed}
          position={UITooltipPosition.right}
        >
          <div
            onClick={() => navigate("/settings")}
            className={classNames(
              "group flex cursor-pointer flex-row items-center py-4 hover:bg-slate-800",
              { "px-2 py-4": isCollapsed }
            )}
          >
            <div className="pl-6 text-slate-300  group-hover:text-white">
              <UIIcon type={UIIconType.Settings} />
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
        </UITooltip>
      </div>
    </animated.div>
  );
};

export default Sidebar;
