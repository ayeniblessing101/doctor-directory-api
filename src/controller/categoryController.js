require("../db/mongoose");
const Category = require("../models/category");

const createCategory = async (req, res) => {
  const category = new Category(req.body);
  try {
    await category.save();
    res.status(201).send(category);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).send("Category not found");
    }
    res.status(200).send(category);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateCategory = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Operation" });
  }

  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!category) {
      return res.status(400).send("Unable to update");
    }
    res.status(200).send(category);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).send("Category not found");
    }
    res.status(200).send(category);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
