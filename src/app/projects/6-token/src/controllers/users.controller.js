const path = require("path");
const {v4: uuid} = require("uuid");

const Io = require("../utils/Io");
const Users = new Io("./database/users.json");

const getProfile = async (req, res) => {
  try {
    const id = req.userId;

    const users = await Users.read();

    const user = users.find((user) => user.id == id);

    delete user.password;
    res.json({message: "Success", data: user});
  } catch (error) {
    res.status(500).json({message: "INTERNAL SERVER ERROR"});
  }
};

const updateProfile = async (req, res) => {
  try {
    const id = req.userId;
    const {firstName, lastName, phoneNumber, email} = req.body;
    const image = req.files?.photo;

    const users = await Users.read();

    const user = users.find((user) => user.id == id);

    let photo;

    if (image) {
      const mimetype = path.extname(image.name);

      photo = uuid() + mimetype;
      image.mv(path.join(process.cwd(), "uploads", photo));
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.phoneNumber = phoneNumber;
    user.email = email;
    user.photo = photo ? photo : user.photo;

    await Users.write(users);
    res.json({message: "Success", data: user});
  } catch (error) {
    res.status(500).json({message: "INTERNAL SERVER ERROR"});
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
