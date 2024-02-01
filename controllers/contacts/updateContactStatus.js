const { HttpError, matchId } = require("../../utils");

const { Contact } = require("../../models/contact");

const updateContactStatus = async (req, res, next) => {
  //! DECORATOR USED

  // get id from request parameters
  const { contactId } = req.params;

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

module.exports = updateContactStatus;
