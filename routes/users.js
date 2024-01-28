const express = require("express");

const usersCtrl = require("../controllers/users");

const { validateBody, authenticate } = require("../middlewares");
const schemas = require("../schemas/users");

const router = express.Router();
const jsonParser = express.json();

router.post(
  "/register",
  jsonParser,
  validateBody(schemas.userSchema),
  usersCtrl.register
);
router.post(
  "/login",
  jsonParser,
  validateBody(schemas.userSchema),
  usersCtrl.login
);
router.post("/logout", authenticate, usersCtrl.logout);

router.get("/current", authenticate, usersCtrl.current);

router.patch(
  "/",
  authenticate,
  jsonParser,
  validateBody(schemas.subscriptionUpdateSchema),
  usersCtrl.subscriptionUpdate
);

module.exports = router;
