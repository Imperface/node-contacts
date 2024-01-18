const express = require("express");

const router = express.Router();

const { validateBody } = require("../middlewares");

const contactsCtrl = require("../controllers/contacts");

const {
  contactsAddSchema,
  contactsUpdateSchema,
  contactsUpdateStatusSchema,
} = require("../schemas/contacts");

const jsonParser = express.json();

router.get("/", contactsCtrl.listContacts);

router.get("/:contactId", contactsCtrl.getContactById);

router.post(
  "/",
  jsonParser,
  validateBody(contactsAddSchema),
  contactsCtrl.addContact
);

router.delete("/:contactId", contactsCtrl.removeContact);

router.put(
  "/:contactId",
  jsonParser,
  validateBody(contactsUpdateSchema),
  contactsCtrl.updateContact
);

// validateBody(contactsUpdateStatusSchema);

router.patch(
  "/:contactId/favorite",
  jsonParser,
  validateBody(contactsUpdateStatusSchema),
  contactsCtrl.updateContactStatus
);

module.exports = router;
