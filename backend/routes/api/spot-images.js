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
    const spotImage = await SpotImage.findByPk(req.params.imageId, {
        include: {model: Spot}
    })
    

    if(!spotImage) {
        res.statusCode = 404
        return res.json({
          message: "Spot Image couldn't be found",
          statusCode: 404,
        });
    }

    // console.log(spotImage.Spot.ownerId);
    if (req.user.id !== spotImage.Spot.ownerId){
        res.statusCode = 404
        return res.json("This spot does not belong to the current user")
    }

    await spotImage.destroy();
    return res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
})

module.exports = router