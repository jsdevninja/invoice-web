const express = require("express");

const router = express.Router();

const invoices = require("./invoice.routes");
const products = require("./product.routes");

router.use("/api/invoices", invoices);
router.use("/api/products", products);

module.exports = router;
