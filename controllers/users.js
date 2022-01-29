const bycrypt = require("bcrypt");
const {
  sequelize,
  user,
  company,
  list,
  task,
  list_details,
} = require("../models");

module.exports = {
  signup: async (req, res) => {
    //TODO: add password validation
    try {
      if (
        !req.body.name ||
        !req.body.username ||
        !req.body.password ||
        !req.body.companyId
      ) {
        res.status(400).send("Bad Request");
      } else {
        const authUser = await user.findOne({
          where: {
            username: req.body.username,
          },
        });
        if (authUser) {
          res.status(409).send("Username already exists");
        } else if (req.body.password.length < 8) {
          res.status(400).send("Password must be at least 8 characters long");
        } else if (req.body.name === "") {
          res.status(400).send("Name cannot be empty");
        } else if (req.body.username.length < 6) {
          res.status(400).send("Username must be at least 6 characters long");
        } else {
          const salt = await bycrypt.genSalt();
          const hashedPassword = await bycrypt.hash(req.body.password, salt);

          const newUser = await user.create({
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword,
            companyId: req.body.companyId,
          });
          res.status(201).json(newUser);
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  },
  getUsers: async (req, res) => {
    try {
      const users = await user.findAll({
        include: [{ model: company, as: "company" }],
      });
      res.status(200).json(users);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  },
  getUsersByCompanyId: async (req, res) => {
    var companyId = req.params.companyId;
    try {
      const users = await user.findAll(
        { where: { companyId: companyId } },
        {
          include: [
            { model: company, as: "company" },
            {
              model: list,
              as: "list",
              include: [
                { model: list_details, as: "list_details" },
                { model: task, as: "task" },
              ],
            },
          ],
        }
      );
      res.status(200).json(users);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  },
};
