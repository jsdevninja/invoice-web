const db = require("../models");
const Invoice = db.invoices;

exports.create = (req, res) => {
  const { name, phone, address, email, pincode, tax, discount } = req.body;
  // Validate request
  if (!name || !phone || !email) {
    res.status(400).send({
      message: "Customer name, phone and email can't be empty!",
    });
    return;
  }

  // Create a invoice
  const invoice = {
    name, phone, address, email, pincode, tax, discount
  };
  Invoice.create(invoice)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Unknown error occured.",
      });
    });
};

exports.findAll = (req, res) => {
  Invoice.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Unknown error occured.",
      });
    });
};
