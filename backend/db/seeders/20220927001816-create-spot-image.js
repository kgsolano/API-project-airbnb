"use strict";
const { Op } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "SpotImages",
      [
        {
          spotId: 1,
          url: "https://a.cdn-hotels.com/gdcs/production12/d1130/83f1c8c6-e12d-4e69-8433-c5bbc90b5ad6.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://cdn.cnn.com/cnnnext/dam/assets/211014141738-04-european-castles-frederic-chaubin-book-restricted-full-169.jpg",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://media.cntraveler.com/photos/5dc5955b51e5fc00088a0dbc/master/w_3864,h_2576,c_limit/Neuschwanstein-GettyImages-149410921.jpg",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://live.staticflickr.com/65535/50638588936_99b8e099de_z.jpg",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://bigseventravel.com/wp-content/uploads/2021/07/Bran-Castle.jpg",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://www.japan-guide.com/g21/3501_11.jpg",
        },
        {
          spotId: 7,
          url: "https://as1.ftcdn.net/v2/jpg/04/45/65/66/1000_F_445656654_jYurZBcIAmMDy8L5mOD4VLHZwp6rAcG5.jpg",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://cdn.getyourguide.com/img/location/5e0dde531016d-wide.jpeg/99.jpg",
          preview: true,
        },
        {
          spotId: 9,
          url: "https://ychef.files.bbci.co.uk/976x549/p086hwfw.jpg",
          preview: true,
        },
        {
          spotId: 10,
          url: "https://hips.hearstapps.com/hmg-prod/images/red-fort-1603148845.jpg",
          preview: true,
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
