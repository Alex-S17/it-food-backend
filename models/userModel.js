const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");

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
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },

    avatarURL: String,
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
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
  }
});
userSchema.pre("save", async function () {
  if (this.isNew) {
    this.verificationCode = await bcrypt.hash(this.verificationCode, 3);
  }
});

const User = model("user", userSchema);

module.exports = {
  User,
};
