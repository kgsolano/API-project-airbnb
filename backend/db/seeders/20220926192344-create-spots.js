"use strict";
const { Op } = require("sequelize");


module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Spots",
      [
        {
          ownerId: 1,
          address: "100 Main St.",
          city: "San Diego",
          state: "CA",
          country: "United States of America",
          lat: 32.682027,
          lng: -117.109377,
          name: "San Diego Getaway",
          description: "Come stay in our beautiful home!",
          price: 500,
        },
        {
          ownerId: 2,
          address: "200 Main St.",
          city: "Portland",
          state: "Oregon",
          country: "United States of America",
          lat: 45.515128,
          lng: -122.676128,
          name: "Portland Getaway",
          description: "Come Stay in our beautiful home!",
          price: 150,
        },
        {
          ownerId: 3,
          address: "300 Main St.",
          city: "Miami",
          state: "Florida",
          country: "United States of America",
          lat: 25.724264,
          lng: -80.243059,
          name: "Miami Getaway",
          description: "Come Stay in our beautiful home!",
          price: 800,
        },
        {
          ownerId: 4,
          address: "400 Main St.",
          city: "New York City",
          state: "New York",
          country: "United States of America",
          lat: 40.869855,
          lng: -73.4358,
          name: "New York City Getaway",
          description: "Come Stay in our beautiful home!",
          price: 1000,
        },
        {
          ownerId: 5,
          address: "500 Main St.",
          city: "Austin",
          state: "Texas",
          country: "United States of America",
          lat: 29.772299,
          lng: -96.15468,
          name: "Austin Getaway",
          description: "Come Stay in our beautiful home!",
          price: 300,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Spots",
      {
        ownerId: {
          [Op.in]: [1 ,2 ,3, 4, 5],
        },
      },
      {}
    );
  },
};
