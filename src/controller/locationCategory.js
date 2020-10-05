const Location = require("../models/location");

const createLocation = async (req, res) => {
  const location = new Location(req.body);
  try {
    await location.save();
    res.status(201).send(location);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = createLocation;
