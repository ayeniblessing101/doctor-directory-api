const express = require("express");
const categoriesRouter = require("../src/routes/category");
const directoriesRouter = require("../src/routes/directory");
const usersRouter = require("../src/routes/user");
const locationsRouter = require("../src/routes/location");
const app = express();

const port = process.env.PORT || 3030;

app.use(express.json());
app.use(categoriesRouter);
app.use(directoriesRouter);
app.use(usersRouter);
app.use(locationsRouter);

app.listen(port, () => {
  console.log("listening on " + port);
});
