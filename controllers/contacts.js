const { HttpError, controllerWrapper } = require("../utils");

const {
  listContactsModel,
  getContactByIdModel,
  removeContactModel,
  addContactModel,
  updateContactModel,
} = require("../models/contacts");

const listContacts = async (req, res, next) => {
  //! DECORATOR USED

  // get contacts list
  const contacts = await listContactsModel();

  // send response
  res.status(200).json(contacts);
};

const getContactById = async (req, res, next) => {
  //! DECORATOR USED

  // get id from request parameters
  const contactId = req.params.contactId;

  // get item by id
  const contactById = await getContactByIdModel(contactId);

  // send response 404 error if contact not found
  if (contactById === null) {
    throw HttpError(404, "Not found");
  }

  // send response with contact
  res.status(200).json(contactById);
};

const addContact = async (req, res, next) => {
  //! DECORATOR USED

  // add contact
  const addedContact = await addContactModel(req.body);

  // send response with contact
  res.status(201).json(addedContact);
};

const removeContact = async (req, res, next) => {
  //! DECORATOR USED

  // get id from request parameters
  const contactId = req.params.contactId;

  // remove contact
  const removeContact = await removeContactModel(contactId);

  // send response 404 error if contact not found
  if (removeContact === null) {
    throw HttpError(404, "Not found");
  }

  // send response with contact
  res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res, next) => {
  //! DECORATOR USED

  // get id from request parameters
  const contactId = req.params.contactId;

  // update contact
  const updatedContact = await updateContactModel(contactId, req.body);

  // send response 404 error if contact not found
  if (updatedContact === null) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(updatedContact);
};

module.exports = {
  listContacts: controllerWrapper(listContacts),
  getContactById: controllerWrapper(getContactById),
  addContact: controllerWrapper(addContact),
  removeContact: controllerWrapper(removeContact),
  updateContact: controllerWrapper(updateContact),
};
