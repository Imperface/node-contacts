const express = require("express");

const router = express.Router();

const { validateBody, authenticate, isValidId } = require("../middlewares");

const Ctrl = require("../controllers");

const { schemas } = require("../models/contact");

const jsonParser = express.json();

router.get("/", authenticate, Ctrl.listContacts);

router.get("/:contactId", isValidId, authenticate, Ctrl.getContactById);

router.post(
  "/",
  jsonParser,
  authenticate,
  validateBody(schemas.contactsAddSchema),
  Ctrl.addContact
);

router.delete("/:contactId", isValidId, authenticate, Ctrl.removeContact);

router.put(
  "/:contactId",
  jsonParser,
  isValidId,
  authenticate,
  validateBody(schemas.contactsUpdateSchema),
  Ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  jsonParser,
  isValidId,
  authenticate,
  validateBody(schemas.contactsUpdateStatusSchema),
  Ctrl.updateContactStatus
);

module.exports = router;
