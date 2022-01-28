var express = require("express");
const {
  sequelize,
  user,
  company,
  list,
  task,
  list_details,
} = require("../models");
var router = express.Router();
const bycrypt = require("bcrypt");
const authMiddleware = require("../middleware/auth");
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post("/", async (req, res) => {
  //TODO: add validation, move to middleware
  try {
    const salt = await bycrypt.genSalt();
    const hashedPassword = await bycrypt.hash(req.body.password, salt);

    const newUser = await user.create({
      name: req.body.name,
      username: req.body.username,
      password: hashedPassword,
      companyId: req.body.companyId,
    });
    res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});
router.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await user.findAll({
      include: [
        { model: company, as: "company" },
        // {
        //   model: list,
        //   as: "list",
        //   include: [
        //     { model: list_details, as: "list_details" },
        //     { model: task, as: "task" },
        //   ],
        // },
      ],
    });
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});
//get users by companyId

router.get("/company/:companyId", async (req, res) => {
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
});
module.exports = router;
