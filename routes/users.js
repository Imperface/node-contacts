const express = require("express");

const Ctrl = require("../controllers");

const { validateBody, authenticate, upload } = require("../middlewares");

const { schemas } = require("../models/user");

const router = express.Router();
const jsonParser = express.json();

router.post(
  "/register",
  jsonParser,
  validateBody(schemas.userJOISchema),
  Ctrl.register
);
router.post(
  "/login",
  jsonParser,
  validateBody(schemas.userJOISchema),
  Ctrl.login
);
router.post("/logout", authenticate, Ctrl.logout);

router.get("/current", authenticate, Ctrl.current);

router.patch(
  "/",
  authenticate,
  jsonParser,
  validateBody(schemas.subscriptionUpdateSchema),
  Ctrl.subscriptionUpdate
);
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  Ctrl.updateAvatar
);

router.get("/verify/:verificationToken", Ctrl.verify);

router.post(
  "/verify",
  jsonParser,
  validateBody(schemas.verifyEmailSchema),
  Ctrl.resendVerifyEmail
);

module.exports = router;
