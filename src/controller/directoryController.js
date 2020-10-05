require("../db/mongoose");
const Directory = require("../models/directory");

const createDirectory = async (req, res) => {
  const directory = new Directory(req.body);
  try {
    await directory.save();
    res.send(directory);
  } catch (error) {
    res.status(400).send(error);
  }
};
//localhost:3000//directories?sortBy=name:desc
const getDirectories = async (req, res) => {
  const sort = {};
  const { limit = 10, skip = 0, sortBy } = req.query;

  if (limit <= 0) {
    res.status(400).send({ error: "Invalid limit value" });
  }
  if (skip < 0) {
    res.status(400).send({ error: "Invalid skip value" });
  }
  if (sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }
  try {
    const directoriesCount = await Directory.countDocuments();
    const directories = await Directory.find({})
      .populate({
        path: "category",
        select: "name",
      })
      .populate({
        path: "location",
        select: "name",
      })
      .sort(sort)
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .exec();
    res.status(200).send({
      directories,
      totalCount: directoriesCount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getDirectory = async (req, res) => {
  try {
    const directory = await Directory.findById(req.params.id).exec();
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
