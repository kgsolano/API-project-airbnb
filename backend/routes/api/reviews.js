const express = require("express");
const router = express.Router();

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const { User, Spot, Review, ReviewImage, SpotImage, sequelize } = require("../../db/models");
const { handleValidationErrors } = require("../../utils/validation");
const { check } = require("express-validator");
const { user } = require("pg/lib/defaults");
const review = require("../../db/models/review");

// get all reviews of the current user
router.get("/current", requireAuth, async (req, res, next) => {

    const resBody = {}
    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include:[
            {model: User},
            {model: Spot},
            {model: ReviewImage}
        ]
    })

    for (rev of reviews) {
        const reviewImg = await SpotImage.findOne({
            where: {preview: true,
            spotId: rev.Spot.dataValues.id
            },
            attributes: ['url'],
            raw: true
        })
        rev.Spot.dataValues.previewImage = reviewImg.url
       
    }

    
    res.json(reviews)
})

// Edit a review
router.put("/:reviewId", requireAuth, async (req, res, next) => {
  const editedReview = await Review.scope("includeEdits").findByPk(req.params.reviewId);

  const { review, stars } =
    req.body;

  editedReview.update({
    spotId: Spot.id,
    review,
    stars,
  });

  res.json(editedReview);
});

// add an image to a review
router.post("/:reviewId/images", requireAuth, async (req, res, next) => {

    const reviewId = await Review.findByPk(req.params.reviewId)

    if(req.user.id){
        const { url } = req.body
    
        const newReviewImg = await ReviewImage.create({
            reviewId: reviewId.id,
            url
        })
    
        res.json(newReviewImg)
    }
})


module.exports = router