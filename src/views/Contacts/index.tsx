import { useAuth0 } from "@auth0/auth0-react";
import UIButton from "components/UIKit/UIButton";
import { UIIconType } from "components/UIKit/UIIcon";
import UILoadingIndicator from "components/UIKit/UILoadingIndicator";
import UITable from "components/UIKit/UITable";
import React from "react";
import { Contact } from "services/contacts/models";
import {
  createContact,
  deleteContact,
  editContact,
  getContacts
} from "services/contacts/requests";
import { showToast, ToastType } from "services/toasts";
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
          showToast({
            title: "Error Getting Contacts",
            description: JSON.stringify(response.data),
            toastType: ToastType.Error
          });
        }
      })
      .catch((error) => {
        showToast({
          title: "Error Getting Contacts",
          description: JSON.stringify(error),
          toastType: ToastType.Error
        });
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
          showToast({
            title: "Successfully created Contact",
            toastType: ToastType.Success
          });
        } else {
          showToast({
            title: "Failed to create contact",
            description: "Please try again.",
            toastType: ToastType.Error
          });
        }
      })
      .catch((error) => {
        showToast({
          title: "Failed to create contact",
          description: JSON.stringify(error),
          toastType: ToastType.Error
        });
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
          showToast({
            title: "Successfully edited contact",
            toastType: ToastType.Success
          });
          setContacts(newContacts);
        } else {
          showToast({
            title: "Failed to Edit contact",
            description: "Please try again.",
            toastType: ToastType.Error
          });
        }
      })
      .catch((error) => {
        showToast({
          title: "Failed to Edit contact",
          description: JSON.stringify(error),
          toastType: ToastType.Error
        });
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
          showToast({
            title: "Successfully deleted Contact",
            toastType: ToastType.Success
          });
        } else {
          showToast({
            title: "Failed to delete contact",
            description: "Please try again.",
            toastType: ToastType.Error
          });
        }
      })
      .catch((error) => {
        showToast({
          title: "Failed to delete contact",
          description: JSON.stringify(error),
          toastType: ToastType.Error
        });
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
