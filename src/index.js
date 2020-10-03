const express = require("express");
const categoriesRouter = require("../src/routes/category");
const directoriesRouter = require("../src/routes/directory");
const usersRouter = require("../src/routes/user");
const app = express();

const port = process.env.PORT || 3030;

app.use(express.json());
app.use(categoriesRouter);
app.use(directoriesRouter);
app.use(usersRouter);

app.listen(port, () => {
  console.log("listening on " + port);
});
