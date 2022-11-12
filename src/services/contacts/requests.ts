import { makeApiCall } from "services/requests";
import { Contact } from "./models";

export const getContacts = (getAccessTokenSilently: () => Promise<string>) => {
  return makeApiCall({
    url: "/contacts",
    method: "GET",
    getAccessTokenSilently: getAccessTokenSilently
  });
};

export const createNewContact = (
  getAccessTokenSilently: () => Promise<string>,
  contact: Contact
) => {
  return makeApiCall({
    url: "/contacts",
    method: "POST",
    getAccessTokenSilently: getAccessTokenSilently,
    body: contact
  });
};

export const deleteContact = (
  getAccessTokenSilently: () => Promise<string>,
  contactId: number
) => {
  return makeApiCall({
    url: `/contacts/${contactId}`,
    method: "DELETE",
    getAccessTokenSilently: getAccessTokenSilently
  });
};
