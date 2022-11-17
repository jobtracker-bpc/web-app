import { useAuth0 } from "@auth0/auth0-react";
import UIButton from "components/UIKit/UIButton";
import { UIIconType } from "components/UIKit/UIIcon";
import UILoadingIndicator from "components/UIKit/UILoadingIndicator";
import UITable from "components/UIKit/UITable";
import React from "react";
import { Contact } from "services/contacts/models";
import {
  createContact,
  createJob,
  deleteContact,
  deleteJob,
  editContact,
  editJob,
  getContacts,
  getJobs
} from "services/contacts/requests";
import { showToast } from "services/toasts";
import ContactsConfigModal from "./ContactsConfigModal";

export enum ContactFlow {
  Create = "Create",
  Edit = "Edit"
}

interface ContactsProps {}

const Contacts: React.FC<ContactsProps> = (props) => {
  // State
  const [contacts, setContacts] = React.useState<Contact[]>([]);
  const [contactConfigModalVisible, setContactConfigModalVisible] =
    React.useState<boolean>(false);
  const [currentContact, setCurrentContact] = React.useState<Contact>(
    {} as Contact
  );
  const [loading, setLoading] = React.useState<boolean>(false);
  const [currentFlow, setCurrentFlow] = React.useState<ContactFlow>(
    ContactFlow.Create
  );

  // Hooks
  const { getAccessTokenSilently } = useAuth0();

  // On Mount, grab the contacts from the user
  React.useEffect(() => {
    setLoading(true);
    getContacts(getAccessTokenSilently)
      .then((response) => {
        if (response.ok) {
          setContacts(response.data);
        } else {
          showToast("Error Getting Contacts", JSON.stringify(response.data));
        }
      })
      .catch((error) => {
        showToast("Error Getting Contacts", JSON.stringify(error));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleCreateContact = (contact: Contact) => {
    setLoading(true);
    createContact(getAccessTokenSilently, contact)
      .then((response) => {
        if (response.ok) {
          setContacts([...contacts, response.data]);
          showToast("Successfully created Contact");
        } else {
          showToast("Failed to create contact", "Please try again.");
        }
      })
      .catch((error) => {
        showToast("Failed to create contact", JSON.stringify(error));
      })
      .finally(() => {
        setContactConfigModalVisible(false);
        setLoading(false);
      });
  };

  const handleEditContact = (contact: Contact) => {
    setLoading(true);
    editContact(getAccessTokenSilently, contact)
      .then((response) => {
        if (response.ok) {
          const newContacts = contacts.map((editedContact) => {
            if (editedContact.id === response.data.id) {
              return response.data;
            }
            return editedContact;
          });
          showToast("Successfully edited contact");
          setContacts(newContacts);
        } else {
          showToast("Failed to Edit contact", "Please try again.");
        }
      })
      .catch((error) => {
        showToast("Failed to Edit contact", JSON.stringify(error));
      })
      .finally(() => {
        setContactConfigModalVisible(false);
        setLoading(false);
      });
  };

  const handleDeleteContact = (contact: Contact) => {
    setLoading(true);
    deleteContact(getAccessTokenSilently, contact.id)
      .then((response) => {
        if (response.ok) {
          const newContacts = contacts.filter(
            (deletedContact) => deletedContact.id !== contact.id
          );
          setContacts(newContacts);
          showToast("Successfully deleted Contact");
        } else {
          showToast("Failed to delete contact", "Please try again.");
        }
      })
      .catch((error) => {
        showToast("Failed to delete contact", JSON.stringify(error));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const openCreateFlow = () => {
    setCurrentFlow(ContactFlow.Create);
    setCurrentContact({} as Contact);
    setContactConfigModalVisible(true);
  };

  const openEditFlow = (contact: Contact) => {
    setCurrentFlow(ContactFlow.Edit);
    setCurrentContact(contact);
    setContactConfigModalVisible(true);
  };

  return (
    <div className="flex w-full flex-col space-y-6 p-6">
      {/* List of Contacts */}
      {loading ? (
        <div className="flex flex-row items-center justify-center">
          <UILoadingIndicator className="text-6xl" />
        </div>
      ) : (
        <div className="flex flex-col space-y-2">
          <UITable
            columns={[
              {
                title: "Name",
                key: "name",
                width: "300px"
              },
              { title: "Company", key: "company", width: "200px" },
              { title: "Position", key: "position", width: "200px" },
              { title: "Phone Number", key: "phone_number", width: "200px" },
              { title: "Email", key: "email", width: "200px" },
              { title: "LinkedIn", key: "linkedin", width: "200px" }
            ]}
            data={contacts}
            headerButtons={[
              <UIButton onClick={openCreateFlow} iconType={UIIconType.Add}>
                New Contact
              </UIButton>
            ]}
            handleEdit={openEditFlow}
            handleDelete={handleDeleteContact}
          />
        </div>
      )}
      {contactConfigModalVisible && (
        <ContactsConfigModal
          headerText={
            currentFlow === ContactFlow.Edit ? "Edit Contact" : "Create Contact"
          }
          submitAction={
            currentFlow === ContactFlow.Edit
              ? handleEditContact
              : handleCreateContact
          }
          contact={currentContact}
          onClose={() => setContactConfigModalVisible(false)}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Contacts;
