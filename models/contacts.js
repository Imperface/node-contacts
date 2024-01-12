const { randomUUID } = require("node:crypto");

const { modelWrapper } = require("../utils");

const fs = require("node:fs/promises");
const path = require("node:path");

const contactsDataPath = path.join(__dirname, "./contacts.json");

const listContactsModel = async () => {
  //! DECORATOR USED

  // get contacts
  const data = await fs.readFile(contactsDataPath, { encoding: "utf-8" });
  // return parsed contacts
  return JSON.parse(data);
};

const writeContactsModel = async (contacts) => {
  // JSON.stringify contacts and write to contacts.json
  await fs.writeFile(contactsDataPath, JSON.stringify(contacts, undefined, 2));
};

const getContactByIdModel = async (contactId) => {
  //! DECORATOR USED

  // get contacts
  const contacts = await listContactsModel();

  // looking for contact with id === contactId
  const foundContact = contacts.find((contact) => contact.id === contactId);

  // if contact found - return contact, else return null
  return foundContact ?? null;
};

const addContactModel = async ({ name, email, phone }) => {
  //! DECORATOR USED

  // get contacts
  const contactsData = await listContactsModel();

  // create new contact
  const newContact = { name, email, phone, id: randomUUID() };

  // create new contacts with new contact
  const newContactsData = [newContact, ...contactsData];

  // write new contacts to contacts.json
  await writeContactsModel(newContactsData);

  return newContact;
};

const removeContactModel = async (contactId) => {
  //! DECORATOR USED

  // get contacts
  const contacts = await listContactsModel();

  // looking for contact index with id === contactId
  const removeIndex = contacts.findIndex((item) => item.id === contactId);

  // return null if contact not found
  if (removeIndex === -1) {
    return null;
  }

  // create new contacts without contact with index removeIndex
  const newContacts = [
    ...contacts.slice(0, removeIndex),
    ...contacts.slice(removeIndex + 1),
  ];

  // write new contacts to contacts.json
  await writeContactsModel(newContacts);

  return contacts[removeIndex];
};

const updateContactModel = async (contactId, body) => {
  //! DECORATOR USED

  // get contacts
  const contacts = await listContactsModel();

  // looking for contact index with id === contactId
  const updateIndex = contacts.findIndex((item) => item.id === contactId);

  // return null if contact not found
  if (updateIndex === -1) {
    return null;
  }

  // destructuring the current contact
  const { name, email, phone, id } = contacts[updateIndex];

  // create new contact, if property not passed, get this prop from current contact
  const updatedContact = {
    name: body.name ?? name,
    email: body.email ?? email,
    phone: body.phone ?? phone,
    id,
  };

  // create new contacts with updated contact with index updateIndex
  const newContacts = [
    ...contacts.slice(0, updateIndex),
    updatedContact,
    ...contacts.slice(updateIndex + 1),
  ];

  // write new contacts to contacts.json
  await writeContactsModel(newContacts);

  return updatedContact;
};

module.exports = {
  listContactsModel: modelWrapper(listContactsModel),
  getContactByIdModel: modelWrapper(getContactByIdModel),
  addContactModel: modelWrapper(addContactModel),
  removeContactModel: modelWrapper(removeContactModel),
  updateContactModel: modelWrapper(updateContactModel),
};
