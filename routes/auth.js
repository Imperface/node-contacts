const express = require("express");

const authCtrl = require("../controllers/auth");

const { validateBody } = require("../middlewares");
const schemas = require("../schemas/auth");

const router = express.Router();
const jsonParser = express.json();

router.post(
  "/register",
  jsonParser,
  validateBody(schemas.userSchema),
  authCtrl.register
);
router.post(
  "/login",
  jsonParser,
  validateBody(schemas.userSchema),
  authCtrl.login
);
module.exports = router;
