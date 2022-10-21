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
          url: "https://th-thumbnailer.cdn-si-edu.com/Yq_crW-TdiCFYJ6NEm6QlpxUKDE=/1000x750/filters:no_upscale()/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/31/e7/31e70d69-a3b2-4823-9097-2176fd515da6/neuschwanstein-castle.jpg",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://www.brides.com/thmb/ituJ-qXMRfMhH0AUUWSqrbxunIA=/3744x2808/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__brides__proteus__5af9c06d368ea641e4c3a24d__11-75c2514d4c5c4dca921c0f35f2621c86.jpeg",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://www.japan-guide.com/g21/3501_11.jpg",
        },
        {
          spotId: 7,
          url: "https://img.atlasobscura.com/jBTC176E5JlV1WXosjCE4XwfOk9KutDlwC0VHsVD7k0/rt:fit/h:390/q:81/sm:1/scp:1/ar:1/aHR0cHM6Ly9hdGxh/cy1kZXYuczMuYW1h/em9uYXdzLmNvbS91/cGxvYWRzL3BsYWNl/X2ltYWdlcy8wYjcz/NDdjNi01ZjBjLTQy/MTktOWU1Zi0yYTEy/YTE1Y2MxYzI4ZGJj/ODgyNTk0MzRiOWMx/NGFfMTUxNXB4LUZy/ZWRlcmlrc2Jvcmdf/Y2FzdGxlXy1fcGFu/b3JhbWlvXygxNSkg/KDEpLmpwZw.jpg",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/italy-apulia-andria-castel-del-monte-news-photo-1575309859.jpg",
          preview: true,
        },
        {
          spotId: 9,
          url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/the-chateau-de-chambord-castle-unesco-world-heritage-site-news-photo-1575309440.jpg",
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
