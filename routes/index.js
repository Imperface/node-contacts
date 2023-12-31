const express = require("express");
const router = express.Router();

// import contact routes
const contactRoutes = require("./contacts");

// if path with /contacts use contact routes
router.use("/contacts", contactRoutes);

module.exports = router;
