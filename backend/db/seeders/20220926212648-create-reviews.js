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
