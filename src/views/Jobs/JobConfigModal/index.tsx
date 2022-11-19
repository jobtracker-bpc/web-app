import UIButton from "components/UIKit/UIButton";
import UILoadingIndicator from "components/UIKit/UILoadingIndicator";
import UIModal from "components/UIKit/UIModal";
import UIText, { UITextVariant } from "components/UIKit/UIText";
import React from "react";
import { DayPicker } from "react-day-picker";
import { Job } from "services/jobs/models";

import "react-day-picker/dist/style.css";
import UIIcon, { UIIconType } from "components/UIKit/UIIcon";
import { showToast, ToastType } from "services/toasts";
import { isValidFields } from "services/utils/validation";
import UIInput from "components/UIKit/UIInput";
import { useOutsideClick } from "services/hooks/useOutsideClick";
import UIDropdown from "components/UIKit/UIDropdown";

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

  const handleClickOutside = () => {
    setShowDatePicker(false);
  };

  const dropdownRef: any = useOutsideClick(handleClickOutside);

  const handleSubmit = (localJob: Job) => {
    if (isValidFields(localJob)) {
      submitAction(localJob);
    } else {
      showToast({
        title: "Please fill out all fields",
        toastType: ToastType.Error
      });
    }
  };

  return (
    <UIModal
      width={600}
      headingText={headerText}
      footerButtons={[
        <UIButton onClick={() => handleSubmit(localJob)} loading={loading}>
          Submit
        </UIButton>
      ]}
      onClose={onClose}
    >
      <div className="my-4 mx-8 flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <UIText variant={UITextVariant.heading3}>Job Title</UIText>
          <UIInput
            placeholder="e.g. Software Engineer"
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
          <UIText variant={UITextVariant.heading3}>Job Link</UIText>
          <UIInput
            placeholder="e.g. https://www.google.com/careers/"
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
          <UIText variant={UITextVariant.heading3}>Status</UIText>
          <UIInput
            placeholder="e.g. Applied"
            value={localJob.status}
            onChange={(e) =>
              setLocalJob((prev) => ({
                ...prev,
                status: e.target.value
              }))
            }
          />
        </div>

        <div className="flex flex-col space-y-2">
          <UIText variant={UITextVariant.heading3}>Company</UIText>
          <UIInput
            placeholder="e.g. Google"
            value={localJob.company}
            onChange={(e) =>
              setLocalJob((prev) => ({
                ...prev,
                company: e.target.value
              }))
            }
          />
        </div>

        <div className="flex w-full flex-col space-y-2">
          <UIText variant={UITextVariant.heading3}>Date Applied</UIText>
          <div className="w-full" ref={dropdownRef}>
            <UIInput
              className="w-full"
              placeholder="e.g. 2021-01-01"
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
          <UIText variant={UITextVariant.heading3}>Interview</UIText>
          <UIDropdown
            placeholder="- Select an Option -"
            dropdownRows={["Yes", "No"]}
            defaultValue={localJob.interview}
            onChange={(e) =>
              setLocalJob((prev) => ({
                ...prev,
                interview: e
              }))
            }
          />
        </div>
      </div>
    </UIModal>
  );
};

export default JobConfigModal;
