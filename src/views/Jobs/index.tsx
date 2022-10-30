import { useAuth0 } from "@auth0/auth0-react";
import UIButton from "components/UIKit/UIButton";
import UIText, { UITextVariant } from "components/UIKit/UIText";
import React from "react";
import { makeApiCall } from "services/requests";

interface JobsProps {}

const Jobs: React.FC<JobsProps> = (props) => {
  const { logout } = useAuth0();
  const { getAccessTokenSilently } = useAuth0();

  const handleData = () => {
    makeApiCall(getAccessTokenSilently).then((data) => console.log(data));
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center space-y-10 bg-[#edf2f4] text-4xl">
      <UIText variant={UITextVariant.heading1}>Jobs</UIText>
      <div className="flex flex-col space-y-4">
        <UIButton onClick={handleData}>Test</UIButton>
        <UIButton onClick={logout}>Logout</UIButton>
      </div>
    </div>
  );
};

export default Jobs;
