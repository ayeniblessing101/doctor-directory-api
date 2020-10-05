const express = require("express");
const locationController = require("../controller/locationCategory");

locationsRouter = express.Router();

locationsRouter.post("/locations", locationController);

module.exports = locationsRouter;
