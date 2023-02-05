const expressJwt = require("express-jwt");
const Hotel = require("../models/hotel");

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config();
}
// when expressJwt verifies jwt all data that was stored inside of it will be
// automatically available in req.user, and also it will take token from headers.

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

exports.hotelOwner = async (req, res, next) => {
  let hotel = await Hotel.findById(req.params.hotelId).exec();
  let owner = hotel.postedBy._id.toString() === req.user._id.toString();
  if (!owner) {
    return res.status(403).send("Unauthorized");
  }
  next();
};
