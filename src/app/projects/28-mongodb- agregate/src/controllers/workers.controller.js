const Users = require("../models/User.model");

const find = async (req, res) => {
  try {
//     ///pagination
//     const { page, limit,search, } = req.query;
//     const skip = (page - 1) * limit;
//     const filter = {};
//     if (search) { 
// //filter.search = search
//       filter = {
//    ...filter,
//        $or: [{ fullName: search }, {username:search}]
//       }

//     }

    
    //const usersCount = await Users.find();
    //  const usersCount = await Users.find(filter).countDocuments();
    //  const pages = await Users.find(filter).countDocuments()/limit;
    // const users = await Users.find(filter).skip(skip).limit(limit);

		// const workers=await  Users.aggregate().sortByCount("$country")
    const workers = await Users.aggregate([
      { $match: { $or: [{ gender: "Male" }, { country: "China"}] } },
      // { $match: {gender:"Male",country:"China"} },
      // {
      //   // $group: {
      //   //   _id: "$country",
      //   //   count: {$sum:1}
      //   // },
      //   $group: {
      //     _id: "$country",
      //     count: { $sum: "$salary" }
      //   },
      // },
      // {
      //   $sort: {
      //     sum: 1,//1 asc -1 desc
      //      },
      //   /*
      //   $group: { //group qilib bersion 
      //     _id: "$country",  // nimani qayerga yigib bersion
      //     count: {$sum:1} //ustida qanday amal bajarilsin
      //   },
      //   */
      // }
    ])



    res.status(200).json({data: workers});

  } catch (error) {
    res.status(500).json({message: "Internal Server Error"});
  }
};

module.exports = {
  find,
};
