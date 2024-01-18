const express = require("express");

const router = express.Router();

const { validateBody } = require("../middlewares");

const contactsCtrl = require("../controllers/contacts");

const schemas = require("../schemas/contacts");

const jsonParser = express.json();

router.get("/", contactsCtrl.listContacts);

router.get("/:contactId", contactsCtrl.getContactById);

router.post(
  "/",
  jsonParser,
  validateBody(schemas.contactsAddSchema),
  contactsCtrl.addContact
);

router.delete("/:contactId", contactsCtrl.removeContact);

router.put(
  "/:contactId",
  jsonParser,
  validateBody(schemas.contactsUpdateSchema),
  contactsCtrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  jsonParser,
  validateBody(schemas.contactsUpdateStatusSchema),
  contactsCtrl.updateContactStatus
);

module.exports = router;
