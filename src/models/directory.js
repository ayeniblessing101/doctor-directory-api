const mongoose = require("mongoose");

const directorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    acceptingNewPatient: {
      type: Boolean,
      required: true,
      default: false,
    },
    yearsOfExperience: {
      type: Number,
    },
    practiceName: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Directory = mongoose.model("Directory", directorySchema);

module.exports = Directory;
