import { makeApiCall } from "services/requests";
import { Job } from "./models";

export const getJobs = (getAccessTokenSilently: () => Promise<string>) => {
  return makeApiCall({
    url: "/jobs",
    method: "GET",
    getAccessTokenSilently: getAccessTokenSilently
  });
};

export const createNewJob = (
  getAccessTokenSilently: () => Promise<string>,
  job: Job
) => {
  return makeApiCall({
    url: "/jobs",
    method: "POST",
    getAccessTokenSilently: getAccessTokenSilently,
    body: job
  });
};

// TODO: FIX THIS SHOULD USE JOB ID
export const deleteJob = (
  getAccessTokenSilently: () => Promise<string>,
  jobUrl: string
) => {
  return makeApiCall({
    url: jobUrl,
    includeBase: false,
    method: "DELETE",
    getAccessTokenSilently: getAccessTokenSilently
  });
};
