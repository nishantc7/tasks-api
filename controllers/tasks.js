const { sequelize, task_data, task, list } = require("../models");

module.exports = {
  getTasksForUser: async (req, res) => {
    try {
      const userId = req.user.id;
      if (userId) {
        const lists = await list.findAll({
          where: {
            userID: userId,
          },
        });
        const listIds = lists.map((list) => list.id);
        const tasks = await task.findAll({
          where: {
            listId: listIds,
          },
          include: [{ model: task_data, as: "task_data" }],
        });
        res.status(200).json(tasks);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  },
  getIncompleteTasksForUser: async (req, res) => {
    try {
      const userId = req.user.id;
      if (userId) {
        const lists = await list.findAll({
          where: {
            userID: userId,
          },
        });
        const listIds = lists.map((list) => list.id);
        const tasks = await task.findAll({
          where: {
            listId: listIds,
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
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  },
  getCompleteTasksForUser: async (req, res) => {
    try {
      const userId = req.user.id;
      if (userId) {
        const lists = await list.findAll({
          where: {
            userID: userId,
          },
        });
        const listIds = lists.map((list) => list.id);
        const tasks = await task.findAll({
          where: {
            listId: listIds,
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
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  },
  getTasksByUserId: async (req, res) => {
    try {
      const userId = req.params.userId;
      if (userId) {
        const lists = await list.findAll({
          where: {
            userID: userId,
          },
        });
        const listIds = lists.map((list) => list.id);
        const tasks = await task.findAll({
          where: {
            listId: listIds,
          },
          include: [{ model: task_data, as: "task_data" }],
        });
        res.status(200).json(tasks);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  },
  getCompleteTasksByUserId: async (req, res) => {
    try {
      const userId = req.params.userId;
      if (userId) {
        const lists = await list.findAll({
          where: {
            userID: userId,
          },
        });
        const listIds = lists.map((list) => list.id);
        const tasks = await task.findAll({
          where: {
            listId: listIds,
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
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  },
  getInompleteTasksByUserId: async (req, res) => {
    try {
      const userId = req.params.userId;
      if (userId) {
        const lists = await list.findAll({
          where: {
            userID: userId,
          },
        });
        const listIds = lists.map((list) => list.id);
        const tasks = await task.findAll({
          where: {
            listId: listIds,
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
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  },
  createTask: async (req, res) => {
    try {
      if (
        !req.body.listId ||
        !req.body.name ||
        !req.body.details ||
        !(req.body.status !== undefined)
      ) {
        console.log(req.body);
        res.status(400).send("Bad Request");
      } else {
        const newTask = await task.create({
          listId: req.body.listId,
          name: req.body.name,
        });
        const newTaskData = await task_data.create({
          taskId: newTask.id,
          details: req.body.details,
          status: req.body.status,
        });
        let taskData = { ...newTask, ...newTaskData };
        taskData = taskData.dataValues;
        res.status(201).json(taskData);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  },
};
