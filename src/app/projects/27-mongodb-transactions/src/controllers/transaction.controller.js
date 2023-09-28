const mongoose = require("mongoose");
const Transactions = require("../models/Transaction.model");
const Users = require("../models/User.model");

const create = async (req, res) => {
  try {
    const {to, quantity} = req.body;
    const from = req.verify.id;

    const session = await mongoose.startSession();

    session.startTransaction();

    try {
      const newTransaction = new Transactions({from, to, quantity});

      await newTransaction.save({session});

      const fromUser = await Users.findById(from);
      const toUser = await Users.findById(to);

      await Users.findByIdAndUpdate(
        from,
        {
          $set: {
            balance: fromUser.balance - quantity,
          },
        },
        {session}
      );

      await Users.findByIdAndUpdate(
        to,
        {
          $set: {
            balance: toUser.balance + Number(quantity),
          },
        },
        {session}
      );

      await session.commitTransaction();
      await session.endSession();

      res.json({message: "Success", data: newTransaction});
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();

      return res.status(400).json({message: error.message});
    }
  } catch (error) {
    res.status(500).json({message: "Internal Server Error"});
  }
};

module.exports = {
  create,
};
