import classNames from "classnames";
import { GiSkills } from "react-icons/gi";
import { HiBriefcase } from "react-icons/hi";
import { MdDashboard, MdPermContactCalendar } from "react-icons/md";
import { RiSettings3Fill } from "react-icons/ri";
import { UIColor } from "../UIColor";

export enum UIIconType {
  dashboard = "dashboard",
  briefcase = "briefcase",
  skills = "skills",
  contacts = "contacts",
  settings = "settings"
}

// Icons

interface UIIconProps {
  color?: UIColor;
  // The Text Typography variant
  type: UIIconType;
  // Optional: Any additional style classes to apply to the icon
  className?: string;
}

const UIIcon: React.FC<UIIconProps> = (props) => {
  const { color, type, className } = props;

  const icon = {
    [UIIconType.dashboard]: <MdDashboard />,
    [UIIconType.briefcase]: <HiBriefcase />,
    [UIIconType.skills]: <GiSkills />,
    [UIIconType.contacts]: <MdPermContactCalendar />,
    [UIIconType.settings]: <RiSettings3Fill />
  };

  return <div className={classNames(color, className)}>{icon[type]}</div>;
};

export default UIIcon;
