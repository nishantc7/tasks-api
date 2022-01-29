var express = require("express");
const { sequelize, user, company } = require("../models");
var router = express.Router();
const authMiddleware = require("../middleware/auth");
const companyController = require("../controllers/companies");

// GET all companies
router.get("/", companyController.getAllCompanies);

//add company
router.post("/", authMiddleware, companyController.addCompany);
module.exports = router;
