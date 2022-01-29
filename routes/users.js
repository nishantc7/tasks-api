var express = require("express");
var router = express.Router();
const authMiddleware = require("../middleware/auth");
const userController = require("../controllers/users");

//add new user
router.post("/", userController.signup);

//get all users
router.get("/", authMiddleware, userController.getUsers);

//get users by companyId
router.get("/:companyId", authMiddleware, userController.getUsersByCompanyId);

module.exports = router;
