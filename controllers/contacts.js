const { HttpError, matchId } = require("../utils");
const { controllerWrapper } = require("../decorators");

const Contact = require("../models/contact");

const listContacts = async (req, res, next) => {
  //! DECORATOR USED

  const { _id: owner } = req.user;

  // get contacts
  const contacts = await Contact.find({ owner });

  // send response
  res.status(200).json(contacts);
};

const getContactById = async (req, res, next) => {
  //! DECORATOR USED

  // get id from request parameters
  const { contactId } = req.params;

  // check is id match objectId
  matchId(contactId);

  // get item by id
  const contactById = await Contact.findOne({ _id: contactId });

  // send response 404 error if contact not found
  if (contactById === null) {
    throw HttpError(404, "not found");
  }

  // send response with contact
  res.status(200).json(contactById);
};

const addContact = async (req, res, next) => {
  //! DECORATOR USED

  // get params from request
  const { name, email, phone } = req.body;

  const { _id: owner } = req.user;

  // add contact
  const addedContact = await Contact.create({ name, email, phone, owner });

  // send response with contact
  res.status(201).json(addedContact);
};

const removeContact = async (req, res, next) => {
  //! DECORATOR USED

  // get id from request parameters
  const { contactId } = req.params;

  // check is id match objectId
  matchId(contactId);

  // remove contact
  const removeContact = await Contact.findByIdAndDelete({ _id: contactId });

  // send response 404 error if contact not found
  if (removeContact === null) {
    throw HttpError(404, "not found");
  }

  // send response with contact
  res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res, next) => {
  //! DECORATOR USED

  // get id from request parameters
  const { contactId } = req.params;

  // check is id match objectId
  matchId(contactId);

  // get params from request
  const { name, email, phone } = req.body;

  // update contact
  const updatedContact = await Contact.findByIdAndUpdate(
    { _id: contactId },
    { name, email, phone },
    { new: true }
  );

  // send response 404 error if contact not found
  if (updatedContact === null) {
    throw HttpError(404, "not found");
  }

  res.status(200).json(updatedContact);
};

const updateContactStatus = async (req, res, next) => {
  //! DECORATOR USED

  // get id from request parameters
  const { contactId } = req.params;

  // check is id match objectId
  matchId(contactId);

  const { favorite } = req.body;

  // get item by id
  const contactById = await Contact.findOne({ _id: contactId });

  // send response 404 error if contact not found
  if (contactById === null) {
    throw HttpError(404, "not found");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    { _id: contactId },
    { favorite },
    { new: true }
  );

  res.status(200).json(updatedContact);
};

module.exports = {
  listContacts: controllerWrapper(listContacts),
  getContactById: controllerWrapper(getContactById),
  addContact: controllerWrapper(addContact),
  removeContact: controllerWrapper(removeContact),
  updateContact: controllerWrapper(updateContact),
  updateContactStatus: controllerWrapper(updateContactStatus),
};
