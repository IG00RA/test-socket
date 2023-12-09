const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/usersController");
const {
  validateBody,
  isValidId,
  isUniquePhoneNumber,
} = require("../../middlewares");
const schemas = require("../../schemas/userSchema");

router
  .route("/")
  .get(ctrl.listUsers)
  .post(validateBody(schemas.addSchema), isUniquePhoneNumber, ctrl.addUser);

router
  .route("/:userId")
  .get(isValidId, ctrl.getUserById)
  .put(
    isValidId,
    validateBody(schemas.addSchema),
    isUniquePhoneNumber,
    ctrl.updateUser
  )
  .delete(isValidId, ctrl.removeUser);

module.exports = router;
