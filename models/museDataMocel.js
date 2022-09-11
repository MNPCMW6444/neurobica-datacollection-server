const mongoose = require("mongoose");

const yoadSchema = new mongoose.Schema(
  {
    stringified: String,
    name: String,
  },

  {
    timestamps: true,
  }
);

const Yoad = mongoose.model("yoad", yoadSchema);

module.exports = Yoad;
