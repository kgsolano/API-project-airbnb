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
const { singleMulterUpload, singlePublicFileUpload } = require("../../awsS3");

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

// get all reviews of the current user
router.get("/current", requireAuth, async (req, res, next) => {

    const resBody = {}
    const reviews = await Review.scope("includeEdits").findAll({
        where: {
            userId: req.user.id
        },
        include:[
            {model: User,
            attributes: ['id', 'firstName', 'lastName']
            },
            {model: Spot,
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price' ]
            },
            {model: ReviewImage,
            attributes: ['id', 'url']
            }
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
        if(!rev.Spot.dataValues.previewImage){
          rev.Spot.dataValues.previewImage = null
        } else {
          rev.Spot.dataValues.previewImage = reviewImg.url

        }
       
    }

    
    res.json({Reviews: reviews})
})

// Get a review image
router.get("/:reviewId/reviewImg", requireAuth, async (req, res) => {
  const reviewImg = await ReviewImage.findOne({
    where: {reviewId: req.params.reviewId}
  });

  res.json(reviewImg)
})

// Edit a review
router.put("/:reviewId", requireAuth, validateReview, async (req, res, next) => {
  const editedReview = await Review.scope("includeEdits").findByPk(req.params.reviewId);

  const { review, stars } =
    req.body;

    if(!editedReview){
        res.statusCode = 404
        res.json({
          message: "Review couldn't be found",
          statusCode: 404,
        });
    }

  editedReview.update({
    spotId: Spot.id,
    review,
    stars,
  });

  res.json(editedReview);
});

// add an image to a review
router.post("/:reviewId/images", singleMulterUpload("image"), requireAuth, async (req, res, next) => {

    const reviewId = await Review.findByPk(req.params.reviewId)
    const reviewImageUrl = await singlePublicFileUpload(req.file)

    const allReviews = await ReviewImage.count({
        where: {reviewId: req.params.reviewId}
    })

    if(allReviews >= 3){
        res.statusCode = 403
        res.json({
          message: "Maximum number of images for this resource was reached",
          statusCode: 403,
        });
    }


    // console.log(allReviews)

    if(!reviewId) {
        res.statusCode = 404
        res.json({
          message: "Review couldn't be found",
          statusCode: 404,
        });
    }

    if(req.user.id){
        const { url } = req.body
    
        const newReviewImg = await ReviewImage.create({
            reviewId: reviewId.id,
            url: reviewImageUrl,
        })

         const resWithoutDates = await ReviewImage.findByPk(newReviewImg.id, {
            attributes: ['id', 'url']
         });
    
        res.json(resWithoutDates)
    }
})

router.delete("/:reviewId", requireAuth, async (req, res, next) => {
    const review = await Review.findByPk(req.params.reviewId)

    if(!review){
        res.statusCode = 404
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }

    if(review.userId !== req.user.id){
        res.statusCode = 404
        res.json("review does not belong to current user")
    } 

    review.destroy()
    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
})

module.exports = router