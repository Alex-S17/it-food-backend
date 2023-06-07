const { User } = require("../../models/userModel");

const createError = require("http-errors");
const { v4: uuidv4 } = require("uuid");
const Email = require("../email/email");

const signUp = async (req) => {
  const { name, email, phone, password } = req.body;

  const avatarUrl =
    "https://i.discogs.com/yLOD-rGjavMFtHOG5Nk7cKduHZ6R0w-iznYuQle9QLc/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTY2OTQx/OC0xNDE0OTMzNTgy/LTUyNDguanBlZw.jpeg";

  const verificationCode = Math.floor(1000 + Math.random() * 9000);
  const verificationToken = uuidv4();

  const user = await User.findOne({ email });

  if (!user) {
    const newUser = await User.create({
      name,
      email,
      phone,
      password,
      avatarUrl,
      verificationCode,
      verificationToken,
    });

    await new Email(newUser, null, verificationCode).emailConfirmation();
    return newUser;
  }

  if (user && !user.verify) {
    const { _id } = user;

    const updatedUser = await User.findOneAndUpdate(
      { _id },
      { verificationCode, name, phone, password },
      { new: true }
    );

    await new Email(updatedUser, null, verificationCode).emailConfirmation();

    return updatedUser;
  }

  if (user && user.verify) {
    throw createError(401, "Email in use");
  }
};

module.exports = { signUp };
