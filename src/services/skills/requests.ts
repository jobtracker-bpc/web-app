import { makeApiCall } from "services/requests";
import { Skill } from "./models";

export const getSkills = (getAccessTokenSilently: () => Promise<string>) => {
  return makeApiCall({
    url: "/skills",
    method: "GET",
    getAccessTokenSilently: getAccessTokenSilently
  });
};

export const createNewSkill = (
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
