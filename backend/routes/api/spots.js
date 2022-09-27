const express = require("express");
const router = express.Router();

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const { User, Spot, Review, SpotImage, sequelize } = require("../../db/models");
const { handleValidationErrors } = require("../../utils/validation");
const { check } = require("express-validator");


router.get("/", async (req, res, next) => {
  let spots = await Spot.findAll({
    raw: true
  })

  let resBody = []
  for(let i = 0; i < spots.length; i++) {
    let avg = await Review.findAll({
      where: {
        spotId: spots[i].id
        
      },
      attributes:
        [[sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']],
        raw: true
    });

    const image = await SpotImage.findAll({
      where: {spotId: spots[i].id},
      raw: true
    })

  let {
    id,
    ownerId,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
    createdAt,
    updatedAt,
  } = spots[i];

  resBody.push({
    id,
    ownerId,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
    createdAt,
    updatedAt,
    avgRating: Number(avg[0].avgRating),
    previewImage: image[0].url
  });
}

    res.json({Spots: resBody,
      // page,
      // size
    })
})

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

module.exports = router