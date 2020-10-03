const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

locationSchema.virtual("directories", {
  ref: "Directory",
  localField: "_id",
  foreignField: "location",
});

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
