const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");

const Joi = require("joi");

const joiSignUpSchema = Joi.object({
  name: Joi.string().min(3).max(16).required(),
  phone: Joi.string(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      // tlds: { allow: ["com", "net", "uk", "ua", "org"] },
    })
    .required(),
  password: Joi.string().min(6).alphanum().required(),
}).options({ abortEarly: false });

const joiLoginSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "uk", "ua", "org"] },
    })
    .required(),
  password: Joi.string().min(6).alphanum().required(),
}).options({ abortEarly: false });

const joiVerifySchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "uk", "ua", "org"] },
    })
    .required(),
  verificationCode: Joi.string().required(),
}).options({ abortEarly: false });

const joiForgotPasswordSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "uk", "ua", "org"] },
    })
    .required(),
}).options({ abortEarly: false });

const joiChangeUserDataSchema = Joi.object({
  name: Joi.string().min(3).max(16).required(),
  phone: Joi.string(),
  avatarUrl: Joi.string(),
}).options({ abortEarly: false });

const userSchema = Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    phone: { type: String },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      lowercase: true,
    },

    avatarUrl: String,
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
    verificationCode: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre("save", async function () {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
    this.verificationCode = await bcrypt.hash(this.verificationCode, 3);
  }
});

userSchema.pre("findOneAndUpdate", async function () {
  const data = this.getUpdate();

  if (data.password) {
    data.password = await bcrypt.hash(data.password.toString(), 10);
  }
  if (data.verificationCode) {
    data.verificationCode = await bcrypt.hash(
      data.verificationCode.toString(),
      3
    );
  }
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiSignUpSchema,
  joiLoginSchema,
  joiVerifySchema,
  joiForgotPasswordSchema,
  joiChangeUserDataSchema,
};
