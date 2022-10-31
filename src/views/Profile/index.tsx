import { useAuth0 } from "@auth0/auth0-react";
import UIButton from "../../components/UIKit/UIButton";
import { BiLoaderAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import UIText, { UITextVariant } from "components/UIKit/UIText";

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = (props) => {
  const { user } = useAuth0();
  const navigate = useNavigate();
  return (
    <div className="flex w-full flex-col items-center justify-center space-y-10 bg-[#edf2f4] text-9xl">
      <div className="mt-10 flex flex-col items-center justify-center rounded-xl bg-slate-200 p-16">
        <div className="mb-10">
          <img
            src={user?.picture}
            alt={user?.name}
            className="w-28 rounded-full"
          />
        </div>
        <div className="flex flex-col space-y-4">
          <UIText variant={UITextVariant.heading3}>Name: {user?.name}</UIText>
          <UIText variant={UITextVariant.heading3}>Email: {user?.email}</UIText>
          <UIText variant={UITextVariant.heading3}>
            Email Verified: {user?.email_verified}
          </UIText>
          <UIText variant={UITextVariant.heading3}>{user?.email}</UIText>
          <UIText variant={UITextVariant.heading3}>{user?.gender}</UIText>
        </div>
      </div>
    </div>
  );
};

export default Profile;
