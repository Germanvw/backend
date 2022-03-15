const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();

const { registerUser, loginUser, renewToken } = require("../controllers/auth");
const { validateErrors } = require("../middlewares/validateErrors");
const { validateJWT } = require("../middlewares/validateJWT");
validateJWT;

/* host/api/auth */

router.post(
  "/register",
  [
    check("name", "username is required").not().isEmpty(),
    check("email", "email is required").isEmail(),
    check("password", "password length must be 6 or higher").isLength({
      min: 6,
    }),
    validateErrors,
  ],

  registerUser
);

router.post(
  "/login",
  [
    check("email", "email is required").isEmail(),
    check("password", "password length must be 6 or higher").isLength({
      min: 6,
    }),
    validateErrors,
  ],
  loginUser
);

router.get("/renew", validateJWT, renewToken);

module.exports = router;
