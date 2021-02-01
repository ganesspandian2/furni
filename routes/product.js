const express = require("express")
const router = express.Router();

const { getProductById } = require("../controllers/product");
const {} = require("../controllers/authentication");
const {} = require("../controllers/category");
const { getUserById } = require("../controllers/user");

router.param("productId", getProductById);
router.param("userId", getUserById);

module.exports = router;