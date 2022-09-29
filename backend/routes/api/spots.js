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

const validateResponse = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check("lat")
    .exists({ checkFalsy: true })
    .isFloat()
    .withMessage("Latitude is not valid"),
  check("lng")
    .exists({ checkFalsy: true })
    .isFloat()
    .withMessage("Longitude is not valid"),
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .withMessage("price per day is required"),
  handleValidationErrors,
];

const validateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
  check("stars")
    .exists({ checkFalsy: true })
    .isInt({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];


router.get("/current", requireAuth, async (req, res, next) => {
  let resBody = {};
  const Spots = await Spot.scope("includeEdits").findAll({
    include: [],
    where: { ownerId: req.user.id },
    raw: true,
  });

  for (let i = 0; i < Spots.length; i++) {
    let currentSpot = Spots[i];

    const avgRating = await Review.findAll({
      where: { spotId: currentSpot.id },
      attributes: [[sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]],
      raw: true,
    });

    console.log(Spots.avgRating)
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
  res.json({Spots: Spots});
});

router.get("/:spotId/bookings", requireAuth, async (req, res, next) => {
  const currentSpot = await Spot.findByPk(req.params.spotId)

  if(!currentSpot){
    res.statusCode = 404
    return res.json({
  "message": "Spot couldn't be found",
  "statusCode": 404
    })
  }
  
  if(req.user.id !== currentSpot.ownerId){
    const differentBookings = await Booking.findAll({
      where: {
        spotId: currentSpot.id
      },
      attributes: ['spotId', 'startDate', 'endDate']
    })
    return res.json({
      bookings: differentBookings})
  }

  if(req.user.id === currentSpot.ownerId){
    const userBooking = await Booking.scope("includeEdits").findAll({
      where: {
        spotId: currentSpot.id
      },
      include: [
        {model: User,
        attributes: ['id', 'firstName', 'lastName']
        }
      ]
      
    })

    return res.json({
      Bookings: userBooking
    })
  }


})

router.get("/:spotId/reviews", async (req, res, next) => {
  
  const spot = await Spot.scope("includeEdits").findByPk(req.params.spotId)

  if(!spot){
    res.statusCode = 404
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  const reviews = await Review.scope("includeEdits").findAll({
    where: {
      spotId: req.params.spotId,
    },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: ReviewImage,
        attributes: ['id', 'url']
      }
    ],
  })


  res.json({Reviews: reviews})
  })

router.get("/:spotId", async (req, res, next) => {

  const spotData = await Spot.scope("includeEdits").findByPk(req.params.spotId,{

    include: [
      {model: SpotImage,
      attributes: ['id', 'url', 'preview']
      }, 
      {model: User, as: "Owner",
      attributes: ['id', 'firstName', 'lastName']
      }
    ]
  })
  // console.log(spotData)

  if (!spotData) {
    res.statusCode = 404
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });

  }

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
  

  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } =
    req.query;

  page = parseInt(page);
  size = parseInt(size);

  if (!page) page = 1;
  if (page > 10) page = 10;

  if (!size) size = 20;
  if (size > 20) size = 20;

  const pagination = {};
  if (page >= 1 && size >= 1) {
    pagination.offset = size * (page - 1);
    pagination.limit = size;
  }

  
  const Spots = await Spot.scope("includeEdits").findAll({
    ...pagination,
    raw: true
  });

  for (let i = 0; i < Spots.length; i++) {
    let currentSpot = Spots[i];

    const avgRating = await Review.findAll({
      where: { 
        spotId: currentSpot.id
    },
      attributes: [[sequelize.fn("AVG", sequelize.col("stars")), "avgRating"]],
      raw: true,
    });

    // newSpot = Spots[i].toJSON();
    // console.log(avg)
    let number = parseFloat(`${avgRating[0].avgRating}`);
    // console.log(number)
    let numberWithDecimal = parseFloat(number).toFixed(1);

    //   console.log(numberWithDecimal);
    currentSpot.avgRating = numberWithDecimal;
    


    // currentSpot.avgRating = Number(
    //   parseFloat(avgRating[0].avgRating).toFixed(2)
    // );
    // console.log(avgRating)

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



  res.json({Spots: Spots, 
    page: page,
    size: size});
})

router.put("/:spotId", requireAuth, validateResponse, async (req, res, next) => {
  const spot = await Spot.scope("includeEdits").findByPk(req.params.spotId)

  const { address, city, state, country, lat, lng, name, description, price } = req.body;

   

  if(!spot){
    res.statusCode = 404
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

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
  
  if (!currentSpot){
    res.statusCode = 404
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  } 

  const currentBooking = await Booking.findAll({
    where: {
      spotId: currentSpot.id
    }
  })
  
  if(req.user.id === currentSpot.ownerId){
    res.statusCode = 404
    return res.json({message: "Spot must NOT belong to the current user"})
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
router.post("/:spotId/reviews", requireAuth, validateReview, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId)
  const currentReview = await Review.findAll({
    where: {spotId: req.params.spotId}
  })


  const { review, stars } = req.body

  if(!spot){
    res.statusCode = 404
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  const newReview = await Review.create({
    userId: req.user.id,
    spotId: spot.id,
    review,
    stars
  })

  console.log("current", currentReview)
  console.log("new", newReview)
  if (req.user.Id === newReview.spotId){
    res.statusCode = 403
    res.json({
      "message": "User already has a review for this spot",
      statusCode: 403
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

    res.statusCode = 404
    res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    }) 

    } else if (req.user.id !== spot.ownerId){
      res.json({"message": "user does not match"})
    } else {

    const newImage = await SpotImage.create({
      spotId: spot.id, url, preview
    })

    const resWithoutDates = await SpotImage.findByPk(newImage.id, {
      attributes: ['url', 'preview']
    }
    )

    // console.log("without dates -----", resWithoutDates)
    // console.log(newImage)
    res.json(
      resWithoutDates
    )

  }

})

router.delete("/:spotId", requireAuth, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);
  
  if (!spot){
    res.statusCode = 404
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  if(req.user.id !== spot.ownerId){
   return res.json({
      message: "Spt must belong to current user",
      statusCode: 404
    })
  }
  

     await spot.destroy();

     return res.json({
       message: "Successfully Deleted",
       statusCode: 200,
     });

})

module.exports = router