import { useAuth0 } from "@auth0/auth0-react";
import UIButton from "components/UIKit/UIButton";
import { UIIconType } from "components/UIKit/UIIcon";
import UILoadingIndicator from "components/UIKit/UILoadingIndicator";
import UITable from "components/UIKit/UITable";
import React from "react";
import { Job } from "services/jobs/models";
import { createJob, deleteJob, editJob, getJobs } from "services/jobs/requests";
import { showToast } from "services/toasts";
import JobConfigModal from "./JobConfigModal";

export enum JobFlow {
  Create = "Create",
  Edit = "Edit"
}

interface JobsProps {}

const Jobs: React.FC<JobsProps> = (props) => {
  // State
  const [jobs, setJobs] = React.useState<Job[]>([]);
  const [jobConfigModalVisible, setJobConfigModalVisible] =
    React.useState<boolean>(false);
  const [currentJob, setCurrentJob] = React.useState<Job>({} as Job);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [currentFlow, setCurrentFlow] = React.useState<JobFlow>(JobFlow.Create);

  // Hooks
  const { getAccessTokenSilently } = useAuth0();

  // On Mount, grab the jobs from the user
  React.useEffect(() => {
    setLoading(true);
    getJobs(getAccessTokenSilently)
      .then((response) => {
        if (response.ok) {
          setJobs(response.data);
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
  }, []);

  const handleCreateJob = (job: Job) => {
    setLoading(true);
    createJob(getAccessTokenSilently, job)
      .then((response) => {
        if (response.ok) {
          setJobs([...jobs, response.data]);
          showToast("Successfully created Job");
        } else {
          showToast("Failed to create job", "Please try again.");
        }
      })
      .catch((error) => {
        showToast("Failed to create job", JSON.stringify(error));
      })
      .finally(() => {
        setJobConfigModalVisible(false);
        setLoading(false);
      });
  };

  const handleEditJob = (job: Job) => {
    setLoading(true);
    editJob(getAccessTokenSilently, job)
      .then((response) => {
        if (response.ok) {
          const newJobs = jobs.map((editedJob) => {
            if (editedJob.id === response.data.id) {
              return response.data;
            }
            return editedJob;
          });
          showToast("Successfully edited job");
          setJobs(newJobs);
        } else {
          showToast("Failed to Edit job", "Please try again.");
        }
      })
      .catch((error) => {
        showToast("Failed to Edit job", JSON.stringify(error));
      })
      .finally(() => {
        setJobConfigModalVisible(false);
        setLoading(false);
      });
  };

  const handleDeleteJob = (job: Job) => {
    setLoading(true);
    deleteJob(getAccessTokenSilently, job.id)
      .then((response) => {
        if (response.ok) {
          const newJobs = jobs.filter((deletedJob) => deletedJob.id !== job.id);
          setJobs(newJobs);
          showToast("Successfully deleted Job");
        } else {
          showToast("Failed to delete job", "Please try again.");
        }
      })
      .catch((error) => {
        showToast("Failed to delete job", JSON.stringify(error));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const openCreateFlow = () => {
    setCurrentFlow(JobFlow.Create);
    setCurrentJob({} as Job);
    setJobConfigModalVisible(true);
  };

  const openEditFlow = (job: Job) => {
    setCurrentFlow(JobFlow.Edit);
    setCurrentJob(job);
    setJobConfigModalVisible(true);
  };

  return (
    <div className="flex w-full flex-col space-y-6 p-6">
      {/* List of Jobs */}
      {loading ? (
        <div className="flex flex-row items-center justify-center">
          <UILoadingIndicator className="text-6xl" />
        </div>
      ) : (
        <div className="flex flex-col space-y-2">
          <UITable
            columns={[
              {
                title: "Job Title",
                key: "job_title",
                width: "300px"
              },
              { title: "Company", key: "company", width: "200px" },
              { title: "Job Link", key: "job_link", width: "200px" },
              { title: "Date Applied", key: "date_applied", width: "200px" },
              { title: "Status", key: "status", width: "200px" },
              { title: "Interview", key: "interview", width: "200px" }
            ]}
            data={jobs}
            headerButtons={[
              <UIButton onClick={openCreateFlow} iconType={UIIconType.Add}>
                New Job
              </UIButton>
            ]}
            handleEdit={openEditFlow}
            handleDelete={handleDeleteJob}
          />
        </div>
      )}
      {jobConfigModalVisible && (
        <JobConfigModal
          headerText={currentFlow === JobFlow.Edit ? "Edit Job" : "Create Job"}
          submitAction={
            currentFlow === JobFlow.Edit ? handleEditJob : handleCreateJob
          }
          job={currentJob}
          onClose={() => setJobConfigModalVisible(false)}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Jobs;
