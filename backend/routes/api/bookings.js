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
      userId: req.user.id,
    },
    include: [
      {
        model: Spot,
        attributes: [
          "id",
          "ownerId",
          "address",
          "city",
          "state",
          "country",
          "lat",
          "lng",
          "name",
          "price",
        ],
        raw: true,
      },
    ],
  });
  // console.log(bookingData)
  // console.log(bookingData[0].id)
  for (const booking of bookingData) {
    let spotId = booking.Spot.id;

    const previewImages = await SpotImage.findAll({
      where: {
        spotId: spotId,
      },
      attributes: ["url"],
      raw: true,
    });
    // console.log(booking.Spot.dataValues);
    // booking.Spot.dataValues.previewImage = previewImages.url
    booking.Spot.dataValues.previewImage = previewImages[0].url
    // console.log(previewImages[0].url)
  }

  res.json({ Bookings: bookingData });
})

router.put("/:bookingId", requireAuth, async (req, res, next) => {
  const booking = await Booking.findByPk(req.params.bookingId)
  const { startDate, endDate } = req.body


  if(!booking){
    res.statusCode = 404;
    res.json({
      message: "Booking couldn't be found",
      statusCode: 404,
    });
  }

  // const currentDate = new Date().getTime
  // if(currentDate >= endDate){
  //   res.statusCode = 403
  //   res.json({
  //     message: "Past bookings cannot be modified",
  //     statusCode: 403
  //   })
  // }

   const currentEndDate = new Date(endDate).getTime();
   const currentStartDate = new Date(startDate).getTime();

  if (currentEndDate <= currentStartDate) {
    res.statusCode = 400;
    res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        endDate: "endDate cannot be on or before the start date",
      },
    });
  }

  if((currentStartDate >= startDate && currentEndDate <= endDate) || currentStartDate <= startDate && currentEndDate >= endDate){
    res.statusCode = 403
    res.json({
      message: "Sorry, this spot is already booked for the specified dates",
      statusCode: 403,
      errors: {
        startDate: "Start date conflicts with an existing booking",
        endDate: "End date conflicts with an existing booking",
      },
    });
  }


    booking.update({
      startDate,
      endDate,
    });

    res.json(booking)
})

router.delete("/:bookingId", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const booking = await Booking.findByPk(req.params.bookingId);
  let currentDate = new Date();

  if (!booking) {
    const err = new Error("Booking couldn't be found");
    err.status = 404;
    return next(err);
  } else {
    let spot = await booking.getSpot();
    if (booking.userId !== userId && spot.ownerId !== userId) {
      const err = new Error(
        "Booking must belong to user or Spot must be owned by user"
      );
      err.status = 403;
      return next(err);
    } else if (
      booking.startDate <= currentDate &&
      booking.endDate >= currentDate
    ) {
      const err = new Error("Bookings that have been started can't be deleted");
      err.status = 403;
      return next(err);
    } else {
      await booking.destroy();
      res.json({
        message: "Successfully deleted",
        statusCode: 200,
      });
    }
  }
});





module.exports = router;