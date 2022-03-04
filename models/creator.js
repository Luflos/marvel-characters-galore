'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class creator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.creator.belongsToMany(models.user, {through: "users_creators"})
    }
  }
  creator.init({
    name: DataTypes.STRING,
    comics: DataTypes.INTEGER,
    series: DataTypes.INTEGER,
    stories: DataTypes.INTEGER,
    events: DataTypes.INTEGER,
    thumbnail: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'creator',
  });
  return creator;
};