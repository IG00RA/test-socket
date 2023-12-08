const Joi = require("joi");
const { Schema } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const addSchema = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string().required(),
  numberPhone: Joi.string().required(),
  country: Joi.string().required(),
  height: Joi.number().required(),
  weight: Joi.number().required(),
});

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for user"],
    },
    surname: {
      type: String,
      required: [true, "Set surname for user"],
    },
    numberPhone: {
      type: String,
      required: [true, "Set Phone number for user"],
    },
    country: {
      type: String,
      required: [true],
    },
    height: {
      type: Number,
      required: [true],
    },
    weight: {
      type: Number,
      required: [true],
    },
  },
  { versionKey: false }
);
userSchema.post("save", handleMongooseError);

module.exports = {
  addSchema,
  userSchema,
};
