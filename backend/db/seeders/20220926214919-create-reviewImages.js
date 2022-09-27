"use strict";
const { Op } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "ReviewImages",
      [
        {
          reviewId: 1,
          url: "thumbs-up.png",
        },
        {
          reviewId: 2,
          url: "gold-star.png",
        },
        {
          reviewId: 3,
          url: "happy-family.png",
        },
        {
          reviewId: 4,
          url: "minor-inconvenience.png",
        },
        {
          reviewId: 5,
          url: "bad-service.png",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "ReviewImages",
      {
        reviewId: {
          [Op.in]: [1, 2, 3, 4, 5],
        },
      },
      {}
    );
  },
};
