const express = require("express");
const auth = require("../middleware/auth");
const userController = require("../controller/userController");

const usersRouter = express.Router();

usersRouter.post("/users", userController.createUser);
usersRouter.get("/users/me", auth, userController.getUserProfile);
usersRouter.post("/users/login", userController.login);

module.exports = usersRouter;
