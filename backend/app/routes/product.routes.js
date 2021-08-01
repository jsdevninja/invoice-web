const router = require("express").Router();
const products = require("../controllers/product.controller.js");

router.post("/", products.create);
router.get("/:invoiceId", products.get);

module.exports = router;
