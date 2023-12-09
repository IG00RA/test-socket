const { ctrlWrapper, HttpError } = require("../helpers");
const { User } = require("../models/userModel");
const {
  createOrUpdateJsonFile,
  removeJsonFile,
} = require("../utils/jsonFileManager");

const listUsers = async (req, res) => {
  const result = await User.find();
  res.json(result);
};

const getUserById = async (req, res) => {
  const { userId } = req.params;
  const result = await User.findById(userId);
  if (!result) {
    throw HttpError(404, "User not found");
  }
  res.json(result);
};

const addUser = async (req, res) => {
  const result = await User.create({ ...req.body });
  createOrUpdateJsonFile(result._id, req.body);
  res.status(201).json(result);
};

const removeUser = async (req, res) => {
  const { userId } = req.params;
  const result = await User.findOneAndDelete({ _id: userId });
  if (!result) {
    throw HttpError(404, "User not found");
  }
  removeJsonFile(userId);
  res.status(200).json({ message: "User deleted" });
};

const updateUser = async (req, res) => {
  const { userId } = req.params;
  const result = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "User not found");
  }
  createOrUpdateJsonFile(userId, req.body);
  res.json(result);
};

module.exports = {
  listUsers: ctrlWrapper(listUsers),
  getUserById: ctrlWrapper(getUserById),
  addUser: ctrlWrapper(addUser),
  removeUser: ctrlWrapper(removeUser),
  updateUser: ctrlWrapper(updateUser),
};
