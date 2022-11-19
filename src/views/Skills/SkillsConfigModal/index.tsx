import UIButton from "components/UIKit/UIButton";
import UIInput from "components/UIKit/UIInput";
import UILoadingIndicator from "components/UIKit/UILoadingIndicator";
import UIModal from "components/UIKit/UIModal";
import UIText, { UITextVariant } from "components/UIKit/UIText";
import React from "react";
import { Job } from "services/jobs/models";
import { Skill } from "services/skills/models";
import { showToast, ToastType } from "services/toasts";
import { isValidFields } from "services/utils/validation";

interface SkillsConfigModalProps {
  headerText: string;
  skill: Skill;
  onClose: () => void;
  submitAction: (skill: Skill) => void;
  loading: boolean;
}

const SkillConfigModal: React.FC<SkillsConfigModalProps> = (props) => {
  const { headerText, skill, onClose, submitAction, loading } = props;

  // State
  const [localSkill, setLocalSkill] = React.useState<Skill>(skill);

  const handleSubmit = (localSkill: Skill) => {
    if (isValidFields(localSkill)) {
      submitAction(localSkill);
    } else {
      showToast({
        title: "Please fill out all fields",
        toastType: ToastType.Error
      });
    }
  };

  return (
    <UIModal
      width={600}
      headingText={headerText}
      footerButtons={[
        <UIButton onClick={() => handleSubmit(localSkill)} loading={loading}>
          Submit
        </UIButton>
      ]}
      onClose={onClose}
    >
      <div className="my-4 mx-8 flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <UIText variant={UITextVariant.heading3}>Skill Name</UIText>
          <UIInput
            placeholder="e.g. React"
            value={localSkill.skill_name}
            onChange={(e) =>
              setLocalSkill((prev) => ({
                ...prev,
                skill_name: e.target.value
              }))
            }
          />
        </div>
        <div className="flex flex-col space-y-2">
          <UIText variant={UITextVariant.heading3}>Skill Priority</UIText>
          <UIInput
            placeholder="Skill Priority"
            value={localSkill.skill_priority}
            onChange={(e) =>
              setLocalSkill((prev) => ({
                ...prev,
                skill_priority: e.target.value
              }))
            }
          />
        </div>
      </div>
    </UIModal>
  );
};

export default SkillConfigModal;
