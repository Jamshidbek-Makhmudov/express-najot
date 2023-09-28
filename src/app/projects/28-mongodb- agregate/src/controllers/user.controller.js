const Users = require("../models/User.model");

const find = async (req, res) => {
  try {
    ///pagination
    const { page, limit,search, } = req.query;
    const skip = (page - 1) * limit;
    const filter = {};
    if (search) { 
//filter.search = search
      filter = {
   ...filter,
       $or: [{ fullName: search }, {username:search}]
      }

    }

    
    //const usersCount = await Users.find();
     const usersCount = await Users.find(filter).countDocuments();
     const pages = await Users.find(filter).countDocuments()/limit;
    const users = await Users.find(filter).skip(skip).limit(limit);



    res.status(200).json({data: {users,usersCount}});

  } catch (error) {
    res.status(500).json({message: "Internal Server Error"});
  }
};

module.exports = {
  find,
};
