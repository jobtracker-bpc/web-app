import { useAuth0 } from "@auth0/auth0-react";
import UIButton from "../../components/UIKit/UIButton";
import { BiLoaderAlt } from "react-icons/bi";

interface LoginProps {}

const Login: React.FC<LoginProps> = (props) => {
  const { loginWithRedirect, isAuthenticated, getAccessTokenSilently, logout } =
    useAuth0();

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#edf2f4]">
      <div className="flex flex-col">
        {/* Hire Me Logo */}
        <div className="mb-10 flex grow flex-row">
          <div className="font-lato text-9xl font-black text-slate-800">
            Hire Me <span className="text-[#0582ca]">Pls.</span>
          </div>
        </div>
        {/* Description */}
        <div className="mb-20 text-center font-roboto text-2xl font-light text-gray-400">
          The app that makes your job search pain less...painful.
        </div>
        {/* Login/Logout Buttons */}
        <div className="flex flex-1 flex-col items-center justify-center">
          {!isAuthenticated ? (
            <UIButton onClick={loginWithRedirect}>Login</UIButton>
          ) : (
            <UIButton onClick={logout}>Logout</UIButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
