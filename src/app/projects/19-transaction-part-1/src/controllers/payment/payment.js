const Joi = require("joi");
const query = require("./query");

const create = async (req, res) => {
  try {
    const {from_id, to_id, quantity} = req.body;

    const {error} = Joi.object({
      quantity: Joi.number().required(),
      to_id: Joi.number().required(),
      from_id: Joi.number().required(),
    }).validate({to_id, from_id, quantity});

    if (error) return res.status(400).json({message: error.message});

    await query.beginTransaction();

    await query.decreaseBalance(from_id, quantity);
    await query.increaseBalance(to_id, quantity);

    await query.createTransaction(from_id, quantity, to_id);

    await query.commitTransaction();

    res.status(201).json({message: "SUCCESS"});
  } catch (error) {
    await query.rollBackTransaction();
    res.status(500).json({message: "Internal Server Error"});
  }
};

module.exports = {create};
