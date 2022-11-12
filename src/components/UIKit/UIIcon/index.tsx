import classNames from "classnames";
import { GiSkills } from "react-icons/gi";
import { HiBriefcase } from "react-icons/hi";
import {
  MdDashboard,
  MdPermContactCalendar,
  MdModeEditOutline
} from "react-icons/md";
import { RiSettings3Fill } from "react-icons/ri";
import { FaChevronDown } from "react-icons/fa";
import { UIColor } from "../UIColor";
import { AiFillDelete } from "react-icons/ai";
import { CgClose } from "react-icons/cg";

// Icons
export enum UIIconType {
  Briefcase = "Briefcase",
  ChevronDown = "ChevronDown",
  Close = "Close",
  Contacts = "Contacts",
  Dashboard = "Dashboard",
  Delete = "Delete",
  Settings = "Settings",
  Skills = "Skills",
  Edit = "Edit"
}

interface UIIconProps {
  color?: UIColor;
  // The Text Typography variant
  type: UIIconType;
  // Optional: Any additional style classes to apply to the icon
  className?: string;
  // Optional: Function call when icon Clicked
  onClick?: () => void;
}

const UIIcon: React.FC<UIIconProps> = (props) => {
  const { color, type, className, onClick } = props;

  const icon = {
    [UIIconType.Briefcase]: <HiBriefcase />,
    [UIIconType.ChevronDown]: <FaChevronDown />,
    [UIIconType.Close]: <CgClose />,
    [UIIconType.Contacts]: <MdPermContactCalendar />,
    [UIIconType.Dashboard]: <MdDashboard />,
    [UIIconType.Delete]: <AiFillDelete />,
    [UIIconType.Edit]: <MdModeEditOutline />,
    [UIIconType.Settings]: <RiSettings3Fill />,
    [UIIconType.Skills]: <GiSkills />
  };

  return (
    <div className={classNames(color, className)} onClick={onClick}>
      {icon[type]}
    </div>
  );
};

export default UIIcon;
