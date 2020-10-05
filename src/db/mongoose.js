const mongoose = require("mongoose");
//mongodb://127.0.0.1:27017/doctor-directory-api
// "mongodb://apotiEri:Welcome30#@ds115592.mlab.com:15592/doctor-directory-api"
mongoose.connect("mongodb://127.0.0.1:27017/doctor-directory-api", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));

db.once("open", function () {
  console.log("We are connected");
});
