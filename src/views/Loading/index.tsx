import UILoadingIndicator from "components/UIKit/UILoadingIndicator";
import UIText, { UITextVariant } from "components/UIKit/UIText";

interface LoadingProps {}

const Loading: React.FC<LoadingProps> = (props) => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center space-y-6">
      <UIText variant={UITextVariant.body1}>
        Pain is temporary, but the results are worth it.
      </UIText>
      <UILoadingIndicator className="text-6xl text-blue-600" />
    </div>
  );
};

export default Loading;
