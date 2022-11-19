import UIButton from "components/UIKit/UIButton";
import UILoadingIndicator from "components/UIKit/UILoadingIndicator";
import UIModal from "components/UIKit/UIModal";
import UIText, { UITextVariant } from "components/UIKit/UIText";
import React from "react";
import { DayPicker } from "react-day-picker";
import { Job } from "services/jobs/models";

import "react-day-picker/dist/style.css";
import UIIcon, { UIIconType } from "components/UIKit/UIIcon";

interface JobConfigModalProps {
  headerText: string;
  job: Job;
  onClose: () => void;
  submitAction: (job: Job) => void;
  loading: boolean;
}

const JobConfigModal: React.FC<JobConfigModalProps> = (props) => {
  const { headerText, job, onClose, submitAction, loading } = props;

  // State
  const [localJob, setLocalJob] = React.useState<Job>(job);
  const [showDatePicker, setShowDatePicker] = React.useState<boolean>(false);

  return (
    <UIModal
      width={600}
      headingText={headerText}
      footerButtons={[
        <UIButton onClick={() => submitAction(localJob)} loading={loading}>
          Submit
        </UIButton>
      ]}
      onClose={onClose}
    >
      <div className="flex flex-row justify-around">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            <UIText variant={UITextVariant.body2}>Job Title</UIText>
            <input
              className="rounded-md border border-gray-300 p-2"
              type="text"
              value={localJob.job_title}
              onChange={(e) =>
                setLocalJob((prev) => ({
                  ...prev,
                  job_title: e.target.value
                }))
              }
            />
          </div>

          <div className="flex flex-col space-y-2">
            <UIText variant={UITextVariant.body2}>Job Link</UIText>
            <input
              className="rounded-md border border-gray-300 p-2"
              type="text"
              value={localJob.job_link}
              onChange={(e) =>
                setLocalJob((prev) => ({
                  ...prev,
                  job_link: e.target.value
                }))
              }
            />
          </div>

          <div className="flex flex-col space-y-2">
            <UIText variant={UITextVariant.body2}>Status</UIText>
            <input
              className="rounded-md border border-gray-300 p-2"
              type="text"
              value={localJob.status}
              onChange={(e) =>
                setLocalJob((prev) => ({
                  ...prev,
                  status: e.target.value
                }))
              }
            />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            <UIText variant={UITextVariant.body2}>Company</UIText>
            <input
              className="rounded-md border border-gray-300 p-2"
              type="text"
              value={localJob.company}
              onChange={(e) =>
                setLocalJob((prev) => ({
                  ...prev,
                  company: e.target.value
                }))
              }
            />
          </div>

          <div className="flex flex-col space-y-2">
            <UIText variant={UITextVariant.body2}>Date Applied</UIText>
            <div>
              <input
                className=" rounded-md border border-gray-300 p-2"
                type="text"
                value={
                  Date.parse(localJob.date_applied)
                    ? localJob.date_applied.toLocaleString()
                    : ""
                }
                onClick={() => setShowDatePicker(true)}
                readOnly
              />
              {showDatePicker && (
                <DayPicker
                  onDayClick={(day) => {
                    setLocalJob((prev) => ({
                      ...prev,
                      date_applied: day.toLocaleDateString("en-US")
                    }));
                    setShowDatePicker(false);
                  }}
                  className="absolute z-10 rounded-xl border bg-white p-4"
                />
              )}
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <UIText variant={UITextVariant.body2}>Interview</UIText>
            <input
              className="rounded-md border border-gray-300 p-2"
              type="text"
              value={localJob.interview}
              onChange={(e) =>
                setLocalJob((prev) => ({
                  ...prev,
                  interview: e.target.value
                }))
              }
            />
          </div>
        </div>
      </div>
    </UIModal>
  );
};

export default JobConfigModal;
