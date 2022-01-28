var express = require("express");
const { sequelize, user, company } = require("../models");
var router = express.Router();
const authMiddleware = require("../middleware/auth");

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get("/", async (req, res) => {
  try {
    const companies = await company.findAll({
      include: [{ model: user, as: "user" }],
    });
    res.status(200).json(companies);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

router.post("/", authMiddleware, async (req, res) => {
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
});
module.exports = router;
