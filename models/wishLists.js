const mongoose = require('mongoose');

const wishListSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    url: { type: String, required: true },
  },
  { timestamps: true }
);

const wishListModel = mongoose.model('wishLists', wishListSchema);

module.exports = wishListModel;
