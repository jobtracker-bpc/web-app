import { useAuth0 } from "@auth0/auth0-react";
import UIButton from "components/UIKit/UIButton";
import UIText, { UITextVariant } from "components/UIKit/UIText";
import { create } from "domain";
import React from "react";
import { Job } from "services/jobs/models";
import { createNewJob, deleteJob, getJobs } from "services/jobs/requests";
import { showToast } from "services/toasts";

interface JobsProps {}

const Jobs: React.FC<JobsProps> = (props) => {
  // State
  const [jobs, setJobs] = React.useState<Job[]>([]);
  const [jobCreatorOpen, setJobCreatorOpen] = React.useState<boolean>(false);
  const [newJob, setNewJob] = React.useState<Job>({} as Job);
  const [fetch, setFetch] = React.useState<boolean>(false);

  // Hooks
  const { logout, getAccessTokenSilently } = useAuth0();

  // On Mount, grab the jobs from the user
  React.useEffect(() => {
    getJobs(getAccessTokenSilently)
      .then((response) => {
        if (response.ok) {
          setJobs(response.data.jobs);
        } else {
          showToast("Error", JSON.stringify(response.data));
        }
      })
      .catch((error) => {
        showToast("Error", JSON.stringify(error));
      });
  }, [fetch]);

  const createJob = () => {
    createNewJob(getAccessTokenSilently, newJob)
      .then((response) => {
        if (response.ok) {
          setJobs([...jobs, response.data]);
        } else {
          showToast("Error", JSON.stringify(response.data));
        }
      })
      .catch((error) => {
        showToast("Error", JSON.stringify(error));
      });
  };

  const handleDeleteJob = (jobUrl) => {
    deleteJob(getAccessTokenSilently, jobUrl)
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
        <UIText variant={UITextVariant.heading1}>Jobs</UIText>
        <UIButton onClick={() => setJobCreatorOpen((prev) => !prev)}>
          Create New Job
        </UIButton>
        <UIButton onClick={logout}>Logout</UIButton>
      </div>
      {/* Job Creator */}
      {jobCreatorOpen && (
        <div className="flex flex-col space-y-4">
          <UIText variant={UITextVariant.heading2}>Create New Job</UIText>
          <div className="flex flex-col">
            <UIText variant={UITextVariant.body2}>Job Title</UIText>
            <input
              className="border border-blue-400 p-2 text-sm"
              onChange={(e) => {
                setNewJob({ ...newJob, job_title: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col">
            <UIText variant={UITextVariant.body2}>Job Company</UIText>
            <input
              className="border border-blue-400 p-2 text-sm"
              onChange={(e) => {
                setNewJob({ ...newJob, company: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col">
            <UIText variant={UITextVariant.body2}>Job Link</UIText>
            <input
              className="border border-blue-400 p-2 text-sm"
              onChange={(e) => {
                setNewJob({ ...newJob, job_link: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col">
            <UIText variant={UITextVariant.body2}>Date Applied</UIText>
            <input
              className="border border-blue-400 p-2 text-sm"
              onChange={(e) => {
                setNewJob({ ...newJob, date_applied: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col">
            <UIText variant={UITextVariant.body2}>Status</UIText>
            <input
              className="border border-blue-400 p-2 text-sm"
              onChange={(e) => {
                setNewJob({ ...newJob, status: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col">
            <UIText variant={UITextVariant.body2}>Interview</UIText>
            <input
              className="border border-blue-400 p-2 text-sm"
              onChange={(e) => {
                setNewJob({ ...newJob, interview: e.target.value });
              }}
            />
          </div>
          <UIButton className="w-24" onClick={createJob}>
            Submit
          </UIButton>
        </div>
      )}
      {/* List of Jobs */}
      <div className="flex flex-col space-y-2">
        {jobs?.map((job) => (
          <div className="flex flex-row justify-between border">
            <div className="flex flex-row  space-x-4 ">
              <UIText variant={UITextVariant.body2}>{job?.job_title}</UIText>
              <UIText variant={UITextVariant.body2}>{job?.company}</UIText>
              <UIText variant={UITextVariant.body2}>{job?.job_link}</UIText>
              <UIText variant={UITextVariant.body2}>{job?.date_applied}</UIText>
              <UIText variant={UITextVariant.body2}>{job?.status}</UIText>
              <UIText variant={UITextVariant.body2}>{job?.interview}</UIText>
            </div>
            <UIButton onClick={() => handleDeleteJob(job.self)}>
              Delete Job
            </UIButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
