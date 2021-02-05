const express = require("express")
const router = express.Router();

const { getProductById, createProduct } = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/authentication");
const {} = require("../controllers/category");
const { getUserById } = require("../controllers/user");

router.param("productId", getProductById);
router.param("userId", getUserById);

router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct)

module.exports = router;