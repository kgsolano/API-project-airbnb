"use strict";
const { Op } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Bookings",
      [
        {
          spotId: 1,
          userId: 1,
          startDate: new Date('January 12, 2022'),
          endDate: new Date('January 13, 2022'),
        },
        {
          spotId: 2,
          userId: 2,
          startDate: new Date('February 1, 2022'),
          endDate: new Date('February 2, 2022'),
        },
        {
          spotId: 3,
          userId: 3,
          startDate: new Date('March 3, 2022'),
          endDate: new Date('March 4, 2022'),
        },
        {
          spotId: 4,
          userId: 4,
          startDate: new Date('April 4, 2022'),
          endDate: new Date('April 5, 2022'),
        },
        {
          spotId: 5,
          userId: 5,
          startDate: new Date('May 5, 2022'),
          endDate: new Date('May 6, 2022'),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Bookings",
      {
        SpotId: {
          [Op.in]: [1, 2, 3, 4, 5],
        },
      },
      {}
    );
  },
};
