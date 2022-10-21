"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "demo@user.io",
          username: "Demo-lition",
          firstName: "Demo",
          lastName: "Lition",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "user1@user.io",
          username: "FakeUser1",
          firstName: "Walt",
          lastName: "Disney",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          email: "user2@user.io",
          username: "FakeUser2",
          firstName: "Dion",
          lastName: "Ocean",
          hashedPassword: bcrypt.hashSync("password3"),
        },
        {
          email: "user3@user.io",
          username: "FakeUser3",
          firstName: "William",
          lastName: "Bryant",
          hashedPassword: bcrypt.hashSync("password4"),
        },
        {
          email: "user4@user.io",
          username: "FakeUser4",
          firstName: "Manny",
          lastName: "Machado",
          hashedPassword: bcrypt.hashSync("password5"),
        },
        {
          email: "user4@user.io",
          username: "FakeUser5",
          firstName: "Brad",
          lastName: "Pitt",
          hashedPassword: bcrypt.hashSync("password5"),
        },
        {
          email: "user4@user.io",
          username: "FakeUser6",
          firstName: "Sebastian",
          lastName: "Duck",
          hashedPassword: bcrypt.hashSync("password5"),
        },
        {
          email: "user4@user.io",
          username: "FakeUser7",
          firstName: "Brin",
          lastName: "West",
          hashedPassword: bcrypt.hashSync("password5"),
        },
        {
          email: "user4@user.io",
          username: "FakeUser8",
          firstName: "Allen",
          lastName: "Kennan",
          hashedPassword: bcrypt.hashSync("password5"),
        },
        {
          email: "user4@user.io",
          username: "FakeUser9",
          firstName: "Ben",
          lastName: "Viet",
          hashedPassword: bcrypt.hashSync("password5"),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Users",
      {
        username: { [Op.in]: ["Demo-lition", "FakeUser3", "FakeUser4", "FakeUser1", "FakeUser2"] },
      },
      {}
    );
  },
};
