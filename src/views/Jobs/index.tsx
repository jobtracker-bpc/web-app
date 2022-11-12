import { useAuth0 } from "@auth0/auth0-react";
import UIButton from "components/UIKit/UIButton";
import UILoadingIndicator from "components/UIKit/UILoadingIndicator";
import UIModal from "components/UIKit/UIModal";
import UITable from "components/UIKit/UITable";
import UIText, { UITextVariant } from "components/UIKit/UIText";
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
  const [loading, setLoading] = React.useState<boolean>(false);

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

  const handleDeleteJob = (jobId: number) => {
    deleteJob(getAccessTokenSilently, jobId)
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
    <div className="flex w-full flex-col space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-row justify-between">
        <UIButton onClick={() => setJobCreatorOpen((prev) => !prev)}>
          Create New Job
        </UIButton>
      </div>

      {/* List of Jobs */}
      {loading ? (
        <div className="flex flex-row justify-center">
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
            handleDelete={handleDeleteJob}
          />
        </div>
      )}
      {jobCreatorOpen && (
        <UIModal
          height={700}
          width={600}
          headingText={"Add New Job"}
          footerButtons={[<UIButton onClick={createJob}>Submit</UIButton>]}
          onClose={() => setJobCreatorOpen((prev) => !prev)}
        >
          <div className="flex justify-center">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-2">
                <UIText variant={UITextVariant.body2}>Job Title</UIText>
                <input
                  className="rounded-md border border-gray-300 p-2"
                  type="text"
                  value={newJob.job_title}
                  onChange={(e) =>
                    setNewJob((prev) => ({
                      ...prev,
                      job_title: e.target.value
                    }))
                  }
                />
              </div>
              <div className="flex flex-col space-y-2">
                <UIText variant={UITextVariant.body2}>Company</UIText>
                <input
                  className="rounded-md border border-gray-300 p-2"
                  type="text"
                  value={newJob.company}
                  onChange={(e) =>
                    setNewJob((prev) => ({
                      ...prev,
                      company: e.target.value
                    }))
                  }
                />
              </div>
              <div className="flex flex-col space-y-2">
                <UIText variant={UITextVariant.body2}>Job Link</UIText>
                <input
                  className="rounded-md border border-gray-300 p-2"
                  type="text"
                  value={newJob.job_link}
                  onChange={(e) =>
                    setNewJob((prev) => ({
                      ...prev,
                      job_link: e.target.value
                    }))
                  }
                />
              </div>
              <div className="flex flex-col space-y-2">
                <UIText variant={UITextVariant.body2}>Date Applied</UIText>
                <input
                  className="rounded-md border border-gray-300 p-2"
                  type="text"
                  value={newJob.date_applied}
                  onChange={(e) =>
                    setNewJob((prev) => ({
                      ...prev,
                      date_applied: e.target.value
                    }))
                  }
                />
              </div>
              <div className="flex flex-col space-y-2">
                <UIText variant={UITextVariant.body2}>Status</UIText>
                <input
                  className="rounded-md border border-gray-300 p-2"
                  type="text"
                  value={newJob.status}
                  onChange={(e) =>
                    setNewJob((prev) => ({
                      ...prev,
                      status: e.target.value
                    }))
                  }
                />
              </div>
              <div className="flex flex-col space-y-2">
                <UIText variant={UITextVariant.body2}>Interview</UIText>
                <input
                  className="rounded-md border border-gray-300 p-2"
                  type="text"
                  value={newJob.interview}
                  onChange={(e) =>
                    setNewJob((prev) => ({
                      ...prev,
                      interview: e.target.value
                    }))
                  }
                />
              </div>
            </div>
          </div>
        </UIModal>
      )}
    </div>
  );
};

export default Jobs;
