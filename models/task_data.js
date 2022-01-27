'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class task_data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.task, {foreignKey: 'taskId', as: 'task'});

    }
  }
  task_data.init({
    details: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    taskId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'task_data',
  });
  return task_data;
};