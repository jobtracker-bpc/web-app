import { useAuth0 } from "@auth0/auth0-react";
import UIButton from "components/UIKit/UIButton";
import UIText, { UITextVariant } from "components/UIKit/UIText";
import React from "react";
import toast from "react-hot-toast";
import { makeApiCall } from "services/requests";
import { showToast } from "services/toasts";

interface JobsProps {}

const DeveloperSettings: React.FC<JobsProps> = (props) => {
  const [results, setResults] = React.useState(null);
  const [urlInput, setURLInput] = React.useState<string>("");
  const { logout } = useAuth0();
  const { getAccessTokenSilently } = useAuth0();

  const handleData = () => {
    makeApiCall(getAccessTokenSilently, urlInput)
      .then((response) => {
        if (response.ok) {
          console.log(response);
          setResults(response);
        }
      })
      .catch((err) => {
        showToast("Error", JSON.stringify(err));
      });
  };

  return (
    <div className="flex h-screen w-screen flex-row space-x-20 p-10">
      <div className="flex max-w-[400px] flex-col space-y-10">
        <UIText variant={UITextVariant.heading1}>Developer Testing Page</UIText>
        <UIText variant={UITextVariant.body3}>
          To use, enter url and it will be used to hit the request api with the
          proper authentication token already added to the headers
        </UIText>

        <div className="flex flex-col">
          <UIText variant={UITextVariant.body3}>Enter URL:</UIText>
          <input
            value={urlInput}
            onChange={(e) => setURLInput(e.target.value)}
            className="border border-blue-400 p-2"
          />
        </div>

        <div className="flex w-44 flex-col space-y-4">
          <UIButton onClick={handleData}>Test</UIButton>
          <UIButton onClick={logout}>Logout</UIButton>
        </div>
      </div>
      <div className="flex max-w-[400px] flex-col">
        <UIText variant={UITextVariant.heading1}>Results</UIText>
        <UIText variant={UITextVariant.body3}>
          <pre>{JSON.stringify(results, null, 1)}</pre>
        </UIText>
      </div>
    </div>
  );
};

export default DeveloperSettings;