const { HttpError, matchId } = require("../../utils");

const { Contact } = require("../../models/contact");

const removeContact = async (req, res, next) => {
  //! DECORATOR USED

  // get id from request parameters
  const { contactId } = req.params;

  // remove contact
  const removeContact = await Contact.findByIdAndDelete({ _id: contactId });

  // send response 404 error if contact not found
  if (removeContact === null) {
    throw HttpError(404, "Not found");
  }

  // send response with contact
  res.status(200).json({ message: "contact deleted" });
};

module.exports = removeContact;
