const { randomUUID } = require("node:crypto");

const fs = require("node:fs/promises");
const path = require("node:path");

const contactsDataPath = path.join(__dirname, "./", "contacts.json");

const listContacts = async () => {
  try {
    // get json contacts
    const data = await fs.readFile(contactsDataPath, { encoding: "utf-8" });

    // return parsed contacts
    return JSON.parse(data);
  } catch (error) {
    throw new Error();
  }
};

const writeContacts = async (contacts) => {
  try {
    // JSON.stringify data and write to contacts.json
    await fs.writeFile(
      contactsDataPath,
      JSON.stringify(contacts, undefined, 2)
    );
  } catch (error) {
    throw new Error();
  }
};

const getContactById = async (contactId) => {
  try {
    // get contacts list
    const contacts = await listContacts();

    // looking for contact with id === contactId
    const foundContact = contacts.find((contact) => contact.id === contactId);

    // is contact found, return contact, else return null
    return foundContact ?? null;
  } catch (error) {
    throw new Error();
  }
};

const removeContact = async (contactId) => {
  try {
    // get contacts list
    const contacts = await listContacts();

    // looking for contact with id === contactId
    const removeIndex = contacts.findIndex((item) => item.id === contactId);

    // if removeIndex === -1, return null, else return contact with id === contactId
    if (removeIndex === -1) {
      return null;
    }

    // create new array without element with index removeIndex
    const newContacts = [
      ...contacts.slice(0, removeIndex),
      ...contacts.slice(removeIndex + 1),
    ];

    // write new array to contacts.json
    await writeContacts(newContacts);

    return contacts[removeIndex];
  } catch (error) {
    throw new Error();
  }
};

const addContact = async ({ name, email, phone, id }) => {
  try {
    // get contacts list
    const contactsData = await listContacts();

    // create new contact with id from props or random id
    const newContact = { name, email, phone, id: id ?? randomUUID() };

    // create new contact list with new contact
    const newContactsData = [newContact, ...contactsData];

    // write new array to contacts.json
    await writeContacts(newContactsData);

    return newContact;
  } catch (error) {
    throw new Error();
  }
};

const updateContact = async (contactId, body) => {
  try {
    // try to find contact with id === contactId
    const selectedContact = await getContactById(contactId);

    // if contact with id === contactId not found, return null
    if (!selectedContact) {
      return null;
    }

    // destruct property from current contact
    const { name, email, phone, id } = selectedContact;

    // create new contact, if property not passed, get this prop from current contact
    const updatedContact = {
      name: body.name ?? name,
      email: body.email ?? email,
      phone: body.phone ?? phone,
      id,
    };

    // remove current contact
    await removeContact(contactId);

    // try to add contact
    const addUpdatedContact = await addContact(updatedContact);

    return addUpdatedContact;
  } catch (error) {
    throw new Error();
  }
};

module.exports = {
  listContacts,
  writeContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
