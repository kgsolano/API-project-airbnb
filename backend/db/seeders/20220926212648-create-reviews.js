"use strict";
const { Op } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Reviews",
      [
        {
          spotId: 1,
          userId: 1,
          review: "Great place to stay!",
          stars: 4,
        },
        {
          spotId: 2,
          userId: 1,
          review: "Loved the atmosphere!",
          stars: 3,
        },
        {
          spotId: 3,
          userId: 1,
          review: "Loved everything about this place!",
          stars: 3,
        },
        {
          spotId: 4,
          userId: 1,
          review: "Location was great but a little messy",
          stars: 4,
        },
        {
          spotId: 5,
          userId: 5,
          review: "Would not recommend",
          stars: 2,
        },
        {
          spotId: 6,
          userId: 6,
          review: "Huge place!",
          stars: 4,
        },
        {
          spotId: 7,
          userId: 7,
          review: "Perfect place for our wedding!",
          stars: 5,
        },
        {
          spotId: 8,
          userId: 8,
          review: "We lived like royalty this weekend!",
          stars: 5,
        },
        {
          spotId: 9,
          userId: 9,
          review: "A little bit too overwhelming for our party of 3",
          stars: 3,
        },
        {
          spotId: 10,
          userId: 10,
          review: "Loved every minute we were here. Would rent this castle again",
          stars: 5,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Reviews",
      {
        SpotId: {
          [Op.in]: [1, 2, 3, 4, 5],
        },
      },
      {}
    );
  },
};
