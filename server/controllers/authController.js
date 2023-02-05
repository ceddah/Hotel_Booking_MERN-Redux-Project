const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email | !password) {
      return res.status(400).send("You must fill out all required fields.");
    }

    if (password.length < 6) {
      return res
        .status(400)
        .send("Your password must be at least 6 characters long.");
    }

    const userExists = await User.findOne({ email }).exec();

    if (userExists) {
      return res.status(400).send("E-Mail is already taken.");
    }

    const user = new User(req.body);
    await user.save();
    res.status(201).json({
      ok: true,
    });
  } catch (error) {
    console.log("USER CREATION FAILED ", error);
    return res.status(400).send("Failed to create User. Please try again.");
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email }).exec();

    if (!user) {
      return res.status(400).send("User with that E-Mail not found.");
    }

    user.comparePassword(password, (err, match) => {
      console.log("Compare Password failed ", err);

      if (!match || err) {
        return res.status(400).send("You have entered the wrong password.");
      }

      let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.status(200).json({
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          stripe_account_id: user.stripe_account_id,
          stripe_seller: user.stripe_seller,
          stripeSession: user.stripeSession,
        },
      });
    });
  } catch (err) {
    console.log("USER LOGIN FAILED ", err);
    res.status(400).send("Login has failed. Try again.");
  }
};
