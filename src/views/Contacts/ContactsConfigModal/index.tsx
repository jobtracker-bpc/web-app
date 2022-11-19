import UIButton from "components/UIKit/UIButton";
import UIInput from "components/UIKit/UIInput";
import UILoadingIndicator from "components/UIKit/UILoadingIndicator";
import UIModal from "components/UIKit/UIModal";
import UIText, { UITextVariant } from "components/UIKit/UIText";
import React from "react";
import { Contact } from "services/contacts/models";
import { showToast, ToastType } from "services/toasts";
import { isValidFields } from "services/utils/validation";

interface ContactsConfigModalProps {
  headerText: string;
  contact: Contact;
  onClose: () => void;
  submitAction: (contact: Contact) => void;
  loading: boolean;
}

const ContactsConfigModal: React.FC<ContactsConfigModalProps> = (props) => {
  const { headerText, contact, onClose, submitAction, loading } = props;

  // State
  const [localContact, setLocalContact] = React.useState<Contact>(contact);

  const handleSubmit = (localContact: Contact) => {
    if (isValidFields(localContact)) {
      submitAction(localContact);
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
        <UIButton onClick={() => handleSubmit(localContact)} loading={loading}>
          Submit
        </UIButton>
      ]}
      onClose={onClose}
    >
      <div className="my-4 mx-8 flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <UIText variant={UITextVariant.heading3}>Name</UIText>
          <UIInput
            placeholder="e.g. John Doe"
            value={localContact.name}
            onChange={(e) =>
              setLocalContact((prev) => ({
                ...prev,
                name: e.target.value
              }))
            }
          />
        </div>
        <div className="flex flex-col space-y-2">
          <UIText variant={UITextVariant.heading3}>Company</UIText>
          <UIInput
            placeholder="e.g. Google"
            value={localContact.company}
            onChange={(e) =>
              setLocalContact((prev) => ({
                ...prev,
                company: e.target.value
              }))
            }
          />
        </div>

        <div className="flex flex-col space-y-2">
          <UIText variant={UITextVariant.heading3}>Position</UIText>
          <UIInput
            placeholder="e.g. Software Engineer"
            value={localContact.position}
            onChange={(e) =>
              setLocalContact((prev) => ({
                ...prev,
                position: e.target.value
              }))
            }
          />
        </div>

        <div className="flex flex-col space-y-2">
          <UIText variant={UITextVariant.heading3}>Phone Number</UIText>
          <UIInput
            placeholder="e.g. 123-456-7890"
            value={localContact.phone_number}
            onChange={(e) =>
              setLocalContact((prev) => ({
                ...prev,
                phone_number: e.target.value
              }))
            }
          />
        </div>

        <div className="flex flex-col space-y-2">
          <UIText variant={UITextVariant.heading3}>Email</UIText>
          <UIInput
            placeholder="e.g. johndoe@gmail.com"
            value={localContact.email}
            onChange={(e) =>
              setLocalContact((prev) => ({
                ...prev,
                email: e.target.value
              }))
            }
          />
        </div>

        <div className="flex flex-col space-y-2">
          <UIText variant={UITextVariant.heading3}>LinkedIn</UIText>
          <UIInput
            placeholder="e.g. https://www.linkedin.com/in/johndoe"
            value={localContact.linkedin}
            onChange={(e) =>
              setLocalContact((prev) => ({
                ...prev,
                linkedin: e.target.value
              }))
            }
          />
        </div>
      </div>
    </UIModal>
  );
};

export default ContactsConfigModal;
