require("../db/mongoose");
const Directory = require("../models/directory");
const multer = require("multer");

const uploads = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
      cb(new Error("File must be an image"));
    }
    cb(undefined, true);
  },
});

const createDirectory = async (req, res) => {
  const directory = new Directory({
    name: req.body.name,
    email: req.body.email,
    category: req.body.category,
    location: req.body.location,
    acceptingNewPatient: req.body.acceptingNewPatient,
    yearsOfExperience: req.body.yearsOfExperience,
    practiceName: req.body.practiceName,
    avatar: req.file.buffer,
  });
  try {
    await directory.save();
    res.send({ directory });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
//localhost:3000//directories?sortBy=name:desc
const getDirectories = async (req, res) => {
  const sort = {};
  const match = {};
  const { limit = 10, skip = 0, sortBy, categoryName } = req.query;

  if (categoryName) {
    match.name = categoryName;
  }

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
    await Directory.find({})
      .populate({
        path: "category location",
        select: "name",
      })

      .sort(sort)
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .exec((err, directories) => {
        directories = directories.filter(
          (directory) => directory.category != null
        );
        res.status(200).send(directories);
      });
  } catch (error) {
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
  uploads,
};
