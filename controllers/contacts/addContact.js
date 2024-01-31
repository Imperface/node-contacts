const { Contact } = require("../../models/contact");

const addContact = async (req, res, next) => {
  //! DECORATOR USED

  // get params from request
  const { name, email, phone, favorite = false } = req.body;

  // get _id and renaming it to the owner
  const { _id: owner } = req.user;

  // add contact
  const addedContact = await Contact.create({
    name,
    email,
    phone,
    favorite,
    owner,
  });

  // send response with contact
  res.status(201).json(addedContact);
};
module.exports = addContact;
