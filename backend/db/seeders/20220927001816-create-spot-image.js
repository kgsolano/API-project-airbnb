"use strict";
const { Op } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "SpotImages",
      [
        {
          spotId: 1,
          url: "thumbs-up.png",
          preview: true
        },
        {
          spotId: 2,
          url: "gold-star.png",
          preview: true
        },
        {
          spotId: 3,
          url: "happy-family.png",
          preview: true
        },
        {
          spotId: 4,
          url: "minor-inconvenience.png",
          preview: true
        },
        {
          spotId: 5,
          url: "bad-service.png",
          preview: true
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "SpotImages",
      {
        spotId: {
          [Op.in]: [1, 2, 3, 4, 5],
        },
      },
      {}
    );
  },
};
