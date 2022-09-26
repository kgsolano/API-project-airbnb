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
          firstName: "Fake",
          lastName: "User",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          email: "user2@user.io",
          username: "FakeUser2",
          firstName: "Faker",
          lastName: "Person",
          hashedPassword: bcrypt.hashSync("password3"),
        },
        {
          email: "user3@user.io",
          username: "FakeUser3",
          firstName: "Kobe",
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
