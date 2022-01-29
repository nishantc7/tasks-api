const { sequelize, list_details, list } = require("../models");

module.exports = {
  addList: async (req, res, next) => {
    try {
      if (!req.body.name || !req.body.details) {
        res.status(400).send("Bad Request");
      } else {
        const userId = req.user.id;
        const newList = await list.create({
          userId: userId,
          name: req.body.name,
        });
        const newListDetails = await list_details.create({
          details: req.body.details,
          listId: newList.id,
        });
        let listData = { ...newList, ...newListDetails };
        res.status(201).json(newListDetails);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  },
  getAllLists: async (req, res) => {
    try {
      const lists = await list.findAll({
        include: [{ model: list_details, as: "list_details" }],
      });
      res.status(200).json(lists);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  },
  getListsByUserId: async (req, res) => {
    var userID = req.params.userId;
    try {
      const lists = await list.findAll({
        where: {
          userID: userID,
        },
        include: [{ model: list_details, as: "list_details" }],
      });
      res.status(200).json(lists);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  },
  getListsForCurrentUser: async (req, res) => {
    var userID = req.user.id;
    try {
      const lists = await list.findAll({
        where: {
          userID: userID,
        },
        include: [{ model: list_details, as: "list_details" }],
      });
      res.status(200).json(lists);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  },
};
