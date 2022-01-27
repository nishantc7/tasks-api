'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.list, {foreignKey:'listId', as:'list'});
      this.hasOne(models.task_data, {foreignKey:'taskId', as:'task_data'}); //1:1
    }
  }
  task.init({
    name: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    listId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'task',
  });
  return task;
};