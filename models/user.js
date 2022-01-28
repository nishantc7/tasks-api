"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.company, {
        foreignKey: "companyId",
        as: "company",
      });
      this.hasMany(models.list, { as: "list" }); //1:N
    }
  }
  user.init(
    {
      name: DataTypes.STRING,
      companyId: DataTypes.INTEGER,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
