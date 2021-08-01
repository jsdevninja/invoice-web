const router = require("express").Router();
const invoices = require("../controllers/invoice.controller.js");

router.post("/", invoices.create);
router.get("/", invoices.findAll);

module.exports = router;
