const { Contact } = require("../../models/contact");

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

module.exports = listContacts;
