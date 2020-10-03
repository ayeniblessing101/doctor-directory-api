const mongoose = require("mongoose");

const directorySchema = new mongoose.Schema({
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
  speciality: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
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
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Directory = mongoose.model("Directory", directorySchema);

module.exports = Directory;
