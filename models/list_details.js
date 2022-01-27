'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class list_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.list, {foreignKey: 'listId', as: 'list'});
    }
  }
  list_details.init({
    details: DataTypes.STRING,
    listId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'list_details',
  });
  return list_details;
};