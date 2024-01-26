const express = require("express");
const router = express.Router();

// import contact routes
const contactRoutes = require("./contacts");

// import auth routes
const authRouter = require("./auth");

// use contacts routes if path with /contacts
router.use("/contacts", contactRoutes);

// use auth routes if path with /auth
router.use("/auth", authRouter);

module.exports = router;
