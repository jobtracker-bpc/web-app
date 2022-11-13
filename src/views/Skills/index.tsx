import { useAuth0 } from "@auth0/auth0-react";
import UIButton from "components/UIKit/UIButton";
import { UIIconType } from "components/UIKit/UIIcon";
import UILoadingIndicator from "components/UIKit/UILoadingIndicator";
import UITable from "components/UIKit/UITable";
import UIText, { UITextVariant } from "components/UIKit/UIText";
import React from "react";
import { Skill } from "services/skills/models";
import {
  createSkill,
  deleteSkill,
  editSkill,
  getSkills
} from "services/skills/requests";
import { showToast } from "services/toasts";
import SkillConfigModal from "./SkillsConfigModal";

export enum SkillFlow {
  Create = "Create",
  Edit = "Edit"
}

interface SkillsProps {}

const Skills: React.FC<SkillsProps> = (props) => {
  // State
  const [skills, setSkills] = React.useState<Skill[]>([]);
  const [skillConfigModalVisible, setSkillConfigModalVisible] =
    React.useState<boolean>(false);
  const [currentSkill, setCurrentSkill] = React.useState<Skill>({} as Skill);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [currentFlow, setCurrentFlow] = React.useState<SkillFlow>(
    SkillFlow.Create
  );

  // Hooks
  const { getAccessTokenSilently } = useAuth0();

  // On Mount, grab the skills from the user
  React.useEffect(() => {
    setLoading(true);
    getSkills(getAccessTokenSilently)
      .then((response) => {
        if (response.ok) {
          setSkills(response.data);
        } else {
          showToast("Error getting Skills", JSON.stringify(response.data));
        }
      })
      .catch((error) => {
        showToast("Error getting Skills", JSON.stringify(error));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleCreateSkill = (skill: Skill) => {
    setLoading(true);
    createSkill(getAccessTokenSilently, skill)
      .then((response) => {
        if (response.ok) {
          setSkills([...skills, response.data]);
          showToast("Sucessfully created Skill");
        } else {
          showToast("Failed to Create Skill", "Please try again.");
        }
      })
      .catch((error) => {
        showToast("Failed to Create Skill", JSON.stringify(error));
      })
      .finally(() => {
        setSkillConfigModalVisible(false);
        setLoading(false);
      });
  };

  const handleEditSkill = (skill: Skill) => {
    setLoading(true);
    editSkill(getAccessTokenSilently, skill)
      .then((response) => {
        if (response.ok) {
          const newSkills = skills.map((editedSkill) => {
            if (editedSkill.id === response.data.id) {
              return response.data;
            }
            return editSkill;
          });
          showToast("Successfully edited skill");
          setSkills(newSkills);
        } else {
          showToast("Failed to Edit skill", "Please try again.");
        }
      })
      .catch((error) => {
        showToast("Failed to Edit skill", JSON.stringify(error));
      })
      .finally(() => {
        setSkillConfigModalVisible(false);
        setLoading(false);
      });
  };

  const handleDeleteJob = (skill: Skill) => {
    setLoading(true);
    deleteSkill(getAccessTokenSilently, skill.id)
      .then((response) => {
        if (response.ok) {
          const newSkills = skills.filter(
            (deletedSkill) => deletedSkill.id !== skill.id
          );
          setSkills(newSkills);
          showToast("Successfully deleted skill");
        } else {
          showToast("Failed to delete skill", "Please try again.");
        }
      })
      .catch((error) => {
        showToast("Failed to delete skill", JSON.stringify(error));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const openCreateFlow = () => {
    setCurrentFlow(SkillFlow.Create);
    setCurrentSkill({} as Skill);
    setSkillConfigModalVisible(true);
  };

  const openEditFlow = (skill: Skill) => {
    setCurrentFlow(SkillFlow.Edit);
    setCurrentSkill(skill);
    setSkillConfigModalVisible(true);
  };

  return (
    <div className="flex w-full flex-col space-y-6 p-6">
      {/* List of Skills */}
      {loading ? (
        <div className="flex flex-row items-center justify-center">
          <UILoadingIndicator className="text-6xl" />
        </div>
      ) : (
        <div className="flex flex-col space-y-2">
          <UITable
            columns={[
              { title: "Skill", key: "skill_name", width: "300px" },
              { title: "Skill Priority", key: "skill_priority", width: "200px" }
            ]}
            data={skills}
            headerButtons={[
              <UIButton onClick={openCreateFlow} iconType={UIIconType.Add}>
                New Skill
              </UIButton>
            ]}
            handleEdit={openEditFlow}
            handleDelete={handleDeleteJob}
          />
        </div>
      )}
      {skillConfigModalVisible && (
        <SkillConfigModal
          headerText={
            currentFlow === SkillFlow.Edit ? "Edit Job" : "Create Job"
          }
          submitAction={
            currentFlow === SkillFlow.Edit ? handleEditSkill : handleCreateSkill
          }
          skill={currentSkill}
          onClose={() => setSkillConfigModalVisible(false)}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Skills;
