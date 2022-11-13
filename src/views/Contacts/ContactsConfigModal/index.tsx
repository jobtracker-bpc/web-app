import UIButton from "components/UIKit/UIButton";
import UILoadingIndicator from "components/UIKit/UILoadingIndicator";
import UIModal from "components/UIKit/UIModal";
import UIText, { UITextVariant } from "components/UIKit/UIText";
import React from "react";
import { Contact } from "services/contacts/models";

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

  return (
    <UIModal
      height={500}
      width={600}
      headingText={headerText}
      footerButtons={[
        <UIButton onClick={() => submitAction(localContact)} loading={loading}>
          Submit
        </UIButton>
      ]}
      onClose={onClose}
    >
      <div className="flex flex-row justify-around">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            <UIText variant={UITextVariant.body2}>Name</UIText>
            <input
              className="rounded-md border border-gray-300 p-2"
              type="text"
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
            <UIText variant={UITextVariant.body2}>Company</UIText>
            <input
              className="rounded-md border border-gray-300 p-2"
              type="text"
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
            <UIText variant={UITextVariant.body2}>Position</UIText>
            <input
              className="rounded-md border border-gray-300 p-2"
              type="text"
              value={localContact.position}
              onChange={(e) =>
                setLocalContact((prev) => ({
                  ...prev,
                  position: e.target.value
                }))
              }
            />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            <UIText variant={UITextVariant.body2}>Phone Number</UIText>
            <input
              className="rounded-md border border-gray-300 p-2"
              type="text"
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
            <UIText variant={UITextVariant.body2}>Email</UIText>
            <input
              className="rounded-md border border-gray-300 p-2"
              type="text"
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
            <UIText variant={UITextVariant.body2}>LinkedIn</UIText>
            <input
              className="rounded-md border border-gray-300 p-2"
              type="text"
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
      </div>
    </UIModal>
  );
};

export default ContactsConfigModal;
