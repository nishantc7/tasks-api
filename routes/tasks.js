var express = require("express");
const { sequelize, task_data, task } = require("../models");
const authMiddleware = require("../middleware/auth");
const tasksController = require("../controllers/tasks");
var router = express.Router();

//get all tasks for authenticated user
router
  .route("/")
  .get(authMiddleware, tasksController.getTasksForUser)
  .post(authMiddleware, tasksController.createTask);

router.get(
  "/incomplete",
  authMiddleware,
  tasksController.getIncompleteTasksForUser
);

router.get(
  "/complete",
  authMiddleware,
  tasksController.getCompleteTasksForUser
);
//get for particular user
router.get("/:userId", authMiddleware, tasksController.getTasksByUserId);

//get all tasks
router.get(
  "/:userId/complete",
  authMiddleware,
  tasksController.getCompleteTasksByUserId
);
router.get(
  "/:userId/incomplete",
  authMiddleware,
  tasksController.getInompleteTasksByUserId
);

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
router.get("/allincomplete", async (req, res) => {
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
router.get("/allcomplete", async (req, res) => {
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
