const express = require("express");

const router = express.Router();

const { validateBody, authenticate } = require("../middlewares");

const contactsCtrl = require("../controllers/contacts");

const schemas = require("../schemas/contacts");

const jsonParser = express.json();

router.get("/", authenticate, contactsCtrl.listContacts);

router.get("/:contactId", authenticate, contactsCtrl.getContactById);

router.post(
  "/",
  jsonParser,
  authenticate,
  validateBody(schemas.contactsAddSchema),
  contactsCtrl.addContact
);

router.delete("/:contactId", authenticate, contactsCtrl.removeContact);

router.put(
  "/:contactId",
  jsonParser,
  authenticate,
  validateBody(schemas.contactsUpdateSchema),
  contactsCtrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  jsonParser,
  authenticate,
  validateBody(schemas.contactsUpdateStatusSchema),
  contactsCtrl.updateContactStatus
);

module.exports = router;
