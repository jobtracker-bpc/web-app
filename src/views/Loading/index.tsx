import { useAuth0 } from "@auth0/auth0-react";
import UIButton from "../../components/UIKit/UIButton";
import { BiLoaderAlt } from "react-icons/bi";

interface LoadingProps {}

const Loading: React.FC<LoadingProps> = (props) => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="animate-spin text-purple-700">
        <BiLoaderAlt className="text-5xl" />
      </div>
    </div>
  );
};

export default Loading;
