const { HttpError, matchId } = require("../../utils");

const { Contact } = require("../../models/contact");

const getContactById = async (req, res, next) => {
  //! DECORATOR USED

  // get id from request parameters
  const { contactId } = req.params;

  // get item by id
  const contactById = await Contact.findOne({ _id: contactId });

  // send response 404 error if contact not found
  if (contactById === null) {
    throw HttpError(404, "Not found");
  }

  // send response with contact
  res.status(200).json(contactById);
};

module.exports = getContactById;
