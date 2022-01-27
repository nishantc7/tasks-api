'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class list extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, {foreignKey:'userId', as:'user'});
      this.hasMany(models.task, {as:'task'}); //1:N
      this.hasOne(models.list_details, {foreignKey:'listId',as:'list_details'}); //1:1
    }
  }
  list.init({
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'list',
  });
  return list;
};