import { makeApiCall } from "services/requests";
import { Skill } from "./models";

export const getSkills = (getAccessTokenSilently: () => Promise<string>) => {
  return makeApiCall({
    url: "/skills",
    method: "GET",
    getAccessTokenSilently: getAccessTokenSilently
  });
};

export const createSkill = (
  getAccessTokenSilently: () => Promise<string>,
  skill: Skill
) => {
  return makeApiCall({
    url: "/skills",
    method: "POST",
    getAccessTokenSilently: getAccessTokenSilently,
    body: skill
  });
};

export const editSkill = (
  getAccessTokenSilently: () => Promise<string>,
  skill: Skill
) => {
  return makeApiCall({
    url: `/skills/${skill.id}`,
    method: "PUT",
    getAccessTokenSilently: getAccessTokenSilently,
    body: skill
  });
};

export const deleteSkill = (
  getAccessTokenSilently: () => Promise<string>,
  skillId: number
) => {
  return makeApiCall({
    url: `/skills/${skillId}`,
    method: "DELETE",
    getAccessTokenSilently: getAccessTokenSilently
  });
};

export const getSkillFrequency = (
  getAccessTokenSilently: () => Promise<string>,
  skillId: number
) => {
  return makeApiCall({
    url: `/skills/${skillId}/frequency`,
    method: "GET",
    getAccessTokenSilently: getAccessTokenSilently
  });
};

export const getTopFiveSkills = (
  getAccessTokenSilently: () => Promise<string>
) => {
  return makeApiCall({
    url: "/skills/topfive",
    method: "GET",
    getAccessTokenSilently: getAccessTokenSilently
  });
};
