var express = require('express');
const { sequelize, user, company, list, task, list_details } = require('../models');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/', async (req,res)=> {
  try{
    const users = await user.findAll(
      {include: [{model: company, as: 'company'}, {model: list, as: 'list', include: [{model: list_details, as: 'list_details'},{model: task, as: 'task'}]}]}
      );
    res.json(users);
  }
  catch(err){
    console.log(err);
    res.status(500).send('Server Error');
  }
})
module.exports = router;
