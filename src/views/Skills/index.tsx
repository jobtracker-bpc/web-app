import { useAuth0 } from "@auth0/auth0-react";
import UIButton from "components/UIKit/UIButton";
import UILoadingIndicator from "components/UIKit/UILoadingIndicator";
import UITable from "components/UIKit/UITable";
import UIText, { UITextVariant } from "components/UIKit/UIText";
import React from "react";
import { Skill } from "services/skills/models";
import { createNewSkill, deleteSkill, getSkills } from "services/skills/requests";
import { showToast } from "services/toasts";

interface SkillsProps {}

const Skills: React.FC<SkillsProps> = (props) => {
// State
const [skills, setSkills] = React.useState<Skill[]>([]);
const [skillCreatorOpen, setSkillCreatorOpen] = React.useState<boolean>(false);
const [newSkill, setNewSkill] = React.useState<Skill>({} as Skill);
const [fetch, setFetch] = React.useState<boolean>(false);
const [loading, setLoading] = React.useState<boolean>(false);

// Hooks
const { logout, getAccessTokenSilently } = useAuth0();

// On Mount, grab the skills from the user
React.useEffect(() => {
  setLoading(true);
  getSkills(getAccessTokenSilently)
    .then((response) => {
      if (response.ok) {
        setSkills(response.data);
      } else {
        showToast("Error", JSON.stringify(response.data));
      }
    })
    .catch((error) => {
      showToast("Error", JSON.stringify(error));
    })
    .finally(() => {
      setLoading(false);
    });
}, [fetch]);

const createSkill = () => {
  createNewSkill(getAccessTokenSilently, newSkill)
    .then((response) => {
      if (response.ok) {
        setSkills([...skills, response.data]);
      } else {
        showToast("Error", JSON.stringify(response.data));
      }
    })
    .catch((error) => {
      showToast("Error", JSON.stringify(error));
    });
};

const handleDeleteSkill = (jobId: number) => {
  deleteSkill(getAccessTokenSilently, jobId)
    .then((response) => {
      if (response.ok) {
        setFetch((prev) => !prev);
      } else {
        showToast("Error", JSON.stringify(response.status));
      }
    })
    .catch((error) => {
      showToast("Error", JSON.stringify(error));
    });
};

return (
  <div className=" m-10 flex w-full flex-col space-y-10 text-4xl">
    {/* Header */}
    <div className="flex flex-row justify-between">
      <UIText variant={UITextVariant.heading1}>Skills</UIText>
      <UIButton onClick={() => setSkillCreatorOpen((prev) => !prev)}>
        Add New Skill
      </UIButton>
    </div>
    {/* Skill Creator */}
    {skillCreatorOpen && (
      <div className="flex flex-col">
        <UIText variant={UITextVariant.heading2}>Create New Skill</UIText>
        <div className="flex flex-row flex-wrap space-x-10">
          <div className="flex flex-col">
            <UIText variant={UITextVariant.body2}>Skill</UIText>
            <input
              className="w-[300px] border border-blue-400 p-2 text-sm"
              onChange={(e) => {
                setNewSkill({ ...newSkill, skill_name: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col">
            <UIText variant={UITextVariant.body2}>Skill Priority</UIText>
            <input
              className="w-[300px] border border-blue-400 p-2 text-sm"
              onChange={(e) => {
                setNewSkill({ ...newSkill, skill_priority: e.target.value });
              }}
            />
          </div>
        </div>
        <UIButton className="mt-6 w-2" onClick={createSkill}>
          Submit
        </UIButton>
      </div>
    )}
    {/* List of Skills */}
    {loading ? (
      <div className="flex flex-row justify-center">
        <UILoadingIndicator className="text-6xl" />
      </div>
    ) : (
      <div className="flex flex-col space-y-2">
        <UITable
          columns={[
            { title: "Skill", key: "skill_name", width: "300px" },
            { title: "Skill Priority", key: "skill_priority", width: "200px" },

          ]}
          data={skills}
          handleDelete={handleDeleteSkill}
        />
      </div>
    )}
  </div>
);
};

export default Skills;
