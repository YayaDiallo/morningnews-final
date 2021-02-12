const mongoose = require('mongoose');

const wishListSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    content: String,
    url: String,
  },
  { timestamps: true }
);

const userSchema = mongoose.Schema(
  {
    wishList: [wishListSchema],
    username: String,
    email: String,
    password: String,
    country: String,
    token: String,
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;
