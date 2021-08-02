const db = require("../models");
const Invoice = db.invoices;
const Product = db.products;

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
    name,
    phone,
    address,
    email,
    pincode,
    tax,
    discount,
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
  Invoice.findAll({ order: [["createdAt", "DESC"]] })
    .then(async (data) => {
      const result = JSON.parse(JSON.stringify(data));
      for (let i = 0; i < data.length; i++) {
        const invoice = result[i];
        const products = await Product.findAll({
          where: { invoiceId: invoice.id },
        });
        const subtotal = products.reduce(
          (acc, cur) => acc + parseFloat(cur.price),
          0
        );
        invoice.products = products.length;
        invoice.subtotal = subtotal;
      }
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Unknown error occured.",
      });
    });
};
