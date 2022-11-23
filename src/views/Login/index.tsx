import { useAuth0 } from "@auth0/auth0-react";
import UIButton from "../../components/UIKit/UIButton";
import Lottie from "lottie-react";
import manWorking from "../../assets/man-working.json";
import UIText, { UITextVariant } from "components/UIKit/UIText";

interface LoginProps {}

const Login: React.FC<LoginProps> = (props) => {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  return (
    <div className="flex h-screen w-screen flex-row items-center justify-center bg-[#edf2f4]">
      {/* Left Container */}
      <div className="flex h-full grow justify-center bg-slate-900">
        <Lottie animationData={manWorking} loop className="w-[600px]" />
      </div>
      {/* Right Container */}
      <div className="mx-40 flex flex-col items-center justify-center text-center">
        {/* Hire Me Logo */}
        <div className="mb-20 rounded-xl border-4 border-dotted border-slate-600 py-20 px-10">
          <div className="font-ubuntu mb-2  text-8xl font-extrabold text-slate-900">
            Hire Me <span className="text-slate-500">Pls.</span>
          </div>
          {/* Description */}
          <UIText
            variant={UITextVariant.body1}
            className="text-center text-xl text-gray-500"
          >
            The app that makes your job search pain less...painful.
          </UIText>
          {/* Login/Logout Buttons */}
          <div className="mt-10 flex flex-1 flex-col items-center justify-center">
            {!isAuthenticated ? (
              <UIButton onClick={loginWithRedirect}>Get Started</UIButton>
            ) : (
              <UIButton onClick={logout}>Logout</UIButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
