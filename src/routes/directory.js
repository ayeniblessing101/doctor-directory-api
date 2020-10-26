const express = require("express");
const auth = require("../middleware/auth");
const directoryController = require("../controller/directoryController");
const Location = require("../models/location.js");

const directoriesRouter = new express.Router();

directoriesRouter.post(
  "/directories",
  auth,
  directoryController.uploads.single("image"),
  directoryController.createDirectory,
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);
directoriesRouter.get("/directories", directoryController.getDirectories);
directoriesRouter.get(
  "/directories/category/:id",
  directoryController.getDirectoriesByCategory
);
directoriesRouter.delete(
  "/directories/:id",
  auth,
  directoryController.deleteDirectory
);

module.exports = directoriesRouter;
