import { useAuth0 } from "@auth0/auth0-react";
import UIButton from "../../components/UIKit/UIButton";
import { BiLoaderAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = (props) => {
  const { logout } = useAuth0();
  const navigate = useNavigate();
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center space-y-10 bg-[#edf2f4] text-9xl">
      <div>Profile Page</div>
      <div className="flex flex-col space-y-4">
        <UIButton onClick={() => navigate("/")}>Home</UIButton>
        <UIButton onClick={logout}>Logout</UIButton>
      </div>
    </div>
  );
};

export default Profile;
