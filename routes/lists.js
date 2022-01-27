var express = require('express');
const { sequelize, list_details , list } = require('../models');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/all', async (req,res)=> {
  try{
    const lists = await list.findAll({include: [{model: list_details, as: 'list_details'}]});
    res.json(lists);
  }
  catch(err){
    console.log(err);
    res.status(500).send('Server Error');
  }
})
//get lists by userID
router.get('/userid/:userId', async (req,res)=> {
    var userID = req.params.userId;
    try{
      const lists = await list.findAll({
          where: {
              userID : userID,
          },
          include: [{model: list_details, as: 'list_details'}]
        });
      res.json(lists);
    }
    catch(err){
      console.log(err);
      res.status(500).send('Server Error');
    }
  })
module.exports = router;
