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

router.delete("/:imageId", requireAuth, async (req, res, next) => {
    const reviewImage = await ReviewImage.findByPk(req.params.imageId)

    if(!reviewImage){
        res.statusCode = 404;
        res.json({
          message: "Review Image couldn't be found",
          statusCode: 404,
        });
    }

    await reviewImage.destroy()
    res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
})

module.exports = router