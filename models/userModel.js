const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add Username"],
    },
    email: {
      type: String,
      required: [true, "Please add User Email Address"],
      unique: [true, "Email Address already taken"],
    },
    password: {
      type: String,
      required: [true, "Please add user password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
