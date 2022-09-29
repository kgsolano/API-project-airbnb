'use strict';
const {
  Model,
  SpotImages
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.hasMany(models.Review, {foreignKey: 'spotId'})
      Spot.hasMany(models.Booking, {foreignKey: 'spotId'})
      Spot.hasMany(models.SpotImage, {foreignKey: 'spotId'})
      Spot.belongsTo(models.User, {as: 'Owner', foreignKey: 'id'})

    }
  }
  Spot.init(
    {
      ownerId: DataTypes.INTEGER,
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      country: DataTypes.STRING,
      lat: DataTypes.DECIMAL,
      lng: DataTypes.DECIMAL,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Spot",
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      scopes: {
        includeEdits: {
          attributes: {
            include:["createdAt", "updatedAt"]
          }
        }
      }
    }
  );
  return Spot;
};