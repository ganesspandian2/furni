const express = require("express");
const router = express.Router();
const {
  signOut,
  signup,
  signin,
  isSignedIn,
} = require("../controllers/authentication");
const { body, validationResult, check } = require("express-validator");

router.post(
  "/signup",
  [
    check("email")
      .isLength({ min: 5 })
      .withMessage("Email must be 5 chars long"),

    check("password")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long"),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email").isLength({ min: 5 }).withMessage("must be 5 chars long"),

    check("password")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long"),
  ],
  signin
);

router.get("/signout", signOut);

module.exports = router;
