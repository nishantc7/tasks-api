const { sequelize, user, company } = require("../models");

module.exports = {
  getAllCompanies: async (req, res) => {
    try {
      const companies = await company.findAll({
        include: [{ model: user, as: "user" }],
      });
      res.status(200).json(companies);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  },
  addCompany: async (req, res) => {
    try {
      if (!req.body.name) {
        res.status(400).send("Bad Request");
      } else {
        const newCompany = await company.create({
          name: req.body.name,
        });
        res.status(201).json(newCompany);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  },
};
