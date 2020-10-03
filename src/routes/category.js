const express = require("express");

const auth = require("../middleware/auth");

const categoryController = require("../controller/categoryController");

const categoriesRouter = new express.Router();

categoriesRouter.get("/categories", categoryController.getCategories);
categoriesRouter.get("/categories/:id", categoryController.getCategory);
categoriesRouter.post("/categories", auth, categoryController.createCategory);
categoriesRouter.patch(
  "/categories/:id",
  auth,
  categoryController.updateCategory
);
categoriesRouter.delete(
  "/categories/:id",
  auth,
  categoryController.deleteCategory
);

module.exports = categoriesRouter;
