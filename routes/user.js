const express = require("express");
const { isSignedIn, isAuthenticated } = require("../controllers/authentication");
const { getUserById, getUser, updateUser, getOrderHistory } =  require("../controllers/user");
const router = express.Router();

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn , isAuthenticated , getUser);

router.put("/user/update/:userId", isSignedIn, isAuthenticated, updateUser);

router.get("/orders/user/:userId", isSignedIn, isAuthenticated, getOrderHistory);

module.exports = router;
