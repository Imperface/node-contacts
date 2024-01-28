const { HttpError, matchId } = require("../utils");
const { controllerWrapper } = require("../decorators");

const Contact = require("../models/contact");

const listContacts = async (req, res, next) => {
  //! DECORATOR USED

  // get _id and renaming it to the owner
  const { _id: owner } = req.user;

  // get query parameters
  const { page = 1, limit = 5, favorite = false } = req.query;

  // add pagination skip
  const skip = (page - 1) * limit;

  // filter only favorite contacts if query parameter favorite is true
  const isFavoriteFilter = favorite ? { favorite: true } : {};

  // get contacts for current user id from req.user with pagination
  // populate get data about current user from connected collection in model
  const contacts = await Contact.find(
    { owner, ...isFavoriteFilter },
    "-createdAt -updatedAt",
    { skip, limit }
  ).populate("owner", "email subscription");

  // send response
  res.status(200).json(contacts);
};

const getContactById = async (req, res, next) => {
  //! DECORATOR USED

  // get id from request parameters
  const { contactId } = req.params;

  // match id with objectId
  matchId(contactId);

  // get item by id
  const contactById = await Contact.findOne({ _id: contactId });

  // send response 404 error if contact not found
  if (contactById === null) {
    throw HttpError(404, "Not found");
  }

  // send response with contact
  res.status(200).json(contactById);
};

const addContact = async (req, res, next) => {
  //! DECORATOR USED

  // get params from request
  const { email, phone } = req.body;

  // get _id and renaming it to the owner
  const { _id: owner } = req.user;

  // add contact
  const addedContact = await Contact.create({ email, phone, owner });

  // send response with contact
  res.status(201).json(addedContact);
};

const removeContact = async (req, res, next) => {
  //! DECORATOR USED

  // get id from request parameters
  const { contactId } = req.params;

  // match id with objectId
  matchId(contactId);

  // remove contact
  const removeContact = await Contact.findByIdAndDelete({ _id: contactId });

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
  const { contactId } = req.params;

  // match id with objectId
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
    throw HttpError(404, "Not found");
  }

  // send response with contact
  res.status(200).json(updatedContact);
};

const updateContactStatus = async (req, res, next) => {
  //! DECORATOR USED

  // get id from request parameters
  const { contactId } = req.params;

  // match id with objectId
  matchId(contactId);

  // get favorite value from request
  const { favorite } = req.body;

  // update contact
  const updatedContact = await Contact.findByIdAndUpdate(
    { _id: contactId },
    { favorite },
    { new: true }
  );

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
  updateContactStatus: controllerWrapper(updateContactStatus),
};
