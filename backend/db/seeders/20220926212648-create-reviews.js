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
          stars: 5,
        },
        {
          spotId: 2,
          userId: 2,
          review: "Loved the atmosphere!",
          stars: 4,
        },
        {
          spotId: 3,
          userId: 3,
          review: "Loved everything about this place!",
          stars: 5,
        },
        {
          spotId: 4,
          userId: 4,
          review: "Location was great but a little messy",
          stars: 3,
        },
        {
          spotId: 5,
          userId: 5,
          review: "Would not recommend",
          stars: 1,
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
