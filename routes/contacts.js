const express = require("express");
const { contactAddSchema, contactUpdateSchema } = require("../" +
  "schemas/" +
  "contacts");
const router = express.Router();
const utils = require("../" + "utils");
const contactService = require("../" + "models/" + "contacts");
const jsonParser = express.json();

// const checkIdMatching = router.use(async (req, res, next) => {
//   try {
//     // get id form request params
//     const contactId = req.params.contactId;

//     // get contacts list
//     const contacts = await contactService.listContacts();

//     // looking for contactId in contacts
//     const checkId = contacts.find((contact) => contact.id === contactId);

//     // if element not found return 404
//     if (!checkId) {
//       return res
//         .status(404)
//         .json({ message: `element with id ${contactId} not found` });
//     }
//     // if element found - skip
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactService.listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;

    const contactById = await contactService.getContactById(contactId);

    if (!contactById) {
      return res.status(404).json({ message: "not found" });
    }
    res.status(200).json(contactById);
  } catch (error) {
    next(error);
  }
});

router.post("/", jsonParser, async (req, res, next) => {
  try {
    // validate joi scheme for add contact
    const response = contactAddSchema.validate(req.body, { abortEarly: false });

    if (typeof response.error !== "undefined") {
      return res.status(400).json({
        message: response.error.details.map((err) => err.message).join(", "),
      });
    }

    // get contact list
    const contacts = await contactService.listContacts();

    // check is name dublicated
    const checkDublicate = utils.checkDublicateName(req.body.name, contacts);

    if (checkDublicate) {
      return res.status(400).json({ message: "dublicate name" });
    }

    // try to add contact
    const addedContact = await contactService.addContact(req.body);

    res.status(201).json(addedContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;

    const removeContact = await contactService.removeContact(contactId);

    if (!removeContact) {
      return res.status(404).json({ message: "not found" });
    }

    return res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", jsonParser, async (req, res, next) => {
  try {
    // validate joi scheme for add contact
    const response = contactUpdateSchema.validate(req.body, {
      abortEarly: false,
    });

    if (typeof response.error !== "undefined") {
      return res.status(400).json({
        message: response.error.details.map((err) => err.message).join(", "),
      });
    }

    // get id from request params
    const contactId = req.params.contactId;

    // get contact list
    const contacts = await contactService.listContacts();

    // destr props from request body
    const { name, email, phone } = req.body;

    // check is body empty
    if (!name & !email & !phone) {
      return res.status(400).json({ message: "missing fields" });
    }

    // check is name dublicated
    if (name) {
      const checkDublicate = utils.checkDublicateName(name, contacts);

      if (checkDublicate) {
        return res.status(400).json({ message: "dublicate name" });
      }
    }

    const updateContact = await contactService.updateContact(
      contactId,
      req.body
    );

    if (!updateContact) {
      return res.status(404).json({ message: "not found" });
    }

    return res.status(200).json(updateContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
