import { useAuth0 } from "@auth0/auth0-react";
import UIButton from "components/UIKit/UIButton";
import { UIIconType } from "components/UIKit/UIIcon";
import UIInput from "components/UIKit/UIInput";
import UILoadingIndicator from "components/UIKit/UILoadingIndicator";
import UITable from "components/UIKit/UITable";
import UIText, { UITextVariant } from "components/UIKit/UIText";
import React from "react";
import { Job } from "services/jobs/models";
import { createJob, deleteJob, editJob, getJobs } from "services/jobs/requests";
import { showToast, ToastType } from "services/toasts";
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
          showToast({
            title: "Error Getting Jobs",
            description: JSON.stringify(response.data),
            toastType: ToastType.Error
          });
        }
      })
      .catch((error) => {
        showToast({
          title: "Error Getting Jobs",
          description: JSON.stringify(error),
          toastType: ToastType.Error
        });
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
          showToast({
            title: "Successfully created Job",
            toastType: ToastType.Success
          });
        } else {
          showToast({
            title: "Failed to create job",
            description: "Please try again.",
            toastType: ToastType.Error
          });
        }
      })
      .catch((error) => {
        showToast({
          title: "Failed to create job",
          description: JSON.stringify(error),
          toastType: ToastType.Error
        });
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
          showToast({
            title: "Successfully edited job",
            toastType: ToastType.Success
          });
          setJobs(newJobs);
        } else {
          showToast({
            title: "Failed to Edit job",
            description: "Please try again.",
            toastType: ToastType.Error
          });
        }
      })
      .catch((error) => {
        showToast({
          title: "Failed to Edit job",
          description: JSON.stringify(error),
          toastType: ToastType.Error
        });
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
          showToast({
            title: "Successfully deleted Job",
            toastType: ToastType.Success
          });
        } else {
          showToast({
            title: "Failed to delete job",
            description: "Please try again.",
            toastType: ToastType.Error
          });
        }
      })
      .catch((error) => {
        showToast({
          title: "Failed to delete job",
          description: JSON.stringify(error),
          toastType: ToastType.Error
        });
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
            nestedRowData={(job: Job) => {
              return (
                <div className="flex flex-col space-y-4">
                  <UIText variant={UITextVariant.heading2}>Skills</UIText>
                  <div className="flex flex-row space-x-2">
                    <div className="rounded-full bg-slate-800 py-1 px-4 text-white">
                      React
                    </div>
                    <div className="rounded-full bg-slate-800 py-1 px-4 text-white">
                      Javascript
                    </div>
                    <div className="rounded-full bg-slate-800 py-1 px-4 text-white">
                      CSS
                    </div>
                  </div>
                </div>
              );
            }}
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
