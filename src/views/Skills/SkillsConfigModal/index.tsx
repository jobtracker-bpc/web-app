import UIButton from "components/UIKit/UIButton";
import UIDropdown from "components/UIKit/UIDropdown";
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
  const [formValid, setFormValid] = React.useState<boolean>(false);

  const handleSubmit = (localSkill: Skill) => {
    submitAction(localSkill);
  };

  React.useEffect(() => {
    if (localSkill.skill_name && localSkill.skill_proficiency) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [localSkill]);

  React.useEffect(() => {
    if (!Object.keys(localSkill).length) {
      setLocalSkill({
        skill_name: "",
        skill_proficiency: ""
      });
    }
  }, [skill]);

  return (
    <UIModal
      width={600}
      headingText={headerText}
      footerButtons={[
        <UIButton
          onClick={() => handleSubmit(localSkill)}
          loading={loading}
          disabled={!formValid}
          className="disabled:cursor-not-allowed disabled:border-white disabled:bg-slate-300 disabled:text-slate-400"
        >
          Submit
        </UIButton>
      ]}
      onClose={onClose}
    >
      <div className="my-4 mx-8 flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2 ">
            <UIText variant={UITextVariant.heading3}>Skill Name</UIText>
            <UIText variant={UITextVariant.body3} className="text-gray-400">
              ( required )
            </UIText>
          </div>
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
          <div className="flex items-center space-x-2 ">
            <UIText variant={UITextVariant.heading3}>Skill Proficiency</UIText>
            <UIText variant={UITextVariant.body3} className="text-gray-400">
              ( required )
            </UIText>
          </div>
          <UIInput
            placeholder="Skill Proficiency"
            value={localSkill.skill_proficiency}
            onChange={(e) =>
              setLocalSkill((prev) => ({
                ...prev,
                skill_proficiency: e.target.value
              }))
            }
          />
        </div>
      </div>
    </UIModal>
  );
};

export default SkillConfigModal;
