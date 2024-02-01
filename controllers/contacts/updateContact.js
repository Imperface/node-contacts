const { HttpError, matchId } = require("../../utils");

const { Contact } = require("../../models/contact");

const updateContact = async (req, res, next) => {
  //! DECORATOR USED

  // get id from request parameters
  const { contactId } = req.params;

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

module.exports = updateContact;
