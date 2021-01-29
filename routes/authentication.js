const express = require("express");
const router = express.Router()
const { signOut, signup, signin } = require("../controllers/authentication")
const { body, validationResult, check } = require('express-validator');

router.post('/signup', [
    check("phoneNumber")
    .isLength({ min: 10})
    .withMessage('must be 10 chars long'),

    check('password')
    .isLength({ min: 5 })
    .withMessage('must be at least 5 chars long')
] ,signup);

router.post('/signin', [
    check("phoneNumber")
    .isLength({ min: 10})
    .withMessage('must be 10 chars long'),

    check('password')
    .isLength({ min: 5 })
    .withMessage('must be at least 5 chars long')
] ,signin);

router.get('/signout', signOut);

module.exports = router;  