import { useAuth0 } from "@auth0/auth0-react";
import UIButton from "components/UIKit/UIButton";
import { UIColor } from "components/UIKit/UIColor";
import UIText, { UITextVariant } from "components/UIKit/UIText";
import { useNavigate } from "react-router-dom";

interface HomeProps {}

const Home: React.FC<HomeProps> = (props) => {
  const navigate = useNavigate();
  const { logout } = useAuth0();
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center space-y-10 bg-[#edf2f4] text-4xl">
      <div>HomePage</div>
      <div className="flex flex-col space-y-4">
        <UIButton onClick={() => navigate("/profile")}>Profile</UIButton>
        <UIButton onClick={logout}>Logout</UIButton>
      </div>
    </div>
  );
};

export default Home;
