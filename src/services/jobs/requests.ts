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

export const deleteJob = (
  getAccessTokenSilently: () => Promise<string>,
  jobId: number
) => {
  return makeApiCall({
    url: `/jobs/${jobId}`,
    method: "DELETE",
    getAccessTokenSilently: getAccessTokenSilently
  });
};
