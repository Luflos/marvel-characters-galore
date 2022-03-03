'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users_comics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users_comics.init({
    userId: DataTypes.INTEGER,
    comicId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'users_comics',
  });
  return users_comics;
};