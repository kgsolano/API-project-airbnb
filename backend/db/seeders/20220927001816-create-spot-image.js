"use strict";
const { Op } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "SpotImages",
      [
        {
          spotId: 1,
          url: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fa.cdn-hotels.com%2Fgdcs%2Fproduction12%2Fd1130%2F83f1c8c6-e12d-4e69-8433-c5bbc90b5ad6.jpg&imgrefurl=https%3A%2F%2Fwww.hotels.com%2Fgo%2Fuk%2Fmost-beautiful-castles-uk&tbnid=dAyO5-iq5_L0sM&vet=12ahUKEwiZ6fDll-b6AhVZomoFHeylAnAQMygCegUIARDLAg..i&docid=Af-jagfJ1clxlM&w=1600&h=1066&q=castle%20images&ved=2ahUKEwiZ6fDll-b6AhVZomoFHeylAnAQMygCegUIARDLAg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F211014141738-04-european-castles-frederic-chaubin-book-restricted-full-169.jpg&imgrefurl=https%3A%2F%2Fwww.cnn.com%2Fstyle%2Farticle%2Ffrederic-chaubin-stone-age-castles%2Findex.html&tbnid=ZycZpZjmeqSdwM&vet=12ahUKEwiZ6fDll-b6AhVZomoFHeylAnAQMygGegUIARDUAg..i&docid=CdtiGTRL_QujgM&w=1600&h=900&q=castle%20images&ved=2ahUKEwiZ6fDll-b6AhVZomoFHeylAnAQMygGegUIARDUAg",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fmedia.cntraveler.com%2Fphotos%2F5dc5955b51e5fc00088a0dbc%2Fmaster%2Fw_3864%2Ch_2576%2Cc_limit%2FNeuschwanstein-GettyImages-149410921.jpg&imgrefurl=https%3A%2F%2Fwww.cntraveler.com%2Fgalleries%2F2016-03-17%2Fthe-most-beautiful-castles-in-europe&tbnid=TLHqn0innK9zJM&vet=12ahUKEwiZ6fDll-b6AhVZomoFHeylAnAQMygFegUIARDSAg..i&docid=QooZdV8zSgtPxM&w=3864&h=2576&q=castle%20images&ved=2ahUKEwiZ6fDll-b6AhVZomoFHeylAnAQMygFegUIARDSAg",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fth-thumbnailer.cdn-si-edu.com%2FYq_crW-TdiCFYJ6NEm6QlpxUKDE%3D%2F1000x750%2Ffilters%3Ano_upscale()%2Fhttps%3A%2F%2Ftf-cmsv2-smithsonianmag-media.s3.amazonaws.com%2Ffiler%2F31%2Fe7%2F31e70d69-a3b2-4823-9097-2176fd515da6%2Fneuschwanstein-castle.jpg&imgrefurl=https%3A%2F%2Fwww.smithsonianmag.com%2Ftravel%2Fworlds-most-visited-castles-180954081%2F&tbnid=5iO-RJUA-CY0QM&vet=12ahUKEwiZ6fDll-b6AhVZomoFHeylAnAQMygHegUIARDWAg..i&docid=AZ0R1P47l_14jM&w=1000&h=750&q=castle%20images&ved=2ahUKEwiZ6fDll-b6AhVZomoFHeylAnAQMygHegUIARDWAg",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.brides.com%2Fthmb%2FituJ-qXMRfMhH0AUUWSqrbxunIA%3D%2F3744x2808%2Fsmart%2Ffilters%3Ano_upscale()%2F__opt__aboutcom__coeus__resources__content_migration__brides__proteus__5af9c06d368ea641e4c3a24d__11-75c2514d4c5c4dca921c0f35f2621c86.jpeg&imgrefurl=https%3A%2F%2Fwww.brides.com%2Fgallery%2Fcastle-wedding-venues&tbnid=xAaL-UtR6RzssM&vet=12ahUKEwiZ6fDll-b6AhVZomoFHeylAnAQMygQegUIARDpAg..i&docid=ebihas_28aDnhM&w=3744&h=2808&q=castle%20images&ved=2ahUKEwiZ6fDll-b6AhVZomoFHeylAnAQMygQegUIARDpAg",
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
