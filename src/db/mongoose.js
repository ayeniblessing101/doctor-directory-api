const mongoose = require("mongoose");
//mongodb://<dbuser>:<dbpassword>@ds139665.mlab.com:39665/doctory-directory-api
//mongodb://127.0.0.1:27017/doctor-directory-api
mongoose.connect(
  //Apologies I know these credentials should be hidden
  "mongodb://blessing:blessing12345#@ds139665.mlab.com:39665/doctor-directory-api",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));

db.once("open", function () {
  console.log("We are connected");
});
