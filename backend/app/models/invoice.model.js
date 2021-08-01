module.exports = (sequelize, Sequelize) => {
  const Invoice = sequelize.define("invoices", {
    name: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    pincode: {
      type: Sequelize.STRING,
    },
    tax: {
      type: Sequelize.FLOAT,
    },
    discount: {
      type: Sequelize.FLOAT,
    },
  });

  return Invoice;
};
