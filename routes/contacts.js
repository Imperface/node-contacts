const express = require("express");
const router = express.Router();
const { validateBody } = require("../middlewares");

const {
  contactAddSchema,
  contactUpdateSchema,
} = require("../schemas/contacts");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../controllers/contacts");

const jsonParser = express.json();

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", jsonParser, validateBody(contactAddSchema), addContact);

router.delete("/:contactId", removeContact);

router.put(
  "/:contactId",
  jsonParser,
  validateBody(contactUpdateSchema),
  updateContact
);

module.exports = router;
