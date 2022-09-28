const express = require("express");
const router = express.Router();

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const {
  User,
  Spot,
  Review,
  SpotImage,
  ReviewImage,
  Booking,
  sequelize,
} = require("../../db/models");
const { handleValidationErrors } = require("../../utils/validation");
const { check } = require("express-validator");
const { user } = require("pg/lib/defaults");

router.get("/current", requireAuth, async (req, res, next) => {
    const bookingData = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: [
          {model: Spot,
            raw: true
          },
        ],
        
    })
    // console.log(bookingData)
    console.log(bookingData[0].Spot.id)
    for(const booking of bookingData){
    
      let spotId = booking.Spot.id

      const previewImages = await SpotImage.findAll({
        
        where: {
          spotId: spotId,
        },
        attributes: ["url"],
        raw: true,
      });
      // console.log(booking.Spot.dataValues)
      booking.Spot.dataValues.previewImage = previewImages[0].url
    }

    res.json({Bookings: bookingData})
})





module.exports = router;