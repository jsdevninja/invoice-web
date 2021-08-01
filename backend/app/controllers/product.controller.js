const db = require("../models");
const Product = db.products;

exports.create = (req, res) => {
  const { name, quantity, price, invoiceId } = req.body;
  // Validate request
  if (!name || !quantity || !price || !invoiceId) {
    res.status(400).send({
      message: "Product details are missing!",
    });
    return;
  }

  // Create a product
  const product = { name, quantity, price, invoiceId };
  Product.create(product)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Unknown error occured.",
      });
    });
};

exports.get = (req, res) => {
  const invoiceId = parseInt(req.params.invoiceId);
  Product.findAll({
    where: { invoiceId },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Unknown error occured.",
      });
    });
};
