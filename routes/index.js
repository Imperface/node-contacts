const express = require("express");
const router = express.Router();

// import contact routes
const contactRoutes = require("./contacts");

// import users routes
const usersRouter = require("./users");

// use contacts routes if path with /contacts
router.use("/contacts", contactRoutes);

// use users routes if path with /users
router.use("/users", usersRouter);

module.exports = router;
