import { useAuth0 } from "@auth0/auth0-react";
import UIButton from "components/UIKit/UIButton";
import UILoadingIndicator from "components/UIKit/UILoadingIndicator";
import UITable from "components/UIKit/UITable";
import UIText, { UITextVariant } from "components/UIKit/UIText";
import React from "react";
import { Contact } from "services/contacts/models";
import {
  createNewContact,
  deleteContact,
  getContacts
} from "services/contacts/requests";
import { showToast } from "services/toasts";

interface ContactsProps {}

const Contacts: React.FC<ContactsProps> = (props) => {
  // State
  const [contacts, setContacts] = React.useState<Contact[]>([]);
  const [contactCreatorOpen, setContactCreatorOpen] =
    React.useState<boolean>(false);
  const [newContact, setNewContact] = React.useState<Contact>({} as Contact);
  const [fetch, setFetch] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  // Hooks
  const { logout, getAccessTokenSilently } = useAuth0();

  // On Mount, grab the contacts from the user
  React.useEffect(() => {
    setLoading(true);
    getContacts(getAccessTokenSilently)
      .then((response) => {
        if (response.ok) {
          setContacts(response.data);
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

  const createContact = () => {
    createNewContact(getAccessTokenSilently, newContact)
      .then((response) => {
        if (response.ok) {
          setContacts([...contacts, response.data]);
        } else {
          showToast("Error", JSON.stringify(response.data));
        }
      })
      .catch((error) => {
        showToast("Error", JSON.stringify(error));
      });
  };

  const handleDeleteContact = (contactId: number) => {
    deleteContact(getAccessTokenSilently, contactId)
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
        <UIText variant={UITextVariant.heading1}>Contacts</UIText>
        <UIButton onClick={() => setContactCreatorOpen((prev) => !prev)}>
          Add New Contact
        </UIButton>
      </div>
      {/* Contact Creator */}
      {contactCreatorOpen && (
        <div className="flex flex-col">
          <UIText variant={UITextVariant.heading2}>Add New Contact</UIText>
          <div className="flex flex-row flex-wrap space-x-10">
            <div className="flex flex-col">
              <UIText variant={UITextVariant.body2}>Name</UIText>
              <input
                className="w-[300px] border border-blue-400 p-2 text-sm"
                onChange={(e) => {
                  setNewContact({ ...newContact, name: e.target.value });
                }}
              />
            </div>
            <div className="flex flex-col">
              <UIText variant={UITextVariant.body2}>Company</UIText>
              <input
                className=" w-[300px] border border-blue-400 p-2 text-sm"
                onChange={(e) => {
                  setNewContact({ ...newContact, company: e.target.value });
                }}
              />
            </div>
            <div className="flex flex-col">
              <UIText variant={UITextVariant.body2}>Position</UIText>
              <input
                className=" w-[300px] border border-blue-400 p-2 text-sm"
                onChange={(e) => {
                  setNewContact({ ...newContact, position: e.target.value });
                }}
              />
            </div>
            <div className="flex flex-col">
              <UIText variant={UITextVariant.body2}>Phone Number</UIText>
              <input
                className="w-[300px] border border-blue-400 p-2 text-sm"
                onChange={(e) => {
                  setNewContact({
                    ...newContact,
                    phone_number: e.target.value
                  });
                }}
              />
            </div>
            <div className="flex flex-col">
              <UIText variant={UITextVariant.body2}>Email</UIText>
              <input
                className="w-[300px] border border-blue-400 p-2 text-sm"
                onChange={(e) => {
                  setNewContact({ ...newContact, email: e.target.value });
                }}
              />
            </div>
            <div className="flex flex-col">
              <UIText variant={UITextVariant.body2}>LinkedIn</UIText>
              <input
                className="w-[300px] border border-blue-400 p-2 text-sm"
                onChange={(e) => {
                  setNewContact({ ...newContact, linkedin: e.target.value });
                }}
              />
            </div>
          </div>
          <UIButton className="mt-6 w-2" onClick={createContact}>
            Submit
          </UIButton>
        </div>
      )}
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
            handleDelete={handleDeleteContact}
          />
        </div>
      )}
    </div>
  );
};

export default Contacts;
