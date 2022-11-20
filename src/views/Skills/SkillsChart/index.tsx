import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { getTopFiveSkills } from "services/skills/requests";
import { showToast, ToastType } from "services/toasts";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { Skill } from "services/skills/models";
import UIText, { UITextVariant } from "components/UIKit/UIText";

interface SkillsChart {}

const SkillsChart: React.FC<SkillsChart> = (props) => {
  const {} = props;

  // State
  const [topFiveSkills, setTopFiveSkills] = React.useState<Skill[]>([]);
  const [chartData, setChartData] = React.useState<any[]>([]);

  // Hooks
  const { getAccessTokenSilently } = useAuth0();

  // On Mount, grab the skills from the user
  React.useEffect(() => {
    getTopFiveSkills(getAccessTokenSilently)
      .then((response) => {
        if (response.ok) {
          setTopFiveSkills(response.data);
        } else {
          showToast({
            title: "Error getting Top Skills",
            description: JSON.stringify(response.data),
            toastType: ToastType.Error
          });
        }
      })
      .catch((error) => {
        showToast({
          title: "Error getting Top Skills",
          description: JSON.stringify(error),
          toastType: ToastType.Error
        });
      });
  }, []);

  const getChartData = () => {
    const newData = topFiveSkills.map((skill) => {
      return {
        "Skill Name": skill.skill_name,
        "Skill Frequency": skill.skill_frequency
      };
    });

    return newData;
  };

  return (
    <>
      {topFiveSkills.length ? (
        <div className="my-6 flex h-[500px] w-full flex-col items-center justify-center space-y-4">
          <UIText variant={UITextVariant.heading1}>Top 5 Skills</UIText>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={getChartData()}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Skill Name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Skill Frequency" fill="#1E293B" barSize={150} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex h-[500px] flex-col items-center justify-center  rounded-lg border-2 border-dashed border-slate-300">
          <UIText
            variant={UITextVariant.heading1}
            className="text-2xl  text-gray-500"
          >
            No Skills Data to display
          </UIText>
          <UIText
            variant={UITextVariant.heading1}
            className="text-xl text-gray-500"
          >
            Add some skills to see them here!
          </UIText>
        </div>
      )}
    </>
  );
};

export default SkillsChart;
