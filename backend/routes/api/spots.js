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
const { user } = require("pg/lib/defaults");


router.get("/current", requireAuth, async (req, res, next) => {
  let userSpot = await Spot.findAll({
    where: {
      ownerId: req.user.id
    }
  })

  res.json(userSpot)
})

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
    console.log(newImage)
    res.json(newImage)

  }
  
  

})

module.exports = router