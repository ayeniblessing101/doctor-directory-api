const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

categorySchema.virtual("directories", {
  ref: "Directory",
  localField: "_id",
  foreignField: "speciality",
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
