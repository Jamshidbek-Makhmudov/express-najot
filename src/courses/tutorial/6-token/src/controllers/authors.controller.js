const {v4: uuid} = require("uuid");
const path = require("path");
const Io = require("../utils/Io");
const Author = require("../models/Author.model");

const Authors = new Io("./database/authors.json");

const create = async (req, res) => {
  try {
    const {firstName, lastName, birthDate, deadDate, country, bio} = req.body;
    const image = req.files?.photo;

    const mimetype = path.extname(image.name);
    const photo = uuid() + mimetype;

    image.mv(process.cwd() + "/uploads/" + photo);

    const authors = await Authors.read();

    const id = (authors[authors.length - 1]?.id || 0) + 1;

    const author = new Author(
      id,
      firstName,
      lastName,
      birthDate,
      deadDate,
      country,
      bio,
      photo
    );

    const result = authors.length ? [...authors, author] : [author];

    await Authors.write(result);

    res.status(201).json({message: "Created"});
  } catch (error) {
    res.status(500).json({message: "INTERNAL SERVER ERROR"});
  }
};

const getAll = async (req, res) => {
  const authors = await Authors.read();

  res.json({message: "Success", authors});
};
const getById = async (req, res) => {
  const authors = await Authors.read();
  const {id} = req.params;

  const author = authors.find((author) => author.id == id);

  res.json({message: "Success", author});
};

module.exports = {create, getAll, getById};
