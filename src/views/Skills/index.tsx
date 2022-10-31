import { useAuth0 } from "@auth0/auth0-react";
import UIButton from "components/UIKit/UIButton";
import { UIColor } from "components/UIKit/UIColor";
import UIText, { UITextVariant } from "components/UIKit/UIText";
import { useNavigate } from "react-router-dom";

interface SkillsProps {}

const Skills: React.FC<SkillsProps> = (props) => {
  const { logout } = useAuth0();
  return (
    <div className="flex w-full flex-col items-center justify-center space-y-10 bg-[#edf2f4] text-4xl">
      <UIText variant={UITextVariant.heading1}>Skills</UIText>
      <div className="flex flex-col space-y-4">
        <UIButton onClick={logout}>Logout</UIButton>
      </div>
    </div>
  );
};

export default Skills;
