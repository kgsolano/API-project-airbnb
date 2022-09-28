const express = require("express");
const router = express.Router();

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const { User, Spot, Review, SpotImage, ReviewImage, Booking, sequelize } = require("../../db/models");
const { handleValidationErrors } = require("../../utils/validation");
const { check } = require("express-validator");
const { user } = require("pg/lib/defaults");


router.get("/current", requireAuth, async (req, res, next) => {
  let resBody = {};
  resBody.Spots = await Spot.findAll({
    include: [],
    where: { ownerId: req.user.id },
    raw: true,
  });

  for (let i = 0; i < resBody.Spots.length; i++) {
    let currentSpot = resBody.Spots[i];
    const avgRating = await Review.findAll({
      where: { spotId: currentSpot.id },
      attributes: [[sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]],
      raw: true,
    });

    currentSpot.avgRating = avgRating[0].avgRating;
    const previewImages = await SpotImage.findAll({
      where: {
        spotId: currentSpot.id,
      },
      attributes: ["url", "preview"],
      raw: true,
    });

    const newArr = [];
    for (let i = 0; i < previewImages.length; i++) {
      if (previewImages[i].preview) {
        newArr.push(previewImages[i].url);
        // currentSpot.previewImage = previewImages[i].url
      }
      newArr.length ? (currentSpot.previewImage = newArr) : null;
    }
  }
  res.json(resBody);
});

router.get("/:spotId/reviews", async (req, res, next) => {
  const reviews = await Review.findAll({
    where: {
      spotId: req.params.spotId,
    },
    include: [
      {
        model: User,
      },
      {
        model: ReviewImage
      }
    ],
  });
  res.json(reviews)
  })

router.get("/:spotId", async (req, res, next) => {

  const spotData = await Spot.findByPk(req.params.spotId,{

    include: [
      {model: SpotImage}, 
      {model: User, as: "Owner",
      attributes: ['firstName', 'lastName']
      }
    ]
  })
  // console.log(spotData)

  const reviewData = await Review.findAll({
    where: {
      spotId: spotData.id,
    },
    attributes: [
        [sequelize.fn("AVG", sequelize.col("stars")), "avgStarRating"],
        [sequelize.fn("COUNT", sequelize.col("id")), "numReviews"],
    ],
    raw: true
  });
  // console.log(reviewData[0].avgStarRating)

 

  let dataJson = spotData.toJSON()

  dataJson.numReviews = reviewData[0].numReviews
  dataJson.avgStarRating = reviewData[0].avgStarRating

  res.json(dataJson)

})

router.get("/", async (req, res, next) => {
  let resBody = {}
  resBody.spots = await Spot.findAll({
    raw: true
  })

  for (let i = 0; i < resBody.spots.length; i++) {
    let currentSpot = resBody.spots[i];
    const avgRating = await Review.findAll({
      where: { spotId: currentSpot.id },
      attributes: [[sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]],
      raw: true,
    });

    currentSpot.avgRating = avgRating[0].avgRating;
    const previewImages = await SpotImage.findAll({
      where: {
        spotId: currentSpot.id,
      },
      attributes: ["url", "preview"],
      raw: true,
    });

    const newArr = [];
    for (let i = 0; i < previewImages.length; i++) {
      if (previewImages[i].preview) {
        newArr.push(previewImages[i].url);
        // currentSpot.previewImage = previewImages[i].url
      }
      newArr.length ? (currentSpot.previewImage = newArr) : null;
    }
  }
  res.json(resBody);
})

router.put("/:spotId", requireAuth, async (req, res, next) => {
  const spot = await Spot.scope("includeEdits").findByPk(req.params.spotId)

  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  spot.update({
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });

  res.json(spot)
})

// create a booking based on spotId
router.post("/:spotId/bookings", requireAuth, async (req, res, next) => {
  const { startDate, endDate } = req.body
  const currentSpot = await Spot.findByPk(req.params.spotId)
  
  const currentBooking = await Booking.findAll({
    where: {
      spotId: currentSpot.id
    }
  })

  

  if (!currentSpot){
    res.statusCode = 404
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  } 
  
  if(req.user.id === currentSpot.ownerId){
    res.statusCode = 404
    return res.json("Spot must NOT belong to the current user")
  } 

  const currentEndDate = new Date(endDate).getTime()
  const currentStartDate = new Date(startDate).getTime()
  
  if (currentEndDate <= currentStartDate) {
    res.statusCode = 400
    res.json({
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "endDate": "endDate cannot be on or before the start date"
      }
    })
  }
  
  for (const booking of currentBooking ){
    let newStartDate = new Date(booking.startDate).getTime()
    let newEndDate = new Date(booking.endDate).getTime()

  // if((oldStartDate >= currentStartDate && oldEndDate <= currentEndDate) || (oldStartDate <= currentStartDate && oldEndDate >= currentEndDate))    

    if ((newStartDate >= currentStartDate && newEndDate <= currentEndDate) || newStartDate <= currentStartDate && newEndDate >= currentEndDate){
      res.statusCode = 403
      res.json({
          "message": "Sorry, this spot is already booked for the specified dates",
          "statusCode": 403,
           "errors": {
                 "startDate": "Start date conflicts with an existing booking",
                  "endDate": "End date conflicts with an existing booking"
}
      })
    }
  }


    const newBooking = await Booking.create({
      spotId: currentSpot.id,
      userId: req.user.id,
      startDate,
      endDate,
    });

    res.json(newBooking);

})


//creating a spot
router.post("/", requireAuth, async (req, res, next) => {
    
  const {
      
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price } = req.body

    const newSpot = await Spot.create({
      ownerId: req.user.id,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    });

    // console.log(newSpot).
    // if(!newSpot) {
    //     res.status = 400
    //     res.json({
    //       message: "Validation Error",
    //       statusCode: res.status,
    //       errors: {
    //         "address": "Street address is required",
    //         "city": "City is required",
    //         "state": "State is required",
    //         "country": "Country is required",
    //         "lat": "Latitude is not valid",
    //         "lng": "Longitude is not valid",
    //         "name": "Name must be less than 50 characters",
    //         "description": "Description is required",
    //         "price": "Price per day is required",
    //       },
    //     });
    //   }

    res.status = 201
    res.json(newSpot)
})

// create a review based on a spot's id
router.post("/:spotId/reviews", requireAuth, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId)


  const { review, stars } = req.body

  const newReview = await Review.create({
    userId: req.user.id,
    spotId: spot.id,
    review,
    stars
  })

  if (req.user.Id === newReview.spotId){
    res.statusCode = 403
    res.json({
      "message": "User already has a review for this spot"
    })
  }
  // console.log("newreview id:", newReview.spotId)
  // console.log("current user id:" , req.user.id)

  // console.log(newReview)
  res.json(newReview)
})

//create an image for a spot
router.post("/:spotId/images", requireAuth, async (req, res, next) => {
  const { url, preview } = req.body
  const spot = await Spot.findByPk(req.params.spotId)

  // console.log(spot)

  //if the user matches the spot's owner id
  if(!spot) {

    res.status = 404
    res.json({
      "message": "Spot couldn't be found",
      "statusCode": res.status
    }) 

      } else if (req.user.id !== spot.ownerId){
      res.json({"message": "user does not match"})
    } else {

    const newImage = await SpotImage.create({
      spotId: spot.id, url, preview
    })
    // console.log(newImage)
    res.json(newImage)

  }

})

router.delete("/:spotId", requireAuth, async (req, res, next) => {
  if(req.user.id !== Spot.ownerId){
    res.json({
      message: "Spot could not be found",
      statusCode: 404
    })
  
     const removeSpot = await Spot.findByPk(req.params.spotId);

     await removeSpot.destroy();

     res.json({
       message: "Successfully Deleted",
       statusCode: 200,
     });
}
})

module.exports = router