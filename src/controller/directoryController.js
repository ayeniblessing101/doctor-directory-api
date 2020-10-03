require("../db/mongoose");
const Directory = require("../models/directory");

const createDirectory = async (req, res) => {
  const directory = new Directory(req.body);
  try {
    await directory.save();
    await directory.populate("location").execPopulate();
    await directory.populate("speciality").execPopulate();

    res.status(201).send({
      name: directory.name,
      email: directory.email,
      speciality: directory.speciality.name,
      location: directory.location.name,
      acceptingNewPatient: directory.acceptingNewPatient,
      yearsOfExperience: directory.yearsOfExperience,
      practiceName: directory.practiceName,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const getDirectories = async (req, res) => {
  try {
    const directories = await Directory.find({})
      .populate({
        path: "speciality",
        select: "name -_id",
      })
      .populate({
        path: "location",

        select: "name -_id",
      })
      .exec();
    res.status(200).send(directories);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getDirectory = async (req, res) => {
  try {
    const directory = await Directory.findById(req.params.id)
      .populate("speciality")
      .populate("location")
      .exec();
    if (!directory) {
      res.status(404).send("Directory not found");
    }
    res.status(200).send(directory);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteDirectory = async (req, res) => {
  try {
    const directory = await Directory.findOneAndDelete({
      _id: req.params.id,
    });
    if (!directory) {
      return res.status(404).send("Directory not found");
    }
    res.send(directory);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = {
  getDirectories,
  createDirectory,
  getDirectory,
  deleteDirectory,
};
