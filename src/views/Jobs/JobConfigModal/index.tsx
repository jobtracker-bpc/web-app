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
import { Skill } from "services/skills/models";
import { getSkills } from "services/skills/requests";
import { useAuth0 } from "@auth0/auth0-react";
import { Contact } from "services/contacts/models";
import { getContacts } from "services/contacts/requests";

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
  const [userSkills, setUserSkills] = React.useState<Skill[]>([]);
  const [userContacts, setUserContacts] = React.useState<Contact[]>([]);
  const [formValid, setFormValid] = React.useState<boolean>(false);

  // Hooks
  const { getAccessTokenSilently } = useAuth0();

  const handleClickOutside = () => {
    setShowDatePicker(false);
  };

  const dropdownRef: any = useOutsideClick(handleClickOutside);

  // On Mount, grab the skills and contacts from the user
  React.useEffect(() => {
    getSkills(getAccessTokenSilently)
      .then((response) => {
        if (response.ok) {
          setUserSkills(response.data);
        } else {
          showToast({
            title: "Error getting Skills",
            description: JSON.stringify(response.data),
            toastType: ToastType.Error
          });
        }
      })
      .catch((error) => {
        showToast({
          title: "Error getting Skills",
          description: JSON.stringify(error),
          toastType: ToastType.Error
        });
      });
    getContacts(getAccessTokenSilently)
      .then((response) => {
        if (response.ok) {
          setUserContacts(response.data);
        } else {
          showToast({
            title: "Error getting Contacts",
            description: JSON.stringify(response.data),
            toastType: ToastType.Error
          });
        }
      })
      .catch((error) => {
        showToast({
          title: "Error getting Contacts",
          description: JSON.stringify(error),
          toastType: ToastType.Error
        });
      });
  }, []);

  const handleSubmit = (localJob: Job) => {
    submitAction(localJob);
  };

  React.useEffect(() => {
    if (
      localJob.job_title &&
      localJob.job_link &&
      localJob.status &&
      localJob.company &&
      localJob.date_applied &&
      localJob.interview
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [localJob]);

  React.useEffect(() => {
    if (!Object.keys(localJob).length) {
      setLocalJob({
        job_title: "",
        job_link: "",
        company: "",
        date_applied: "",
        interview: "",
        status: "",
        user: "",
        skills: [],
        contacts: []
      });
    }
    if (!Object.hasOwn(job, "skills")) {
      setLocalJob({ ...localJob, skills: [], contacts: [] });
    }
  }, [job]);

  return (
    <UIModal
      width={600}
      height={800}
      headingText={headerText}
      footerButtons={[
        <UIButton
          onClick={() => handleSubmit(localJob)}
          loading={loading}
          disabled={!formValid}
          className="disabled:cursor-not-allowed disabled:border-white disabled:bg-slate-300 disabled:text-slate-400"
        >
          Submit
        </UIButton>
      ]}
      onClose={onClose}
    >
      <div className="my-4 mx-8 flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2 ">
            <UIText variant={UITextVariant.heading3}>Job Title</UIText>
            <UIText variant={UITextVariant.body3} className="text-gray-400">
              ( required )
            </UIText>
          </div>
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
          <div className="flex items-center space-x-2 ">
            <UIText variant={UITextVariant.heading3}>Job Link</UIText>
            <UIText variant={UITextVariant.body3} className="text-gray-400">
              ( required )
            </UIText>
          </div>
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
          <div className="flex items-center space-x-2 ">
            <UIText variant={UITextVariant.heading3}>Status</UIText>
            <UIText variant={UITextVariant.body3} className="text-gray-400">
              ( required )
            </UIText>
          </div>
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
          <div className="flex items-center space-x-2 ">
            <UIText variant={UITextVariant.heading3}>Company</UIText>
            <UIText variant={UITextVariant.body3} className="text-gray-400">
              ( required )
            </UIText>
          </div>
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

        <div className="relative flex w-full flex-col space-y-2">
          <div className="flex items-center space-x-2 ">
            <UIText variant={UITextVariant.heading3}>Date Applied</UIText>
            <UIText variant={UITextVariant.body3} className="text-gray-400">
              ( required )
            </UIText>
          </div>
          <div className=" w-full" ref={dropdownRef}>
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
          <div className="flex items-center space-x-2 ">
            <UIText variant={UITextVariant.heading3}>Interview</UIText>
            <UIText variant={UITextVariant.body3} className="text-gray-400">
              ( required )
            </UIText>
          </div>
          <UIDropdown
            placeholder="- Select an Option -"
            dropdownRows={[{ name: "Yes" }, { name: "No" }]}
            dropdownStringKey="name"
            defaultValue={localJob.interview}
            onChange={(row) =>
              setLocalJob((prev) => ({
                ...prev,
                interview: row.name
              }))
            }
          />
        </div>
        <div className="flex flex-col space-y-2">
          <UIText variant={UITextVariant.heading3}>Skills</UIText>
          <div className="flex flex-wrap">
            {localJob?.skills?.map((skill) => (
              <div
                className="font-sm m-1 flex items-center rounded-full bg-slate-800 py-1 px-2 text-white"
                key={skill.id}
              >
                <UIIcon
                  type={UIIconType.Close}
                  onClick={() => {
                    setLocalJob((prev) => ({
                      ...prev,
                      skills: prev.skills.filter((s) => s.id !== skill.id)
                    }));
                  }}
                  className="mr-2 cursor-pointer hover:text-slate-400"
                />
                <UIText variant={UITextVariant.body3} className="mr-2">
                  {skill.skill_name}
                </UIText>
              </div>
            ))}
          </div>
          <UIDropdown
            placeholder="- Select a Skill -"
            dropdownRows={
              userSkills.length ? userSkills.map((skill) => skill) : []
            }
            dropdownStringKey="skill_name"
            defaultValue={localJob.skills}
            disableLocalValue
            onChange={(row) => {
              if (localJob.skills) {
                if (!localJob.skills.includes(row)) {
                  setLocalJob((prev) => ({
                    ...prev,
                    skills: [...prev.skills, row]
                  }));
                }
              } else {
                setLocalJob((prev) => ({
                  ...prev,
                  skills: [row]
                }));
              }
            }}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <UIText variant={UITextVariant.heading3}>Contacts</UIText>
          <div className="flex flex-wrap">
            {localJob?.contacts?.map((contact) => (
              <div
                className="font-sm m-1 flex items-center rounded-full bg-slate-800 py-1 px-2 text-white"
                key={contact.id}
              >
                <UIIcon
                  type={UIIconType.Close}
                  onClick={() => {
                    setLocalJob((prev) => ({
                      ...prev,
                      contacts: prev.contacts.filter((s) => s.id !== contact.id)
                    }));
                  }}
                  className="mr-2 cursor-pointer hover:text-slate-400"
                />
                <UIText variant={UITextVariant.body3} className="mr-2">
                  {contact.name}
                </UIText>
              </div>
            ))}
          </div>
          <UIDropdown
            placeholder="- Select a contact -"
            dropdownRows={
              userContacts.length ? userContacts.map((contact) => contact) : []
            }
            dropdownStringKey="name"
            defaultValue={localJob.contacts}
            disableLocalValue
            onChange={(row) => {
              if (localJob.contacts) {
                if (!localJob.contacts.includes(row)) {
                  setLocalJob((prev) => ({
                    ...prev,
                    contacts: [...prev.contacts, row]
                  }));
                }
              } else {
                setLocalJob((prev) => ({
                  ...prev,
                  contacts: [row]
                }));
              }
            }}
          />
        </div>
      </div>
    </UIModal>
  );
};

export default JobConfigModal;
