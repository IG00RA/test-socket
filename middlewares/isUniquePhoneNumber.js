const { HttpError } = require("../helpers");
const { User } = require("../models/userModel");

const isUniquePhoneNumber = async (req, res, next) => {
  try {
    const { numberPhone } = req.body;
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      throw HttpError(404, "User not found");
    }

    if (user.numberPhone === numberPhone) {
      return next();
    }

    const existingUser = await User.findOne({ numberPhone });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Phone number is already in use" });
    }

    next();
  } catch (error) {
    console.error(`Error in isUniquePhoneNumber middleware: ${error.message}`);
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal Server Error" });
  }
};

module.exports = isUniquePhoneNumber;
