"use strict";
const { Op } = require("sequelize");


module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Spots",
      [
        {
          ownerId: 1,
          address: "100 Palace Way",
          city: "Edinburgh",
          state: "Scotland",
          country: "Scotland",
          lat: 32.682027,
          lng: -117.109377,
          name: "Edinburgh Castle",
          description:
            "Standing tall on the crags of Castle Rock, Edinburgh Castle exudes a sense of authority and nobility throughout Scotland’s capital.",
          price: 1500,
        },
        {
          ownerId: 2,
          address: "200 Casterly Rock",
          city: "Bojnice",
          state: "Slovakia",
          country: "Slovakia",
          lat: 45.515128,
          lng: -122.676128,
          name: "Bojnice Castle",
          description:
            "With its enchanting appearance, Bojnice Castle has become one of the most visited castles in central Europe, with thousands of guests exploring its hallowed halls each year.",
          price: 5000,
        },
        {
          ownerId: 3,
          address: "300 Castle Kingdom Rd.",
          city: "Schwangau",
          state: "Germany",
          country: "Germany",
          lat: 25.724264,
          lng: -80.243059,
          name: "Neuschwanstein Castle",
          description:
            "The castle of the fairy-tale king opened to the public in 1886 and remains one of the most popular in all Europe.",
          price: 6000,
        },
        {
          ownerId: 4,
          address: "400 Redkeep Dr.",
          city: "Vianden",
          state: "Luxembourg",
          country: "Luxembourg",
          lat: 40.869855,
          lng: -73.4358,
          name: "Vianden Castle",
          description:
            "Overlooking the River Our in northern Luxembourg, Vianden Castle was first built on the site of an ancient Roman watchtower between the 11th and 14th centuries",
          price: 4000,
        },
        {
          ownerId: 5,
          address: "500 Winterfell Dr.",
          city: "Bran",
          state: "Romania",
          country: "Romania",
          lat: 29.772299,
          lng: -96.15468,
          name: "Bran Castle",
          description:
            "The infamous Bran Castle often finds itself surrounded by lore and mystery because of its connection to Bram Stokers 1897 novel, Dracula",
          price: 300,
        },
        {
          ownerId: 1,
          address: "600 Shogun Rd",
          city: "Himeji",
          state: "Japan",
          country: "Japan",
          lat: 29.772299,
          lng: -96.15468,
          name: "Himeji Castle",
          description:
            "Its elegant white façade and jaw-dropping early 17th-century Japanese castle architecture have earned Himeji Castle the nickname “White Heron Castle” for its resemblance to a bird taking flight.",
          price: 10000,
        },
        {
          ownerId: 2,
          address: "700 Kingstown Rd",
          city: "Hillerød",
          state: "Denmark",
          country: "Denmark",
          lat: 29.772299,
          lng: -96.15468,
          name: "Frederiksborg Castle",
          description:
            "The distinguished Frederiksborg Castle was built as a symbol of King Christian IVs power as ruler of Denmark and Norway",
          price: 9000,
        },
        {
          ownerId: 3,
          address: "800 Royal Rd.",
          city: "Andria",
          state: "Italy",
          country: "Italy",
          lat: 29.772299,
          lng: -96.15468,
          name: "Castel del Monte",
          description:
            "No matter its original purpose, the octagonal castle has become one of southern Italys most visited landmarks ",
          price: 7000,
        },
        {
          ownerId: 4,
          address: "900 Queens Garden Rd.",
          city: "Chambord",
          state: "France",
          country: "France",
          lat: 29.772299,
          lng: -96.15468,
          name: "Château de Chambord",
          description:
            "Château de Chambord hosts several events throughout the year for visitors to discover the history of the Renaissance marvel including during the holiday season",
          price: 5000,
        },
        {
          ownerId: 5,
          address: "1000 Prince Way.",
          city: "Delhi",
          state: "India",
          country: "India",
          lat: 29.772299,
          lng: -96.15468,
          name: "Red Fort",
          description: "the landmark of Jawaharlal Nehru",
          price: 8000,
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
