const express = require("express");
const auth = require("../middleware/auth");
const directoryController = require("../controller/directoryController");
const Location = require("../models/location.js");

const directoriesRouter = new express.Router();

directoriesRouter.post(
  "/directories",
  auth,
  directoryController.createDirectory
);
directoriesRouter.get("/directories", directoryController.getDirectories);
directoriesRouter.get("/directories/:id", directoryController.getDirectory);
directoriesRouter.delete(
  "/directories/:id",
  auth,
  directoryController.deleteDirectory
);

module.exports = directoriesRouter;
