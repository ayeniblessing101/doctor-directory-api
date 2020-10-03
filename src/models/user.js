const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    tokens: [
      {
        token: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.statics.findByCredentials = async (email, password) => {
  const user = User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = bcrypt.compare(user.password, password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

userSchema.methods.toJSON = function () {
  const user = this;

  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "iamlearningandgrowing");
  user.tokens = user.tokens.concat({ token });
  user.save();
  return token;
};

userSchema.pre("save", async function () {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
