var express = require("express");
const { sequelize, task_data, task } = require("../models");
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

//get all tasks

router.get("/all", async (req, res) => {
  try {
    const tasks = await task.findAll({
      include: [{ model: task_data, as: "task_data" }],
    });
    res.status(200).json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

//get tasks by by lists

router.get("/list/:listId", async (req, res) => {
  var listId = req.params.listId;
  try {
    const tasks = await task.findAll({
      where: {
        listId: listId,
      },
      include: [{ model: task_data, as: "task_data" }],
    });
    res.status(200).json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// get all incomplete tasks in list

router.get("/list/:listId/incomplete", async (req, res) => {
  var listId = req.params.listId;
  try {
    const tasks = await task.findAll({
      where: {
        listId: listId,
      },
      include: [
        {
          model: task_data,
          as: "task_data",
          where: {
            status: 0,
          },
        },
      ],
    });
    res.status(200).json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// get all complete tasks in list

router.get("/list/:listId/complete", async (req, res) => {
  var listId = req.params.listId;
  try {
    const tasks = await task.findAll({
      where: {
        listId: listId,
      },
      include: [
        {
          model: task_data,
          as: "task_data",
          where: {
            status: 1,
          },
        },
      ],
    });
    res.status(200).json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

//get all uncompleted tasks
router.get("/incomplete", async (req, res) => {
  try {
    const tasks = await task.findAll({
      include: [
        {
          model: task_data,
          as: "task_data",
          where: {
            status: 0,
          },
        },
      ],
    });
    res.status(200).json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// get all complete tasks
router.get("/complete", async (req, res) => {
  try {
    const tasks = await task.findAll({
      include: [
        {
          model: task_data,
          as: "task_data",
          where: {
            status: 1,
          },
        },
      ],
    });
    res.status(200).json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
