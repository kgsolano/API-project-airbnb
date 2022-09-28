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


// add an image to a review
router.post("/:reviewId/images", requireAuth, async (req, res, next) => {

    // const reviewId = await Review.findByPk(req.params.reviewId)

    if(req.user.id){
        const { url } = req.body
    
        const newReviewImg = await ReviewImage.create({
            reviewId: Review.id,
            url
        })
    
        res.json(newReviewImg)
    }
})


module.exports = router