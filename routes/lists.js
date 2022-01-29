var express = require("express");
const { sequelize, list_details, list } = require("../models");
var router = express.Router();
const authMiddleware = require("../middleware/auth");

const listsController = require("../controllers/lists");

router.get("/user", authMiddleware, listsController.getListsForCurrentUser);

//get lists by userID

router.get("/:userId", listsController.getListsByUserId);

router
  .route("/")
  .get(authMiddleware, listsController.getAllLists)
  .post(authMiddleware, listsController.addList);

module.exports = router;
